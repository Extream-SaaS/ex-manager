const {PubSub} = require('@google-cloud/pubsub');
/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.manage = (event, context) => {
  const message = event.data ? JSON.parse(Buffer.from(event.data, 'base64').toString()) : null;
  if (message === null) {
    console.log('null');
    return true;
  }
  switch (message.action) {
    case 'organisation':
      const { create, read, update, remove } = require('./actions/organisation');
      switch (message.command) {
        case 'create':
          create(message.payload, message.user);
          break;
      }
  }
  console.log('message', message);
  return true;
};
