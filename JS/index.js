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
    dashboard.hidden = false;
    loginPage.hidden = true;
}

function showLogin() {
    dashboard.hidden = true;
    loginPage.hidden = false;
    localStorage.removeItem('token');
}

export{showDashboard,showLogin}