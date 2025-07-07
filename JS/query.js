import { Endpoints } from "./constants.js"
import { displayError } from "./error.js"
import { updateUI } from "./profile.js"
import {showLogin} from "./index.js"

export const queryApi = async () => {
  try {
    const jwt = localStorage.getItem('token')
    if(TokenExpired(jwt)){
      localStorage.removeItem('token')
      showLogin();
      return;
    }
    const response = await fetch(Endpoints.GRAPHQL_ENPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt} `
      },
      body: JSON.stringify({ query: Endpoints.QUERY_STRING })
    })

    const result = await response.json();
    updateUI(result.data)
  }
  catch (error) {
    displayError("Error getting profile", error)
  }

}

function TokenExpired(token){
  if(!token) return true;
  try{
    const payload=JSON.parse(atob(token.split('.')[1]))
    const exp=payload.exp;
    const now=Date.now()/1000;
    return now>exp;
  }catch{
    return true;
  }
}
