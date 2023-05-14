import axios from "axios";

const baseUrl = "http://localhost:3001/api/login"

const loginFromCredentials = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const loginFromToken = async token => {
    const config = {
        headers: { authorization: `Bearer ${token}`}
    }
    const response = await axios.post(`${baseUrl}/token`, token, config)
    return response.data
}

export default { loginFromCredentials, loginFromToken }