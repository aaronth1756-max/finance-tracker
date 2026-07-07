console.log("aron");
function checkResponse(response){
    if(!response.ok){
            throw new Error("Server error:"+response.status);
        }
    return response.json();
}
function showToast(message,type){
    const toast=document.createElement("div");
    toast.className=`toast ${type}-toast`;
    toast.textContent=message;
    document.getElementById("toastcontainer").appendChild(toast);
    setTimeout(()=>{
        toast.remove();
    },3000);
}
function handleError(error){
    console.log(error);
    if(error.message.includes("500")){
        showToast("Server problem.Please try again later","error");
    }
    else if(error.message.includes("401")){
            showToast("Session expired.Please login","error");
            localStorage.removeItem("token");
            window.location.href="login.php";
    }
    else{
            showToast(error.message,"error");
    }
    
}
function getAuthHeaders(){
    const token=localStorage.getItem("token");
    return {
        Authorization:`Bearer ${token}`
    };
}
function protectPage(){
    const token=localStorage.getItem("token");
    if(!token){
        showToast("Please login first","error");
        window.location.href="login.php";
        return false;
    }
    return true;
}
function apiCall(url,method="GET",body=null,auth=true){
    const options={
        method:method
    };
    if(auth){
        options.headers=getAuthHeaders();
    }
    if(body){
        options.body=body;
    }
    return fetch(url,options)
           .then(checkResponse);
}