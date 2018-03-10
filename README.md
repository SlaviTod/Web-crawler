# Web-crawler

Web crawler for Laptops. 
Telerik Academy AlphaJS project.

Data storage: MariaDB.
Code-first approach. 
Migrations with Sequelize.

The crawler supports the following operations: 
•   npm run update - clear the database, gathers the information and stores it in MariaDB/MySQL instance;
•   npm run statistics COMMAND:params 
Statistics functionality 
    o Order by column name in table Laptops
         npm run statistics order-by-price 
         npm run statistics order-by-display
        For descending order at the end type -desc (case insensitive).
    o Filter by screen size, or price. Can be used for every column in table Laptops with number elements. 
    Note: Sequelize operators do not work correctly with float numbers. 
         npm run statistics filter:display:gt:15.3
         npm run statistics filter:price:lte:1500
        Sequelize operators functionality: gt; gte; lt; lte; ne.  
    o Search for a specific requirement
         npm run statistics search:site:name
         npm run statistics search:producer:name
    Note: search is case insensitive. 
