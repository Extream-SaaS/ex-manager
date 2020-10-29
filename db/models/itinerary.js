module.exports = (sequelize, {Sequelize, Model, DataTypes}) => {
    class Itinerary extends Model {
        static associate(models) {
            models.Itinerary.belongsTo(models.Page, {targetKey: 'public_id', foreignKey: 'landing_page'});
            models.Itinerary.hasMany(models.Itinerary, {sourceKey: 'public_id', foreignKey: 'parent'});
            models.Itinerary.belongsTo(models.Event, {targetKey: 'public_id', foreignKey: 'event'});
        }
    }

    Itinerary.init({
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
            allowNull: true,
        },
        meta: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        start_date: {
            type: DataTypes.DATE,
        },
        end_date: {
            type: DataTypes.DATE,
        },
        items: {
            type: DataTypes.JSONB,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.UUID,
        },
    }, {
        sequelize,
        modelName: 'Itinerary'
    });

    return Itinerary;
};
