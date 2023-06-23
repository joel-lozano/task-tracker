// Third party dependencies
import MongoStore from 'connect-mongo';
import sessions from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import express from 'express';
import path from 'path';

// Local dependencies
import taskRouter from './routes/task.routes';
import userRouter from './routes/user.routes';
import config from './config/server.config';
import User from './models/user.model';

mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 3000;
const app = express();

(async () => {
	try {
		await mongoose.connect(config.db);
        console.log('Connected to database successfully.');
	} catch (err: any) {
		console.error(err.message || 'Error connecting to database.');
		process.exit();
	}
})();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessions({
    store: MongoStore.create({
        mongoUrl: config.db,
        ttl: 24 * 60 * 60 * 1000,
        autoRemove: 'interval',
        autoRemoveInterval: 10
    }),
    secret: config.sessionSecret,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false,
    resave: false
}));

// Authentication
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', userRouter);
app.use('/tasks', taskRouter);

const clientBuildPath = '../client/build/';
app.use(express.static(path.join(__dirname, clientBuildPath)));

// For requests to unrecognized routes, defer to React app
app.use((req, res) => {
    res.sendFile(path.join(__dirname, clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
});