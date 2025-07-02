import { Endpoints } from "./constants.js"
export const queryApi=async()=>{
    try{
        const jwt=localStorage.getItem()
        const response= await fetch(Endpoints.GRAPHQL_ENPOINT,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${jwt} `
        },
        body:JSON.stringify({
          query:`{

          }`
        })
       })
    }
    catch(error){

    }

}