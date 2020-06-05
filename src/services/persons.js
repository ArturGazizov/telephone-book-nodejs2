import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log("A")


  
  return request.then(response => {
  	return response.data})
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}


const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const get = (id) => {
  return axios.get(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove ,get}
