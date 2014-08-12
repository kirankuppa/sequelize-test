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

DB.syncDB( config ).then( function( arg ){
    DB.dropDB( config)
        .then( function( arg ){
        console.log( "Dropped database ? "+arg );
    }).error( function( err ){
        console.log(" Unable to drop database "+err );
     }).catch( Error, function( err ){
         console.log( "Cannot drop the database "+ err );
      });

});