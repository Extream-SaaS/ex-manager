let Organisation, Event, Itinerary, publish, axios;

module.exports = (injectedOrganisation, injectedEvent, injectedItinerary, injectedPublish, injectedAxios) => {
  Organisation = injectedOrganisation;
  Event = injectedEvent;
  Itinerary = injectedItinerary;
  publish = injectedPublish;
  axios = injectedAxios;
  return {
    create,
    read,
    update,
    remove,
    get
  };
};
const create = async ({source, domain, action, command, socketId, payload, user}) => {
  try {
    if (payload.organisation) {
      const organisation = await Organisation.findOne({
        where: {
          public_id: payload.organisation
        }
      });
      if (!organisation) {
        throw new Error('organisation not found');
      }
      const event = await organisation.createEvent({ ...payload, createdBy: user.id });
      if (process.env.NODE_ENV !== 'production') {
        console.log({ ...payload, public_id: event.public_id });
        return { ...payload, public_id: event.public_id };
      }
      await publish('ex-gateway', source, { domain, action, command, payload: { ...payload, public_id: event.public_id }, user, socketId });
    } else {
      throw new Error('organisation is required');
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
    const event = await Event.findOne({ 
      where: {
        public_id: payload.id 
      },
      exclude: ['id']
    });
    if (event === null) {
      throw new Error('event not found');
    }
    if (process.env.NODE_ENV !== 'production') {
      return event.dataValues;
    }
    await publish('ex-gateway', source, { domain, action, command, payload: event.dataValues, user, socketId });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw error;
    }
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const update = async ({ source, domain, action, command, socketId, payload, user }) => {
  console.log('data', payload, user);
  try {
    const event = await Event.findOne({ 
      where: {
        public_id: payload.id 
      },
      exclude: ['id']
    });
    if (event === null) {
      throw new Error('event not found');
    }
    for (let field in payload) {
      event[field] = payload[field];
    }
    await event.save();
    if (process.env.NODE_ENV !== 'production') {
      return event.dataValues;
    }
    await publish('ex-gateway', source, { domain, action, command, payload: event.dataValues, user, socketId });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw error;
    }
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const remove = async ({ source, domain, action, command, socketId, payload, user }) => {
  console.log('data', payload, user);
  try {
    const event = await Event.findOne({ 
      where: {
        public_id: payload.id 
      }
    });
    if (event === null) {
      throw new Error('event not found');
    }
    await event.destroy();
    if (process.env.NODE_ENV !== 'production') {
      return payload;
    }
    await publish('ex-gateway', source, { domain, action, command, user, socketId });
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
    if (payload.organisation) {
      const organisation = await Organisation.findOne({ 
        where: {
          public_id: payload.organisation 
        },
        include: [Event],
        exclude: ['id']
      });
      if (organisation === null) {
        throw new Error('organisation not found');
      }
      const events = await organisation.getEvents();
      if (events === null) {
        throw new Error('events not found');
      }
      values = events.map(row => row.dataValues);
    } else {
      const event = await Event.findOne({ 
        where: {
          public_id: payload.id 
        },
        include: [Organisation, Itinerary],
        exclude: ['id']
      });
      if (event === null) {
        throw new Error('event not found');
      }
      values = event.dataValues;
    }
    if (process.env.NODE_ENV !== 'production') {
      return values;
    }
    await publish('ex-gateway', source, { domain, action, command, payload: values, user, socketId });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw error;
    }
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
  }
};