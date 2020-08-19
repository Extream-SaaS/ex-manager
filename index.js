const publish = (
  topicName = 'ex-gateway',
  data = {}
) => {
  const {PubSub} = require('@google-cloud/pubsub');
  // Instantiates a client
  const pubsub = new PubSub({grpc, projectId});

  async function publishMessage() {
    const dataBuffer = Buffer.from(JSON.stringify(data));

    const messageId = await pubsub.topic(topicName).publish(dataBuffer);
    return messageId;
  }

  return publishMessage();
};
/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.manage = async (event, context) => {
  const axios = require("axios");
  const pgPool = require("./db/pgWrapper");
  const message = event.data ? JSON.parse(Buffer.from(event.data, 'base64').toString()) : null;
  if (message === null) {
    return true;
  }
  switch (message.action) {
    case 'organisation':
      const { create, read, update, remove } = require('./actions/organisation')(pgPool, publish, axios);
      switch (message.command) {
        case 'create':
          try {
            console.log('message', message);
            const created = await create(message);
          } catch (error) {
            console.log('error in create', error);
          }
          break;
      }
  }
  console.log('message', message);
  return true;
};
