# Building a Dynamic Gold Carding Module with Nest.js Microservices, NATS, Postgres & Docker

This repository comprises four essential services:

- **api-gateway**
- **gold-card-microservice**
- **payer-microservice**
- **provider-microservice**

## Getting Started

Setting up this project locally on your system is straightforward with Docker.

1. Clone this repository and ensure you install each project's dependencies by executing `npm run install`.

2. Confirm Docker is operational, then run `docker compose up --build -d` to construct the container, images, and fetch the Postgres and NATS image from Docker.

3. This dockerfile includes Initialization Scripts for setting up pg_cron and scheduling the monthly auto approval check job. You can configure the job in `/init-db/003-cron-job.sql`.

4. Ensure all services are up and running. The API Gateway Server operates on port 3000.

5. Restore the backup database (`dump_before_cron_14.sql.gz`), containing the database schema and data.

## Application Structure

### HTTP API Gateway

This service utilizes both HTTP and NATS as sources to listen to requests. Serving as the entry point to the entire platform, it forwards requests by publishing a message to the NATS server, which then distributes it to its subscribers. All HTTP API endpoints are defined within this project.

### Provider Microservice

This microservice features a `createCptApproval` event handler published to NATS and consumable by the GoldCard service. It facilitates the creation of a provider, CPT-code record, and their storage in the database.

### Payer Microservice

Responsible for creating payer records and saving them to the database.

### GoldCard Microservice

This microservice consumes the `createCptApproval` event, evaluates it using rules defined by the payer, and emits the CPT approval status to the provider. It also inserts records for `gold-criteria-rules`, `provider-cpt-metrics`, `goldcard-evaluation-results`, `goldcard-eligibility`, and `provider-card-level`, saving them to the database.
