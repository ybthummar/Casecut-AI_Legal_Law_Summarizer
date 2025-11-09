# ⚖️ CaseCut-AI: AI-Powered Legal Document Summarizer for Indian Law

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.11%2B-blue)]()
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-black)]()
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)]()
[![NLP](https://img.shields.io/badge/AI-Legal%20Summarization-orange)]()

---

## 🧠 Overview

**CaseCut-AI** is an **AI-driven legal document summarization system** designed for Indian court judgments.  
It performs:
- 📘 **Extractive Summarization**
- 📙 **Abstractive Summarization**
- ⚖️ **IPC Section Detection**
- 🤖 **Question Answering**
- 💬 **Hybrid Summarization (Merged Results)**

The system helps law students, judges, and researchers to **quickly understand lengthy legal cases** by generating human-readable summaries and identifying relevant **Indian Penal Code (IPC)** sections automatically.

---

## 🏗️ System Architecture

```

📂 CaseCut-AI_Legal_Law_Summarizer
│
├── client/                        # Next.js Frontend (UI for file upload & results)
│   ├── app/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── package.json
│
├── server/                        # Node.js Backend (API layer)
│   ├── server.js
│   ├── services/
│   │   ├── extractiveSummary.js
│   │   ├── abstractiveSummarizer.js
│   │   ├── detectIPCSections.js
│   │   ├── hybridSummarizer.js
│   │   ├── chunkProcessor.js
│   │   └── questionAnswering.js
│   └── package.json
│
├── python_scripts/                # ML Inference Scripts (Transformers)
│   ├── t5_summarizer.py
│   ├── bart_summarizer.py
│   ├── pegasus_summarizer.py
│   ├── led_summarizer.py
│   └── requirements.txt
│
├── Model/                         # Local Model Checkpoints
│   ├── fine_tuned_t5_summarizer/
│   ├── fine_tuned_bart_summarizer/
│   ├── fine_tuned_pegasus_summarizer/
│   ├── legal_sbert_summary_model/
│   └── LED/
│
├── dataset/                       # Legal Datasets
│   ├── IN-Abs/                    # Abstractive Summarization Dataset
│   │   ├── train-data/
│   │   │   ├── judgement/
│   │   │   ├── summary/
│   │   │   └── stats-IN-train.txt
│   │   ├── test-data/
│   │   │   ├── judgement/
│   │   │   ├── summary/
│   │   │   └── stats-IN-test.txt
│   │   └── README.txt
│   │
│   ├── IN-Ext/                    # Extractive Summarization Dataset
│   │   ├── judgement/
│   │   ├── summary/
│   │   │   ├── full/
│   │   │   │   ├── A1/
│   │   │   │   └── A2/
│   │   │   ├── segment-wise/
│   │   │   │   ├── A1/
│   │   │   │   └── A2/
│   │   └── IN-EXT-length.txt
│
├── utils/
│   ├── extractPdfText.js
│   ├── simpleOCR.js
│   ├── logger.js
│   └── ipcrules.json
│
├── evaluation/
│   ├── evaluate_t5.ipynb
│   ├── evaluate_bart.ipynb
│   ├── evaluate_pegasus.ipynb
│   └── metrics_report.csv
│
├── tests/
│   └── api.test.js
│
├── api-spec.yaml
├── LICENSE
└── README.md

```

---

## 🧩 Dataset Description

### 🟣 IN-Abs — *Abstractive Summarization Dataset*
- **Source:** [Liiofindia.org (INSC Cases)](http://www.liiofindia.org/in/cases/cen/INSC/)
- **Size:** 7,130 (document, summary) pairs  
  - 7,030 → Training  
  - 100 → Testing  
- **Structure:**
```

IN-Abs/
├── train-data/
│   ├── judgement/
│   ├── summary/
│   └── stats-IN-train.txt
├── test-data/
│   ├── judgement/
│   ├── summary/
│   └── stats-IN-test.txt

```

Each summary is a **human-written abstractive summary** emphasizing **clarity, coherence, and factual correctness.**

---

### 🟢 IN-Ext — *Extractive Summarization Dataset*
- Contains 50 Indian Supreme Court case documents  
- Each summarized by **two law experts (A1, A2)**  
- Two summary types:  
- **Full:** Continuous, coherent summary  
- **Segment-wise:** Divided into `facts`, `arguments`, `analysis`, `judgment`, `statute`

**Structure:**
```

IN-Ext/
├── judgement/
├── summary/
│   ├── full/
│   │   ├── A1/
│   │   └── A2/
│   ├── segment-wise/
│   │   ├── A1/
│   │   └── A2/
└── IN-EXT-length.txt

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/CaseCut-AI.git
cd CaseCut-AI
````

### 2️⃣ Backend Setup

```bash
cd server
npm install
node server.js
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

### 4️⃣ Python Model Environment

```bash
cd python_scripts
pip install -r requirements.txt
uvicorn app:app --reload
```

---

## 🧮 Evaluation Metrics

| Metric                | Description                                             |
| --------------------- | ------------------------------------------------------- |
| **ROUGE-1 / ROUGE-L** | Measures lexical overlap with human summaries           |
| **BERTScore**         | Semantic similarity using contextual embeddings         |
| **SummaC**            | Checks factual consistency between summary and document |

Run:

```bash
python evaluate_t5.ipynb
```

---

## 📊 Example Output

**Input:** `State vs Ram Kumar (IPC 302, 307)`

**Detected IPCs:**

```json
[
  {
    "section": "302",
    "title": "Punishment for Murder",
    "punishment": "Death or life imprisonment and fine"
  },
  {
    "section": "307",
    "title": "Attempt to Murder",
    "punishment": "Imprisonment up to 10 years and fine"
  }
]
```

**Extractive Summary:**

> The accused, Ram Kumar, was charged under IPC 302 and 307 for causing fatal injuries to the victim...

**Abstractive Summary:**

> Ram Kumar was found guilty of murder and attempted murder under IPC 302 and 307, resulting in life imprisonment.

---

## 👩‍💻 Authors

| Name               | Role                         | Work                                         |
| ------------------ | ---------------------------- | -------------------------------------------- |
| **Yug Thummar**    | Student ML Engineer          | Dataset creation, model training, evaluation |
| **Dhwani Navadia** | Student Full Stack Developer | Backend + Frontend Integration, UI design    |

> 🎓 *This project was developed as part of an academic semester research under the theme “AI-Powered Legal Document Analysis.”*

---

## 🧠 Research Context

**Title:**
📄 *A Comparative Study of Summarization Techniques for Indian Legal Documents*

**Focus Areas:**

* Extractive vs Abstractive Summarization
* Legal Domain Adaptation of T5, BART, Pegasus, SBERT
* ROUGE & BERTScore Evaluation
* IPC Section Detection Automation

---

## 🔮 Future Scope

* Multilingual summarization (Hindi-English)
* Judgment prediction from summaries
* Case-law recommendation engine
* Model optimization for on-device inference

---

## 📜 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

> ⚖️ *“Simplifying Indian legal understanding through responsible AI.”*
