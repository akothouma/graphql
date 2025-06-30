export const Elements=()=>{
        const emailElement=document.getElementById("email/username");
        const passwordElement=document.getElementById("password");
    return{
         email:emailElement?emailElement.value:"",
         password:passwordElement?passwordElement.value:""
    }
}