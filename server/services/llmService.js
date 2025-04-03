// server/services/llmService.js
const axios = require('axios');
require('dotenv').config();

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'; // you can also use gemini-2.0-pro
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function queryGemini(prompt) {
    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: prompt }]
                    }
                ]
            },
            {
                timeout: 10000 // ⏱ 10 seconds timeout
            }
        );

        const candidates = response.data?.candidates;
        const reply = candidates?.[0]?.content?.parts?.[0]?.text || 'No answer generated.';
        return reply;

    } catch (err) {
        console.error('Gemini LLM error:', err.message);
        return '⚠️ Gemini API failed to respond.';
    }
}

module.exports = { queryGemini };
