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

PageModel(sequelize, sequelizeLib);
OrganisationModel(sequelize, sequelizeLib);
EventModel(sequelize, sequelizeLib);
ItineraryModel(sequelize, sequelizeLib);
NoticeModel(sequelize, sequelizeLib);
UserNoticeModel(sequelize, sequelizeLib);

for (const model in sequelize.models) {
    if (Object.prototype.hasOwnProperty.call(sequelize.models, model)) {
        if (typeof sequelize.models[model].associate === 'function') {
            sequelize.models[model].associate(sequelize.models);
        }
    }
}

module.exports = async () => {
    if (process.env.MIGRATE === 'migration') {
        await sequelize.sync({ alter: true });
        console.log('tables sync complete');
    }
    return {
        sequelize,
        ...sequelize.models
    };
};
