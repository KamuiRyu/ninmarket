# Nin Market

This is my project for a platform to facilitate trades within the game called Nin Online. The platform acts as an auction system, allowing players to trade valuable items and resources more efficiently and conveniently.

## Project Description

Nin Market is a solution dedicated to players of Nin Online, an anime-based multiplayer online game. Through this platform, players can engage in trades and negotiations of items, equipment, and resources in a secure and intuitive environment.

The platform offers advanced features for conducting transactions, including:

-   Listing of items available for trade, with relevant details and information.
-   Search functionality to find specific desired items.
-   Auction system, allowing players to bid on contested items.
-   Chat and messaging features to facilitate communication between players during negotiations.
-   Transaction history for reference and control.

## Prerequisites

Before running the project, make sure you have the following tools installed in your development environment:

-   Node.js (v14.0.0 or later)
-   React (v16.0.0 or later)
-   Nodemon (global installation required):

```bash
npm install -g nodemon
```

-   sequelize-cli (global installation required):

```bash
npm install -g sequelize-cli
```

-   sequelize (global installation required):

```bash
npm install -g sequelize
```

-   run all (global installation required):

```bash
npm install -g npm-run-all
```

These global dependencies are necessary for the proper functioning of the project. Nodemon is used for automatic server restarts during development, pg is a PostgreSQL driver for database connectivity, and sequelize-cli and sequelize are tools for interacting with the database using Sequelize ORM.

Make sure to have administrator or superuser permissions to install the global dependencies.

## Getting Started

### Installation

To get started with the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/KamuiRyu/ninmarket.git
```

2. Navigate to the project directory:

```bash
cd ninmarket
```

3. Install server dependencies:

```bash
npm install
```

4. Install app dependencies:

```bash
cd app
npm install
```

### if you installed run all, run the command below to install all react and node dependencies together:

```bash
npm-run-all
```

### Configuration

Before running the project, you need to configure the .env file. Follow the steps below:

1. In the project root directory, locate the .env.example file.
2. Make a copy of this file and rename it to .env.
3. Open the .env file in a text editor.
4. Configure the environment variables in the .env file according to your development environment. Refer to the provided example values for guidance.

It's important to never share the .env file publicly as it contains sensitive information. Keep it secure and protected in your development environment.

## Database Setup

Before running the project, you need to set up the database by running the migrations and seeds. Follow the steps below:

1. Make sure you have configured the database connection details in the .env file.

2. Run the migrations to create the necessary tables in the database:

```bash
npx sequelize-cli db:migrate
```

This command will execute the pending migrations and create the tables in the database.

2. (Optional) If you want to populate the database with sample data, you can run the seeds:

```bash
npx sequelize-cli db:seed:all
```

This command will execute the seed files and insert the predefined data into the tables.

Once the migrations and seeds are executed successfully, you can proceed to run the project using the provided instructions in the "Running the Project" section.

Note: Make sure you have installed the sequelize-cli globally by running the following command:

"npm install -g sequelize-cli"

This will install the sequelize-cli globally, allowing you to run the Sequelize commands.

## Running the Application

To start the project, you can use the following commands:

To run the React client:
 ```bash
npm run react
```

To run the Node.js server:
```bash
npm start
 ```

To run both the React client and Node.js server concurrently:
 ```bash
npm run dev
```

Remembering that it must be in the root folder of the project

Make sure to start the server before running the React client.

Now you're all set to use the Nin Market platform. Open your browser and visit "http://localhost:3001" to access the application.

Remember to copy the .env.example file and configure the necessary environment variables before running the project.

## Development and Deployment

During development, you can use the following command to run the development server with automatic restarts enabled:

```bash
npm start
```

Any changes you make to the code will be reflected immediately.

To deploy the project for production, you can build the optimized version using the following command:

```bash
npm run build
```

This will create a "build" folder with the compiled and optimized assets that can be deployed to a web server or hosting platform.

## Additional Scripts

### Generate Secret Key

To generate a secret key for your application, you can use the following command:

```bash
node generateSecretKey.js
```

This script will generate a random secret key that can be used to secure your application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
