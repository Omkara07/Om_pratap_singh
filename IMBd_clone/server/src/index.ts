import express, { Request, Response } from 'express'
import cors from 'cors'
import mainRouter from './routes/index'
// import { ConnectDB } from './db'
import axios from 'axios'
const app = express()
const PORT = 5000

// Middleware to set COOP headers
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    next();
});
const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use(express.json())
app.use(cors(corsOptions))

// ConnectDB();

app.use('/api/v1', mainRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
