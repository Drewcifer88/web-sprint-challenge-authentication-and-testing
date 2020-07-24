const supertest = require("supertest");
const server = require("./server");
const model = require("../auth/auth-model");
const db = require("../database/dbConfig");

beforeEach(() => {
    return db.migrate
        .rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run());
});

describe("server", () => {
    it("can run", () => {
        expect(true).toBeTruthy();
    });
    describe("GET /", () => {
        it("should return http status 200", () => {
            return supertest(server)
                .get("/")
                .then((response) => {
                    expect(response.status).toBe(200);
                    expect(response.status).toBeTruthy();
                });
        });
    });
    it("should return {api:up}", () => {
        return supertest(server)
            .get("/")
            .then((res) => {
                expect(res.body).toEqual({ api: "up" });
                expect(res.body.api).toBe("up");
                expect(res.body.api).toBeDefined();
            });
    });
});

describe("POST /api/users/register", () => {
    it("6th account created", function () {
        return supertest(server)
            .post("/api/auth/register")
            .send({ username: "Atticus", password: "123123" })
            .then((res) => {
                expect(res.body.user.id).toBe(6);
            });
    });
    it("return 201 created", function (done) {
        return supertest(server)
            .post("/api/auth/register")
            .send({ username: "Beth", password: "123123" })
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it("login works with a correct credentials?", function (done) {
        supertest(server)
            .post("/api/auth/register")
            .send({ username: "Drew", password: "123123" })
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
        return supertest(server)
            .post("/api/auth/login")
            .send({ username: "Drew", password: "123123" })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it("Length of user list", async () => {
        const users = await db("users");
        let length = users.length
        expect(length).toBe(5);
    });
});

describe("POST /api/users/login", () => {
    it("login works with correct credentials?", function (done) {
        return supertest(server)
            .post("/api/auth/login")
            .send({ username: "Clinton", password: "123123" })
            .expect(401)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});