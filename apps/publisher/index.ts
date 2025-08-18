import { BULK_XADD } from "redis-pkg/client"
import prisma from "db/store"

async function pushWebsites() {
    const websites = await prisma.website.findMany({
        select: {
            id: true,
            url: true
        }
    });

    await BULK_XADD(websites.map(website => ({ 
        id: website.id,
        url: website.url 
    })));
}

setInterval(() => {
    pushWebsites();
}, 3*1000*60) // Will execute this every 3 mins