export async function callCityQuestAI({ edition, mission, npc, userMessage }) {
  if (!process.env.OPENAI_API_KEY) return fallbackReply(userMessage);
  const model = process.env.OPENAI_MODEL || "gpt-5.5";
  const system = [`You are CityQuest AI.`, ...(edition.rules||[]), `Speak English during the game.`, `Current mission: ${mission.title}`, `NPC: ${npc.name}, style: ${npc.style}`, `Keep replies short and motivating.`].join("\n");
  const response = await fetch("https://api.openai.com/v1/responses", {method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model,input:[{role:"system",content:system},{role:"user",content:userMessage}]})});
  if(!response.ok) return fallbackReply(userMessage);
  const data = await response.json();
  return data.output_text || fallbackReply(userMessage);
}
function fallbackReply(message){const text=String(message||"").toLowerCase(); if(/[äöüß]|\b(ich|du|wir|bitte|danke|was|wo|wie)\b/i.test(message)) return "Let's try that in English. Start with: 'Excuse me, could you help us?'"; if(text.includes("thank")) return "You're welcome. That was polite."; if(text.includes("where")||text.includes("how")||text.includes("recommend")) return "Good question. Compare your options and explain your choice."; return "Interesting. Could you explain your idea a little more?"}
