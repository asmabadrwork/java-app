"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testEndpoint = async (url: string, method: string = "GET", body?: any) => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(url, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      setResponse({ status: res.status, data });
    } catch (error: any) {
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>React Testing Dashboard</h1>
        <p className={styles.description}>Interact with multiple API endpoints designed for maximum testing capabilities.</p>
      </header>

      <section className={styles.content}>
        <div className={styles.controls}>
          <div className={styles.buttonGroup}>
            <h3>Users API</h3>
            <button className={styles.button} onClick={() => testEndpoint("/api/users")}>GET /api/users</button>
            <button className={styles.button} onClick={() => testEndpoint("/api/users", "POST", { name: "Test User" })}>POST /api/users</button>
            <button className={styles.button} onClick={() => testEndpoint("/api/users/1")}>GET /api/users/1</button>
            <button className={styles.button} onClick={() => testEndpoint("/api/users/1", "PUT", { name: "Updated User" })}>PUT /api/users/1</button>
            <button className={styles.button} onClick={() => testEndpoint("/api/users/1", "DELETE")}>DELETE /api/users/1</button>
          </div>
          <div className={styles.buttonGroup}>
            <h3>Utility API</h3>
            <button className={`${styles.button} ${styles.errorButton}`} onClick={() => testEndpoint("/api/error")}>GET /api/error (Simulate Error)</button>
            <button className={styles.button} onClick={() => testEndpoint("/api/delay")}>GET /api/delay (Simulate Delay)</button>
          </div>
        </div>

        <div className={styles.results}>
          <h2>Response output</h2>
          <div className={styles.terminal}>
            {loading ? (
              <span className={styles.loader}>Fetching data...</span>
            ) : response ? (
              <pre>{JSON.stringify(response, null, 2)}</pre>
            ) : (
              <span className={styles.placeholder}>Select an endpoint to see results here.</span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
