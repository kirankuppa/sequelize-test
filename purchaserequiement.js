module.exports = function( sequelize, DataTypes){

    return sequelize.define('PurchaseRequirements',
        {
            product_code:{type:DataTypes.TEXT, allowNull:false},
            product_name:{type:DataTypes.TEXT,allowNull:false},
            quantity:{type:DataTypes.INTEGER, allowNull:false},
            mandatory:{type:DataTypes.BOOLEAN,allowNull:false, defaultValue:false}
        },
        {
            tableName:'purchase_requirements',
            underscored:true,
            timestamps:false
        }

    );
}
