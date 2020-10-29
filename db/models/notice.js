module.exports = (sequelize, {Sequelize, Model, DataTypes}) => {
    class Notice extends Model {
        static associate(models) {
            models.Notice.belongsTo(models.Page, {targetKey: 'public_id', foreignKey: 'page'});
            models.Notice.belongsTo(models.Itinerary, {targetKey: 'public_id', foreignKey: 'itinerary'});
            models.Notice.belongsTo(models.Event, {targetKey: 'public_id', foreignKey: 'event'});
            models.Notice.hasMany(models.UserNotice, {sourceKey: 'public_id', foreignKey: 'notice'});
        }
    }

    Notice.init({
        public_id: {
            type: DataTypes.UUID,
            unique: true
        },
        message: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.UUID
        }
    }, {
        sequelize,
        modelName: 'Notice'
    });
    return Notice;
};
