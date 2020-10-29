module.exports = (sequelize, {Sequelize, Model, DataTypes}) => {
    class Event extends Model {
        static associate(models) {
            models.Event.belongsTo(models.Organisation, {targetKey: 'public_id', foreignKey: 'organisation'});
            models.Event.hasMany(models.Event, {sourceKey: 'public_id', foreignKey: 'parent'});
            models.Event.belongsTo(models.Page, {targetKey: 'public_id', foreignKey: 'landing_page'});
            models.Event.hasMany(models.Itinerary, {sourceKey: 'public_id', foreignKey: 'event'});
        }
    }

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

    return Event;
};
