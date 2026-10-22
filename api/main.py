"""
FastAPI Microservice for Anish Karak's Portfolio
Provides high-throughput endpoints for contact handling, health telemetry,
and live Wyvern entity matching computation.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import time
import re

app = FastAPI(
    title="Anish Karak Portfolio API",
    description="Backend microservice serving telemetry, contact pipeline, and ML scoring endpoints.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactMessage(BaseModel):
    name: str
    email: str
    organization: Optional[str] = None
    role: str = "Summer 2027 Internship"
    message: str

class MatchRequest(BaseModel):
    title_a: str
    brand_a: str
    title_b: str
    brand_b: str

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "system": "Anish Karak Portfolio API",
        "timestamp": time.time(),
        "version": "2.0.0",
        "verified_metrics": {
            "amazon_ml_f05": 0.805,
            "dip_fps": 35.88,
            "kiit_cgpa": 9.24,
            "records_resolved": "1.73M"
        }
    }

@app.post("/api/contact")
def receive_contact(msg: ContactMessage):
    if not msg.name or not msg.email or not msg.message:
        raise HTTPException(status_code=400, detail="Name, email, and message are required.")
    
    # In production, this can send via SendGrid, SES, or write to SQLite/PostgreSQL
    print(f"[RECRUITER REACH-OUT] From: {msg.name} ({msg.email}) | Org: {msg.organization} | Role: {msg.role}")
    print(f"Message: {msg.message}")
    
    return {
        "success": True,
        "message": "Message received successfully. Anish will respond within 24 hours.",
        "received_at": time.time()
    }

def compute_levenshtein(s1: str, s2: str) -> int:
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            cost = 0 if s1[i-1].lower() == s2[j-1].lower() else 1
            dp[i][j] = min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + cost)
    return dp[m][n]

def compute_jaccard(s1: str, s2: str) -> float:
    t1 = set(re.findall(r'\w+', s1.lower()))
    t2 = set(re.findall(r'\w+', s2.lower()))
    if not t1 and not t2:
        return 1.0
    return len(t1.intersection(t2)) / len(t1.union(t2)) if t1.union(t2) else 0.0

@app.post("/api/wyvern/score")
def score_pair(req: MatchRequest):
    full_a = f"{req.title_a} {req.brand_a}".strip()
    full_b = f"{req.title_b} {req.brand_b}".strip()
    
    jaccard = compute_jaccard(full_a, full_b)
    dist = compute_levenshtein(full_a, full_b)
    max_len = max(len(full_a), len(full_b))
    lev_ratio = (max_len - dist) / max_len if max_len > 0 else 1.0
    
    confidence = min(0.99, max(0.01, jaccard * 0.5 + lev_ratio * 0.5))
    is_match = confidence >= 0.65
    
    return {
        "jaccard_similarity": round(jaccard, 4),
        "levenshtein_ratio": round(lev_ratio, 4),
        "levenshtein_distance": dist,
        "wyvern_confidence_score": round(confidence, 4),
        "predicted_match": is_match,
        "classification": "SAME_ENTITY" if is_match else "DIFFERENT_ENTITIES"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True)
