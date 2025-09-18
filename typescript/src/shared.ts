import { openai } from '@ai-sdk/openai';
// Ensure OPENAI_API_KEY environment variable is set
import { generateText } from 'ai';
import 'dotenv/config';

export const TASK_QUEUE_NAME = 'hackathon';
export interface SortResult {
  todos: string[];
  plans: string[];
  knowledge: string[];
  others: string[];
}

export const callLLM = async (
  systemPrompt: string,
  userPrompt: string,
  model: string,
): Promise<string> => {
  const { text } = await generateText({
    model: openai(model),
    system: systemPrompt,
    prompt: userPrompt,
  });
  return text;
};
