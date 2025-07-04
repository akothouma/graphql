import { Endpoints } from "./constants.js"
import { displayError } from "./error.js"
import { updateUI } from "./profile.js"

export const queryApi = async () => {
  try {
    const jwt = localStorage.getItem('token')
    const response = await fetch(Endpoints.GRAPHQL_ENPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt} `
      },
      body: JSON.stringify({ query: Endpoints.QUERY_STRING })
    })

    const result = await response.json();
    console.log(result)
    updateUI(result.data)
  }
  catch (error) {
    displayError("Error getting profile", error)
  }

}
