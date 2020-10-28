module.exports = (sequelize, { Sequelize, Model, DataTypes }) => {
    const Page = require('./page')(sequelize, { Sequelize, Model, DataTypes });
    class Itinerary extends Model {};

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
    Itinerary.belongsTo(Page, { targetKey: 'public_id', foreignKey: 'landing_page' });
    Itinerary.hasMany(Itinerary, { sourceKey: 'public_id', foreignKey: 'parent' });
    return Itinerary;
};