/**
 * Created by Kiran Kuppa on 8/12/2014.
 */

;
var Sequelize = require("sequelize");
var Promise =   require("bluebird");
var sequelize;
var config;
var Merchant;
var Coupon;
var PurchaseRequirements;
var ProductDiscountReward;
var PriceDiscountReward ;


function importModels ( configuration )
{
    return new Promise( function( fulfill, reject ){
        config = configuration;
        var c = configuration;
        sequelize = new Sequelize(
            c.database,
            c.username,
            c.password,
            {dialect :'postgres', port:'5432',omitNull: true}

        );
        Merchant             =  sequelize.import( __dirname+"/merchant");
        Coupon	             =  sequelize.import( __dirname+"/coupon");
        PurchaseRequirements =  sequelize.import( __dirname+"/purchaserequiement");
        ProductDiscountReward = sequelize.import( __dirname+"/productdiscountreward");
        PriceDiscountReward =   sequelize.import( __dirname+"/pricediscountreward");
        fulfill( true );
    });

}
function setupAssociations(config)
{
    return new Promise( function( fulfill, reject){
        Merchant.hasMany( Coupon,{as:'Coupons'}) ;
        Coupon.hasMany( PurchaseRequirements,{as:'PurchaseRequirements'});
        Coupon.hasMany( ProductDiscountReward,{as:'ProductDiscounts'});
        Coupon.hasOne( PriceDiscountReward,{as:'PriceDiscountReward'});
        fulfill( true );
    });


}
function setupDataStructures( config )
{
    return new Promise( function( fulfill, reject ){
        importModels(config)
            .then( function( arg ){
                setupAssociations(config)
                    .then( function( arg ){
                        fulfill( true );
                    });
            })
    });
}


function createTables( config )
{
    return new Promise( function( fulfill, reject ){
        setupDataStructures(config)
            .then( function( arg ){
                sequelize.sync({force:config.force})
                    .then( function( arg ){
                        fulfill( true );
                    });
            })
    });


}

function syncDB( config )
{
    return new Promise( function( fulfill, reject ){
        setupDataStructures(config)
            .then( function( arg ){
                sequelize.sync({force:false})
                    .then( function( arg ){
                        fulfill( true );
                    });
            })
    });

}

function dropDB( config )
{
    return new Promise( function( fulfill, reject ){
        setupDataStructures(config)
            .then( function( arg ){
                sequelize.drop( {cascade:true})
                    .then( function (arg ){
                        fulfill( arg );
                    });
            })
    });
}
//==================== API ===========================


function addMerchant( merchant ) {
    return new Promise(function (fullfill, reject) {
        Merchant.create(merchant).success(function (m) {
            fullfill(m['id']);
        }).error(function (err) {
            reject(err);
        });
    });

}

function addCoupon( merchantid, coupon )
{
    return new Promise( function(fulfill, reject){
        Merchant.find( merchantid)
            .success( function(merchant){
                Coupon.create( coupon).success( function( cpn ){
                    merchant.setCoupons( [cpn] );
                    fulfill( cpn['id']);
                }).error( function( err ){
                    reject( err );
                })
            }).error( function( err ){
                reject( err );
            });
    });

}

function addCouponPurchaseRequirement( couponId, purchaseReqmt)
{
    return new Promise( function( fulfill, reject){
        Coupon.find( couponId )
            .success( function( coupon){
                PurchaseRequirements.create( purchaseReqmt )
                    .success( function( preqment ){
                        coupon.setPurchaseRequirements( [preqment]);
                        fulfill( coupon );
                    }).error( function( err ){
                        reject( err );
                    });
            }).error( function( err ){
                reject( err );
            })
    });
}

function addCouponProductDiscount( couponId, pdiscount)
{
    return new Promise( function( fulfill, reject){
        Coupon.find( couponId )
            .success( function( coupon){
                ProductDiscountReward.create( pdiscount )
                    .success( function( discounts ){
                        coupon.setProductDiscounts( [discounts] );
                        fulfill( coupon );
                    }).error( function( err ){
                        reject( err );
                    });
            }).error( function( err ){
                reject( err );
            })
    });
}

function addPriceDiscount( couponId, pricediscount )
{
    return new Promise( function( fulfill, reject ){
        Coupon.find( couponId)
            .success( function( coupon){
                PriceDiscountReward.create( pricediscount )
                    .success( function( pdiscount){
                        coupon.setPriceDiscountReward( pdiscount);
                        fulfill( coupon );
                    }).error( function( err ){
                        reject( err );
                    });
            }).error( function( err){

            });
    });

}


//==================================
// Execute standalone
 createTables({
     database:"test_db",
     username:"alchemyuser",
     password:"admin",
     dialect: "postgres",
     port:"5432",
     force:true

 }).then( function( arg ){
      console.log( "Database tables have been created successfully!");
 });

// ==================== Exports ===================
// Use this as a library module

var database ={};
database.createTables=createTables;
database.syncDB=syncDB;
database.dropDB = dropDB;

var models={
    "Merchant":Merchant,
    "Coupon":Coupon,
    "PurchaseRequirements":PurchaseRequirements,
    "ProductDiscountReward":ProductDiscountReward,
    "PriceDiscountReward":PriceDiscountReward
};

var api ={
    "addMerchant":addMerchant,
    "addCoupon":addCoupon,
    "addCouponPurchaseRequirement":addCouponPurchaseRequirement,
    "addCouponProductDiscount":addCouponProductDiscount,
    "addPriceDiscount":addPriceDiscount

};

database.models = models;
database.api = api;
module.exports = database;