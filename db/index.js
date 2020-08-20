const sequelizeLib = require("sequelize");
const PageModel = require("./models/page");
const OrganisationModel = require("./models/organisation");
const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";
const sequelize = new sequelizeLib.Sequelize(process.env.CLOUD_SQL_DATABASE, process.env.CLOUD_SQL_USERNAME, process.env.CLOUD_SQL_PASSWORD, {
    dialect: 'postgres',
    host: `${dbSocketPath}/${process.env.CLOUD_SQL_INSTANCE}`
});
const Page = PageModel(sequelize, sequelizeLib);
const Organisation = OrganisationModel(sequelize, sequelizeLib);
module.exports = async () => {
    if (process.env.NODE_ENV === 'development') {
        await sequelize.sync({ force: true });
        console.log('tables sync complete');
    }
    return {
        Page,
        Organisation
    };
}