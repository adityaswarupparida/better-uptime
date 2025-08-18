import { BULK_XADD } from "redis-pkg/client"
import prisma from "db/store"

async function pushWebsites() {
    // get all websites and push to queue
    const websites = await prisma.website.findMany({
        select: {
            id: true,
            url: true
        }
    });

    console.log(websites.length)

    await BULK_XADD(websites.map(website => ({ 
        id: website.id,
        url: website.url 
    })));
}

setInterval(() => {
    pushWebsites();
}, 3*1000*60) // Will execute this every 3 mins

pushWebsites();