// api/gemini.js
// This file acts as a secure bridge to the Gemini API.
// It should be placed in the 'api' directory in your project root.

export default async function handler(request, response) {
  // We only accept POST requests to this endpoint.
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  // Retrieve the secret API key from Vercel's environment variables.
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return response.status(500).json({ error: 'API key is not configured on the server.' });
  }

  const { prompt } = request.body;

  if (!prompt) {
    return response.status(400).json({ error: 'Prompt is required.' });
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
  
  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  try {
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!apiResponse.ok) {
        const errorBody = await apiResponse.text();
        console.error('Gemini API Error:', errorBody);
        throw new Error(`Gemini API responded with status: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I could not generate a response.";
    
    // Send the generated text back to the frontend.
    return response.status(200).json({ text });

  } catch (error) {
    console.error('Internal Server Error:', error);
    return response.status(500).json({ error: error.message });
  }
}
