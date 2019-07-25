import request from 'supertest';
import app from './index';

describe('root api test',  () => {
  it('should return application information', async () => {
    const response = await request(app).get('/api');
    // console.log(response)
    expect(response.statusCode).toBe(200);

  });
});
