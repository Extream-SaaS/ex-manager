module.exports = (sequelize, {Sequelize, Model, DataTypes}) => {
    class Page extends Model {
        static associate(models) {
            models.Page.hasOne(models.Page, {sourceKey: 'public_id', foreignKey: 'parent'});
        }
    }

    Page.init({
        public_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.UUID
        },
        content: {
            type: DataTypes.STRING
        },
        createdBy: {
            type: DataTypes.UUID
        }
    }, {
        sequelize,
        modelName: 'Page'
    });
    return Page;
};
