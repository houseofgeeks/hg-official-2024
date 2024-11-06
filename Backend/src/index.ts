console.log("HELLO DUNIYA");
import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRoutes from './routes/index'
const PORT: number = 3000;
const app: Application = express();
app.use(cors());
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