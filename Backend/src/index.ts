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
const allowedOrigins = [
    'http://localhost:3000', // Local development
    'https://hg-official-2024-lojc.vercel.app' // Deployed frontend urll :)
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true 
  }));
  
// app.use(cors({
//     origin: '*',
//     credentials: true
// }));
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