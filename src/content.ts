import { SELECTORS } from './config';
import { scrapeMessages, listenForNewMessages } from './scraper';
import { sendMessageBatch } from './websocket';

let messageBuffer: any[] = [];
const BATCH_SIZE = 10;
const BATCH_INTERVAL = 5000; // 5 seconds

function processBatch() {
  if (messageBuffer.length > 0) {
    const batch = messageBuffer.splice(0, BATCH_SIZE);
    sendMessageBatch(batch);
  }
}

setInterval(processBatch, BATCH_INTERVAL);

function addMessageToBuffer(message: any) {
  messageBuffer.push(message);
  if (messageBuffer.length >= BATCH_SIZE) {
    processBatch();
  }
}

async function initScraper() {
  const initialMessages = await scrapeMessages(SELECTORS);
  initialMessages.forEach(addMessageToBuffer);

  listenForNewMessages(SELECTORS, (newMessage) => {
    addMessageToBuffer(newMessage);
  });
}

initScraper();