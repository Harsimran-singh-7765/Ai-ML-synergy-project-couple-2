/*
  # Create couples log table

  1. New Tables
    - `couples_log`
      - `id` (uuid, primary key)
      - `partner1` (text, not null)
      - `partner2` (text, not null)
      - `created_at` (timestamp with time zone)
      - `last_login` (timestamp with time zone)
      - `login_count` (integer)

  2. Security
    - Enable RLS on `couples_log` table
    - Add policy for authenticated users to read all entries
    - Add policy for authenticated users to insert their own entries
    - Add policy for authenticated users to update their own entries
*/

CREATE TABLE IF NOT EXISTS couples_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner1 text NOT NULL,
  partner2 text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz DEFAULT now(),
  login_count integer DEFAULT 1,
  UNIQUE(partner1, partner2)
);

ALTER TABLE couples_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view couples log"
  ON couples_log
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own entries"
  ON couples_log
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own entries"
  ON couples_log
  FOR UPDATE
  TO authenticated
  USING (true);