import styles from './styles.module.css'

export const CapRagModal = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Featured Build</p>
        <h1 className={styles.title}>Climate Action Policy RAG</h1>
        <p className={styles.subtitle}>
          Retrieval-augmented policy assistant for climate-action exploration, summarization, and decision support.
        </p>

        <div className={styles.links}>
          <a
            href='https://cap-rag.streamlit.app/'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.link}
          >
            Live Demo
          </a>
          <a
            href='https://github.com/rahul-1415/CAP-RAG'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.link}
          >
            GitHub
          </a>
        </div>
      </header>

      <article className={styles.card}>
        <h2 className={styles.sectionTitle}>System Overview</h2>
        <p className={styles.text}>
          CAP-RAG combines retrieval and generation to answer policy-oriented climate questions with grounded references.
          A Chroma-backed retriever fetches context, and LLaMA-family models synthesize concise responses through a
          Streamlit interface tuned for iterative exploration.
        </p>
      </article>

      <article className={styles.card}>
        <h2 className={styles.sectionTitle}>Core Capabilities</h2>
        <ul className={styles.list}>
          <li>Low-friction Streamlit interface for query + response loops.</li>
          <li>ChromaDB vector retrieval with HuggingFace embeddings.</li>
          <li>Context-grounded generation via LLaMA-class models.</li>
          <li>Multi-session workflows for comparing policy threads.</li>
        </ul>
      </article>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h3 className={styles.sectionTitle}>Structure</h3>
          <ul className={styles.list}>
            <li><strong>app.py:</strong> Streamlit user interface.</li>
            <li><strong>generator.py:</strong> Response assembly pipeline.</li>
            <li><strong>retriever.py:</strong> Vector search and context fetch.</li>
            <li><strong>Chroma/:</strong> Persisted vector data store.</li>
          </ul>
        </article>

        <article className={styles.card}>
          <h3 className={styles.sectionTitle}>Local Run</h3>
          <ol className={styles.list}>
            <li><code>git clone https://github.com/rahul-1415/CAP-RAG.git</code></li>
            <li><code>cd CAP-RAG</code></li>
            <li><code>python3 -m venv venv</code> and activate.</li>
            <li><code>pip install -r requirements.txt</code></li>
            <li><code>streamlit run app.py</code></li>
          </ol>
        </article>
      </section>

      <article className={styles.card}>
        <h2 className={styles.sectionTitle}>Environment Notes</h2>
        <ul className={styles.list}>
          <li><code>GROQ_API_KEY</code> is required for hosted inference access.</li>
          <li><code>GROQ_API_BASE_URL</code> can be set for custom endpoint routing.</li>
          <li><code>MAX_CONTEXT_CHARS</code> defaults to 15000 for prompt context size.</li>
          <li>Supported model profiles include 70B and 8B LLaMA variants.</li>
        </ul>
      </article>
    </section>
  )
}
