document.addEventListener("DOMContentLoaded",()=>{
    if(!protectPage()){
        return;
    }
    loadcategories();
});
document.getElementById("expensebtn").addEventListener("click",()=>expense());
function expense(){
    const category_id=document.getElementById("category_id").value;
    const title=document.getElementById("title").value;
    const amount=document.getElementById("amount").value;
    const date=document.getElementById("date").value;
    const expensebtn=document.getElementById("expensebtn");
    if(title.trim()===""||amount.trim()===""||date.trim()===""||category_id.trim()===""){
        showToast("Please fill all fields","error");
        return;
    }
    const formdata=new FormData();
    formdata.append("title",title);
    formdata.append("category_id",category_id);
    formdata.append("amount",amount);
    formdata.append("expense_date",date);
    setLoading(expensebtn,"Adding...")
    apiCall("api/add_expense.php","POST",formdata)
    .then(data=>{
        resetLoading(expensebtn,"Add Expense");
        showToast(data.message,"success");
        if(data.budgetexceeded){
            showToast(`⚠️Budget Exceeded!!\nSpent:${data.spent}\t\tBudget:${data.budget}`,"warning");
        }
    })
    .catch(handleError);
}
function loadcategories(){
    apiCall("api/get_categories.php")
    .then(data=>{
        console.log(data);
        const catform=document.getElementById("category_id");
        catform.innerHTML="";
        data.forEach(category=>{
            catform.innerHTML+=`
            <option value=${category.id}>
            ${category.name}
            </option>
            `;
        });
    })
    .catch(handleError)
}
function setLoading(button,text){
    button.disabled=true;
    button.textContent=text;
}
function resetLoading(button,text){
    button.disabled=false;
    button.textContent=text;
}