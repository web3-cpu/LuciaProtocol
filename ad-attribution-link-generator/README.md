# ad-attribution-link-generator


Link Generator - ReadMe

Features:

1. Free for all users - 
	
	 
	Generate a new, distinct, shorter URL based on the target URL.
	Input: target link (mandatory), platform (Optional - eg, Telegram, Twitter, etc.), channel (optional - e.g., crypto100, cryptoNation, etc.), alias (optional - To use an alias instead of generating a new link. Depends on whether the alias is taken or not)

Without Alias:

Request:

{
	"target": "https://myOrganisation.com",
	“Platform”: “telegram”,
	“channel”: “crypto100”,
}

Response:

{
	“done”: true,
	“link”: “https://lucia-lg/2jSx3iANNq”
}

With an Alias

Request:

{
	"target": "https://myOrganisation.com",
	“Platform”: “telegram”,
	“channel”: “crypto100”,
	“Alias”: “myOrg”
}

Response:

{
	“done”: true,
	“link”: “https://lucia-lg/myOrg”
}

Response error if alias already taken:

{
	
}


2. Premium users/accounts


Generate distinct links for specific platforms and their channels under advertising campaigns. This will helps premium users with detailed analytical insights of their user interactions and marketing patterns. Generate a new, distinct, shorter URL based on the target URL.
	Input: target link (mandatory), platform (Optional - eg, Telegram, Twitter, etc.), channel (optional - e.g., crypto100, cryptoNation, etc.), name of the ad campaign, the descrition for the ad campaign, alias (optional - To use an alias instead of generating a new link. Depends on whether the alias is taken or not)


Technologies:

1. Node.js
2. Express
3. Sequelize
4. Postgres
5. Pg Admin4
6. Rest Client (Eg - Insomnia)

Setup:

1. Install Postgres and Pg Admin 4 client for Postgres.
2. npm i to install all dependencies
3. Setting up database tables:
    1. In the project root directory: cd sequelize
    2. change the database name, port, hostname, username and password under /models/index.js file (to create the sequelize instance)
    3. after making changes run migrate scripts in the sequelize directory using below command: npx sequelize-cli db:migrate
    4. check db for 4 tables Campaigns, Channels, Generated_links and Platforms.
    5. come back to root directory - cd ..
    6. run the application using command: node . 
Finally use the REST client to send requests:

POST: http://localhost:8080/create/campaign
POST: http://localhost:8080/create/link 

use the above sample request to put in the link post request

For campaign requests add the “Authorization” field with the ‘’auth1” value (provision for future user authentication)





