-- Set up pg_cron to refresh hackathon data every 10 days
-- Run this in Supabase SQL Editor

-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a function to refresh hackathons
CREATE OR REPLACE FUNCTION refresh_hackathons()
RETURNS void AS $$
BEGIN
  -- This function will be called by cron job every 10 days
  -- In production, this would call your scraper API endpoint
  -- For now, it updates the status of closing hackathons

  UPDATE public.hackathons
  SET status = 'closed'
  WHERE deadline < now();

  -- Update closing_soon to open if deadline > 3 days
  UPDATE public.hackathons
  SET status = 'open'
  WHERE status = 'closing_soon' AND deadline > now() + interval '3 days';

  -- Mark as closing_soon if deadline within 3 days
  UPDATE public.hackathons
  SET status = 'closing_soon'
  WHERE status = 'open' AND deadline <= now() + interval '3 days' AND deadline > now();

  -- Log the refresh
  RAISE NOTICE 'Hackathon data refreshed at %', now();
END;
$$ LANGUAGE plpgsql;

-- Schedule cron job to run every 10 days at 2 AM UTC
SELECT cron.schedule('refresh-hackathons-every-10-days', '0 2 */10 * *', 'SELECT refresh_hackathons()');

-- List all scheduled jobs (to verify)
SELECT * FROM cron.job;
