module.exports = function( sequelize, DataTypes){

    return sequelize.define('PriceDiscountReward',
        {
            discountType:{type:DataTypes.ENUM('percentage','cash'), allowNull:false},
            value: {type:DataTypes.DECIMAL(8,2), allowNull:false},
            minimumPurchaseAmt:{type:DataTypes.DECIMAL(8,2),allowNull:false},
        },
        {
            tableName:'price_discount_reward',
            underscored:true,
            timestamps:false
        }
    );
}
