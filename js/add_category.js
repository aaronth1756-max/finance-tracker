document.addEventListener("DOMContentLoaded",()=>{
    if(!protectPage()){
        return;
    }
});
document.getElementById("catbtn").addEventListener("click",()=>cat());
function cat(){
    const name=document.getElementById("name").value;
    if(name.trim()===""){
        showToast("Please fill the name","error");
        return;
    }
    const formdata=new FormData();
    const catbtn=document.getElementById("catbtn");
    formdata.append("name",name);
    setLoading(catbtn,"Adding...")
    apiCall("api/add_category.php","POST",formdata)
    .then(data=>{
        resetLoading(catbtn,"Add Category")
        console.log(data);
        if(data.success){
            showToast(data.message,"success");
        }
        else{
            showToast(data.message,"error");
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


