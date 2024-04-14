CREATE TABLE providers (
    provider_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR,
    specialty VARCHAR,
    npi_number VARCHAR,
    email VARCHAR,
    phone_number VARCHAR
);


CREATE TABLE cpt_code (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    code VARCHAR(10) UNIQUE,
    description TEXT,
    code_type VARCHAR
);

-- Here Scale 1 to 10 used for computing patient_satisfaction , recovery_rate , cost_efficiency  

CREATE TABLE provider_cpt_approval (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    provider_id uuid REFERENCES providers(provider_id),
    cpt_code VARCHAR(10) REFERENCES cpt_code(code),
    payer_id uuid REFERENCES payer(id),
    readmission BOOLEAN NOT NULL DEFAULT FALSE, 
    treatment_guideline_adherence BOOLEAN NOT NULL DEFAULT FALSE,
    patient_satisfaction INT NOT NULL DEFAULT 0,
    recovery_rate INT NOT NULL DEFAULT 0,
    cost_efficiency INT NOT NULL DEFAULT 0,
    submission_date TIMESTAMP WITHOUT TIME ZONE, 
    approval_status BOOLEAN,
    denial_reason TEXT
);

CREATE TABLE provider_cpt_metrics (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    provider_id uuid REFERENCES providers(provider_id),
    cpt_code VARCHAR(10) REFERENCES cpt_code(code),
    metric VARCHAR,
    value VARCHAR
)


CREATE TABLE payer (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR UNIQUE,
    description TEXT
);

CREATE TABLE gold_carding_criteria (
    criteria_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    description VARCHAR,
    metric VARCHAR,
    threshold VARCHAR,
    operator VARCHAR,
    measurement_period_months INTEGER,
    cpt_code VARCHAR(10) REFERENCES cpt_code(code),
    payer_id uuid REFERENCES payer(id)
);

CREATE TABLE payer_gold_carding_eligibility (
    eligibility_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    payer_id UUID REFERENCES payer(id),
    provider_id UUID REFERENCES providers(provider_id),
    cpt_code VARCHAR(10) REFERENCES cpt_code(code),
    is_eligible BOOLEAN,
    reason TEXT
);


CREATE TABLE provider_gold_carding_status (
    status_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    provider_id uuid REFERENCES providers(provider_id),
    criteria_met BOOLEAN,
    gold_carding_level VARCHAR,
    valid_from TIMESTAMP WITHOUT TIME ZONE,
    valid_until TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE gold_carding_evaluation_results (
    evaluation_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    provider_id uuid REFERENCES providers(provider_id),
    criteria_id uuid REFERENCES gold_carding_criteria(criteria_id),
    evaluation_date TIMESTAMP WITHOUT TIME ZONE,
    meets_criteria BOOLEAN,
    actual_value VARCHAR
);