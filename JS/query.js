import { Endpoints } from "./constants.js"
import { displayError } from "./error.js"

export const queryApi=async()=>{
    try{
        const jwt=localStorage.getItem('token')
        const response= await fetch(Endpoints.GRAPHQL_ENPOINT,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${jwt} `
        },
        body:JSON.stringify({query:Endpoints.QUERY_STRING})
       })

       const result=await response.json()
    
    }
    catch(error){
      displayError("Error getting profile",error)
    }

}
