// app/debug-connection/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DebugPage() {
  const graphqlUrl = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "NOT_SET";
  const apiUrl = graphqlUrl.replace('/graphql', '');

  let status = "Testing...";
  let dataPreview = null;
  let error = null;

  try {
    console.log("--> DebugPage Executing...");
    console.log("--> Fetching:", graphqlUrl);
    
    // We add a 5-second timeout so it DOES NOT hang forever
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log("--> Aborting fetch manually...");
      controller.abort();
    }, 5000);

    console.log("--> Initiating fetch...");
    const res = await fetch(graphqlUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "{ posts(first: 1) { nodes { title } } }",
      }),
      signal: controller.signal,
      cache: 'no-store' // Don't use cache for this test
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      status = "✅ Connection Successful!";
      dataPreview = await res.json();
    } else {
      status = `❌ Server responded with status: ${res.status}`;
    }
  } catch (e: any) {
    status = "❌ Connection Failed";
    error = e.message === "The user aborted a request." 
            ? "Request Timed Out (The server didn't answer in 5s)" 
            : e.message;
  }

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Takamul Security Debugger</h1>
      <hr />
      <p><strong>API URL:</strong> {apiUrl}</p>
      <p><strong>Status:</strong> {status}</p>
      
      {error && (
        <div style={{ background: "#fee", padding: "10px", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {dataPreview && (
        <pre style={{ background: "#f4f4f4", padding: "10px" }}>
          {JSON.stringify(dataPreview, null, 2)}
        </pre>
      )}

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        Note: If this page also hangs, the problem is your local Node.js network resolution. 
        If this page shows an error but localhost:3000 hangs, the problem is in your Root Layout.
      </div>
    </div>
  );
}
