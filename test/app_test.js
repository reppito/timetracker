const request = require("supertest")
const app = require("../index")

describe("Test user", () => {
    it("handles POST request /user/create", done => {
        request(app)
            .post('/user/create')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                name: "test",
                lastname: "user",
                email: "test@test.com",
                password: "password123"

            })
            .expect(200, done)

    })
    it("handles Post request /user/create with an email already used", done => {
        request(app)
            .post('/user/create')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                name: "test",
                lastname: "user",
                email: "test@test.com",
                password: "password123"

            })
            .expect(409, done)

    })
    it(" Handles Get request /user/getuser/:email", done => {
        const email = 'test@test.com'
        request(app)
            .get(`/user/getuser/${email}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200, done)

    })

    it(" Handles Get request /user/getuser/:email doesn't exist", done => {
        const email = 'test@test1.com'
        request(app)
            .get(`/user/getuser/${email}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(404, done)

    })
})