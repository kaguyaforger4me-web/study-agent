export default function Page() {
  return (
    <main style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "black",
      color: "white"
    }}>
      
      <h1 style={{
        fontSize: "64px",
        fontWeight: "bold",
        background: "linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)",
        WebkitBackgroundClip: "text",
        color: "transparent"
      }}>
        Study Agent
      </h1>

      <input 
        placeholder="Ask anything..."
        style={{
          marginTop: "30px",
          width: "500px",
          padding: "15px 20px",
          borderRadius: "30px",
          border: "1px solid #333",
          background: "#111",
          color: "white",
          fontSize: "16px",
          outline: "none",
          boxShadow: "0 0 10px rgba(66,133,244,0.3)"
        }}
      />

    </main>
  );
}
