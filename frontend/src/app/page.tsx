"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.status));
  }, []);

  return (
    <main>
      <h1>Interview Feedback Quality Assessor</h1>
      <p>Backend Status: {status}</p>
    </main>
  );
}