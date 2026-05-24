import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function summarizeHackathon(
  title: string,
  description: string,
  prizes: string,
  deadline: string
): Promise<string> {
  const prompt = `You are an expert hackathon analyst. Summarize this hackathon in ONE punchy sentence (max 15 words) that tells a developer exactly why they should care.

Hackathon: ${title}
Description: ${description}
Prize: ${prizes}
Deadline: ${deadline}

Respond with only the one-liner summary, no quotes, no extra text.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error("Gemini summarize error:", err);
    return description.slice(0, 100) + "...";
  }
}

export async function analyzeWinningPatterns(
  projects: Array<{ title: string; tech: string[]; description: string }>
): Promise<string> {
  const projectList = projects
    .map((p) => `- ${p.title} (${p.tech.join(", ")}): ${p.description}`)
    .join("\n");

  const prompt = `You are a hackathon intelligence analyst. Given these winning hackathon projects, identify ONE key pattern that made them win. Be specific and actionable.

Projects:
${projectList}

Respond in one sentence starting with an emoji, max 20 words.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error("Gemini analyze error:", err);
    return "🏆 Winners consistently ship working products with clear user value.";
  }
}

export async function generateHackathonTips(
  hackathonTitle: string,
  techStack: string[],
  theme: string
): Promise<string[]> {
  const prompt = `You are a seasoned hackathon mentor. Give 3 specific, actionable tips for winning "${hackathonTitle}" with theme "${theme}" using: ${techStack.join(", ")}.

Format: Return exactly 3 tips, one per line, each starting with an emoji. Max 15 words each. No numbering.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    return text.split("\n").filter((line) => line.trim().length > 0).slice(0, 3);
  } catch (err) {
    console.error("Gemini tips error:", err);
    return [
      "🚀 Ship a working demo first, polish later",
      "🎯 Solve one problem extremely well",
      "📹 Record your demo video early",
    ];
  }
}
