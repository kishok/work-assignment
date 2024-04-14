
-- Step 1: Install pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;


-- Step 2: Create a SQL script to check auto-approved requests
CREATE OR REPLACE FUNCTION check_auto_approved_requests()
RETURNS TABLE(provider_name varchar,speciality varchar,card_level varchar) AS $$
BEGIN

return query 
	select distinct pr.name,pr.specialty,stat.gold_carding_level from provider_cpt_approval as appr 
	inner join provider_gold_carding_status as stat on appr.provider_id = stat.provider_id
	inner join providers as pr on appr.provider_id = pr.provider_id
	where 
	appr.approval_status = true;

END;
$$ LANGUAGE plpgsql;


-- Step 3: Register the cron job to run monthly
SELECT cron.schedule(
    'check_auto_approval_requests',
    '*/2 * * * *',
    'SELECT provider_name , speciality , card_level from check_auto_approved_requests()'  -- Call the SQL function
);

--'0 0 1 * *',  -- Monthly schedule (at midnight on the 1st day of the month)
--  false  -- Do not replace existing schedule if one exists