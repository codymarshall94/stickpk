import { PROMPTS } from "../data/prompts";

export const generatePrompt = () => {
  const randomIndex = Math.floor(Math.random() * PROMPTS.length);
  return PROMPTS[randomIndex];
};
