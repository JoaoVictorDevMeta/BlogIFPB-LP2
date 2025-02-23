import { describe, it, before } from "node:test";
import assert from "node:assert";
import request from "supertest";
import crypto from "node:crypto";
import app from "../app.js";

let user;
let token;
let userInvalid = {
    name: "João Victor",
    password: "123456!",
    course: "Informática",
};

async function getToken(user) {
    const response = await request(app).post("/auth/login").send(user);
    return response.body.token;
}

function createValidUser() {
    const validUser = {
        password: "12345678",
        course: "Informática"
    };

    const hash = crypto.randomBytes(20).toString("hex");
    validUser.name = `Valid ${hash}`;
    validUser.email = `valid-${hash}@email.com`;

    return validUser;
}

describe("api test", () => {
    before(async () => {
        user = createValidUser();
    });

    describe('açaõ de um usuário', () => {
        describe('POST /auth/register', () => {
            it("resgistrar um usuario", async () => {
                const response = await request(app).post("/auth/register").send(user);
                assert.strictEqual(response.statusCode, 201);
            })

            it("usuario ja existe", async () => {
                const response = await request(app).post("/auth/register").send(user);
                assert.strictEqual(response.statusCode, 400);
            })

            it("inputs inválidos", async () => {
                const response = await request(app).post("/auth/register").send(userInvalid);
                assert.strictEqual(response.statusCode, 400);
            })
        })

        describe("POST /auth/login", () => {
            it("login com sucesso", async () => {
                token = await getToken({
                    email: user.email,
                    password: user.password
                });
                assert.ok(token);
            })

            it("usuario não existe", async () => {
                const response = await request(app).post("/auth/login").send({
                    email: "notexist@gmail.com",
                    password: "123456!"
                });
                assert.strictEqual(response.statusCode, 401);
            })

            it("senha incorreta", async () => {
                const response = await request(app).post("/auth/login").send({
                    email: user.email,
                    password: "wrong password"
                });
                assert.strictEqual(response.statusCode, 401);
            })
        })

        describe("POST /category/create", () => {
            const hash = crypto.randomBytes(20).toString("hex");

            it("deve criar uma categoria", async () => {
                const response = await request(app)
                    .post("/category/create")
                    .set("Authorization", `Bearer ${token}`)
                    .send({ name: `Categoria ${hash}` });
                assert.strictEqual(response.statusCode, 201);
            })

            it("nao deve criar categoria com mesmo nome", async () => {
                const response = await request(app)
                    .post("/category/create")
                    .set("Authorization", `Bearer ${token}`)
                    .send({ name: `Categoria ${hash}` });
                assert.strictEqual(response.statusCode, 400);
            })
        })
    })
});
