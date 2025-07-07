import {Elements} from "./elements.js"
import { doLogin } from "./auth.js";
import { queryApi } from "./query.js";
const{ loginButton, dashboard, logoutButton,error }=Elements();

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
    queryApi();
    loginPage.hidden = true;
    dashboard.hidden = false;
}

function showLogin() {
    error.innerHTML="";
    dashboard.hidden = true;
    loginPage.hidden = false;
}

export{showDashboard,showLogin}