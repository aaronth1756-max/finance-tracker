document.getElementById("registerbtn").addEventListener("click",()=>registeruser());
const username=document.getElementById("username");
const email=document.getElementById("email");
const password=document.getElementById("password");
const emailerror=document.getElementById("email-error");
const passworderror=document.getElementById("password-error");
const usernameerror=document.getElementById("username-error");
const allerror=document.getElementById("all-error");
email.addEventListener("input",()=>{
    emailerror.innerHTML="";
    allerror.innerHTML="";
})
password.addEventListener("input",()=>{
    passworderror.innerHTML="";
    allerror.innerHTML="";
})
username.addEventListener("input",()=>{
    usernameerror.innerHTML="";
    allerror.innerHTML="";
})
function registeruser(){
    const username=document.getElementById("username").value.trim();
    const email=document.getElementById("email").value.trim();
    const password=document.getElementById("password").value.trim();
    const registerbtn=document.getElementById("registerbtn");
    emailerror.innerHTML="";
    passworderror.innerHTML="";
    usernameerror.innerHTML="";
    allerror.innerHTML="";
    const emailregex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passregex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    let valid=true;
    if(username===""){
        usernameerror.innerHTML="Username Required";
        valid=false;
    }
    else if(username.length<3){
        usernameerror.innerHTML="Username must be atleast 3 characters";
        valid=false;
    }
    if(email===""){
        emailerror.innerHTML="Email Required";
        valid=false;
    }
    else if(!emailregex.test(email)){
        emailerror.innerHTML="Invalid Email Format";
        valid=false;
    }
    if(password===""){
        passworderror.innerHTML="Password required";
        valid=false;
    }
    else if(!passregex.test(password)){
        passworderror.innerHTML="Password must contain uppercase, lowercase, digit, special symbol and be at least 8 characters long";
        valid=false;
    }
    if(!valid){
        return;
    }
    const formdata=new FormData();
    formdata.append("username",username);
    formdata.append("email",email);
    formdata.append("password",password);
    setLoading(registerbtn,"Registering....")
    apiCall("api/register_api.php","POST",formdata,false)
    .then(data=>{
        resetLoading(registerbtn,"Register");
        console.log(data);
        if(data.success){
            window.location.href=
            "login.php?message="+
            encodeURIComponent("Account Created Successfully");
        }
        else{
            allerror.innerHTML=data.message;
        }
    })
    .catch(error=>{
        resetLoading(registerbtn,"Register");
        handleError(error);
    });
}
function setLoading(button,text){
    button.disabled=true;
    button.textContent=text;
}
function resetLoading(button,text){
    button.disabled=false;
    button.textContent=text;
}