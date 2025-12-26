# 🕵️‍♂️ EchoTrace: Autonomous AI Forensic Investigator

> **Submission for Gemini 3 Hackathon 2025**
> *“Justice Delayed is Justice Denied. EchoTrace closes cases in seconds, not weeks.”*

## 🚨 The Problem

Modern investigations are drowning in disconnected data. Detectives spend 80% of their time manually cross-referencing:

* 📹 Hours of CCTV footage
* 🎙️ Fragmented audio witness statements
* 📄 Dense 50-page police reports

Finding a single lie (e.g., *“I was at Starbucks”* vs. *CCTV showing the suspect at the scene*) can take days of manual review.

## ⚡ The Solution

**EchoTrace** is an AI-powered Digital Detective. It ingests video, audio, documents, and images **simultaneously** using **Google Gemini 3 preview’s multimodal capabilities**.

It doesn't just "transcribe"—it **understands context**. It listens to the suspect's alibi, watches the security tape, and instantly flags: **"LIE DETECTED: Suspect claims to be home, but visual biometrics confirm presence at crime scene at 14:02."**

---

## 🌟 Key Features (The "Wow" Factor)

### 🥇 1. Multimodal Contradiction Engine

The core engine compares *what is said* (Audio/Text) against *what is seen* (Video). It automatically detects anomalies like:

* **Alibi Mismatch:** Claiming to be elsewhere while visible on camera.
* **Time Discrepancies:** Police report says 2:00 PM; CCTV timestamp reads 1:30 PM.

### 🥈 2. Explainable AI (XAI) Verdicts

We don't trust "Black Boxes." Every AI conclusion comes with a **Reasoning Chain**:

> *“Conclusion reached because visual object detection identified 'Gun' in frame 402, contradicting the suspect's statement 'I was unarmed' in the audio transcript.”*

### 🥉 3. Digital Chain of Custody (Immutable Ledger)

Court admissibility is priority #1.

* **Auto-Hashing:** Every uploaded file is instantly hashed (SHA-256).
* **Tamper Proofing:** If a single pixel of evidence changes, the system flags it.
* **Audit Log:** Tracks every AI action from ingest to export.

### 🛡️ 4. Deepfake Shield & Integrity Check

Before analysis, the system scans media for generative AI artifacts, certifying the footage is **Authentic** and not a deepfake.

### ⚖️ 5. Court-Ready Affidavit Export

Generates a professional PDF Legal Report containing:

* Chronological Timeline.
* List of Verified Contradictions.
* Integrity Certification.
* Investigator Approval Signature.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| --- | --- | --- |
| **AI Model** | **Google Gemini 3 Preview** | The brain. Handles video, audio, and text analysis simultaneously. |
| **Frontend** | React + Vite + Tailwind | High-performance dashboard with "CSI-style" dark mode UI. |
| **Backend** | Node.js + Express | Handles file uploads, hashing, and API orchestration. |
| **Storage** | Multer (Temp) | Secure, ephemeral storage for processing (Privacy focused). |
| **Export** | jsPDF | Client-side PDF generation for legal reports. |

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+)
* Google Gemini API Key

### 1. Clone the Repo

```bash
git clone https://github.com/happi-web/EchoTrace.git
cd EchoTrace

```

### 2. Setup Backend

```bash
cd backend
npm install
# Create a .env file and add your key:
# GEMINI_API_KEY=your_google_api_key_here
npm run dev

```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev

```

### 4. Run the Demo

Open `http://localhost:5173` in your browser.

---

## 📸 Screenshots

### 1. The Investigation Dashboard

*Real-time timeline reconstruction and contradiction alerting.*

### 2. The "Map of Deception"

*Geospatial analysis proving "Impossible Travel" scenarios.*

---

## 🔮 Future Roadmap

* **Live Drone Feed Integration:** Analyze real-time video streams for missing persons.
* **Blockchain Integration:** Move the Chain of Custody log to a public blockchain (Ethereum/Solana) for absolute immutability.
* **Collaborative Mode:** Allow multiple detectives to work on the same case file remotely.

---

## ⚖️ Disclaimer

*EchoTrace is a tool for investigative assistance, not a replacement for human judgment. All AI findings must be verified by a qualified investigator before legal submission.*

---

**Built with ❤️ for Justice.**