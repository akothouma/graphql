import { Elements} from "./elements.js"
import { displayError } from "./error.js";
import { Endpoints } from "./constants.js"
const{email, password }=Elements();

export const doLogin = async () => {
    try {
        if (!email || !password) {
            displayError("All fields are required", 400)
            return
        }
        const response = await fetch(Endpoints.SIGNIN_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Basic ${btoa(`${email}:${password}`)}`,
                'Content-Type': 'application/json'
            },
        })

        if (response.ok) {
            const jwt = await response.json();
            console.log(jwt);
            localStorage.setItem('token', jwt);
        } else {
            if (email.includes('@')) {
                displayError("Email or password is incorrect", response.status);
                return
            }
            displayError("Username or password is incorrect", response.status);
            return;
        }
    } catch (error) {
        displayError("Error getting access token", error);
        return
    }
}
