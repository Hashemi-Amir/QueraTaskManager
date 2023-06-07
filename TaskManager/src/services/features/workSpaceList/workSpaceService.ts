import axios from "axios";
const API_URL = 'http://localhost:3000/api/workspace/';



const createWorkSpace = async (nameWorkspace:string,auth:any) => {
    const formData = {name : nameWorkspace}
    const response = await axios.post(API_URL + 'create' , formData ,auth)

    console.log(response.data.data);
    return response.data.data
}


const deleteWorkSpace = async (auth:any) => {
    console.log('delete');
    
    const id = '647f521255915239fec5eab8' 
    const response = await axios.delete(API_URL + id ,auth )
    console.log(response);
    return response.data
}




const updateWorkSpace = async (val:any,auth:any) => {
    const formData = {
        name : val,
        usernameOrId : 'sina2',
        image : 'image url'
    }
    console.log(formData);
    const id = '648062eaa73fe32ecad1613a'
    const response = await axios.patch(API_URL + id ,formData ,auth )
    console.log(response);
    return response.data
}

const addWorkSpaceMember = async (workID:any ,auth:any) => {
    console.log(auth);
    const [workSpaceId , userNameOrId] = [...workID]
    
    const us = `${workSpaceId}/members/${userNameOrId}`
    const response = await axios.put(API_URL + us ,auth)
    console.log(response);
    return response.data
}

const removeWorkSpaceMember = async (workID:any ,auth:any) => {
    console.log(auth);
    const [workSpaceId , userNameOrId] = [...workID]
    
    const us = `${workSpaceId}/members/${userNameOrId}`
    const response = await axios.delete(API_URL + us ,auth)
    console.log(response);
    return response.data
}
const WorkspaceService = {
    createWorkSpace,
    deleteWorkSpace,
    updateWorkSpace,
    addWorkSpaceMember,
    removeWorkSpaceMember
}


export default WorkspaceService;


