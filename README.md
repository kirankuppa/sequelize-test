sequelize-test
==============

# Overview
This is a scaled down version of the original code of a Marketing Software. This piece of code is used to pilot/test Sequelize ORM for node.js.
This can be used by others as a real life, practical usage of this new shiny tool. Let me provide an overview of the project that will let you get started with the code

# Project Brief
As I have mentioned, the domain area is Marketing and advertising. 

1. Merchant can publish coupons. Merchant has many Coupons
2. Each Coupon can have a coupon code
3. Each Coupon is applicable with certain purchase requirements
4. Each Coupon can reward user with certain product discounts
5. Each Coupon can reward user with a price discount

Corresponding to the above feature list, you could find the datanase tables setup , via Sequelize models

# Usage

Yeah, there are no unit tests at the moment. Am going to add shortly. For timebeing, it can used as follows

## Installation (on Win 7)

1. Install Node.js, Visual Studio Express 11, Postgres 9.3+, Python 2.7
2. Checkout the code into a directory
3. Set the following environment variables on your console
    set PYTHONPATH=C:\Python27
    set PYTHON=%PYTHONPATH%\python.exe
    set PATH=%PATH%;C:\Program Files\PostgreSQL\9.3\bin;
4. Execute "C:\Program Files\Microsoft Visual Studio 11.0\VC\vcvarsall.bat"
5. npm install --save sequelize
6. npm install --save bluebird
7. npm install --save pg
8. You might have to install node-gyp, I guess. Do check it out.
 
Now you are ready to execute the application.

1. Change the configuration variable to point to the database, and with appropriate user credentials
2. To create db tables , node db
2. To run the app, node app
3. To clean db, node clean
