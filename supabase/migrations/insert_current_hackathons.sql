-- Insert current hackathons from AIHackTracker data.ts
-- Run this in Supabase SQL Editor

DELETE FROM public.hackathons WHERE id IN (
  'usaii-global-2026',
  'google-cloud-rapid-agents-2026',
  'developerweek-2026',
  'devnetwork-ai-ml-2026',
  'mind-the-product-2026',
  'hack-devpost-2026',
  'produhacks-2026',
  'openai-open-model-2026'
);

INSERT INTO public.hackathons (id, title, organizer, url, deadline, prize_pool, theme, tech_tags, team_size, difficulty, location, summary, description, status, category, participants, featured)
VALUES
  ('usaii-global-2026', 'USAII® Global AI Hackathon 2026', 'USAII', 'https://usaii-global-ai-hackathon-2026.devpost.com/', '2026-06-21T23:59:00Z', '$15,000', 'AI Safety & Responsible AI', ARRAY['AI','Machine Learning','Ethics','Python','Any Stack'], '1–4', 'Intermediate', 'Global · Virtual', 'Identify real-world risks in AI systems (bias, misinformation, misuse) and design solutions around them.', 'Global hackathon where every team must identify a real-world AI risk and design mitigations. Separate tracks for High School, College, and Graduate levels with $5,000 prizes each.', 'open', 'AI / Machine Learning', 2400, true),

  ('google-cloud-rapid-agents-2026', 'Google Cloud Rapid Agent Hackathon', 'Google Cloud', 'https://rapid-agent.devpost.com/', '2026-06-25T23:59:00Z', '$30,000', 'Building AI Agents for Real-World Challenges', ARRAY['Gemini AI','Google Cloud','Agent AI','Python','Node.js'], '1–5', 'Advanced', 'Global · Virtual', 'Build AI agents that solve real-world problems. Largest agent-focused hackathon of the year.', 'Split into six partner-specific tracks, each awarding $5K (1st), $3K (2nd), $2K (3rd). Focus on autonomous agents powered by Gemini.', 'open', 'AI / Machine Learning', 5200, true),

  ('developerweek-2026', 'DeveloperWeek 2026 Hackathon', 'DeveloperWeek', 'https://developerweek-2026-hackathon.devpost.com/', '2026-06-20T23:59:00Z', '$12,500', 'Developer Tools & Productivity', ARRAY['Node.js','Python','AI/ML','APIs','DevTools'], '1–6', 'Intermediate', 'San Francisco + Virtual', 'Nation''s largest in-person + online hackathon. Multiple sponsor challenges with combined $12,500+ in prizes.', 'Join 10,000+ developers at DeveloperWeek 2026. Build developer tools, AI applications, and solutions to sponsor challenges.', 'open', 'Developer Tools', 3200, true),

  ('devnetwork-ai-ml-2026', 'DevNetwork [AI + ML] Hackathon 2026', 'DevNetwork', 'https://devnetwork-ai-ml-hack-2026.devpost.com/', '2026-06-18T23:59:00Z', '$8,000', 'AI & Machine Learning Innovation', ARRAY['AI','ML','Python','TensorFlow','PyTorch'], '1–4', 'Intermediate', 'Global · Virtual', 'Largest dedicated AI + ML hackathon challenge. Win Amazon Echos and DevNetwork premium access.', 'Build cutting-edge AI/ML solutions. Winners get Amazon Echo devices, all-access conference passes, and featured announcement to 60,000+ subscribers.', 'open', 'AI / Machine Learning', 1800, true),

  ('mind-the-product-2026', 'Mind the Product: World Product Day 2026', 'Mind the Product', 'https://mindtheproduct.devpost.com/', '2026-06-20T23:59:00Z', '$2,000', 'Product Innovation with AI', ARRAY['Product','AI','Design','Any Stack'], '1–5', 'All levels', 'Global · Virtual', 'Ship a working AI-powered product. Judged on product thinking, craft, and shippedness.', '30-day hackathon emphasizing real product execution. Requires Novus.ai analytics integration. Scored on Product Thinking (25%), Craft (25%), Originality (25%), and Shippedness (25%).', 'open', 'Product Innovation', 1200, true),

  ('hack-devpost-2026', 'Hack Devpost 2026', 'Devpost', 'https://hackdevpost.devpost.com/', '2026-06-12T23:59:00Z', '$12,000', 'Build Tools for Hackathon Communities', ARRAY['React','Node.js','AI','UX','APIs'], '1–4', 'All levels', 'Global · Virtual', 'Build products that improve how hackathons run, discoveries work, or communities form.', 'Meta hackathon: create tools that make hackathons better for participants, organizers, and judges. Devpost opens its platform as the challenge.', 'closing_soon', 'Developer Tools', 750, false),

  ('produhacks-2026', 'ProduHacks 2026: Built to Last', 'ProduHacks', 'https://produhacks-2026.devpost.com/', '2026-07-15T23:59:00Z', '$8,000', 'Products That Matter', ARRAY['Product Design','AI','Mobile','Web'], '2–4', 'Beginner', 'Global · Virtual', 'Build products with genuine staying power — solving real problems, not just clever demos.', 'ProduHacks prioritizes real user value, sustainable business models, and thoughtful design. Judges value builders who ship products people actually use.', 'upcoming', 'Product Innovation', 420, false),

  ('openai-open-model-2026', 'OpenAI Open Model Hackathon 2026', 'OpenAI + Hugging Face + NVIDIA', 'https://openai.devpost.com/', '2026-07-31T23:59:00Z', '$25,000', 'Creative Applications of Open Models', ARRAY['GPT-OSS','Reasoning Models','LLM','Python','Hardware'], '1–4', 'Intermediate', 'Global · Virtual', '6-week hackathon: Build robots with reasoning, offline agents, fine-tuned models, or push hardware to the edge.', 'Apply OpenAI''s open-weight reasoning models in creative, unexpected ways. Collaborate with Hugging Face, NVIDIA, Ollama, vLLM, LM Studio. For all technical levels.', 'open', 'AI / Machine Learning', 3500, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  deadline = EXCLUDED.deadline,
  prize_pool = EXCLUDED.prize_pool,
  status = EXCLUDED.status,
  updated_at = now();
