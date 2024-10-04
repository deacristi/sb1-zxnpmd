import { SELECTORS } from './config';

export async function scrapeMessages(selectors: typeof SELECTORS) {
  const messages = [];
  const messageItems = document.querySelectorAll(selectors.MESSAGE_ITEM);

  for (const item of messageItems) {
    const message = extractMessageData(item, selectors);
    messages.push(message);
  }

  return messages;
}

export function listenForNewMessages(selectors: typeof SELECTORS, callback: (message: any) => void) {
  const messagePane = document.querySelector(selectors.MESSAGE_PANE);
  if (!messagePane) return;

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement && node.matches(selectors.MESSAGE_ITEM)) {
            const message = extractMessageData(node, selectors);
            callback(message);
          }
        }
      }
    }
  });

  observer.observe(messagePane, { childList: true, subtree: true });
}

function extractMessageData(messageItem: Element, selectors: typeof SELECTORS) {
  const timestamp = messageItem.querySelector(selectors.TIMESTAMP_EPOCH_LABEL)?.getAttribute('data-ts') || '';
  const username = messageItem.querySelector(selectors.USERNAME)?.textContent || '';
  const messageText = messageItem.querySelector(selectors.MESSAGE_TEXT)?.textContent || '';
  const userIcon = messageItem.querySelector(selectors.USERICON)?.getAttribute('src') || '';
  const attachments = Array.from(messageItem.querySelectorAll(selectors.ATTACHMENTS));
  const reactions = Array.from(messageItem.querySelectorAll(selectors.REACTIONS));
  const isEdited = !!messageItem.querySelector(selectors.EDITED_LABEL);

  return {
    timestamp,
    username,
    messageText,
    userIcon,
    attachments: attachments.map(extractAttachmentData),
    reactions: reactions.map(extractReactionData),
    isEdited,
  };
}

function extractAttachmentData(attachment: Element) {
  const imageUrl = attachment.querySelector(SELECTORS.IMAGE_URL)?.getAttribute('src') || '';
  return { type: 'image', url: imageUrl };
}

function extractReactionData(reaction: Element) {
  const emojiElement = reaction.querySelector('.c-emoji');
  const emoji = emojiElement ? emojiElement.getAttribute('data-emoji') || emojiElement.textContent : '';
  const count = parseInt(reaction.querySelector('.c-reaction__count')?.textContent || '0', 10);
  return { emoji, count };
}