import React, { useState, useEffect, useRef } from 'react';
import { useJourney } from '../context/JourneyContext';
import { Sparkles, X, Minimize2, Maximize2, Send, RotateCcw, Compass, MapPin, ArrowRight, Bot, User, BookOpen } from 'lucide-react';
import { generateRagGroundedResponse } from '../utils/ragEngine';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
  destinationLink?: string;
  ragSources?: string[];
}

export const WanderAIChat: React.FC = () => {
  const {
    isChatOpen,
    isChatMinimized,
    openChat,
    closeChat,
    minimizeChat,
    expandChat,
    chatContext,
    injectedPrompt,
    clearInjectedPrompt,
    navigate,
  } = useJourney();

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome-1',
        sender: 'assistant',
        text: 'Greetings. I am WanderAI, your bespoke travel intelligence companion. Whether you seek sub-arctic auroras, high alpine traverses, or secluded island retreats, I can synthesize customized itineraries, packing blueprints, and seasonal insights.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: [
          'Plan my trip',
          'Find hidden gems',
          'Best destinations in winter',
          'What should I pack for Iceland?',
        ],
      },
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isChatOpen && !isChatMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen, isChatMinimized]);

  // Handle injected prompt (e.g. from "Ask AI about this experience" or quick action buttons)
  useEffect(() => {
    if (injectedPrompt && isChatOpen) {
      handleSendMessage(injectedPrompt);
      clearInjectedPrompt();
    }
  }, [injectedPrompt, isChatOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          context: chatContext,
          history: messages.slice(-4),
        }),
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      let followUps: string[] = [];
      const lower = query.toLowerCase();
      if (lower.includes('iceland')) {
        followUps = ['What are the best thermal baths?', 'Show 7-day Iceland itinerary', 'What gear is required?'];
      } else if (lower.includes('japan') || lower.includes('kyoto')) {
        followUps = ['What is the best month for Kyoto?', 'Suggest Kaiseki etiquette', 'How do I book Shinkansen?'];
      } else if (lower.includes('pack')) {
        followUps = ['What luggage size do you recommend?', 'Winter clothing layers guide'];
      } else {
        followUps = ['Plan a 7-day itinerary', 'Find luxury stays', 'Explore adventure activities'];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedPrompts: followUps,
          ragSources: data.ragSources || undefined,
        },
      ]);
    } catch {
      // High-quality RAG grounded local reasoning fallback if backend call fails or on static hosting
      const { reply: ragReply, sources } = generateRagGroundedResponse(query, chatContext);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: ragReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedPrompts: ['What are real prices in INR?', 'How to avoid altitude sickness?', 'Vegetarian food options', 'Best packing hacks'],
          ragSources: sources,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: 'Memory refreshed. What continent or adventure would you like to explore next?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: ['Plan my trip', 'Find hidden gems', 'Best destinations', 'Build an itinerary'],
      },
    ]);
  };

  return (
    <>
      {/* Floating Circular Trigger Button (When Chat is Closed) */}
      {!isChatOpen && (
        <button
          onClick={openChat}
          aria-label="Ask WanderAI intelligent travel companion"
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
          </span>
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span className="hidden sm:inline font-display text-xs font-bold tracking-wider uppercase">
            Ask WanderAI
          </span>
        </button>
      )}

      {/* Floating Minimized Pill (When Minimized) */}
      {isChatOpen && isChatMinimized && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#0D1525]/95 border border-amber-400/40 rounded-full px-4 py-2.5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 cursor-pointer" onClick={expandChat}>
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-display font-semibold text-white">WanderAI</span>
            <span className="text-[11px] text-amber-300/80">Active</span>
          </div>
          <button
            onClick={expandChat}
            className="p-1 hover:text-white text-slate-400 transition-colors"
            aria-label="Expand Chat"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={closeChat}
            className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
            aria-label="Close Chat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Full Chat Window Panel */}
      {isChatOpen && !isChatMinimized && (
        <div
          role="complementary"
          aria-label="WanderAI Travel Assistant"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#0A101D] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-in slide-in-from-bottom-6 duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                <Sparkles className="w-4 h-4 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-sm font-bold text-white tracking-wide">
                    WanderAI
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  Your intelligent travel companion
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="Clear Chat History"
                aria-label="Clear chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={minimizeChat}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="Minimize"
                aria-label="Minimize chat"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={closeChat}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="Close"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Context Banner if Viewing Specific Destination or Experience */}
          {chatContext?.destination && (
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-3 py-1.5 flex items-center justify-between text-[11px] text-amber-200">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-amber-400" />
                Active Context: <strong>{chatContext.destination.name}, {chatContext.destination.country}</strong>
              </span>
              <button
                onClick={() => navigate(`/destinations/${chatContext.destination?.id}`)}
                className="hover:underline flex items-center gap-0.5 text-amber-300"
              >
                View
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          )}
          {chatContext?.experience && (
            <div className="bg-cyan-500/10 border-b border-cyan-500/20 px-3 py-1.5 flex items-center justify-between text-[11px] text-cyan-200">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-cyan-400" />
                Experience: <strong>{chatContext.experience.title}</strong>
              </span>
              <button
                onClick={() => navigate(`/experiences/${chatContext.experience?.id}`)}
                className="hover:underline flex items-center gap-0.5 text-cyan-300"
              >
                View
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          )}

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium rounded-tr-xs'
                        : 'bg-[#131D31] text-slate-200 border border-white/10 rounded-tl-xs whitespace-pre-line'
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* RAG Knowledge Grounding Badges */}
                  {msg.ragSources && msg.ragSources.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5 px-0.5">
                      <span className="text-[10px] text-amber-300 font-mono font-semibold flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                        RAG Grounded:
                      </span>
                      {msg.ragSources.map((source, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-400/25 text-amber-200"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className={`text-[10px] text-slate-500 px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>

                  {/* Suggested Follow-up Prompts */}
                  {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          className="text-[11px] px-2.5 py-1 bg-white/5 hover:bg-amber-400/20 text-slate-300 hover:text-amber-200 border border-white/10 hover:border-amber-400/40 rounded-full transition-colors focus:outline-none"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-md bg-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-slate-300">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2.5 text-slate-400">
                <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <div className="bg-[#131D31] border border-white/10 px-4 py-2.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-3 py-1.5 border-t border-white/5 bg-[#090E18] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
            <span className="text-slate-500 uppercase tracking-wider text-[10px] shrink-0 font-display">
              Quick:
            </span>
            <button
              onClick={() => handleSendMessage('Plan my trip')}
              className="whitespace-nowrap px-2 py-0.5 bg-white/5 hover:bg-white/10 rounded-md text-slate-300 hover:text-white transition-colors"
            >
              Plan trip
            </button>
            <button
              onClick={() => handleSendMessage('Find hidden gems')}
              className="whitespace-nowrap px-2 py-0.5 bg-white/5 hover:bg-white/10 rounded-md text-slate-300 hover:text-white transition-colors"
            >
              Hidden gems
            </button>
            <button
              onClick={() => handleSendMessage('What should I pack?')}
              className="whitespace-nowrap px-2 py-0.5 bg-white/5 hover:bg-white/10 rounded-md text-slate-300 hover:text-white transition-colors"
            >
              Packing guide
            </button>
            <button
              onClick={() => handleSendMessage('Suggest destinations under my budget')}
              className="whitespace-nowrap px-2 py-0.5 bg-white/5 hover:bg-white/10 rounded-md text-slate-300 hover:text-white transition-colors"
            >
              Budget advice
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0A101D] border-t border-white/10 flex items-center gap-2"
          >
            <input
              ref={chatInputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about global travels..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 rounded-xl transition-all shadow-md focus:outline-none"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

// Helper for bold and bullet points formatting
function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-amber-200">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}

// Local reasoning engine for instant contextual fallback
function generateLocalTravelResponse(query: string, context?: any): string {
  const lower = query.toLowerCase();

  if (context?.destination && (lower.includes('here') || lower.includes('this place') || lower.includes('winter') || lower.includes('season') || lower.includes('worth'))) {
    const dest = context.destination;
    return `For **${dest.name}, ${dest.country}**:\n` +
      `• **Ideal Season**: ${dest.bestSeason}\n` +
      `• **Climate Overview**: ${dest.weatherOverview}\n` +
      `• **Highlights**: ${dest.highlights?.map((h: any) => h.title).slice(0, 2).join(' & ')}\n` +
      `• **Insider Tip**: ${dest.travelTips?.[0] || 'Book key experiences well in advance.'}`;
  }

  if (context?.experience) {
    const exp = context.experience;
    return `Regarding **${exp.title}** in ${exp.destinationName}:\n` +
      `• **Duration**: ${exp.duration} (Difficulty: ${exp.difficulty})\n` +
      `• **Season**: ${exp.bestSeason}\n` +
      `• **What to Expect**: ${exp.whatYouWillExperience?.[0]}\n` +
      `• **Recommended Gear**: ${exp.recommendedEquipment?.slice(0, 2).join(', ')}`;
  }

  if (lower.includes('varanasi') || lower.includes('ganges') || lower.includes('india') || lower.includes('pilgrimage') || lower.includes('kashi')) {
    return `**Varanasi & Sacred India Pilgrimage Intelligence**:\n` +
      `• **Ganges Dawn Boat Rites**: Experience the morning puja and Surya Namaskar at 5:30 AM across the 84 stone ghats.\n` +
      `• **Maha Ganga Aarti**: Evening devotion at Dashashwamedh Ghat with multi-tiered flaming brass lamps.\n` +
      `• **Sacred Corridors**: Kashi Vishwanath Golden Temple and Sarnath where the Buddha first taught.\n` +
      `• **Insider Tip**: Visit between October and March for misty, serene morning river conditions.`;
  }

  if (lower.includes('bhutan') || lower.includes('tiger') || lower.includes('nest')) {
    return `**Bhutan & Tiger's Nest Pilgrimage**:\n` +
      `• **Paro Taktsang**: Dramatic cliffside monastery perched 900m above the valley floor.\n` +
      `• **Spiritual Culture**: Buddhist prayer wheels, Gross National Happiness philosophy, and sacred dzongs.\n` +
      `• **Optimal Seasons**: Spring (March–May) for blooming rhododendrons or Autumn (September–November) for crisp Himalayan views.`;
  }

  if (lower.includes('angkor') || lower.includes('cambodia')) {
    return `**Angkor Wat Sacred Sanctuary**:\n` +
      `• **Dawn Reflection**: Stand by the northern lotus pond to watch sunrise behind the five central sandstone towers.\n` +
      `• **Forest Temples**: Marvel at Ta Prohm's colossal roots and Bayon's 216 smiling faces.\n` +
      `• **Monk Blessings**: Receive sacred red-string wristlet blessings at ancient forest pagodas.`;
  }

  if (lower.includes('december') || lower.includes('winter')) {
    return `**Exceptional December Destinations**:\n` +
      `• **Iceland**: Prime aurora borealis dancing across dark Arctic skies and blue ice caves.\n` +
      `• **Swiss Alps**: Immaculate powder snow in Zermatt beneath the Matterhorn.\n` +
      `• **Dubai & Desert**: 25°C sunny days, cool starlit desert evenings, and festive architecture.`;
  }

  if (lower.includes('japan') || lower.includes('5-day') || lower.includes('5 day')) {
    return `**Curated 5-Day Japan Blueprint**:\n` +
      `• **Day 1**: Tokyo arrival, twilight in Omotesando, Roppongi night skyline.\n` +
      `• **Day 2**: Shinkansen bullet train to Kyoto; Arashiyama bamboo at dawn.\n` +
      `• **Day 3**: Fushimi Inari torii path, private tea ceremony, Kaiseki dinner.\n` +
      `• **Day 4**: Historic Gion district and Nara deer sanctuary.\n` +
      `• **Day 5**: Return to Tokyo; traditional Hamarikyu gardens & departure.`;
  }

  if (lower.includes('pack') || lower.includes('packing')) {
    return `**Expedition Packing Essentials**:\n` +
      `• **Base Layers**: 100% Merino wool 200gsm tops and bottoms.\n` +
      `• **Outer Shell**: 3-layer GORE-TEX waterproof & windproof jacket with taped seams.\n` +
      `• **Footwear**: Broken-in waterproof hiking boots with Vibram soles.\n` +
      `• **Tech**: 20,000mAh external battery pack and universal power converter.`;
  }

  if (lower.includes('budget') || lower.includes('cost')) {
    return `**Strategic Travel Optimization**:\n` +
      `• **Shoulder Season**: Booking in May or October yields up to 40% lower villa and guide rates.\n` +
      `• **Transport Passes**: Regional passes (like the Swiss Travel Pass) reduce transit overhead significantly.\n` +
      `• **High-Impact Spends**: Invest in signature experiences (like glacier hikes or private tea masters) while keeping dining authentic and local.`;
  }

  return `Here are three extraordinary journeys to consider:\n` +
    `• **Iceland**: Fire and ice expeditions under emerald auroras.\n` +
    `• **Swiss Alps**: Majestic summit ridges and alpine luxury rail.\n` +
    `• **Patagonia**: Untamed granite spires at the edge of the Americas.\n` +
    `Would you like me to build a custom multi-day timeline for any of these?`;
}
