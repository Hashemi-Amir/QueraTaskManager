import axios from "axios";
const API_URL = 'http://localhost:3000/api/workspace/';



const createWorkSpace = async (nameWorkspace:string) => {
    const config = {
        headers : {
            'x-auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzhkNzgwOWM4ZDk4NGUxNWNjN2U3NiIsInVzZXJuYW1lIjoic2luYTIiLCJlbWFpbCI6InNpbmEubmlsaTA5NzJAZ21haWwuY29tIiwiaWF0IjoxNjg1OTgzNjQzLCJleHAiOjE2ODYwNzAwNDN9.QQeYnSplou1pWbZMPSclT1HDA2Gw901QhFCsirYk2iQ' 
        }
    }
    const formData = {name : nameWorkspace}
    
    const response = await axios.post(API_URL + 'create' , formData ,config)

    console.log(response.data.data);
    return response.data.data
}

const WorkspaceService = {
    createWorkSpace
}


export default WorkspaceService;


