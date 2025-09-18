import { SortResult } from './shared';

// If you wish to connect any dependencies (eg, database), add in here
export const createActivities = (/* db: typeorm.DataSource */) => ({
  async sayName(name: string): Promise<string> {
    if (!name) {
      name = 'anonymous human';
    }

    return `Hello, ${name}!`;
  },
  async callLLMForDailyPlan(plans: string[]): Promise<string> {
    return 'Mock daily plan';
  },
  async callLLMFortSorting(notes: string[]): Promise<SortResult> {
    return {
      todos: [],
      plans: [],
      knowledge: [],
      others: [],
    };
  },
});
