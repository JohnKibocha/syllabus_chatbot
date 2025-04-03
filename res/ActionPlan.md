## ✅ **Phase 1: Requirements & Planning**

### 🔧 What to Do:

- Define detailed functionality.
- Identify roles (professor, student).
- Decide tech stack.
- Plan tasks and timelines.

### 📚 How:

- Use **Microsoft Project** to make Gantt charts.
- Use **StarUML** or **Rational Rose** to draw:
  - Use Case Diagram
  - Class Diagram
  - Sequence Diagram
- Define login logic for professors only.

### 🧩 Correct Implementation Example:

- A professor logs in, uploads `CS101.pdf`, adds metadata:
  - Department: CSE
  - Course No: 101
  - Name: Intro to Programming
- Student accesses “CSE 101” → Asks: “When are office hours?”

### 📦 Deliverables:

- Project plan file (`.mpp`)
- Use Case, Class, Sequence diagrams
- Detailed feature specs (PDF or DOCX)

------

## ✅ **Phase 2: Backend & API Development**

### 🔧 What to Do:

- Build API that interacts with the in-house LLM.
- Parse and store syllabus content for retrieval.
- Handle login, file uploads, and metadata.

### 📚 How:

- Use **Python (Flask/FastAPI)** or **Node.js**.

- Store files and metadata in **SQL/NoSQL** DB.

- Create API endpoints like:

  - `POST /upload`
  - `GET /syllabus`
  - `POST /query`

- Extend provided API sample to include:

  ```json
  {
    "prompt": "What is the grading policy?",
    "course_id": "CSE101",
    "max_tokens": 512
  }
  ```

### 🧩 Correct Implementation Example:

- API receives a prompt → searches relevant syllabus section → sends to LLM → returns answer:
   “Grading is 40% midterms, 30% project, 30% final.”

### 📦 Deliverables:

- Working API code (well-commented)
- README with setup instructions
- Sample API calls with results
- Unit tests (e.g., with **Pytest**, **Postman tests**)

------

## ✅ **Phase 3: Frontend & UX**

### 🔧 What to Do:

- Build web interface for:
  - Professors (login + upload)
  - Students (search + ask)
- Design clean and simple navigation.

### 📚 How:

- Use **HTML/CSS/JavaScript**, or **React/Vue** for SPA.
- AJAX or Fetch for API communication.
- Ensure:
  - No login required for students
  - Professors can only upload after login
  - Query field is intuitive

### 🧩 Correct Implementation Example:

- Student lands on site → dropdown selects “CSE 101” → text field:
   *“What’s the textbook?”* → gets LLM-based answer.

### 📦 Deliverables:

- Frontend code
- Screenshots of all views (professor upload, student query)
- Live demo link or screencast (if required)

------

## ✅ **Phase 4: RAG Integration & Optimization**

### 🔧 What to Do:

- Implement RAG:
  - Retrieve best-matching syllabus chunk
  - Feed to LLM
  - Return response
- Add search optimization

### 📚 How:

- Vector DB (e.g., **FAISS**, **Chroma**) or custom chunk search
- Use metadata filtering (department, course no.)
- Optimize chunking (e.g., by headings or paragraphs)

### 🧩 Correct Implementation Example:

- User asks: *“When is the drop deadline?”* → system retrieves relevant line from syllabus → sends to LLM → returns correct deadline.

### 📦 Deliverables:

- RAG pipeline code
- Documented chunking and search logic
- Accuracy benchmarks (if possible)

------

## ✅ **Phase 5: Testing & Deployment**

### 🔧 What to Do:

- Unit and integration testing
- Finalize access control and privacy
- Deploy the system

### 📚 How:

- Use **Pytest/JUnit** for logic testing
- Validate:
  - Only profs can upload
  - Students get consistent responses
- Deploy with **Heroku**, **Render**, or local demo

### 🧩 Correct Implementation Example:

- Attempting upload without login shows “Unauthorized.”
- Invalid course selection gives “No syllabus found.”

### 📦 Deliverables:

- Full test suite
- Deployment link or .zip with deployment instructions
- Final project report (with screenshots, architecture, lessons)

