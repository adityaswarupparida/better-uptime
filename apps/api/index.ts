import express from "express"; 
import v1Router from "./routes/v1"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', v1Router);

app.listen(PORT, () => {
    console.log(`Server is listening at Port ${PORT}`)
})