import express from 'express';
import cors from 'cors';
import { poolPromise } from './dbConfig.js';

const app = express();
app.use(cors()); 
app.use(express.json());

app.get('/data', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM plats');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
