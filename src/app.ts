import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const corsOptions = {
    origin: ['http://localhost:3000',"https://the-messenger-production.up.railway.app"],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

const app: Application = express();
app.use(cors(corsOptions));
app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Yahoo!! The messenger server is running"
    })
});

app.use('/api', router);

app.use(globalErrorHandler);

export default app;