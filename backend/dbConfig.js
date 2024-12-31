import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true, 
    },
    authentication: {
        type: 'default', 
        options: {
            domain: process.env.DB_DOMAIN,
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.error('Database Connection Failed:', err));

export { sql, poolPromise };
