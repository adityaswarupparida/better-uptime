import axios from "axios";
import { password } from "bun";

export const BACKEND_URL = "http://localhost:3000";

const USER_NAME = Math.random().toString();
const PASSWORD = "1111111234444";

export const createUser = async (): Promise<{
    user_id: string,
    jwt: string
}> => {

    const user = await axios.post(`${BACKEND_URL}/user/signup`, {
        username: USER_NAME,
        password: PASSWORD
    });

    const response = await axios.post(`${BACKEND_URL}/user/signin`, {
        username: USER_NAME,
        password: PASSWORD
    })

    return {
        user_id: user.data.id,
        jwt: response.data.jwt
    }
}