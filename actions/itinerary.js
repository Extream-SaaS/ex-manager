let Event, Itinerary, publish, axios;

module.exports = (injectedEvent, injectedItinerary, injectedPublish, injectedAxios) => {
  Event = injectedEvent;
  Itinerary = injectedItinerary;
  publish = injectedPublish;
  axios = injectedAxios;
  return {
    create,
    read,
    update,
    remove,
    get,
    assign,
    unassign
  };
};
const create = async ({source, domain, action, command, socketId, payload, user }) => {
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
      const itinerary = await event.createItinerary({ ...payload, createdBy: user.id });
      if (process.env.NODE_ENV !== 'production') {
        return itinerary;
      }
      await publish('ex-gateway', source, { domain, action, command, payload: { ...payload, public_id: itinerary.public_id }, user, socketId });
    } else {
      throw new Error('event is required');
    }
  } catch (error) {
    console.log('error in insert', error);
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
    throw error;
  }
};
const read = async ({ source, domain, action, command, socketId, payload, user }) => {
  try {
    const itinerary = await Itinerary.findOne({ 
      where: {
        public_id: payload.id 
      },
      exclude: ['id']
    });
    if (itinerary === null) {
      throw new Error('itinerary not found');
    }
    itinerary.dataValues.items = JSON.parse(itinerary.dataValues.items);
    if (process.env.NODE_ENV !== 'production') {
      return itinerary.dataValues;
    }
    await publish('ex-gateway', source, { domain, action, command, payload: itinerary.dataValues, user, socketId });
  } catch (error) {
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const update = async ({ source, domain, action, command, socketId, payload, user }) => {
  console.log('data', payload, user);
  try {
    const itinerary = await Itinerary.findOne({ 
      where: {
        public_id: payload.id 
      },
      exclude: ['id']
    });
    if (itinerary === null) {
      throw new Error('itinerary not found');
    }
    for (let field in payload) {
      itinerary[field] = payload[field];
    }
    await itinerary.save();
    if (process.env.NODE_ENV !== 'production') {
      return itinerary.dataValues;
    }
    await publish('ex-gateway', source, { domain, action, command, payload: itinerary.dataValues, user, socketId });
  } catch (error) {
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const remove = async ({ source, domain, action, command, socketId, payload, user }) => {
  console.log('data', payload, user);
  try {
    const itinerary = await Itinerary.findOne({ 
      where: {
        public_id: payload.id 
      }
    });
    if (itinerary === null) {
      throw new Error('itinerary not found');
    }
    await itinerary.destroy();
    if (process.env.NODE_ENV !== 'production') {
      return payload;
    }
    await publish('ex-gateway', source, { domain, action, command, user, socketId });
  } catch (error) {
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const get = async ({ source, domain, action, command, socketId, payload, user }) => {
  try {
    let values;
    if (payload.event) {
      const event = await Event.findOne({ 
        where: {
          public_id: payload.event 
        },
        include: Itinerary,
        exclude: ['id']
      });
      if (event === null) {
        throw new Error('event not found');
      }
      const itineraries = await event.getItineraries();
      if (itineraries === null) {
        throw new Error('itineraries not found');
      }
      values = itineraries.map(row => row.dataValues);
    } else {
      const itinerary = await Itinerary.findOne({ 
        where: {
          public_id: payload.id 
        },
        exclude: ['id']
      });
      if (itinerary === null) {
        throw new Error('itinerary not found');
      }
      values = itinerary.dataValues;
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
const assign = async ({ source, domain, action, command, socketId, payload, user}) => {
  try {
    const itinerary = await Itinerary.findOne({
      where: {
        public_id: payload.itinerary
      }
    });
    if (!itinerary) {
      throw new Error('itinerary not found');
    }
    const items = JSON.parse(itinerary.items) || [];
    items.push({
      type: action,
      id: payload.id
    });
    itinerary.items = JSON.stringify(items);
    console.log('pushing items', itinerary.items);
    await itinerary.save();
    if (process.env.NODE_ENV !== 'production') {
      return itinerary;
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw error;
    }
    throw error;
  }
};
const unassign = async ({ source, domain, action, command, socketId, payload, user}) => {
  try {
    const itinerary = await Itinerary.findOne({
      where: {
        public_id: payload.itinerary
      }
    });
    if (!itinerary) {
      throw new Error('itinerary not found');
    }
    const items = JSON.parse(itinerary.items) || [];
    const ind = items.indexOf(payload.id);
    items.splice(ind, 1);
    itinerary.items = JSON.stringify(items);
    await itinerary.save();
    if (process.env.NODE_ENV !== 'production') {
      return itinerary;
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw error;
    }
    throw error;
  }
};
