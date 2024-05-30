import axios from "axios";

const baseUrl = "http://localhost:3000/persons"

const getAllNumbers = () => axios.get(baseUrl)

const setNumber = (numberObj) => axios.post(baseUrl,numberObj)

const deleteNumber = (id) => axios.delete(`${baseUrl}/${id}`);

const updateNumber = (id,numberObj) => axios.put(`${baseUrl}/${id}`,numberObj)

export default {getAllNumbers,setNumber,deleteNumber,updateNumber}
