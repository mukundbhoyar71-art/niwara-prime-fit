CREATE TABLE public.gym_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  fitness_goal text NOT NULL,
  preferred_training_time text NOT NULL,
  message text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.gym_enquiries TO service_role;
ALTER TABLE public.gym_enquiries ENABLE ROW LEVEL SECURITY;