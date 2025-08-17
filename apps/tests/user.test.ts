import axios from "axios";
import { describe, it, expect } from "bun:test";
import { BACKEND_URL } from ".";

const USER_NAME = Math.random().toString();
describe("signup endpoints", () => {
    it("Is able to sign up when body is incorrect", async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/user/signup`, {
                email: USER_NAME,
                password: "password"
            })
            expect(false, "Control shouldn't reach here");
        } catch(e) {
            // console.log(e);
        }
    })

    it("Is able to sign up when body is correct", async () => {
        const res = await axios.post(`${BACKEND_URL}/user/signup`, {
            username: USER_NAME,
            password: "password"
        })
        expect(res.status).toBe(200);
        expect(res.data.id).toBeDefined();
    })
})

describe("signin endpoints", () => {
    it("Is able to sign in when body is incorrect", async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/user/signin`, {
                email: USER_NAME,
                password: "password"
            })
            expect(false, "Control shouldn't reach here");
        } catch(e) {
            // console.log(e);
        }
    })

    it("Is able to sign in when body is correct", async () => {
        const res = await axios.post(`${BACKEND_URL}/user/signin`, {
            username: USER_NAME,
            password: "password"
        })
        expect(res.status).toBe(200);
        expect(res.data.jwt).toBeDefined();
    })
})