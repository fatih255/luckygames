import express from 'express';
import UserRoute from './routes/user';
import AuthRoute from './routes/auth'
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ensureLoggedIn } from './middleware'
import morgan from 'morgan';

const app = express();
const PORT = 8000;
dotenv.config()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(morgan('dev'))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.get('/', (req, res) => res.send('Express + TypeScript Server'));


app.use('/api/auth', AuthRoute);
app.use('/api/user', ensureLoggedIn, UserRoute);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});