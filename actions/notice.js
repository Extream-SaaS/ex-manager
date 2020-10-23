let Event, Itinerary, Notice, UserNotice, publish, axios;

module.exports = (injectedEvent, injectedItinerary, injectedNotice, injectedUserNotice, injectedPublish, injectedAxios) => {
  Event = injectedEvent;
  Itinerary = injectedItinerary;
  Notice = injectedNotice;
  UserNotice = injectedUserNotice;
  publish = injectedPublish;
  axios = injectedAxios;
  return {
    send,
    read,
    get,
  };
};
const send = async ({source, domain, action, command, socketId, payload, user}) => {
  try {
    if (payload.event) {
      const event = await Event.findOne({
        where: {
          public_id: payload.event
        }
      });
      if (!event) {
        throw new Error('event not found');
      }
      // const newNotice = await event.createNotice({ message: JSON.stringify(payload.message), createdBy: user.id });
      const newNotice = await Notice.create({ public_id: payload.public_id, event: payload.event, message: JSON.stringify(payload.message), createdBy: user.id });
      if (process.env.NODE_ENV !== 'production') {
        console.log({ ...payload });
        return { ...payload };
      }
      await publish('ex-gateway', source, { domain, action, command, payload: { ...payload }, user, socketId });
    } else {
      throw new Error('event is required');
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw error;
    }
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
    throw error;
  }
};
const read = async ({ source, domain, action, command, socketId, payload, user }) => {
  try {
    const notice = await Notice.findOne({ 
      where: {
        public_id: payload.message 
      },
    });
    if (notice === null) {
      throw new Error('notice not found');
    }
    let userNotice = await UserNotice.findOne({
      where: {
        user_id: user.id,
        notice: payload.message,
      },
    });
    console.log('user notice', userNotice);
    if (userNotice === null) {
      userNotice = await UserNotice.create({
        notice: payload.message,
        status: 'read',
        user_id: user.id,
      });
    } else {
      // update status
      userNotice.status = 'read';
      await userNotice.save();
    }
    if (process.env.NODE_ENV !== 'production') {
      return notice.dataValues;
    }
    await publish('ex-gateway', source, { domain, action, command, payload: userNotice.dataValues, user, socketId });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw error;
    }
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const get = async ({ source, domain, action, command, socketId, payload, user }) => {
  try {
    let values;
    if (payload.event) {
      const notices = await Notice.findAll({ 
        where: {
          event: payload.event,
        },
      });
      if (notices === null) {
        throw new Error('no notices found for event');
      }
      values = await Promise.all(notices.map(async row => {
        const notice = row.dataValues;
        const readStatus = await UserNotice.findOne({
          where: {
            notice: notice.public_id,
            user_id: user.id,
          },
        });
        console.log({
          notice: notice.public_id,
          user_id: user.id,
        });
        if (readStatus) {
          console.log('status', readStatus.dataValues);
        }
        if ((payload.read && payload.read === true) || readStatus === null || readStatus.dataValues.status !== 'read') {
          notice.message = JSON.parse(notice.message);
          notice.status = 'unread';
          if (readStatus !== null) {
            notice.status = readStatus.dataValues.status;
          }
          return notice;
        } else {
          return null;
        }
      }));
    }
    if (process.env.NODE_ENV !== 'production') {
      return values.filter(Boolean);
    }
    await publish('ex-gateway', source, { domain, action, command, payload: values.filter(Boolean), user, socketId });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw error;
    }
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
  }
};