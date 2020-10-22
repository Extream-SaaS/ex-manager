module.exports = (sequelize, { Sequelize, Model, DataTypes }) => {
    const Itinerary = require('./itinerary')(sequelize, { Sequelize, Model, DataTypes });
    const Page = require('./page')(sequelize, { Sequelize, Model, DataTypes });
    class Event extends Model {}

    Event.init({
        public_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        },
        start_date: {
            type: DataTypes.DATE
        },
        end_date: {
            type: DataTypes.DATE
        },
        createdBy: {
            type: DataTypes.UUID
        }
    }, {
        sequelize,
        modelName: 'Event'
    });
    // Event.belongsTo(Event, { targetKey: 'public_id', foreignKey: 'parent' });
    Event.hasMany(Event, { sourceKey: 'public_id', foreignKey: 'parent' });
    Event.belongsTo(Page, { targetKey: 'public_id', foreignKey: 'landing_page' });
    Event.hasMany(Itinerary, { sourceKey: 'public_id', foreignKey: 'event' });
    Itinerary.belongsTo(Event, { targetKey: 'public_id', foreignKey: 'event' });
    return Event;
};