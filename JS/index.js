import { loginPage, dashboard, logoutButton } from "./elements.js"
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    if (token) {
        showDashboard();
    }
});

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    showLogin();

})
function showDashboard() {
    loginPage.hidden = true;
    dashboard.hidden = false;
}

function showLogin() {
    dashboard.hidden = true;
    loginPage.hidden = false;
}