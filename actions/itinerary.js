let Itinerary, publish, axios;

module.exports = (injectedItinerary, injectedPublish, injectedAxios) => {
  Itinerary = injectedItinerary;
  publish = injectedPublish;
  axios = injectedAxios;
  return {
    create,
    read,
    update,
    remove
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
    console.log(itinerary.dataValues);
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