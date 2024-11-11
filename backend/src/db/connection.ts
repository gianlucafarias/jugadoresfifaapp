import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME || 'fifaplayersdb';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '2340';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: 'localhost',
    dialect: 'mysql' 
  });

  export default sequelize;