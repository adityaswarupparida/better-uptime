import prisma from "db/store";
import { Router } from "express";
const router = Router()

router.post('/website', async (req, res) => {
    if (!req.body.url) {
        res.status(411).json({});
        return;
    }

    const website = await prisma.website.create({
        data: {
            url: req.body.url,
            user_id: ""
        }
    })

    res.json({
        id: website.id
    })
})

router.get('/status/:websiteId', (req, res) => {

})

export default router;