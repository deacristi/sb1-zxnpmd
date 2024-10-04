import { CONFIG } from './config';

export function sendMessageBatch(messages: any[]) {
  chrome.runtime.sendMessage({
    type: 'sendMessages',
    messages: messages,
  });

  updateStats(messages.length);
}

function updateStats(newMessagesCount: number) {
  chrome.storage.local.get(['stats'], (result) => {
    const currentStats = result.stats || {
      totalMessages: 0,
      lastScrapedTimestamp: '',
      batchesSent: 0,
    };

    const updatedStats = {
      totalMessages: currentStats.totalMessages + newMessagesCount,
      lastScrapedTimestamp: new Date().toISOString(),
      batchesSent: currentStats.batchesSent + 1,
    };

    chrome.storage.local.set({ stats: updatedStats });
    chrome.runtime.sendMessage({ type: 'updateStats', stats: updatedStats });
  });
}