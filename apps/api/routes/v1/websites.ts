import prisma from "db/store";
import { Router } from "express";
import { middleware } from "../../middleware";
const router = Router()

router.use(middleware);

router.post('/', async (req, res) => {
    if (!req.body.url) {
        res.status(411).json({});
        return;
    }

    const website = await prisma.website.create({
        data: {
            url: req.body.url,
            user_id: req.userId!
        }
    })

    res.json({
        id: website.id
    })
})

router.get('/status/:websiteId', async (req, res) => {
    const website = await prisma.website.findFirst({
        where: {
            id: req.params.websiteId,
            user_id: req.userId
        },
        include: {
            ticks: {
                orderBy: { created_at: "desc" },
                take: 1
            }
        }
    })

    if (!website?.id) {
        res.status(409).json({
            message: "Website Not Found"
        })
    }

    res.json({
        website
    })
})

export default router;