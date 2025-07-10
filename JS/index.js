import {Elements} from "./elements.js"
import { doLogin } from "./auth.js";
import { queryApi } from "./query.js";
const{ loginButton, dashboard, logoutButton, }=Elements();

document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    if (token) {
        showDashboard();
    }else{
        showLogin();
    }
    logoutButton.addEventListener('click', () => {
        showLogin();
    })
    loginButton.addEventListener('click', () => {
        doLogin();    
    })
    
});

function showDashboard() {
    queryApi();
    dashboard.classList.remove("hidden"); 
    loginPage.classList.add("hidden");    
}

function showLogin() {
    localStorage.removeItem('token');
    dashboard.classList.add("hidden");   
        loginPage.classList.remove("hidden"); 
        errorDisplay.textContent = ''; 
}

export{showDashboard,showLogin}