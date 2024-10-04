export const SELECTORS = {
  MESSAGE_ITEM: 'c-virtual_list__item',
  MESSAGE_PANE: '.p-message_pane',
  TIMESTAMP_TIME_LABEL: '.c-timestamp__label',
  TIMESTAMP_EPOCH_LABEL: 'a.c-timestamp[data-ts] span.c-timestamp__label',
  USERNAME: '[data-qa="message_sender_name"]',
  USERICON: '.c-base_icon',
  MESSAGE_TEXT: '.p-rich_text_section',
  IMAGE_THUMBNAIL: '.c-avatar__emoji',
  ATTACHMENTS: '.c-message__attachments',
  IMAGE_URL: 'a.c-link.p-file_image_thumbnail__wrapper img',
  REACTIONS: '.c-message__reactions',
  EDITED_LABEL: '.c-message__edited'
};

export const CONFIG = {
  websocketUrl: 'ws://localhost:5000/',
  backendUrl: 'http://localhost:5000/api',
  groupByPost: 'no',
  sendToAPI: 'yes'
};