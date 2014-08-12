module.exports = function(sequelize, DataTypes){

    return MerchantCoupon = sequelize.define('MerchantCoupon',{
            code:{type:DataTypes.TEXT, allowNull:false},
            createdOn:{type:DataTypes.DATE,allowNull:false,defaultValue:DataTypes.NOW}
        },
        {
            tableName:'merchant_coupon',
            underscored:true,
            timestamps:false

        }
    );

}
