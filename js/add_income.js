document.addEventListener("DOMContentLoaded",()=>{
    if(!protectPage()){
        return;
    }
});
document.getElementById("incomebtn").addEventListener("click",()=>income());
function income(){
    const title=document.getElementById("title").value;
    const amount=document.getElementById("amount").value;
    const date=document.getElementById("date").value;
    if(title.trim()===""||amount.trim()===""||date.trim()===""){
        showToast("Please fill all fields","error");
        return;
    }
    const formdata=new FormData();
    const incomebtn=document.getElementById("incomebtn");
    formdata.append("title",title);
    formdata.append("amount",amount);
    formdata.append("date",date);
    setLoading(incomebtn,"Adding...")
    apiCall("api/add_income.php","POST",formdata)
    .then(data=>{
        resetLoading(incomebtn,"Add Income");
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