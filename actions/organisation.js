let pgPool, publish, axios;

module.exports = (injectedPgPool, injectedPublish, injectedAxios) => {
  pgPool = injectedPgPool;
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
    const fields = [];
    const values = [];
    for (let field in payload) {
      if (field === 'primary_contact') {
        if (!payload[field].id) {
          // create a user \\
          const user = await axios.post(`${process.env.EXAUTH}/auth/invite`, payload[field]);
          payload[field].id = user.id;
        }
        fields.push('user_id');
        values.push(payload[field].id);
      } else {
        fields.push(field);
        values.push(`'${payload[field]}'`);
      }
    }
    const queryString = `INSERT INTO organisations (${fields.join(',')}) VALUES (${values.join(',')})`;
    console.log('query', queryString);
    const organisation = await pgPool.query(queryString);
    publish('ex-gateway', { domain, action, command, payload: organisation, user, socketId });
  } catch (error) {
    console.log('error in insert', error);
    publish('ex-gateway', { error: error.message, domain, action, command, payload, user, socketId });
    throw error;
  }
};
const read = async ({ id }) => {
  console.log(id);
  const queryString = `SELECT * FROM organisations WHERE public_id='${id}'`;
  const organisation = await pgPool.query(queryString);
  publish('ex-gateway', organisation);
};
const update = async (data, user) => {
  console.log('data', data, user);
  const prepObj = [];
  for (let key in data) {
    prepObj.push(`${key}='${data[key]}'`);
  }
  const prepString = prepObj.join(', ');
  const queryString = `UPDATE organisations SET ${prepString} WHERE public_id='${id}'`;
  const organisation = await pgPool.query(queryString);
  console.log(organisation);
  publish('ex-gateway', organisation);
};
const remove = async (id, user) => {

};