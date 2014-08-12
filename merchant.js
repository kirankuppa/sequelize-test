module.exports =  function (sequelize, DataTypes){
    return sequelize.define( 'Merchant', {
            name:       {type:DataTypes.TEXT,allowNull:false,unique:true},
            code:       {type:DataTypes.INTEGER,allowNull:false,unique:true},
            date_of_joining: {type:DataTypes.DATE,allowNull:false,defaultValue:DataTypes.NOW}
        },
        {
            tableName:'merchant',
            underscored:true,
            timestamps:false

        }
    );
}
