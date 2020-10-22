module.exports = (sequelize, { Sequelize, Model, DataTypes }) => {
    const Itinerary = require('./itinerary')(sequelize, { Sequelize, Model, DataTypes });
    const Page = require('./page')(sequelize, { Sequelize, Model, DataTypes });
    const Event = require('./event')(sequelize, { Sequelize, Model, DataTypes });
    class Notice extends Model {}

    Notice.init({
        public_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            unique: true
        },
        message: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.UUID
        }
    }, {
        sequelize,
        modelName: 'Notice'
    });
    Notice.belongsTo(Page, { targetKey: 'public_id', foreignKey: 'page' });
    Notice.belongsTo(Itinerary, { targetKey: 'public_id', foreignKey: 'itinerary' });
    Notice.belongsTo(Event, { targetKey: 'public_id', foreignKey: 'event' });
    return Notice;
};