# Anish Karak Portfolio — Backend API Microservice

FastAPI backend service powering telemetry, contact pipeline validation, and real-time algorithmic entity resolution scoring.

## Endpoints

- `GET /api/health` — Verifies service health, active version, and core benchmark metrics.
- `POST /api/contact` — Validates recruiter contact submissions and dispatches notifications.
- `POST /api/wyvern/score` — Real-time entity matching calculation (Levenshtein distance, token Jaccard similarity, and XGBoost confidence score).

## Setup & Running Locally

```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Visit `http://localhost:8000/docs` for interactive Swagger UI documentation.
