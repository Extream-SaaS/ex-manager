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
const create = async ({source, domain, action, command, socketId, payload, user}) => {
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
    console.log('user', user);
    const organisation = await Organisation.create({ ...payload, createdBy: user.id });
    await publish('ex-gateway', source, { domain, action, command, payload: { ...payload, public_id: organisation.public_id }, user, socketId });
  } catch (error) {
    console.log('error in insert', error);
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
    throw error;
  }
};
const read = async ({ source, domain, action, command, socketId, payload, user }) => {
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
    await publish('ex-gateway', source, { domain, action, command, payload: organisation.dataValues, user, socketId });
  } catch (error) {
    console.log('publishing error', error);
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const update = async ({ source, domain, action, command, socketId, payload, user }) => {
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
    await publish('ex-gateway', source, { domain, action, command, payload: organisation.dataValues, user, socketId });
  } catch (error) {
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
  }
};
const remove = async ({ source, domain, action, command, socketId, payload, user }) => {
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
    await publish('ex-gateway', source, { domain, action, command, user, socketId });
  } catch (error) {
    await publish('ex-gateway', source, { error: error.message, domain, action, command, payload, user, socketId });
  }
};