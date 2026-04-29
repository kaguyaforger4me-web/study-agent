export async function POST(req) {
  try {
    const { input } = await req.json();

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an elite AI study coach.

Create a highly effective study plan for: ${input}

Rules:
- Break into focused time blocks (25–60 min)
- Include smart breaks
- Start easy → increase difficulty
- Include active recall + revision
- Make it feel motivating
- Keep each task short and actionable
- Return ONLY bullet points (one per line)

Make it feel like a top student’s strategy.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // Handle API errors cleanly
    if (data.error) {
      console.error("GEMINI ERROR:", data.error);
      return Response.json({ plan: "⚠️ AI Error — check API key / model" });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    return Response.json({ plan: text });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return Response.json({ plan: "⚠️ Server error" });
  }
}