module.exports = (sequelize, { Sequelize, Model, DataTypes }) => {
    const Page = require('./page')(sequelize, { Sequelize, Model, DataTypes });
    class Organisation extends Model {};

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
        parent: {
            type: DataTypes.UUID,
            references: {
                model: Organisation,
                key: 'public_id'
            }
        },
        landing_page: {
            type: DataTypes.UUID,
            references: {
                model: Page,
                key: 'public_id'
            }
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