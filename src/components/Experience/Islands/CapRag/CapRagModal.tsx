import styles from './styles.module.css'

export const CapRagModal = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Climate Action Policy - RAG Application</h1>
          <p className={styles.subtitle}>
            Retrieval-augmented insights for climate policy questions with a Streamlit front-end.
          </p>
        </div>

        <div className={styles.links}>
          <a
            href="https://cap-rag.streamlit.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Live Demo
          </a>
          <a
            href="https://github.com/rahul-1415/CAP-RAG"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
        </div>
      </header>

      <section>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <p className={styles.text}>
          ClimateActionPolicy-RAG-Application supports climate action recommendations using a Retrieval-Augmented
          Generation pipeline. A retriever surfaces the most relevant policy documents while the Ollama LLaMA 3 model
          crafts responses enriched with that context. The Streamlit UI keeps the interaction focused, letting you
          explore insights, iterate on prompts, and manage conversations without leaving the browser.
        </p>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Features</h2>
        <ul className={styles.list}>
          <li>Streamlit interface for querying and visualizing responses in real time.</li>
          <li>Document retrieval with ChromaDB + HuggingFace embeddings for targeted context.</li>
          <li>Contextual response generation via Ollama LLaMA 3 models with RAG grounding.</li>
          <li>Multi-session chat history management to compare policy explorations.</li>
        </ul>
      </section>

      <section className={styles.grid}>
        <div>
          <h3 className={styles.sectionTitle}>Files</h3>
          <ul className={styles.list}>
            <li><strong>app.py</strong>: Streamlit app + UI wiring.</li>
            <li><strong>requirements.txt</strong>: Python dependencies.</li>
            <li><strong>generator.py</strong>: Response generation with Ollama LLaMA 3.</li>
            <li><strong>retriever.py</strong>: Document retrieval using Chroma + embeddings.</li>
          </ul>
        </div>
        <div>
          <h3 className={styles.sectionTitle}>Folders</h3>
          <ul className={styles.list}>
            <li><strong>Chroma</strong>: Vector database for retrieval.</li>
            <li><strong>components</strong>: Retrieval and generation modules.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Running the Application</h2>
        <ol className={styles.list}>
          <li>Clone: <code>git clone https://github.com/rahul-1415/CAP-RAG.git</code></li>
          <li><code>cd CAP-RAG</code></li>
          <li>Create a virtual env: <code>python3 -m venv venv</code> &amp; activate it.</li>
          <li>Install deps: <code>pip install -r requirements.txt</code></li>
          <li>Start: <code>streamlit run app.py</code> then open <code>http://localhost:8501</code>.</li>
        </ol>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Groq API Setup</h2>
        <ul className={styles.list}>
          <li>Set <code>GROQ_API_KEY</code> (required) and optionally <code>GROQ_API_BASE_URL</code>.</li>
          <li>Control context size with <code>MAX_CONTEXT_CHARS</code> (default 15000).</li>
          <li>Pick between <code>llama-3.3-70b-versatile</code> (default) or <code>llama-3.1-8b-instant</code>.</li>
        </ul>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Dependencies</h2>
        <p className={styles.text}>
          streamlit, langchain, langchain_community, chromadb, transformers, torch, pandas, langchain_chroma,
          sentence_transformers
        </p>
      </section>
    </section>
  )
}
