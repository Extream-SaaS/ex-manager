let Organisation, publish, axios;

module.exports = (injectedOrganisation, injectedPublish, injectedAxios) => {
  Organisation = injectedOrganisation;
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
    if (payload.primary_contact) {
      if (!payload.primary_contact.id) {
        // create a user \\
        const user = await axios.post(`${process.env.EXAUTH}/auth/invite`, payload[field]);
        payload.primary_contact.id = user.id;
      }
      payload.user_id = payload.primary_contact.id;
      delete payload.primary_contact;
    }
    payload.createdBy = user.public_id;
    const organisation = await Organisation.create({ ...payload, added_by: user.public_id });
    publish('ex-gateway', { domain, action, command, payload: { ...payload, public_id: organisation.public_id }, user, socketId });
  } catch (error) {
    console.log('error in insert', error);
    publish('ex-gateway', { error: error.message, domain, action, command, payload, user, socketId });
    throw error;
  }
};
const read = async ({ domain, action, command, socketId, payload, user }) => {
  try {
    console.log('reading');
    const organisation = await Organisation.findOne({ 
      where: {
        public_id: payload.id 
      },
      exclude: ['id']
    });
    if (organisation === null) {
      throw new Error('organisation not found');
    }
    console.log(organisation.dataValues);
    publish('ex-gateway', { domain, action, command, payload: organisation.dataValues, user, socketId });
  } catch (error) {
    console.log('publishing error', error);
    publish('ex-gateway', { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const update = async ({ domain, action, command, socketId, payload, user }) => {
  console.log('data', payload, user);
  try {
    const organisation = await Organisation.findOne({ 
      where: {
        public_id: payload.id 
      },
      exclude: ['id']
    });
    if (organisation === null) {
      throw new Error('organisation not found');
    }
    for (let field in payload) {
      organisation[field] = payload[field];
    }
    await organisation.save();
    console.log(organisation.dataValues);
    publish('ex-gateway', { domain, action, command, payload: organisation.dataValues, user, socketId });
  } catch (error) {
    publish('ex-gateway', { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const remove = async ({ domain, action, command, socketId, payload, user }) => {
  console.log('data', payload, user);
  try {
    const organisation = await Organisation.findOne({ 
      where: {
        public_id: payload.id 
      }
    });
    if (organisation === null) {
      throw new Error('organisation not found');
    }
    await organisation.destroy();
    publish('ex-gateway', { domain, action, command, user, socketId });
  } catch (error) {
    publish('ex-gateway', { error: error.message, domain, action, command, payload, user, socketId });
  }
};