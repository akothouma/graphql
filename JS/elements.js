export const Elements = () => {
    const emailElement = document.getElementById("email/username");
    const passwordElement = document.getElementById("password");
    const dashboard = document.getElementById("pageLayout");
    const loginPage= document.getElementById("loginPage")
    const loginButton= document.getElementById("login")
    const error=document.getElementById("errorDisplay")
    const logoutButton=document.getElementById("logout")

    return {
        email: emailElement ? emailElement.value.trim() : "",
        password: passwordElement ? passwordElement.value.trim() : "",
        logoutButton,
        dashboard,
        loginButton,
        loginPage,
        error
    }
}