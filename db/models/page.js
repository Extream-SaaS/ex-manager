module.exports = (sequelize, { Sequelize, Model, DataTypes }) => {
    class Page extends Model {}

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
        parent: {
            type: DataTypes.UUID,
            references: {
                model: Page,
                key: 'public_id'
            }
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