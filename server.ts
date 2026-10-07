import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  // Support image base64 uploads up to 25MB for video animation
  app.use(express.json({ limit: '25mb' }));

  // Initialize Gemini if key exists
  const apiKey = process.env.GEMINI_API_KEY;
  let aiClient: GoogleGenAI | null = null;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      aiClient = new GoogleGenAI({ apiKey });
    } catch (err) {
      console.warn('Gemini client initialization error:', err);
    }
  }

  // API endpoint for WanderAI Chat
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, context, history } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (aiClient) {
        try {
          const systemInstruction = `You are WanderAI, an ultra-luxury, discerning, and knowledgeable digital travel companion for "TRAVEL REIMAGINED".
You specialize in bespoke, cinematic, and sustainable journeys across the globe (e.g., Iceland, Swiss Alps, Kyoto, Patagonia, Bali, Santorini, Sahara, New Zealand, Maldives, Norway, Cappadocia).
Current user page context: ${context ? JSON.stringify(context) : 'General exploration'}.
Provide inspiring, highly practical, and elegant recommendations. Use bullet points or concise paragraphs. Be warm, adventurous, and culturally respectful. Keep answers focused (under 180 words unless the user explicitly requests a full itinerary).`;

          const response = await aiClient.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }],
              },
            ],
          });

          const replyText = response.text?.trim() || 'I am ready to help you plan your next journey.';
          return res.json({ reply: replyText, source: 'gemini' });
        } catch (apiErr) {
          console.warn('Gemini generateContent error, falling back to local reasoning:', apiErr);
        }
      }

      // Contextual local travel reasoning fallback
      const lower = message.toLowerCase();
      let reply = '';

      if (context?.destination && (lower.includes('here') || lower.includes('this place') || lower.includes('winter') || lower.includes('visit') || lower.includes('season'))) {
        const dest = context.destination;
        reply = `For **${dest.name}, ${dest.country}**:\n` +
          `• **Best Season**: ${dest.bestSeason || 'Spring to Autumn'}\n` +
          `• **Signature Experience**: ${dest.shortDescription || 'Immersive nature and local culture'}\n` +
          `• **Insider Tip**: Visit early in the morning for serene views and pack layered technical outerwear.`;
      } else if (lower.includes('varanasi') || lower.includes('ganges') || lower.includes('kashi') || lower.includes('india') || lower.includes('pilgrimage')) {
        reply = `**Varanasi & Sacred India Pilgrimage Highlights**:\n` +
          `• **Dawn Ganges Boat Pilgrimage**: Glide past historic 84 stone ghats at 5:30 AM as Sanskrit chants echo across the water.\n` +
          `• **Maha Ganga Aarti**: Attend the twilight fire offering at Dashashwamedh Ghat with multi-tiered brass oil lamps.\n` +
          `• **Sarnath Sacred Deer Park**: The revered UNESCO sanctuary where the Buddha first turned the Wheel of Dharma.\n` +
          `• **Spiritual Advice**: Dress respectfully covering shoulders and knees; hire a certified heritage guide for ancient silk alleys.`;
      } else if (lower.includes('bhutan') || lower.includes('tiger') || lower.includes('nest')) {
        reply = `**Bhutan & Tiger's Nest Expedition**:\n` +
          `• **Paro Taktsang**: Perched 900 meters up sheer granite cliffs in the Himalayas, reached via scenic pine trails.\n` +
          `• **Sacred Culture**: Experience Gross National Happiness, fortress dzongs, and traditional herbal hot stone baths.\n` +
          `• **Best Season**: March–May for blooming rhododendrons, or October–November for crystalline Himalayan skies.`;
      } else if (lower.includes('angkor') || lower.includes('cambodia')) {
        reply = `**Angkor Wat Sacred Sanctuary**:\n` +
          `• **Sunrise Reflection**: Gaze at the five sandstone lotus towers reflecting in the lily ponds at first light.\n` +
          `• **Hidden Temples**: Explore Ta Prohm's colossal tree roots and Bayon's 216 enigmatic smiling faces.\n` +
          `• **Blessings**: Arrange a private dawn water blessing with Theravada monks in an ancient forest pagoda.`;
      } else if (lower.includes('ladakh') || lower.includes('himalaya')) {
        reply = `**Ladakh High-Himalayan Odyssey**:\n` +
          `• **Monasteries**: Attend dawn prayer chants and dungchen long horn music at Thiksey and Hemis gompas.\n` +
          `• **Pangong Tso**: Crystalline turquoise lake situated at 14,270 ft elevation.\n` +
          `• **Acclimatization**: Spend 48 hours resting in Leh before crossing high motorable passes like Khardung La.`;
      } else if (lower.includes('iceland') || lower.includes('northern light')) {
        reply = `**Iceland Expedition Highlights**:\n` +
          `• **Aurora Season**: Mid-September to early April under dark, clear skies.\n` +
          `• **Key Stops**: Reykjavik, Golden Circle, Diamond Beach, and the glacial lagoons of Vatnajökull.\n` +
          `• **Travel Tip**: Rent a 4x4 if touring the Ring Road in shoulder months, and reserve geothermal baths well in advance.`;
      } else if (lower.includes('japan') || lower.includes('kyoto') || lower.includes('5-day') || lower.includes('5 day')) {
        reply = `**Curated 5-Day Japan Itinerary**:\n` +
          `• **Day 1**: Tokyo arrival, Shibuya twilight crossing & Omotesando evening.\n` +
          `• **Day 2**: Shinkansen bullet train to Kyoto; Arashiyama Bamboo Grove at dawn.\n` +
          `• **Day 3**: Fushimi Inari shrine walk, Gion historic tea houses & Kaiseki dinner.\n` +
          `• **Day 4**: Nara deer park & ancient Todai-ji temple, evening in Osaka Dotonbori.\n` +
          `• **Day 5**: Return to Tokyo; traditional Hamarikyu gardens & departure.`;
      } else if (lower.includes('pack') || lower.includes('packing')) {
        reply = `**Essential Expedition Packing Guide**:\n` +
          `• **Apparel**: High-grade merino wool base layers, windproof/waterproof shell, sturdy vibram-sole hiking boots.\n` +
          `• **Tech**: Universal plug adapter, 20,000mAh external power bank, polarized camera lens filters.\n` +
          `• **Wellness**: Electrolytes, biodegradable sunscreen, and a lightweight dry bag for water excursions.`;
      } else if (lower.includes('budget') || lower.includes('cost')) {
        reply = `**Intelligent Budget Strategies**:\n` +
          `• Travel in shoulder seasons (May & October) for 35–45% savings on boutique lodges.\n` +
          `• Combine regional rail passes (like the Swiss Travel Pass or JR Pass) to eliminate point-to-point transit markups.\n` +
          `• Balance self-guided scenic trail hikes with 1–2 bucket-list private guided adventures.`;
      } else if (lower.includes('romantic') || lower.includes('italy')) {
        reply = `**Enchanting Italian Escape**:\n` +
          `• **Amalfi & Capri**: Private sunset wooden gozzo boat charter along the Faraglioni cliffs.\n` +
          `• **Tuscany**: Hilltop vineyard stay near Val d'Orcia with olive oil and Brunello tastings.\n` +
          `• **Lake Como**: Villa Balbianello gardens and candlelit lakeside dining in Bellagio.`;
      } else {
        reply = `Welcome to **Travel Reimagined**! I can help you craft custom multi-day itineraries, recommend hidden seasonal gems, suggest gear checklists, or analyze destinations based on your travel style. Where is your curiosity leading you today?`;
      }

      return res.json({ reply, source: 'curated' });
    } catch (err: any) {
      console.error('Server error in /api/chat:', err);
      return res.status(500).json({ error: 'Internal travel intelligence error' });
    }
  });

  // Veo Video Generation: 1. Start generation (veo-3.1-fast-generate-preview)
  app.post('/api/generate-video', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg', prompt, aspectRatio = '16:9' } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'Image is required to animate into video' });
      }

      // Strip data:image/...;base64, prefix if present
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

      if (aiClient) {
        try {
          const operation = await aiClient.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt || 'Cinematic living travel landscape, slow fluid motion, atmospheric lighting, seamless 4k loop',
            image: {
              imageBytes: cleanBase64,
              mimeType: mimeType || 'image/jpeg',
            },
            config: {
              numberOfVideos: 1,
              aspectRatio: aspectRatio === '9:16' ? '9:16' : '16:9',
              resolution: '720p',
            },
          });
          return res.json({ operationName: operation.name });
        } catch (genErr: any) {
          console.warn('Veo generateVideos API error:', genErr?.message || genErr);
        }
      }

      // Fallback simulated operation if API key is not provisioned or during development
      const mockOpName = `models/veo-3.1-fast-generate-preview/operations/mock-${Date.now()}`;
      return res.json({ operationName: mockOpName, simulated: true });
    } catch (err: any) {
      console.error('Error in /api/generate-video:', err);
      return res.status(500).json({ error: 'Failed to initiate video generation' });
    }
  });

  // Veo Video Generation: 2. Check operation status
  app.post('/api/video-status', async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: 'Operation name is required' });
      }

      if (operationName.includes('mock-')) {
        const timestamp = parseInt(operationName.split('mock-')[1] || '0', 10);
        // Simulates realistic progress, completes after 4 seconds
        const isDone = Date.now() - timestamp > 4000;
        return res.json({ done: isDone });
      }

      if (aiClient) {
        const op = new GenerateVideosOperation();
        op.name = operationName;
        const updated = await aiClient.operations.getVideosOperation({ operation: op });
        return res.json({ done: updated.done, error: updated.error });
      }

      return res.json({ done: true });
    } catch (err: any) {
      console.error('Error in /api/video-status:', err);
      return res.status(500).json({ error: 'Failed to check video status' });
    }
  });

  // Veo Video Generation: 3. Download/Stream video
  app.post('/api/video-download', async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: 'Operation name is required' });
      }

      if (aiClient && !operationName.includes('mock-')) {
        const op = new GenerateVideosOperation();
        op.name = operationName;
        const updated = await aiClient.operations.getVideosOperation({ operation: op });
        const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
        if (uri) {
          const videoRes = await fetch(uri, {
            headers: { 'x-goog-api-key': apiKey! },
          });
          res.setHeader('Content-Type', 'video/mp4');
          return videoRes.body!.pipeTo(
            new WritableStream({
              write(chunk) {
                res.write(chunk);
              },
              close() {
                res.end();
              },
            })
          );
        }
      }

      return res.status(404).json({ error: 'Video not ready or URI unavailable' });
    } catch (err: any) {
      console.error('Error in /api/video-download:', err);
      return res.status(500).json({ error: 'Failed to download video' });
    }
  });

  // Setup Vite development server middlewares
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TRAVEL REIMAGINED server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
