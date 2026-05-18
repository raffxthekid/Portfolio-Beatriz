
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including unauthenticated visitors) to submit a contact message
CREATE POLICY "Anyone can submit a contact message"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 254
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(message) BETWEEN 1 AND 5000
  );

-- No SELECT/UPDATE/DELETE policies → reads/edits are blocked for anon and authenticated.
-- Project owner can still view submissions through the backend tools.

CREATE INDEX idx_contact_submissions_created_at
  ON public.contact_submissions (created_at DESC);
