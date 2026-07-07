document.addEventListener("DOMContentLoaded",()=>{
    const token=localStorage.getItem("token");
    if(token){
        window.location.href="dashboard.php";
    }
});
document.getElementById("loginbtn").addEventListener("click",()=>loginuser());
const email=document.getElementById("email");
const password=document.getElementById("password");
const emailerror=document.getElementById("email-error");
const passworderror=document.getElementById("password-error");
const allerror=document.getElementById("all-error");
const success=document.getElementById("success");
email.addEventListener("input",()=>{
    emailerror.innerHTML="";
    allerror.innerHTML="";
    success.innerHTML="";
    success.style.display="none";
})
password.addEventListener("input",()=>{
    passworderror.innerHTML="";
    allerror.innerHTML="";
    success.innerHTML="";
    success.style.display="none";
})
function loginuser(){
    const email=document.getElementById("email").value.trim();
    const password=document.getElementById("password").value.trim();
    const loginbtn=document.getElementById("loginbtn");
    emailerror.innerHTML="";
    passworderror.innerHTML="";
    allerror.innerHTML="";
    let valid=true;
    if(email===""){
        emailerror.innerHTML="Email Required";
        valid=false;
    }
    else if(!email.includes("@")){
        emailerror.innerHTML="Invalid Email";
        valid=false;
    }
    if(password===""){
        passworderror.innerHTML="Password Required";
        valid=false;
    }
    if(!valid){
        return;
    }
    const formdata=new FormData();
    formdata.append("email",email);
    formdata.append("password",password);
    setLoading(loginbtn,"Logging in.....")
    apiCall("api/login_api.php","POST",formdata,false)
    .then(data=>{
        resetLoading(loginbtn,"Login");
        if(data.success){
            localStorage.setItem("token",data.token);
            window.location.href="dashboard.php";
        }
        else{
            allerror.textContent=data.message;
        }
    })
    .catch(handleError);
}
function setLoading(button,text){
    button.disabled=true;
    button.textContent=text;
}
function resetLoading(button,text){
    button.disabled=false;
    button.textContent=text;
}