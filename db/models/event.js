module.exports = (sequelize, { Sequelize, Model, DataTypes }) => {
    const Page = require('./page')(sequelize, { Sequelize, Model, DataTypes });
    const Organisation = require('./organisation')(sequelize, { Sequelize, Model, DataTypes });
    class Event extends Model {};

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
        organisation: {
            type: DataTypes.UUID,
            references: {
                model: Organisation,
                key: 'public_id'
            }
        },
        parent: {
            type: DataTypes.UUID,
            references: {
                model: Event,
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
        modelName: 'Event'
    });
    return Event;
};