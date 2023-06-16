# Nin Market

This is my project for a platform to facilitate trades within the game called Nin Online. The platform acts as an auction system, allowing players to trade valuable items and resources more efficiently and conveniently.

## Project Description

Nin Market is a solution dedicated to players of Nin Online, an anime-based multiplayer online game. Through this platform, players can engage in trades and negotiations of items, equipment, and resources in a secure and intuitive environment.

The platform offers advanced features for conducting transactions, including:

- Listing of items available for trade, with relevant details and information.
- Search functionality to find specific desired items.
- Auction system, allowing players to bid on contested items.
- Chat and messaging features to facilitate communication between players during negotiations.
- Transaction history for reference and control.

## Prerequisites

Before running the project, make sure you have the following tools installed in your development environment:

- PHP (v8.2 or higher)
- Composer (v2.x or higher)
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- PostgreSQL or another compatible database

## Installation

Follow the steps below to set up the project on your local machine:

1. Clone the repository to your development environment:

   ```bash
   git clone https://github.com/KamuiRyu/ninmarket.git
   ```

2. Navigate to 'ninmarket/web':

   ```bash
   cd ninmarket/web
   ```

3. Install Laravel dependencies using Composer:

   ```bash
   composer install
   ```

4. Copy the .env.example configuration file to .env:

   ```bash
   cp .env.example .env
   ```

5. Configure the .env file with your database information and other necessary settings.

6. Generate a new application key:

   ```bash
   php artisan key:generate
   ```

7. Install React frontend dependencies using npm:

   ```bash
   cd ./app
   npm install
   ```

## Running the Project

After installing the dependencies, you can run the project as follows:

1. Open a terminal window and navigate to the 'web' folder to start the Laravel server:

   ```bash
   php artisan serve
   ```

2. Open another terminal window and navigate to the 'app' folder to start the React server:

   ```bash
   cd app
   npm start
   ```

The Laravel server will be available at http://localhost:8000, while the React development server will be available at http://localhost:3000. Now you can start exploring and interacting with the Nin Online Exchange platform.

## Running Laravel and React Servers Simultaneously

To run both the Laravel and React servers simultaneously, you can use a custom script. Open a terminal window in the project's root folder and run the following command:

   ```bash
   npm install
   npm run dev
   ```

This will start both the Laravel server and the React server at the same time. You can access the complete platform through your web browser.

## Other Available Commands

In addition to the execution commands, there are other useful commands available:

- php artisan migrate: Runs database migrations.
- php artisan db:seed: Runs seeders to populate the database with example data.
- cd app && npm run build: Compiles the React frontend for production, generating an optimized version in a folder called public/build.
- cd app && npm run watch: Watches for changes in React frontend files and automatically compiles during development.

## License

This project is licensed under the MIT License.
