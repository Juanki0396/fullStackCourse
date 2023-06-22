import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postOne = async (blogData, token) => {
    const headers = {
        Authorization: "Bearer " + token
    }
    const res = await axios.post("/api/blogs", blogData, { headers })
    return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll , postOne }
