import { ApplicationFailure } from '@temporalio/client';

import { SortResult, callLLM } from './shared';

// If you wish to connect any dependencies (eg, database), add in here
export const createActivities = (/* db: typeorm.DataSource */) => ({
  async callLLMForDailyPlan(plans: string[]): Promise<string> {
    return callLLM(
      'You are an expert productivity assistant. Create a concise daily schedule based on the following plans. The schedule should be clear and actionable. Always answer in english',
      `Here are the plans:\n${plans.join('\n')}\n\nCreate a daily schedule based on these.`,
      'gpt-5-mini',
    );
  },
  async callLLMFortSorting(notes: string[]): Promise<SortResult> {
    return callLLM(
      `You are an expert assistant that helps to categorize notes into four categories:
      - todos
      - plans
      - knowledge
      - others. Always answer in english.
      
      ## Response format
      The response format MUST be a valid JSON object with the following structure:

      {
        "todos": [strings of todos],
        "plans": [strings of plans],
        "knowledge": [strings of knowledge],
        "others": [strings of others]
      }


      You must strictly follow the above format.`,
      `Here are the notes:\n${notes.join()}\n\nCategorize these notes into the four categories mentioned above and respond in the specified JSON format.`,
      'gpt-5-mini',
    ).then((res) => {
      try {
        const parsed = JSON.parse(res);
        // Basic validation of the parsed object
        if (
          typeof parsed === 'object' &&
          Array.isArray(parsed.todos) &&
          Array.isArray(parsed.plans) &&
          Array.isArray(parsed.knowledge) &&
          Array.isArray(parsed.others)
        ) {
          return parsed;
        }
      } catch (error) {
        throw new ApplicationFailure(
          'Failed to parse LLM response',
          undefined,
          true,
        );
      }
    });
  },
});
