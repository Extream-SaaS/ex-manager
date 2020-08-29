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
const create = async ({domain, action, command, socketId, payload, user}) => {
  try {
    const itinerary = await Itinerary.create({ ...payload, added_by: user.id });
    await publish('ex-gateway', { domain, action, command, payload: { ...payload, public_id: itinerary.public_id }, user, socketId });
  } catch (error) {
    console.log('error in insert', error);
    await publish('ex-gateway', { error: error.message, domain, action, command, payload, user, socketId });
    throw error;
  }
};
const read = async ({ domain, action, command, socketId, payload, user }) => {
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
    await publish('ex-gateway', { domain, action, command, payload: itinerary.dataValues, user, socketId });
  } catch (error) {
    await publish('ex-gateway', { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const update = async ({ domain, action, command, socketId, payload, user }) => {
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
    console.log(itinerary.dataValues);
    await publish('ex-gateway', { domain, action, command, payload: itinerary.dataValues, user, socketId });
  } catch (error) {
    await publish('ex-gateway', { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const remove = async ({ domain, action, command, socketId, payload, user }) => {
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
    await publish('ex-gateway', { domain, action, command, user, socketId });
  } catch (error) {
    await publish('ex-gateway', { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const get = async ({ domain, action, command, socketId, payload, user }) => {
  try {
    let values;
    if (payload.event) {
      const itineraries = await Itinerary.findAll({ 
        where: {
          event: payload.event 
        },
        include: Event,
        exclude: ['id']
      });
      if (itineraries === null) {
        throw new Error('event not found');
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
    await publish('ex-gateway', { domain, action, command, payload: values, user, socketId });
  } catch (error) {
    await publish('ex-gateway', { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const assign = async ({domain, action, command, socketId, payload, user}) => {
  try {
    const itinerary = await Itinerary.findOne({
      where: {
        public_id: payload.itinerary
      }
    });
    const items = itinerary.items;
    items.push(payload.id);
    itinerary.items = items;
    await itinerary.save();
  } catch (error) {
    console.log('error in insert', error);
    throw error;
  }
};
const unassign = async ({domain, action, command, socketId, payload, user}) => {
  try {
    const itinerary = await Itinerary.findOne({
      where: {
        public_id: payload.itinerary
      }
    });
    const items = itinerary.items;
    const ind = items.indexOf(payload.id);
    items.splice(ind, 1);
    itinerary.items = items;
    await itinerary.save();
  } catch (error) {
    console.log('error in insert', error);
    throw error;
  }
};
