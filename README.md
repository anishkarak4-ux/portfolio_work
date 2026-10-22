# Anish Karak — Machine Learning Systems & Computer Vision Portfolio

<div align="center">

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Production%20Microservice-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**Official engineering portfolio, live algorithmic sandboxes, and verified systems specifications of Anish Karak.**  
*B.Tech in Computer Science and Engineering @ KIIT (9.24 CGPA) • Class of 2028 (Pre-Final Year / 5th Sem)*

[Live Portfolio Demo](https://anishkarak4-ux.github.io/portfolio_work/) • [Download Resume](https://raw.githubusercontent.com/anishkarak4-ux/portfolio_work/main/public/assets/ANISH_RESUME.pdf) • [LinkedIn](https://linkedin.com/in/anish-karak-182661336) • [Email Contact](mailto:anishkarak4@gmail.com)

</div>

---

## ⚡ Executive Summary

Anish Karak is a pre-final year Computer Science undergraduate at **Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar** (Current CGPA: **9.24 / 10.0**), specializing in **high-throughput machine learning pipelines**, **quantized edge computer vision**, and **scalable distributed backend systems**.

### Key Architectural & Competitive Benchmarks
| Benchmark Metric | Value | Reference Engineering System |
| :--- | :--- | :--- |
| **Noisy Records Resolved** | **1,732,840** | [Wyvern Entity Resolution Pipeline](https://github.com/anishkarak4-ux/Wyvern) |
| **Search Space Reduction** | **>99.99%** | 8-Rule Inverted Blocking Engine |
| **Macro F0.5 Validation** | **0.805** | 1,000-Tree Tuned XGBoost Model |
| **Nationwide Competition** | **Top 500** | Amazon ML Challenge 2026 (72-Hour Sprint on Unstop) |
| **National Hackathon** | **Finalist** | Smart India Hackathon (SIH) 2026 (Team SYNAPSE) |
| **Mean Tracking FPS** | **35.88 FPS** | [DIP Inspection Suite](https://github.com/anishkarak4-ux/IPA_GIG) (CSRT 100% Tracking Benchmark) |
| **Edge Anomaly Latency** | **<18 ms** | [TensorEdge-Vision](https://github.com/anishkarak4-ux/portfolio_work) (INT8 Quantized TFLite) |
| **Production Test Suite** | **18 / 18 Pass** | Automated PyTest Suite with Docker CI/CD |
| **Algorithmic Contest** | **Top 12 Finalist** | USC.KIIT CodeSprint 3.0 (100% Consistency) |
| **Academic Standing** | **9.24 / 10.0** | KIIT University B.Tech CSE (3rd Year / 5th Semester) |

---

## 🛠️ Portfolio Architecture & Interactive Features

This portfolio is engineered as a modern, reactive single-page application built with **React 18**, **TypeScript**, and **Tailwind CSS**, accompanied by a decoupled **FastAPI** backend microservice for production scoring and recruiter message handling.

### 1. 🖥️ Interactive Developer Console (`Ctrl + K`)
Recruiters and engineers can open an integrated developer terminal from any page or by pressing `Ctrl + K`.
Available terminal commands:
- `whoami` / `about`: Candidate background, CGPA, and career focus.
- `skills`: Categorized technical stack and proficiency levels.
- `projects`: Summary of featured engineering systems.
- `wyvern`: Deep dive into the Amazon ML Challenge engine.
- `tensoredge`: Deep dive into quantized edge defect segmentation.
- `karigar`: Deep dive into Smart India Hackathon 2026 finalist architecture.
- `academics`: KIIT university standing & coursework breakdown.
- `metrics`: Verified benchmark scores.
- `resume`: Launch audited resume modal & PDF download.
- `contact`: Direct outreach channels (Email, Phone, WhatsApp, LinkedIn).
- `clear` / `exit`: Terminal management.

### 2. 🧪 Wyvern Entity Resolution Sandbox
An interactive, browser-executed simulator demonstrating how Wyvern tackles the multi-million entity matching problem. Select noisy commercial product record pairs or enter custom strings to compute:
- **Token Jaccard Similarity**
- **Levenshtein Distance & Normalized Ratio**
- **Phonetic Soundex Match Verification**
- **Weighted XGBoost Confidence Probability**

### 3. 👁️ DIP Inspection & Tracking Telemetry Engine
A high-performance HTML5 canvas simulator reproducing the freeze-frame diagnostic pipeline and telemetry loop benchmarked in Anish's DIP project:
- **CSRT / YOLOv8 Real-time Trajectory Telemetry** with Lissajous movement simulations.
- **CLAHE (Contrast Limited Adaptive Histogram Equalization)**.
- **Sobel Spatial Gradients** for surface contour & defect detection.
- **Adaptive Binary Threshold Masking**.

### 4. 📐 System Architecture Specifications
Click **"Architecture Spec"** on any project to inspect detailed multi-stage data pipelines, memory ceilings (e.g. 512MB RAM in KarigarSaathi), quantization trade-offs, and design rationale.

### 5. 📄 Audited Resume Modal
View the compiled PDF directly in-browser, download `ANISH_RESUME.pdf`, or copy the clean, ATS-optimized plain text version with one click.

---

## 📂 Repository File Structure

```
portfolio_work/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── api/
│   ├── main.py                 # FastAPI microservice (Contact, Health, ML scoring)
│   ├── requirements.txt        # Python backend dependencies
│   └── README.md               # API setup guide
├── public/
│   └── assets/
│       ├── ANISH_RESUME.pdf    # Official compiled resume PDF
│       ├── anish_karak.jpg     # Official professional portrait
│       ├── signature.jpg       # Digital signature asset
│       └── tensoredge_heatmaps.png
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Frosted glass responsive header
│   │   ├── Hero.tsx            # Hero banner, verified stats, CTA controls
│   │   ├── DeveloperConsole.tsx # Interactive Ctrl+K terminal modal
│   │   ├── ProjectsSection.tsx # Filterable project showcase & search
│   │   ├── ArchitectureModal.tsx # Multi-stage system pipeline specification
│   │   ├── WyvernSimulator.tsx # In-browser entity resolution sandbox
│   │   ├── DIPPlayground.tsx   # Live canvas CV filter & telemetry playground
│   │   ├── SkillsSection.tsx   # Categorized skills matrix with search
│   │   ├── EducationTimeline.tsx # KIIT & school academic foundation
│   │   ├── AchievementsSection.tsx # Hackathon, contest & chess honors
│   │   ├── ContactSection.tsx  # Recruiter outreach form & direct links
│   │   ├── Footer.tsx          # Footer with signature & metadata
│   │   └── SocialIcons.tsx     # Clean SVG social brand icons
│   ├── data/
│   │   └── portfolioData.ts    # Single source of truth for portfolio info
│   ├── App.tsx                 # Root application component
│   ├── main.tsx                # React DOM entry point
│   └── index.css               # Tailwind directives & glassmorphic styling
├── index.html                  # HTML5 entry with OpenGraph metadata
├── package.json                # Node.js project manifest & scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite bundler configuration
├── tailwind.config.js          # Tailwind CSS theme extensions
└── README.md                   # Project documentation
```

---

## 🚀 Local Development Setup

### 1. Frontend Setup (React + Vite)
```bash
# Clone the repository
git clone https://github.com/anishkarak4-ux/portfolio_work.git
cd portfolio_work

# Install dependencies
npm install

# Start Vite local development server
npm run dev
```
The application will launch at `http://localhost:3000`.

To build the static production bundle:
```bash
npm run build
npm run preview
```
The production bundle is compiled into the `dist/` directory.

### 2. Backend Setup (FastAPI Microservice)
```bash
# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate # macOS/Linux

# Install backend dependencies
pip install -r api/requirements.txt

# Start FastAPI server
uvicorn api.main:app --reload --port 8000
```
Swagger API documentation will be available at `http://localhost:8000/docs`.

---

## 🌐 Deployment to GitHub Pages

This repository is configured with an automated GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. On every `git push origin main`, GitHub Actions triggers.
2. It sets up Node.js 20, runs `npm ci`, and executes `npm run build`.
3. The resulting `./dist` artifact is automatically deployed to GitHub Pages.

To enable GitHub Pages in your repository settings:
- Navigate to **GitHub Repository Settings** -> **Pages**.
- Under **Build and deployment**, select **Source: GitHub Actions**.

---

## 📬 Contact & Connect

- **Candidate:** Anish Karak
- **Current Standing:** B.Tech CSE (3rd Year / 5th Sem), Class of 2028, KIIT Bhubaneswar
- **Email:** [anishkarak4@gmail.com](mailto:anishkarak4@gmail.com)
- **Mobile / WhatsApp:** `+91 9832305709`
- **LinkedIn:** [linkedin.com/in/anish-karak-182661336](https://linkedin.com/in/anish-karak-182661336)
- **GitHub:** [github.com/anishkarak4-ux](https://github.com/anishkarak4-ux)
- **Location:** Bhubaneswar, Odisha & Durgapur, West Bengal, India

---
*Licensed under the [MIT License](LICENSE).*
