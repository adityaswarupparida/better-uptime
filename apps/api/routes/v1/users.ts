import { Router } from "express";
import { SignUpSchema } from "../../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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
    // console.log(parsedData.data);

    try {
        let hashedPassword: string = "";

        await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!), (err, hash) => {
            if (err) {
                res.status(500).json({
                    error: `Internal Server Error: ${err}`
                });
                return;
            }
            hashedPassword = hash;
        });
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        res.json({
            id: user.id
        })
    } catch (e) {
        res.status(409).json({
            message: "Error while signing up "+ e
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

        if (!user) {
            res.status(403).json({
                message: "Unauthorized"
            })
            return;
        }

        await bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                res.status(500).json({
                    error: `Error comparing passwords:, ${err}`
                });
                return;
            }

            if (!result) {
                res.status(400).json({
                    error: "Bad Request: Incorrect Password"
                });
                return;
            }
        });

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