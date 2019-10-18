const server = require('./server.js');
const supertest = require('supertest');
//jest included globally

// /get endpoint
describe('GET /', () => {
    //should return HTTP 2oo & json  
    it('Return HTTP status code 200', () => {
        return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200)
            });
    });

    test('Return JSON', async () => {
        const response = await request(server).get('/');
        expect(response.type).toMatch(/json/i);
    });

    test('Return JSON using .then()', () => {
        return request(server)
            .get('/')
            .then(response => {
                expect(response.type).toMatch(/json/i);
            });
    });
});