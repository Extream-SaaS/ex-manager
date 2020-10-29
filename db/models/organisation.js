module.exports = (sequelize, {Sequelize, Model, DataTypes}) => {
    class Organisation extends Model {
        static associate(models) {
            models.Organisation.hasMany(models.Organisation, {sourceKey: 'public_id', foreignKey: 'parent'});
            models.Organisation.belongsTo(models.Page, {targetKey: 'public_id', foreignKey: 'landing_page'});
            models.Organisation.hasMany(models.Event, {sourceKey: 'public_id', foreignKey: 'organisation'});
        }
    }

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
    return Organisation;
};
