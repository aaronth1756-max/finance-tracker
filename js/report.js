document.addEventListener("DOMContentLoaded",()=>{
    if(!protectPage()){
        return;
    }
});
document.getElementById("repbtn").addEventListener("click",()=>report());
function report(){
    const token=localStorage.getItem("token");
    const repbtn=document.getElementById("repbtn");
    setLoading(repbtn,"Loading...");
    apiCall("api/report.php")
    .then(data=>{
        resetLoading(repbtn,"Load Report");
        console.log(data);
        const ctx=document.getElementById("canvas");
        let labels=[];
        let values=[];
        data.forEach(item=>{
            labels.push(item.name);
            values.push(item.total);
        });
        new Chart(ctx,{
            type:'pie',
            data:{
                labels:labels,
                datasets:[{
                    data:values
                }]
            }
        });
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