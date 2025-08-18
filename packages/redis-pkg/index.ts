import { createClient } from "redis";

const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

const REDIS_STREAM_KEY = "betteruptime:website";

type WebsiteEvent = {
    id: string,
    url: string
} 

type RedisMessage = {
    name: string;
    messages: {
        id: string;
        message: {
            id: string;
            url: string;
        };
    }[];
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

export const XREADGROUP = async (consumerGroup: string, workerId: string) => {
    const res = await client.xReadGroup(
        consumerGroup,
        workerId, {
            key: REDIS_STREAM_KEY,
            id: '>'
        }, {
            COUNT: 5
        }
    );

    // console.log(JSON.stringify(res));
    if (!res) return undefined;

    const messages = (res as RedisMessage[])[0].messages;
    
    return messages;
}

const XACK = async (consumerGroup: string, id: string) => {
    await client.xAck(REDIS_STREAM_KEY, consumerGroup, id);
}

export const BULK_XACK = async (consumerGroup: string, websiteIds: string[]) => {
    for (const id of websiteIds) {
        await XACK(consumerGroup, id);
    }
}