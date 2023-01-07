import express, {Express} from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import routes from './routes/routes'
if (process.env.NODE_ENV !== 'production') dotenv.config()
import {initDb} from "./db/connection";

initDb()
const app: Express = express();
const port = process.env.PORT;
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        credentials: true,
    })
)
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/', routes)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});