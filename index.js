const projectId = 'stoked-reality-284921';
const publish = (
  topicName = 'ex-gateway',
  data = {}
) => {
  const {PubSub} = require('@google-cloud/pubsub');
  // Instantiates a client
  const pubsub = new PubSub({projectId});

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
exports.manage = async (event, context, callback) => {
  const axios = require("axios");
  const { sequelize, Page, Organisation, Event, Itinerary } = await require("./db")();
  const message = event && event.data ? JSON.parse(Buffer.from(event.data, 'base64').toString()) : null;
  if (message === null) {
    callback();
  }
  console.log('message', message);
  switch (message.action) {
    case 'organisation':
      await (async () => {
        const { create, read, update, remove } = require('./actions/organisation')(Organisation, publish, axios);
        switch (message.command) {
          case 'create':
            try {
              console.log('message', message);
              await create(message);
            } catch (error) {
              console.log('error in create', error);
            }
            break;
          case 'read':
            try {
              console.log('message', message);
              await read(message);
            } catch (error) {
              console.log('error in read', error);
            }
            break;
          case 'update':
            try {
              console.log('message', message);
              await update(message);
            } catch (error) {
              console.log('error in update', error);
            }
            break;
          case 'delete':
            try {
              console.log('message', message);
              await remove(message);
            } catch (error) {
              console.log('error in delete', error);
            }
            break;
        }
      })();
      break;
    case 'event':
      await (async () => {
        console.log(message.action);
        const { create, read, update, remove, get } = require('./actions/event')(Organisation, Event, Itinerary, publish, axios);
        switch (message.command) {
          case 'create':
            try {
              console.log('message', message);
              await create(message);
            } catch (error) {
              console.log('error in create', error);
            }
            break;
          case 'read':
            try {
              console.log('message', message);
              await read(message);
            } catch (error) {
              console.log('error in read', error);
            }
            break;
          case 'update':
            try {
              console.log('message', message);
              await update(message);
            } catch (error) {
              console.log('error in update', error);
            }
            break;
          case 'delete':
            try {
              console.log('message', message);
              await remove(message);
            } catch (error) {
              console.log('error in delete', error);
            }
            break;
          case 'get':
            try {
              console.log('message', message);
              await get(message);
            } catch (error) {
              console.log('error in get', error);
            }
            break;
        }
      })();
      break;
    case 'itinerary':
      await (async () => {
        const { create, read, update, remove, get } = require('./actions/itinerary')(Event, Itinerary, publish, axios);
        switch (message.command) {
          case 'create':
            try {
              console.log('message', message);
              await create(message);
            } catch (error) {
              console.log('error in create', error);
            }
            break;
          case 'read':
            try {
              console.log('message', message);
              await read(message);
            } catch (error) {
              console.log('error in read', error);
            }
            break;
          case 'update':
            try {
              console.log('message', message);
              await update(message);
            } catch (error) {
              console.log('error in update', error);
            }
            break;
          case 'delete':
            try {
              console.log('message', message);
              await remove(message);
            } catch (error) {
              console.log('error in delete', error);
            }
            break;
          case 'get':
            try {
              console.log('message', message);
              await get(message);
            } catch (error) {
              console.log('error in get', error);
            }
            break;
        }
      })();
      break;
      case 'item':
        await (async () => {
          const { assign, unassign } = require('./actions/itinerary')(Event, Itinerary, publish, axios);
          switch (message.command) {
            case 'create':
              try {
                console.log('message', message);
                await assign(message);
              } catch (error) {
                console.log('error in assigning', error);
              }
              break;
            case 'delete':
              try {
                console.log('message', message);
                await unassign(message);
              } catch (error) {
                console.log('error in unassigning', error);
              }
              break;
            case 'get':
              try {
                console.log('message', message);
                await get(message);
              } catch (error) {
                console.log('error in get', error);
              }
              break;
          }
        })();
        break;
    case 'page':
      await (async () => {
        const { create, read, update, remove } = require('./actions/page')(Page, publish, axios);
        switch (message.command) {
          case 'create':
            try {
              console.log('message', message);
              await create(message);
            } catch (error) {
              console.log('error in create', error);
            }
            break;
          case 'read':
            try {
              console.log('message', message);
              await read(message);
            } catch (error) {
              console.log('error in read', error);
            }
            break;
          case 'update':
            try {
              console.log('message', message);
              await update(message);
            } catch (error) {
              console.log('error in update', error);
            }
            break;
          case 'delete':
            try {
              console.log('message', message);
              await remove(message);
            } catch (error) {
              console.log('error in delete', error);
            }
            break;
          case 'get':
            try {
              console.log('message', message);
              await get(message);
            } catch (error) {
              console.log('error in get', error);
            }
            break;
        }
      })();
      break;
  }
  callback();
};
