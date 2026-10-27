-- Run in the Supabase project's SQL Editor after the base trial-booking setup
-- to enable web and data-analysis paths. This preserves existing booking rows.

begin;

alter table public.trial_bookings
  drop constraint if exists trial_bookings_learning_path_check;

alter table public.trial_bookings
  add constraint trial_bookings_learning_path_check
  check (learning_path in ('scratch', 'python', 'ai', 'web', 'data_analysis', 'help_me_choose'));

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

  if p_learning_path is null or p_learning_path not in ('scratch', 'python', 'ai', 'web', 'data_analysis', 'help_me_choose') then
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