import sql from 'mssql'
const config = {
    server: 'AHLAM',
    database: 'FoodMood',
    user: 'ahlam',
    password: '123456789ahlam',
    options: {
        encrypt: false
    }
}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.error('Database Connection Failed:', err));

export { sql, poolPromise };