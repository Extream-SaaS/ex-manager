module.exports = (sequelize, {Sequelize, Model, DataTypes}) => {
    class UserNotice extends Model {
        static associate(models) {
            models.UserNotice.belongsTo(models.Notice, {targetKey: 'public_id', foreignKey: 'notice'});
        }
    }

    UserNotice.init({
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID
        },
    }, {
        sequelize,
        modelName: 'UserNotice'
    });

    return UserNotice;
};
