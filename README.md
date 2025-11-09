# ⚖️ AI-Powered Legal Document Summarizer for Indian Law

## 🧠 Project Overview

This project is an **AI-based Legal Document Summarization System** designed specifically for **Indian legal judgments and case documents**.  
It performs **extractive and abstractive summarization**, **IPC clause & section detection**, and provides **AI-based legal suggestions** like law title, punishment, and offense type.

The system helps **judges, lawyers, and law students** to quickly understand lengthy case documents and identify relevant IPC sections.

---

## 🚀 Key Features

✅ **Upload Legal PDFs** – Upload Indian legal judgments or case documents in PDF format.  
✅ **Text Extraction** – Automatically extract text using `pdf-parse`.  
✅ **IPC Section Detection** – Detect Indian Penal Code (IPC) sections with detailed descriptions (law, punishment, and offense type).  
✅ **Extractive Summarization** – Generates concise summaries highlighting the most important sentences.  
✅ **Abstractive Summarization** – Rewrites the content in natural, human-like summarized language.  
✅ **Legal Suggestions** – Provides context-aware legal insights for detected IPC sections.  
✅ **Evaluation Metrics** – Evaluated using ROUGE, BERTScore, and SummaC consistency metrics.  
✅ **Frontend Integration (Next.js)** – Intuitive UI to upload files and display summaries.  
✅ **Backend (Node.js + FastAPI)** – Handles PDF extraction, summarization, and IPC logic.  

---

## 🏗️ System Architecture

```

📂 CaseCut-AI
│
├── 📁 backend/
│   ├── server.js                 # Express server (handles upload, IPC detection, responses)
│   ├── routes/
│   │   └── summarizerRoutes.js   # API routes for summarization
│   ├── controllers/
│   │   └── summarizerController.js
│   ├── models/
│   │   └── ipcrules.json         # Contains IPC sections, titles, punishments
│   ├── uploads/                  # Temporary PDF storage
│   └── package.json
│
├── 📁 frontend/
│   ├── components/
│   │   └── LegalSummarizer.jsx   # UI for upload + displaying summaries
│   ├── pages/
│   │   └── index.js              # Entry page
│   ├── styles/
│   └── package.json
│
├── 📁 models/
│   ├── fine_tuned_t5_summarizer/      # T5 model folder (extractive/abstractive)
│   ├── fine_tuned_bart_summarizer/    # BART model
│   ├── fine_tuned_pegasus_summarizer/ # Pegasus model
│   ├── sbert_legal/                   # SBERT embedding model
│
├── 📁 dataset/
│   ├── train.csv
│   ├── test.csv
│   ├── validation.csv
│   └── raw_pdfs/
│
├── requirements.txt
├── README.md
└── research_paper_draft.pdf

```

---

## 🧩 Technologies Used

### **Frontend**
- 🖥️ Next.js / React  
- ⚡ Tailwind CSS  
- 📦 Axios for API communication  

### **Backend**
- 🧩 Node.js (Express) for IPC + PDF handling  
- 🐍 FastAPI (Python) for ML model inference  
- 🗃️ pdf-parse for text extraction  
- ⚙️ RESTful API for communication  

### **AI / NLP Models**
- 🧠 T5 (Text-to-Text Transfer Transformer)  
- 🧠 BART (Bidirectional Auto-Regressive Transformer)  
- 🧠 Pegasus (Pre-trained for summarization tasks)  
- 🔍 SBERT (Sentence-BERT) for semantic similarity  
- 🧾 ROUGE, BERTScore, SummaC for evaluation  

---

## 🗂️ Dataset

You can use:
- **Indian Kanoon** judgments dataset (scraped)
- **Manually labeled 100+ PDFs** for custom summarization
- **CSV format:**
```



````

> 📘 Tip: Each row represents one legal case document with reference summaries.

---

## ⚙️ Installation Steps

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/CaseCut-AI.git
cd CaseCut-AI
````

### 2️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ Python Model Server (FastAPI)

```bash
cd models
pip install -r ../requirements.txt
uvicorn app:app --reload
```

---

## 🧮 Evaluation

The summarization models are evaluated using:

| Metric                | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| **ROUGE-1 / ROUGE-L** | Measures lexical overlap between generated and reference summaries |
| **BERTScore**         | Evaluates semantic similarity using contextual embeddings          |
| **SummaC**            | Checks factual consistency of generated summaries                  |

Example evaluation command:

```bash
python evaluate_t5.ipynb
```

---

## 📜 Example Output

**Input PDF:** *State vs Ram Kumar (IPC 302, 307)*

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

> The accused, Ram Kumar, was charged under IPC 302 and 307 for causing fatal injuries...

**Abstractive Summary:**

> Ram Kumar was found guilty of murder and attempted murder, facing life imprisonment under IPC 302 and 307.

---

## 📊 Research Paper Scope

### Title:

**“A Comparative Study of Summarization Techniques for Indian Legal Documents”**

### Key Sections:

* Abstract
* Introduction to Legal NLP
* Dataset Collection
* Extractive vs. Abstractive Techniques
* Model Training & Evaluation
* Results & Comparative Analysis
* Conclusion & Future Work

---

## 🧠 Future Enhancements

* ✅ Add multilingual (Hindi/English) summarization
* ✅ Integrate judgment prediction using classification
* ✅ Build case-law recommendation system
* ✅ Deploy full-stack app on AWS / Render

---

## 👨‍💻 Contributors

| Name                     | Role                 | Work                                |
| ------------------------ | -------------------- | ----------------------------------- |
| **Yug Thummar**          | ML Engineer          | Dataset, model training, evaluation |
| **Dhwani Navadia**       | Full Stack Developer | Backend + Frontend Integration      |

---

## 📄 License

This project is licensed under the **MIT License** — you are free to use, modify, and distribute with attribution.

---

## 🏁 Acknowledgments

* Hugging Face Transformers
* Indian Kanoon for public legal data
* ROUGE, BERTScore, and SummaC authors for open evaluation tools

---

> 💬 *"Bringing AI to Indian Judiciary — simplifying justice through automation."*
