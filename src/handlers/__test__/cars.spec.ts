import request from 'supertest';
import app from '../../app';

describe('GET /cars', () => {
  let server: any;
  let token: string = '';
  beforeEach(() => {
    console.log(process.env.APP_PORT);
    server = app.listen(process.env.APP_PORT, () => {
      console.log(
        `Server is running on http://localhost:${process.env.APP_PORT}`
      );
    });
    request(app)
      .post('/api/auth/login')
      .send({ password: "1234567890", email: "weno@gmail.com" })
      .set('Content-type', 'application/json')
      .then(async (res) => {
        token = res.body.data.access_token
      });
  });

  afterEach((done) => {
    server.close(done);
  });

  it('should response with 200 as status code and return list of tweet', async () => {
    return request(app)
      .get('/api/cars')
      .set('Content-type', 'application/json')
      .set('Authorization', ("Bearer " + token))
      .then(async (res) => {
        expect(res.body.data.cars).toBeInstanceOf(Array);
      });
  });
});
