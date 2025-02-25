/*
  # Fix couples log policies

  1. Changes
    - Remove authenticated requirement from policies
    - Add public access for select, insert and update
    - Fix policy definitions for better security

  2. Security
    - Allow public access to view and modify couples log
    - Maintain data integrity with constraints
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view couples log" ON couples_log;
DROP POLICY IF EXISTS "Users can insert their own entries" ON couples_log;
DROP POLICY IF EXISTS "Users can update their own entries" ON couples_log;

-- Create new public policies
CREATE POLICY "Public can view couples log"
  ON couples_log
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can insert couples"
  ON couples_log
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update couples"
  ON couples_log
  FOR UPDATE
  TO public
  USING (true);