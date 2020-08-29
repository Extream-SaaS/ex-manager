const sequelizeLib = require("sequelize");
const PageModel = require("./models/page");
const OrganisationModel = require("./models/organisation");
const EventModel = require("./models/event");
const ItineraryModel = require("./models/itinerary");
const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";
const sequelize = new sequelizeLib.Sequelize(process.env.CLOUD_SQL_DATABASE, process.env.CLOUD_SQL_USERNAME, process.env.CLOUD_SQL_PASSWORD, {
    dialect: 'postgres',
    host: `${dbSocketPath}/${process.env.CLOUD_SQL_INSTANCE}`
});
const Page = PageModel(sequelize, sequelizeLib);
const Organisation = OrganisationModel(sequelize, sequelizeLib);
const Event = EventModel(sequelize, sequelizeLib);
const Itinerary = ItineraryModel(sequelize, sequelizeLib);
module.exports = async () => {
    if (process.env.MIGRATE === 'migration') {
        await sequelize.sync();
        console.log('tables sync complete');
    }
    return {
        sequelize,
        Page,
        Organisation,
        Event,
        Itinerary
    };
};
