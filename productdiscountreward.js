/**
 * Created by Kiran Kuppa on 7/24/2014.
 */
module.exports = function( sequelize, DataTypes){

    return sequelize.define("ProductDiscountReward",
        {
            product_code:{ type: DataTypes.TEXT,allowNull:false},
            product_name:{type:DataTypes.TEXT,allowNull:false},
            discountType:{ type:DataTypes.ENUM,
                values:['percentage','cash'],
                allowNull:false
            },
            value:{ type: DataTypes.DECIMAL(8,2), allowNull:false},
            quantity:{ type: DataTypes.INTEGER, allowNull:false}

        },
        {
            tableName:'product_discount_reward',
            underscored:true,
            timestamps:false
        }
    );
}
