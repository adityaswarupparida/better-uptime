import axios from "axios";
import prisma from "db/store"
import { BULK_XACK, client, XREADGROUP } from "redis-pkg/client";

// Create consumer groups for regions
const REGION_ID = process.env.REGION_ID!;
const WORKER_ID = process.env.WORKER_ID!;

async function main() {
    while (1) {
        // get the data from queue
        const response = await XREADGROUP(REGION_ID, WORKER_ID);
        if (!response) continue;

        // hit and check websites
        const websites = response.map(msg => fetchWebsites(msg.message.id, msg.message.url));
        await Promise.all(websites);
        console.log(websites.length);

        // ack the websites
        await BULK_XACK(REGION_ID, response.map(({ id }) => id));
    }
} 

const fetchWebsites = async (id: string, url: string) => {
    return new Promise<void>((resolve, reject) => {
        const startTime = Date.now();

        axios.get(url)
            .then(async () => {
                const endTime = Date.now();
                await createWebsiteTick(endTime - startTime, "Up", id);
                resolve();
            })
            .catch(async () => {
                const endTime = Date.now();
                await createWebsiteTick(endTime - startTime, "Down", id);
                resolve();
            })
    });
}

const createWebsiteTick = async (responseTime: number, status: "Up" | "Down" | "Unknown", id: string) => {
    // await prisma.website_tick.create({
    //     data: {
    //         response_time_ms: responseTime,
    //         region_id: REGION_ID,
    //         website_status: status,
    //         website_id: id
    //     }
    // })
    await client.xAdd("betteruptime:website_tick",'*', {
            'websiteTick': JSON.stringify({
                website_id: id,
                website_status: status,
                response_time_ms: responseTime,
                region_id: REGION_ID,
                created_at: new Date().toISOString()
            })
        }
    );
}

main();