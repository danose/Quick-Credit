
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let connect;
if (process.env.NODE_ENV === 'test'){
  connect = process.env.DATABASE_TEST;
}
if (process.env.NODE_ENV === 'development'){
  connect = process.env.DATABASE_DEV;
}
if (process.env.NODE_ENV === 'production'){
  connect = process.env.DATABASE_URL;
}

const pool = new Pool({
  
  connectionString: connect
    
});

pool.on('connect', () => {
  console.log('connected to the db');
});
export default {
  /**
     * Database Query
     * @param {string} text
     * @param {Array} params
     * @returns {object} object
     */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })

        .catch((err) => {
          reject(err);
        });
    });
  }

};
