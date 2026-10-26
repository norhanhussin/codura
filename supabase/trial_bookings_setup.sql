-- Review this script, then run it in the SQL Editor of the new Supabase project.
-- It creates the booking table if absent and exposes only a validated insert RPC.
-- It does not drop, truncate, or overwrite existing rows.

begin;

create table if not exists public.trial_bookings (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null check (char_length(btrim(parent_name)) between 2 and 120),
  parent_whatsapp text not null check (parent_whatsapp ~ '^\+[1-9][0-9]{7,14}$'),
  student_age integer not null check (student_age between 6 and 18),
  experience_level text not null check (experience_level in ('beginner', 'some_experience', 'experienced')),
  learning_path text not null check (learning_path in ('scratch', 'python', 'ai', 'web', 'help_me_choose')),
  preferred_day text check (preferred_day is null or char_length(preferred_day) <= 60),
  preferred_time text check (preferred_time is null or char_length(preferred_time) <= 60),
  parent_notes text check (parent_notes is null or char_length(parent_notes) <= 1000),
  status text not null default 'new',
  created_at timestamptz not null default now()
);

do $schema_check$
declare
  missing_columns text;
begin
  select string_agg(required.column_name, ', ')
    into missing_columns
  from (values
    ('parent_name'),
    ('parent_whatsapp'),
    ('student_age'),
    ('experience_level'),
    ('learning_path'),
    ('preferred_day'),
    ('preferred_time'),
    ('parent_notes'),
    ('id'),
    ('status'),
    ('created_at')
  ) as required(column_name)
  where not exists (
    select 1
    from information_schema.columns as existing
    where existing.table_schema = 'public'
      and existing.table_name = 'trial_bookings'
      and existing.column_name = required.column_name
  );

  if missing_columns is not null then
    raise exception 'Existing public.trial_bookings is missing required columns: %', missing_columns;
  end if;
end;
$schema_check$;

alter table public.trial_bookings enable row level security;
revoke all on table public.trial_bookings from public, anon, authenticated;
revoke all (
  id,
  parent_name,
  parent_whatsapp,
  student_age,
  experience_level,
  learning_path,
  preferred_day,
  preferred_time,
  parent_notes,
  status,
  created_at
) on table public.trial_bookings from public, anon, authenticated;
grant all on table public.trial_bookings to service_role;
grant usage on schema public to anon;

create or replace function public.submit_trial_booking(
  p_parent_name text,
  p_parent_whatsapp text,
  p_student_age integer,
  p_experience_level text,
  p_learning_path text,
  p_preferred_day text default null,
  p_preferred_time text default null,
  p_parent_notes text default null
)
returns void
language plpgsql
security definer
set search_path = pg_catalog
as $function$
begin
  if p_parent_name is null or char_length(btrim(p_parent_name)) not between 2 and 120 then
    raise exception 'Invalid booking data' using errcode = '22023';
  end if;

  if p_parent_whatsapp is null or p_parent_whatsapp !~ '^\+[1-9][0-9]{7,14}$' then
    raise exception 'Invalid booking data' using errcode = '22023';
  end if;

  if p_student_age is null or p_student_age not between 6 and 18 then
    raise exception 'Invalid booking data' using errcode = '22023';
  end if;

  if p_experience_level is null or p_experience_level not in ('beginner', 'some_experience', 'experienced') then
    raise exception 'Invalid booking data' using errcode = '22023';
  end if;

  if p_learning_path is null or p_learning_path not in ('scratch', 'python', 'ai', 'web', 'help_me_choose') then
    raise exception 'Invalid booking data' using errcode = '22023';
  end if;

  if (p_preferred_day is not null and char_length(p_preferred_day) > 60)
    or (p_preferred_time is not null and char_length(p_preferred_time) > 60)
    or (p_parent_notes is not null and char_length(p_parent_notes) > 1000) then
    raise exception 'Invalid booking data' using errcode = '22023';
  end if;

  insert into public.trial_bookings (
    parent_name,
    parent_whatsapp,
    student_age,
    experience_level,
    learning_path,
    preferred_day,
    preferred_time,
    parent_notes
  ) values (
    btrim(p_parent_name),
    p_parent_whatsapp,
    p_student_age,
    p_experience_level,
    p_learning_path,
    nullif(btrim(p_preferred_day), ''),
    nullif(btrim(p_preferred_time), ''),
    nullif(btrim(p_parent_notes), '')
  );
end;
$function$;

revoke all on function public.submit_trial_booking(text, text, integer, text, text, text, text, text)
  from public, anon, authenticated;
grant execute on function public.submit_trial_booking(text, text, integer, text, text, text, text, text)
  to anon;

notify pgrst, 'reload schema';

commit;