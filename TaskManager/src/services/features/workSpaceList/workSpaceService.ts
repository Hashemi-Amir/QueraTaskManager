import axios from "axios";
import {toast } from 'react-toastify'
const API_URL = 'http://localhost:3000/api/workspace/';


const createWorkSpace = async (nameWorkspace:string,auth:any) => {
    const formData = {name : nameWorkspace}
    const response = await axios.post(API_URL + 'create' , formData ,auth)
    response.status === 201 ? toast.success('ورک اسپیس ساخته شد :)') : toast.error('مشکلی پیش اومده !')
    return response.data
}


const deleteWorkSpace = async (id:string,auth:any) => {  
    const response = await axios.delete(API_URL + id ,auth )
    response.status === 200 ? toast('ورک اسپیس پاک شد') : toast.error('مشکلی پیش اومده !')
    return response.data
}


const updateWorkSpace = async (data:object[],auth:any) => {
    const [value , id] = [...data]
    const formData = {
        name : value,
        usernameOrId : 'sina3',
        image : 'image url'
    }
    
    const response = await axios.patch(API_URL + id ,formData ,auth )
    response.status === 200 ? toast.success('نام ورک اسپیس تغییر یافت') : toast.error('مشکلی پیش اومده !')
    return response.data
}

const addWorkSpaceMember = async (workID:any ,auth:any) => {
    const [workSpaceId , userNameOrId] = [...workID]
    console.log(workSpaceId , userNameOrId);
    
    const us = `${workSpaceId}/members/${userNameOrId}`
    const response = await axios.put(API_URL + us , '_' ,auth)
    console.log(response);
    return response.data
}

const removeWorkSpaceMember = async (workID:any ,auth:any) => {
    
    console.log(workID);
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


