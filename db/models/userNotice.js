module.exports = (sequelize, { Sequelize, Model, DataTypes }) => {
    class UserNotice extends Model {}
    const Notice = require('./notice')(sequelize, { Sequelize, Model, DataTypes });
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
    Notice.hasMany(UserNotice, { sourceKey: 'public_id', foreignKey: 'notice'});
    UserNotice.belongsTo(Notice, { targetKey: 'public_id', foreignKey: 'notice' });
    return UserNotice;
};