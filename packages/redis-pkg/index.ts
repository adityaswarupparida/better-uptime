import { createClient } from "redis";

export const client = await createClient()
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
            [x: string]: string
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

export const XREADGROUP = async (consumerGroup: string, workerId: string, count?: number, streamKey?: string) => {
    const res = await client.xReadGroup(
        consumerGroup,
        workerId, {
            key: streamKey || REDIS_STREAM_KEY,
            id: '>'
        }, {
            COUNT: count ?? 5
        }
    );

    if (!res) return undefined;
    // console.log(JSON.stringify(res));

    const messages = (res as RedisMessage[])[0].messages;
    
    return messages;
}

const XACK = async (consumerGroup: string, id: string, streamKey?: string) => {
    await client.xAck(streamKey || REDIS_STREAM_KEY, consumerGroup, id);
}

export const BULK_XACK = async (consumerGroup: string, messageIds: string[], streamKey?: string) => {
    for (const id of messageIds) {
        await XACK(consumerGroup, id, streamKey);
    }
}