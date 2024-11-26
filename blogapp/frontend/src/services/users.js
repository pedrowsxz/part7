import axios from "axios";
import storage from "./storage";

const baseUrl = '/api/users'

const getAllUsers = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => { return response.data })
}

export default { getAllUsers }