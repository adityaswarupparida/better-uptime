import { createClient } from "redis";

const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

const REDIS_STREAM_KEY = "betteruptime:website";

type WebsiteEvent = {
    id: string,
    url: string
} 

const XADD = async ({ url, id }: WebsiteEvent) => {
    await client.xAdd(
        REDIS_STREAM_KEY, '*', {
            'url': url,
            'id': id
        }
    );
}

export const BULK_XADD = async (websites : WebsiteEvent[]) => {
    for (const website of websites) {
        await XADD({
            url: website.url,
            id : website.id 
        })
    }
}