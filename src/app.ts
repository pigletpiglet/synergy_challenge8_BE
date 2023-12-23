import express, { Application } from 'express';
import CarsHandler from './handlers/cars';
import uploadFileUtil from './utils/uploadFileMemory';
import UsersHandler from './handlers/users';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerConfig } from './utils/swaggerOption';
import cors from 'cors';

import dotenv from 'dotenv';
import AuthHandler from './handlers/auth';
import AuthMiddleware from './middlewares/auth';
import UsersService from './services/users';
import UsersRepository from './repositories/users';
import CarsRepository from './repositories/cars';
import AuthService from './services/auth';
import CarsService from './services/cars';
dotenv.config();

// import formData from 'express-form-data';
const app: Application = express();

app.use(cors());

app.use(express.json());
// init Repo
const usersRepository = new UsersRepository();
const carsRepository = new CarsRepository();

// init Service
const usersService = new UsersService(usersRepository);
const authService = new AuthService(usersRepository);
const carsService = new CarsService(carsRepository);


// Init handlers
const usersHandler = new UsersHandler(usersService);
const carsHandler = new CarsHandler(carsService);
const authHandler = new AuthHandler(authService);

//swagger
const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Define routes

// routes for users
app.get(
    '/api/users',
    AuthMiddleware.authenticate,
    // TODO: add role checking middleware
    usersHandler.getUsers
);
app.post(
    '/api/users',
    // uploadFileUtil.single('profile_picture_url'), // single file
    uploadFileUtil.array('profile_pictures'), // multiple files
    usersHandler.createUser
);

// authentication routes
app.post('/api/auth/register', authHandler.register);
app.post('/api/auth/login', authHandler.login);
app.get('/api/auth/upgrade', AuthMiddleware.authenticateSuper, authHandler.setAdmin);
app.get('/api/auth/me', AuthMiddleware.authenticate, authHandler.getLoggedInUser);

// cars routes
app.get('/api/cars', carsHandler.getCars);
app.get('/api/cars/delete', AuthMiddleware.authenticateAdmin, carsHandler.deleteCar);

app.post(
    '/api/cars/edit',
    uploadFileUtil.single('picture'),
    AuthMiddleware.authenticateAdmin,
    carsHandler.editCar
);


app.post(
    '/api/cars',
    uploadFileUtil.single('picture'),
    AuthMiddleware.authenticateAdmin,
    carsHandler.createCar
);

export default app;
