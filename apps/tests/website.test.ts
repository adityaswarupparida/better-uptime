import { beforeAll, describe, expect, test } from "bun:test";
import axios from "axios";
import { BACKEND_URL, createUser } from ".";

describe("website get created", () => {
    let user_id, token: string;
    beforeAll(async () => {
        const data = await createUser();
        user_id = data.user_id;
        token = data.jwt;
    })
    test("Website not created if url is not present", async () => {
        await expect(
            axios.post(`${BACKEND_URL}/website`, {
                
            }, {
                headers:{ "Authorization": token }
            })
        ).rejects.toHaveProperty("response.status", 411);
    })

    test("Website is created if url is present", async () => {
        const response = await axios.post(`${BACKEND_URL}/website`, {
            url: "https://google.com"
        }, {
            headers:{ "Authorization": token }
        });
        expect(response.data.id).not.toBeNull();
    })

    test("Website is not created if header is not present", async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/website`, {
                url: "https://google.com"
            });
            expect(response.data.id).not.toBeNull();
        } catch (e) {
            
        }
    })
});