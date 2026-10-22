CREATE TABLE public.trial_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name text NOT NULL,
  parent_whatsapp text NOT NULL,
  student_age integer NOT NULL CHECK (student_age BETWEEN 6 AND 18),
  experience_level text NOT NULL CHECK (experience_level IN ('beginner', 'some_experience', 'experienced')),
  learning_path text NOT NULL CHECK (learning_path IN ('scratch', 'python', 'ai', 'help_me_choose')),
  preferred_day text,
  preferred_time text,
  parent_notes text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.trial_bookings TO service_role;

ALTER TABLE public.trial_bookings ENABLE ROW LEVEL SECURITY;

-- RLS enabled with no policies: the table is intentionally unreachable
-- through the public Data API. Writes happen only through the validated
-- server function using the service-role client.