import { Router } from "express";
import { SignUpSchema } from "../../types";
import jwt from "jsonwebtoken";
import prisma from "db/store";
const router = Router();

router.post("/signup", async (req, res) => {
    const parsedData = SignUpSchema.safeParse(req.body);
    if (!parsedData.success || parsedData.data === undefined) {
        res.status(400).json({
            error: parsedData.error
        })
        return;
    } 
    const { username, password } = parsedData.data;
    console.log(parsedData.data);

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password
            }
        })

        res.json({
            id: user.id
        })
    } catch (e) {
        res.status(409).json({
            message: "Username already exists"
        })
    }
});

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        })

        if (!user || user.password !== password) {
            res.status(403).json({
                message: "Unauthorized"
            })
            return;
        }

        let token = jwt.sign({
            sub: user.id
        }, process.env.JWT_SECRET!);

        res.json({
            jwt: token
        })
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
});

export default router;