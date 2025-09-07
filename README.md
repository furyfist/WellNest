# WellNest

**AI-Powered Mental Health Support for Students**

WellNest connects students who need help with those who can provide it, creating a safe space for mental health support without judgment.

## The Problem

Every day, 18 students in India take their own lives. That's 13,000 young minds lost every year according to the 2022 National Crime Records Bureau. Traditional support systems fail students due to stigma, long wait times, and limited availability. Generic AI chatbots make things worse by giving unvetted, potentially harmful advice pulled from random internet sources.

Students need immediate, safe, and reliable first-line support. That's what WellNest provides.

## What WellNest Does

WellNest is built around two simple paths: **get help** or **help others**.

**For students needing support:**
- Anonymous peer-to-peer matching with students who understand your struggles
- Join support groups without the toxicity of social media
- Book appointments with licensed counselors
- Chat with WellChat, our safety-first AI assistant

**For students wanting to help:**
- Become a peer supporter (after manual review)
- Join one-on-one support sessions
- Participate in group discussions

**For institutions:**
- Admin dashboard to track campus mental health trends
- Early warning systems for at-risk students
- Tools to provide proactive support at scale

## The Tech Behind WellNest

### WellChat: Not Your Average Chatbot

WellChat runs on a custom RAG (Retrieval-Augmented Generation) pipeline. Here's what makes it different:

**Custom Dataset:** I manually curated data from 109 websites, organized it into 4 problem areas, and structured everything in Q&A format. This makes vector searches faster and more accurate.

**No Hallucinations:** If WellChat doesn't have data for your question, it won't make something up. No random internet advice, no potentially dangerous suggestions.

**Circuit Breaker System:** When someone shows signs of being at high risk, WellChat immediately connects them with campus authorities or support teams. Fully automated, fully anonymous.

**Mobile-First:** Works on any phone because that's how students actually access help.

### Technical Architecture

```cpp
// Simplified data flow
User Query -> Vector Search -> Retrieve Curated Data -> Generate Safe Response
```

**Backend:**
- FastAPI for the REST API
- FAISS for vector similarity search
- Google Gemini for text generation
- Custom ingestion pipeline for PDF processing

**Frontend:**
- React with TypeScript
- Tailwind CSS for styling
- Real-time chat interface

**Data Processing:**
- 4 PDFs (24 pages) processed into 94 text chunks
- all-MiniLM-L6-v2 for embeddings
- Q&A format for optimal retrieval

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js and npm
- Google Gemini API key

### Backend Setup

1. **Create virtual environment:**
```bash
python -m venv backend/venv
# Windows
backend/venv/Scripts/activate
# macOS/Linux
source backend/venv/bin/activate
```

2. **Install dependencies:**
```bash
pip install -r backend/requirements.txt
```

3. **Add your API key:**
Create `backend/.env`:
```
GEMINI_API_KEY="your_api_key_here"
```

4. **Build the knowledge base:**
```bash
python -m backend.scripts.ingest_data
```

5. **Start the server:**
```bash
python -m uvicorn backend.main:app --reload
```

Backend runs at `http://127.0.0.1:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

## How It Works

1. **Data Ingestion:** Custom PDFs are processed and converted to vectors
2. **Query Processing:** User questions are matched against the knowledge base
3. **Safe Generation:** Only curated information is used to generate responses
4. **Crisis Detection:** High-risk queries trigger immediate intervention protocols

## Revenue Model

**What stays free:** All peer support features remain completely free.

**What generates revenue:**
- Service fees from professional counselor bookings
- Institutional licenses for colleges (admin dashboards, analytics, early warning systems)

The more we earn, the more students we can help for free.

## Challenges Solved

**Data Quality:** Public mental health data was unreliable and potentially harmful. Solution: built a custom dataset from scratch using vetted sources.

**AI Safety:** Standard chatbots can give dangerous advice. Solution: RAG architecture ensures responses come only from approved content.

**Accessibility:** Help needs to be available 24/7 on any device. Solution: mobile-first design that works on any phone.

**Scale:** Traditional counseling doesn't scale. Solution: peer support network + institutional tools for early intervention.

## Future Plans

- User accounts with anonymous chat history
- Expanded knowledge base with more vetted resources
- Direct integration with campus counseling services
- Fine-tuned open-source model to reduce API dependency

## Why This Matters

Sometimes saving a life doesn't need a superhero. It just needs someone who cares, and technology that connects them safely.

10 years ago, Rancho said "there is no machine to measure mental pressure." Today, WellNest is the first step in that direction.

---

*Built with the belief that mental health support shouldn't have barriers, stigma, or price tags when you need it most.*