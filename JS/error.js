export const displayError=(errrorDetail,errorCode)=>{
 const errorMessage={
    status:"error",
    message:errrorDetail || "an unknown error occured.be patient as we are looking into it",
    code:errorCode||500
 };

 console.log("Error:",erroeMessage)
 return JSON.stringify({errorMessage})
}