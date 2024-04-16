
# Car Auction Platform

This full stack web application designed to facilitate online auction platform. Built using modern web technologies such as React, Node.js, Express.js, PostgreSQL and Docker. 
The implementation utilizes RESTful API architecture to ensure smooth communication between the client and server components.


## Getting started
1. Clone the repository:

```
git clone https://github.com/dm-valdez/car-auction.git
```
2. CD to the project directory and create .env file.
```
cd car-auction
```
```bash
POSTGRES_USER=<YOUR_POSTGRES_USER>
POSTGRES_PASSWORD=<YOUR_POSTGRES_PASSWORD>
```
3. Run the docker-compose.yml file
```
docker-compose up -d
```
4. CD to the server directory and create another .env file.
```
cd server
```
```bash
POSTGRES_HOST=localhost
POSTGRES_DATABASE=postgres
POSTGRES_USER=<YOUR_POSTGRES_USER>
POSTGRES_PASSWORD=<YOUR_POSTGRES_PASSWORD>

SESSION_SECRET=<YOUR_SESSION_SECRET>
PORT=3000
```
5. Run this command in your server terminal.
```bash
# run this command to install all the dependencies required for the server to run.
yarn install

# run this command to execute database table migrations.
yarn migrate:latest

# run this command to populates the database with predefined data.
yarn migrate:seed

# run this command start the development server.
yarn dev
```
6. Open another terminal and CD to the client folder.
```
cd client
```
7. Finally run this command to wrap up the setup.
```bash
# run this command to install all the dependencies required for the client to run.
yarn install

# run this command start the React app.
yarn dev
```


##
Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

```bash
email: admin@example.com
password: user123
```

You can utilize the account created from the seed file to access the application with administrator privileges. 
Additionally, you have the option to register within the application. However, to transition your role to administrator, you'll need to manually adjust it in the database.
##
