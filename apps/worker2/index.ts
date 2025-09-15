import { BULK_XACK, XREADGROUP } from "redis-pkg/client";
import prisma from "db/store"

const REDIS_STREAM_KEY = "betteruptime:website_tick";
const GROUP_ID = "3899d3bb-b0c4-4daf-9955-292405de4eac";
const CONSUMER_ID = process.env.CONSUMER_ID!;

async function main() {
    while (1) {
        // get the data from queue
        const response = await XREADGROUP(GROUP_ID, CONSUMER_ID, 100, REDIS_STREAM_KEY);
        if (!response) continue;

        // parse website ticks
        const websiteTicks = response.map(msg => JSON.parse(msg.message.websiteTick));
        console.log(websiteTicks.length);
        // console.log(websiteTicks);

        // save to db
        await saveWebsiteTicks(websiteTicks);

        // ack the website ticks
        await BULK_XACK(GROUP_ID, response.map(({ id }) => id), REDIS_STREAM_KEY);
    }
}

main();

const saveWebsiteTicks = async (websiteTicks: any[]) => {
    try { 
        await prisma.website_tick.createMany({
            data: websiteTicks
        });
    } catch(e) {
        console.error(e);
    }
}