console.log("HELLO DUNIYA");
import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRoutes from './routes/index'
import { config } from "dotenv";
import cookieParser from "cookie-parser";

config();

const PORT: number = parseInt(process.env.PORT!);
const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', apiRoutes);


const setUpStartServer = async (): Promise<void> => {
    app.listen(PORT, async () => {
        console.log("SERVER STARTED AT PORT", PORT);
    })
}

setUpStartServer();