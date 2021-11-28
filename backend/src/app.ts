import "reflect-metadata"
import express from 'express';
import UserRoute from './routes/user';
import AuthRoute from './routes/auth'
import AdminRoute from './routes/admin';
import RoomRoute from './routes/room';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ensureLoggedIn, requireAdmin } from './middleware'
import morgan from 'morgan';


//express server configs
const app = express();
const PORT = 8000;
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(morgan('dev'))
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}))

//Routes
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.use('/api/auth', AuthRoute);
app.use('/api/user', ensureLoggedIn, UserRoute);
app.use('/api/room', ensureLoggedIn, RoomRoute);
app.use('/api/admin', ensureLoggedIn, requireAdmin, AdminRoute)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${process.env.SERVER_PORT}`);
});


export default app

