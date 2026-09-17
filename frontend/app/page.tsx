'use client';

import { useEffect, useState } from 'react';

type BackendStatus = {
  status?: string;
  version?: string;
};

export default function Home() {
  const [status, setStatus] = useState<BackendStatus>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBackendStatus() {
      try {
        const healthResponse = await fetch('/api/health');
        const versionResponse = await fetch('/api/version');

        if (!healthResponse.ok || !versionResponse.ok) {
          throw new Error('Backend request failed');
        }

        const health = await healthResponse.json();
        const version = await versionResponse.json();

        setStatus({
          status: health.status,
          version: version.version,
        });
      } catch {
        setError('Backend unavailable');
      }
    }

    loadBackendStatus();
  }, []);

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>AHOP Shop</h1>

      <p>Frontend is running.</p>

      {error ? (
        <p>Backend: {error}</p>
      ) : (
        <>
          <p>Backend status: {status.status ?? 'loading...'}</p>
          <p>Application version: {status.version ?? 'loading...'}</p>
        </>
      )}
    </main>
  );
}