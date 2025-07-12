import express from "express"; 
import prisma from "db/store";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post('/website', async (req, res) => {
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

app.get('/status/:websiteId', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server is listening at Port ${PORT}`)
})