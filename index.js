const projectId = 'stoked-reality-284921';
const publish = (
  topicName,
  source,
  data
) => {
  const {PubSub} = require('@google-cloud/pubsub');
  // Instantiates a client
  const pubsub = new PubSub({projectId});

  async function publishMessage() {
    const sourceStr = data ? `-${source}` : '';
    const dataBuffer = Buffer.from(JSON.stringify(!data ? source : data));

    const messageId = await pubsub.topic(`${topicName}${sourceStr}`).publish(dataBuffer);
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
  const { sequelize, Page, Organisation, Event, Itinerary, Notice, UserNotice } = await require("./db")();
  const message = event && event.data ? JSON.parse(Buffer.from(event.data, 'base64').toString()) : null;
  if (message === null) {
    callback();
  }
  let response;
  switch (message.action) {
    case 'organisation':
      await (async () => {
        const { create, read, update, remove } = require('./actions/organisation')(Organisation, publish, axios);
        switch (message.command) {
          case 'create':
            try {
              console.log('message', message);
              response = await create(message);
            } catch (error) {
              console.log('error in create', error);
            }
            break;
          case 'read':
            try {
              console.log('message', message);
              response = await read(message);
            } catch (error) {
              console.log('error in read', error);
            }
            break;
          case 'update':
            try {
              console.log('message', message);
              response = await update(message);
            } catch (error) {
              console.log('error in update', error);
            }
            break;
          case 'delete':
            try {
              console.log('message', message);
              response = await remove(message);
            } catch (error) {
              console.log('error in delete', error);
            }
            break;
        }
      })();
      break;
    case 'notice':
      await (async () => {
        console.log(message.action);
        const { send, read, get } = require('./actions/notice')(Event, Page, Notice, UserNotice, publish, axios);
        switch (message.command) {
          case 'send':
            try {
              console.log('message', message);
              response = await send(message);
            } catch (error) {
              console.log('error in send', error);
            }
            break;
          case 'read':
            try {
              // mark a notice as read by a user
              console.log('message', message);
              response = await read(message);
            } catch (error) {
              console.log('error in read', error);
            }
            break;
          case 'get':
            try {
              // get a list of notices for a given user - pass an option if wanting all read ones as well as unread
              console.log('message', message);
              response = await get(message);
            } catch (error) {
              console.log('error in get', error);
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
              response = await create(message);
            } catch (error) {
              console.log('error in create', error);
            }
            break;
          case 'read':
            try {
              console.log('message', message);
              response = await read(message);
            } catch (error) {
              console.log('error in read', error);
            }
            break;
          case 'update':
            try {
              console.log('message', message);
              response = await update(message);
            } catch (error) {
              console.log('error in update', error);
            }
            break;
          case 'delete':
            try {
              console.log('message', message);
              response = await remove(message);
            } catch (error) {
              console.log('error in delete', error);
            }
            break;
          case 'get':
            try {
              console.log('message', message);
              response = await get(message);
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
              response = await create(message);
            } catch (error) {
              console.log('error in create', error);
            }
            break;
          case 'read':
            try {
              console.log('message', message);
              response = await read(message);
            } catch (error) {
              console.log('error in read', error);
            }
            break;
          case 'update':
            try {
              console.log('message', message);
              response = await update(message);
            } catch (error) {
              console.log('error in update', error);
            }
            break;
          case 'delete':
            try {
              console.log('message', message);
              response = await remove(message);
            } catch (error) {
              console.log('error in delete', error);
            }
            break;
          case 'get':
            try {
              console.log('message', message);
              response = await get(message);
            } catch (error) {
              console.log('error in get', error);
            }
            break;
        }
      })();
      break;
      case 'item':
        await (async () => {
          const { assign, unassign, get } = require('./actions/itinerary')(Event, Itinerary, publish, axios);
          switch (message.command) {
            case 'create':
              try {
                console.log('message', message);
                response = await assign(message);
              } catch (error) {
                console.log('error in assigning', error);
              }
              break;
            case 'delete':
              try {
                console.log('message', message);
                response = await unassign(message);
              } catch (error) {
                console.log('error in unassigning', error);
              }
              break;
            case 'get':
              try {
                console.log('message', message);
                response = await get(message);
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
              response = await create(message);
            } catch (error) {
              console.log('error in create', error);
            }
            break;
          case 'read':
            try {
              console.log('message', message);
              response = await read(message);
            } catch (error) {
              console.log('error in read', error);
            }
            break;
          case 'update':
            try {
              console.log('message', message);
              response = await update(message);
            } catch (error) {
              console.log('error in update', error);
            }
            break;
          case 'delete':
            try {
              console.log('message', message);
              response = await remove(message);
            } catch (error) {
              console.log('error in delete', error);
            }
            break;
          case 'get':
            try {
              console.log('message', message);
              response = await get(message);
            } catch (error) {
              console.log('error in get', error);
            }
            break;
        }
      })();
      break;
  }
  console.log('execution completed');
  if (process.env.NODE_ENV !== 'production') {
    callback(response);
  } else {
    callback();
  }
};
