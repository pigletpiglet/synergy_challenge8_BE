import request from 'supertest';
import app from '../../app';

describe('GET /auth/login', () => {
    let server: any;

    beforeEach(() => {
        server = app.listen(process.env.APP_PORT, () => {
            console.log(
                `Server is running on http://localhost:${process.env.APP_PORT}`
            );
        });
    });

    afterEach((done) => {
        server.close(done);
    });

    it('should response with 200 as status code and return token', async () => {
        return request(app)
            .post('/api/auth/login')
            .send({ password: "1234567890", email: "weno@gmail.com" })
            .set('Content-type', 'application/json')
            .then(async (res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.data).toBeInstanceOf(String);
            });
    });
});

describe('POST /auth/register', () => {
    let server: any;

    beforeEach(() => {
        server = app.listen(process.env.APP_PORT, () => {
            console.log(
                `Server is running on http://localhost:${process.env.APP_PORT}`
            );
        });
    });

    afterEach((done) => {
        server.close(done);
    });

    it('should response with 200 as status code and return token', async () => {
        return request(app)
            .post('/api/auth/register')
            .send(
                {
                    email: "tester@gmail.com",
                    name: "Tester1",
                    password: "1234567890",
                    profile_picture_url: "",
                }
            )
            .set('Content-type', 'application/json')
            .then(async (res) => {
                expect(res.statusCode).toBe(201);
                console.log(res.body.data);
                expect(res.body.data).toBeInstanceOf(String);
            });
    });
});