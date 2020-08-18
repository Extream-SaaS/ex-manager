let pgPool, publish;

module.exports = (injectedPgPool, injectedPublish) => {
  pgPool = injectedPgPool;
  publish = injectedPublish;
  return {
    create,
    read,
    update,
    remove
  };
};
const create = async (data, user) => {
  console.log('data', data, user);
  const queryString = `INSERT INTO organisations (name, website, user_id, parent, landing_page) VALUES ('${data.name}', '${data.website}', ${user.id}, ${data.parent}, '${data.landing_page}')`;
  const organisation = await pgPool.query(queryString);
  console.log(organisation);
  publish('ex-gateway', organisation);
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
