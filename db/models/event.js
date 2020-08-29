module.exports = (sequelize, { Sequelize, Model, DataTypes }) => {
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
    Event.hasOne(Event, { sourceKey: 'public_id', foreignKey: 'parent' });
    Event.hasMany(Event, { sourceKey: 'parent', foreignKey: 'public_id' });
    Event.hasOne(Page, { sourceKey: 'public_id', foreignKey: 'landing_page' });
    return Event;
};