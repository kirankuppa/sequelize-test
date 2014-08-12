/**
 * Created by Kiran Kuppa on 8/12/2014.
 */
var Sequelize = require("sequelize");
var Promise =   require("bluebird");
var DB =  require("./db");

var config ={
    database:"test_db",
    username:"alchemyuser",
    password:"admin",
    dialect: "postgres",
    port:"5432",
    force:false

};

var dbpromise = DB.syncDB( config );

// ============= Test Data ===================

var merchants =[
    {name:"Bukit Batok Food Factory",code:2331091},
    {name:"Ubi Food Court",code:7700023},
    {name:"Indian Food Stall",code:663293},
    {name:"Huan Xu, Opticals",code:799233}
];

var merchant_coupon={
    code:"Buy 2 Salwars and get a Scarf free"
};
var merchant_coupon2 ={
    code:"Buy groceries and fruits"
};

var purchaseRequirements =[
    {product_name:"Shampoo 100ml",product_code: "yxxasd",quantity:2,mandatory:true},
    {product_name:"Lux Soap Large",product_code: "ux10076sd",quantity:1,mandatory:false},
    {product_name:"Rupa Hair oil",product_code: "mn77019",quantity:1,mandatory:true}
];

var productDiscounts =[
    {product_code:"uux0888",product_name:"Rapeseed Oil 500ml",discountType:"cash",value:10,quantity:1},
    {product_code:"mxo90s",product_name:"Cashew Nuts 250gm",discountType:"percentage",value:25,quantity:1},
    {product_code:"j0dxud",product_name:"Ground Nuts 500gm",discountType:"percentage",value:15,quantity:2}
];

var priceDiscount = {
    discountType:'cash',
    value:'10.00',
    minimumPurchaseAmt:'49.99'
}

//===================== EXECUTE ==============================

var prmseAddMerchant;

dbpromise.then( function( arg ){
    if( arg )
    {
        prmseAddMerchant
        = DB.api.addMerchant( merchants[0])
            .then( function( merid ){
                console.log( "Created merchant "+merid );
                return merid;
            })
            .error( function( err ){
                console.log( "Error occured in creating a merchant "+err);
            });

        prmseAddMerchant.then( function( merid ){
            var prmseAddCoupon = DB.api.addCoupon( merid, merchant_coupon);
                prmseAddCoupon
                    .then( function( cpnId){
                        return cpnId;
                    }).error( function(err ){
                        console.log("Coupon could not be created "+err);
                    });
                /* Add a purchase requirement to coupon */
                prmseAddCoupon
                    .then( function(cpnId){
                        DB.api.addCouponPurchaseRequirement(cpnId , purchaseRequirements[0])
                            .then( function( cpn ){
                                console.log( "Purchase requirement added "+cpn);
                            });
                    });
                /* Add a purchase requirement to coupon */
                prmseAddCoupon
                    .then( function(cpnId){
                        DB.api.addCouponPurchaseRequirement(cpnId , purchaseRequirements[1])
                            .then( function( cpn ){
                                console.log( "Purchase requirement added "+cpn);
                            });
                    });
                /* Add a product discount to coupon */
                prmseAddCoupon
                    .then( function( cpnId ){
                        DB.api.addCouponProductDiscount(cpnId,productDiscounts[0])
                            .then( function( cpn ){
                                console.log( "Product discount added "+cpn);
                            });
                    });

                /* Add a product discount to coupon */
                prmseAddCoupon
                    .then( function( cpnId ){
                        DB.api.addCouponProductDiscount(cpnId,productDiscounts[1])
                            .then( function( cpn ){
                                console.log( "Product discount added "+cpn);
                            });
                    });

                /* Add another coupon */
                var prmseCoupon2 = DB.api.addCoupon(merid, merchant_coupon2);
                prmseCoupon2
                    .then( function( cpnId){
                        DB.api.addPriceDiscount(cpnId,priceDiscount)
                            .then( function( cpn ){
                                console.log( "Price discount coupon is added ");
                            });
                    });

            }
        );
    }

});
