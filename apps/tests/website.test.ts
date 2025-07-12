import { describe, expect, test } from "bun:test";
import axios from "axios";

let BASE_URL = "http://localhost:3000";

describe("website get created", () => {
    test("Website not created if url is not present", async () => {
        await expect(
            axios.post(`${BASE_URL}/website`, {
                
            })
        ).rejects.toHaveProperty("response.status", 411);
    })

    test("Website is created if url is present", async () => {
        const response = await axios.post(`${BASE_URL}/website`, {
            url: "https://google.com"
        });
        expect(response.data.id).not.toBeNull();
    })
});