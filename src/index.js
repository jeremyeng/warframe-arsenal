import * as nodemon from 'nodemon';
import dotenv from 'dotenv';

dotenv.config();

console.log('Hello warframe arsenal!');
console.log(process.env.DATABASE_PASSWORD);
