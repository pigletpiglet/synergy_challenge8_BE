import { Request, Response } from 'express';
import { DefaultResponse } from '../models/dto/default';
import { LoginRequest, RegisterRequest } from '../models/dto/auth';
import AuthService from '../services/auth';
import { isErrorType } from '../utils/checker';
import formData from 'express-form-data';

class AuthHandler {

    _authService: AuthService;

    constructor(authService: AuthService) {
        this._authService = authService;

        // Bind methods, so they can access the properties
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.setAdmin = this.setAdmin.bind(this);
    }


    async login(req: Request, res: Response) {
        const payload: LoginRequest = await req.body;
        const loginResponse = await this._authService.login(payload);

        if (isErrorType(loginResponse)) {
            const response: DefaultResponse = {
                status: 'BAD_REQUEST',
                message: loginResponse.message,
                data: null,
            };

            res.status(loginResponse.httpCode).send(response);
        } else {
            const response: DefaultResponse = {
                status: 'OK',
                message: 'User logged in succesfully',
                data: loginResponse,
            };

            res.status(200).send(response);
        }
    }

    async register(req: Request, res: Response) {
        const payload: RegisterRequest = await req.body;
        // Payload validation
        if (!payload.email) {
            const response: DefaultResponse = {
                status: 'BAD_REQUEST',
                message: 'Email cannot be empty',
                data: {
                    registered_user: null,
                },
            };

            res.status(400).send(response);
        }

        if (!payload.name) {
            const response: DefaultResponse = {
                status: 'BAD_REQUEST',
                message: 'Name cannot be empty',
                data: {
                    registered_user: null,
                },
            };

            res.status(400).send(response);
        }

        if (!payload.password) {
            const response: DefaultResponse = {
                status: 'BAD_REQUEST',
                message: 'Password cannot be empty',
                data: {
                    created_user: null,
                },
            };

            res.status(400).send(response);
        }

        if (payload.password && payload.password.length < 8) {
            const response: DefaultResponse = {
                status: 'BAD_REQUEST',
                message: 'Password must be longer than 8 characters',
                data: {
                    created_user: null,
                },
            };

            res.status(400).send(response);
        }

        const registeredUser = await this._authService.register(payload);

        if (isErrorType(registeredUser)) {
            const response: DefaultResponse = {
                status: 'BAD_REQUEST',
                message: registeredUser.message,
                data: null,
            };

            res.status(registeredUser.httpCode).send(response);
        } else {
            const response: DefaultResponse = {
                status: 'CREATED',
                message: 'User registered succesfully',
                data: {
                    registered_user: registeredUser,
                },
            };

            res.status(201).send(response);
        }
    }

    async setAdmin(req: Request, res: Response) {
        const queryEmail: string = req.query.email as string;

        const upgradedUser = await this._authService.setAdmin(queryEmail);


        if (isErrorType(upgradedUser)) {
            const response: DefaultResponse = {
                status: 'BAD_REQUEST',
                message: upgradedUser.message,
                data: null,
            };

            res.status(upgradedUser.httpCode).send(response);
        } else {
            const response: DefaultResponse = {
                status: 'OK',
                message: `User ${queryEmail} is upgraded to Admin status in succesfully`,
                data: upgradedUser,
            };

            res.status(200).send(upgradedUser);
        }
    }

    async getLoggedInUser(req: Request, res: Response) {
        const response: DefaultResponse = {
            status: 'OK',
            message: 'User logged in succesfully',
            data: {
                user: req.user,
            },
        };

        res.status(200).send(response);
    }
}

export default AuthHandler;
