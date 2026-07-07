document.addEventListener("DOMContentLoaded",()=>{
    if(!protectPage()){
        return;
    }
});
document.getElementById("repbtn").addEventListener("click",()=>loadmonth());
function loadmonth(){
    const repbtn=document.getElementById("repbtn");
    setLoading(repbtn,"Loading...");
    apiCall("api/month_report.php")
    .then(data=>{
        resetLoading(repbtn,"Load Monthly Report");
        console.log(data);
        const ctx=document.getElementById("canvas");
        const MonthNames=["","Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"]
        let labels=[];
        let values=[];
        data.forEach(item=>{
            labels.push(MonthNames[item.month]);
            values.push(item.total);
        });
        new Chart(ctx,{
            type:"bar",
            data:{
                labels:labels,
                datasets:[{
                    label:"Monthly Expense",
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