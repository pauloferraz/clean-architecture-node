import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('should return a account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
