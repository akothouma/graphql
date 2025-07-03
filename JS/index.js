import {Elements} from "./elements.js"
import { doLogin } from "./auth.js";
const{ loginButton, dashboard, logoutButton }=Elements();

document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    if (token) {
        showDashboard();
    }else{
        showLogin();
    }
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        showLogin();
    
    })
      loginButton.addEventListener('click', () => {
        doLogin();    
    })

});

function showDashboard() {
    loginPage.hidden = true;
    dashboard.hidden = false;
}

function showLogin() {
    dashboard.hidden = true;
    loginPage.hidden = false;
}

export{showDashboard}