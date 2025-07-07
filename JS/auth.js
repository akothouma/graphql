import { Elements } from "./elements.js"
import { displayError } from "./error.js";
import { Endpoints } from "./constants.js"
import { showDashboard } from "./index.js";
export const doLogin = async () => {
    try {
        const { emailElement, passwordElement, error } = Elements();
        const email = emailElement ? emailElement.value.trim() : "";
        const password = passwordElement ? passwordElement.value.trim() : "";
        error.innerHTML = "";
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
            showDashboard();
            const jwt = await response.json();
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
