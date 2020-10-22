module.exports = (sequelize, { Sequelize, Model, DataTypes }) => {
    const Page = require('./page')(sequelize, { Sequelize, Model, DataTypes });
    const Event = require('./event')(sequelize, { Sequelize, Model, DataTypes });
    class Organisation extends Model {}

    Organisation.init({
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
        user_id: {
            type: DataTypes.UUID
        },
        createdBy: {
            type: DataTypes.UUID
        }
    }, {
        sequelize,
        modelName: 'Organisation'
    });
    Organisation.hasMany(Event, { sourceKey: 'public_id', foreignKey: 'organisation' });
    Event.belongsTo(Organisation, { targetKey: 'public_id', foreignKey: 'organisation' });
    // Organisation.belongsTo(Organisation, { targetKey: 'public_id', foreignKey: 'parent' });
    Organisation.hasMany(Organisation, { sourceKey: 'public_id',  foreignKey: 'parent' });
    Organisation.belongsTo(Page, { targetKey: 'public_id', foreignKey: 'landing_page' });
    return Organisation;
};