import { proxyActivities } from '@temporalio/workflow';

import type { createActivities } from './activities';
import { SortResult } from './shared';

const activities = proxyActivities<ReturnType<typeof createActivities>>({
  startToCloseTimeout: '1 minute',
  // retry: { maximumAttempts: 1 },
});

export const sortNotesWorkflow = async (notes: string[]) => {
  // Your workflow code here

  const sorted: SortResult = await activities.callLLMFortSorting(notes);

  const dailyPlan = await activities.callLLMForDailyPlan(sorted.plans);

  return {
    todos: sorted.todos,
    dailyPlan,
    knowledge: sorted.knowledge,
    others: sorted.others,
  };
};
