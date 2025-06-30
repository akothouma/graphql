export const Elements = () => {
    const emailElement = document.getElementById("email/username");
    const passwordElement = document.getElementById("password");
    const dashboard = document.getElementById("pageLayout");
    const loginpage = document.getElementById("login")
    const logoutButton=document.getElementById("logout")

    return {
        email: emailElement ? emailElement.value : "",
        password: passwordElement ? passwordElement.value : "",
        logoutButton,
        dashboard,
        loginpage
    }
}