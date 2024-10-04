import { CONFIG } from './config';

chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.windows.create({
      url: tab.url,
      type: 'popup',
      width: 1200,
      height: 800,
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'updateStats') {
    chrome.storage.local.set({ stats: message.stats });
  }
});

let socket: WebSocket | null = null;

function connectWebSocket() {
  socket = new WebSocket(CONFIG.websocketUrl);

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected. Reconnecting in 5 seconds...');
    setTimeout(connectWebSocket, 5000);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
}

connectWebSocket();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'sendMessages' && socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message.messages));
  }
});