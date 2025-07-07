import { Elements } from "./elements.js";
export const displayError=(errrorDetail,errorCode)=>{
 const errorMessage={
    status:"error",
    message:errrorDetail || "an unknown error occured.be patient as we are looking into it",
    code:errorCode||500
 };
const{error}=Elements();
error.textContent=errorMessage.message;
error.style.color="red";

setTimeout(()=>{
   error.innerHTML=""
},2500)
}