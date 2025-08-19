import { beforeAll, describe, expect, it, test } from "bun:test";
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
        ).rejects.toHaveProperty("response.status", 400);
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

describe("can fetch website", () => {
    let user_id: string, token: string, user_id2: string, token2: string;
    
    beforeAll(async () => {
        const data = await createUser();
        const data2 = await createUser();
        user_id = data.user_id;
        token = data.jwt;
        user_id2 = data.user_id;
        token2 = data.jwt;
    })

    it("is able to fetch a website that the user created", async () => {
        const website = await axios.post(`${BACKEND_URL}/website`, {
            url: "https://google.com"
        }, {
            headers: { "Authorization": token }
        });

        const getWebsite = await axios.get(`${BACKEND_URL}/status/${website.data.id}`, {
            headers: { "Authorization": token }
        })

        console.log(getWebsite.data);
        expect(getWebsite.data.id).toBe(website.data.id);
        expect(getWebsite.data.user_id).toBe(user_id);
    })

    it("Can't fetch a website created by other user", async () => {
        const website = await axios.post(`${BACKEND_URL}/website`, {
            url: "https://google.com"
        }, {
            headers: { "Authorization": token }
        });

        try {
            await axios.get(`${BACKEND_URL}/website/status/:${website.data.id}`, {
                headers: { "Authorization": token2 }
            })
            expect(false, "Shouldn't be able to fetch other's website");
        } catch(e) {

        }
    })

})

describe("should be able to fetch websites", () => {
    let user_id: string, token: string, user_id2: string, token2: string;
    
    beforeAll(async () => {
        const data = await createUser();
        const data2 = await createUser();
        user_id = data.user_id;
        token = data.jwt;
        user_id2 = data.user_id;
        token2 = data.jwt;
    })

    it("is able to fetch websites that the user created", async () => {
        await axios.post(`${BACKEND_URL}/website`, {
            url: "https://outrbbsr.com"
        }, {
            headers: { "Authorization": token }
        });

        await axios.post(`${BACKEND_URL}/website`, {
            url: "https://twitter.com"
        }, {
            headers: { "Authorization": token }
        });

        await axios.post(`${BACKEND_URL}/website`, {
            url: "https://google.com"
        }, {
            headers: { "Authorization": token }
        });

        const getWebsites = await axios.get(`${BACKEND_URL}/websites`, {
            headers: { "Authorization": token }
        })

        console.log(getWebsites.data.length);
        expect(getWebsites.data.length == 3, "Couldn't fetch all its websites");
    })

})