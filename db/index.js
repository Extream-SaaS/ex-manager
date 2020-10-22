const sequelizeLib = require("sequelize");
const PageModel = require("./models/page");
const OrganisationModel = require("./models/organisation");
const EventModel = require("./models/event");
const ItineraryModel = require("./models/itinerary");
const NoticeModel = require("./models/notice");
const UserNoticeModel = require("./models/userNotice");
const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";
const host = process.env.DB_HOST || `${dbSocketPath}/${process.env.CLOUD_SQL_INSTANCE}`;
const port = process.env.DB_PORT;
const config = {
    dialect: 'postgres',
    host,
    pool: {
        max: 1,
        min: 0,
        acquire: 3000,
        idle: 1000,
    },
};
if (port) {
    config.port = Number(port);
}

const sequelize = new sequelizeLib.Sequelize(process.env.CLOUD_SQL_DATABASE, process.env.CLOUD_SQL_USERNAME, process.env.CLOUD_SQL_PASSWORD, config);

const Page = PageModel(sequelize, sequelizeLib);
const Organisation = OrganisationModel(sequelize, sequelizeLib);
const Event = EventModel(sequelize, sequelizeLib);
const Itinerary = ItineraryModel(sequelize, sequelizeLib);
const Notice = NoticeModel(sequelize, sequelizeLib);
const UserNotice = UserNoticeModel(sequelize, sequelizeLib);
module.exports = async () => {
    if (process.env.MIGRATE === 'migration') {
        await sequelize.sync({ alter: true });
        console.log('tables sync complete');
    }
    return {
        sequelize,
        Page,
        Organisation,
        Event,
        Itinerary,
        Notice,
        UserNotice,
    };
};
