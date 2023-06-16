import AXIOS from "../utils/AXIOS";
const API_URL = "/api/board/";





const createBoard = async (data:(string | undefined)[]) => {
    const [name , projectId] = [...data]
    const formData = {name,projectId}
    const response = await AXIOS.post(API_URL , formData)
    console.log(response.data)
    return response.data
}


const deleteBoard = async (id:string) => {
    const response = await AXIOS.delete(API_URL+id )
    console.log(response.data)
    return response.data
}

const editBoardName = async (data:(string | undefined)[]) => {
    const [id, newName] = [...data];
    const formData = { name: newName };
    const response = await AXIOS.put(API_URL+id,formData)
    console.log(response);
    return response.data
    
}

const boardService = {
    createBoard,
    deleteBoard,
    editBoardName
}


export default boardService;
