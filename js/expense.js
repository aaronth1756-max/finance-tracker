document.addEventListener("DOMContentLoaded",()=>{
    if(!protectPage()){
        return;
    }
    expenses();
});
let selectedexpenseid=null;
let selectedupdateid=null;
let visiblecount=10;
let allExpenses=[];
document.getElementById("cancelbtn").addEventListener("click",()=>closeModal());
document.getElementById("loadmorebtn").addEventListener("click",()=>loadMore());
document.getElementById("canceledit").addEventListener("click",()=>closeeditModal());
document.getElementById("updateedit").addEventListener("click",()=>updateModal());
document.getElementById("deletebtn").addEventListener("click",()=>confirmModal());
document.getElementById("modaloverlay").addEventListener("click",(e)=>{
    if(e.target.id==="modaloverlay"){
        closeModal();
    }
});
document.getElementById("editoverlay").addEventListener("click",(e)=>{
    if(e.target.id==="editoverlay"){
        closeeditModal();
    }
});
function loadMore(){
    visiblecount=visiblecount+10;
    renderExpense(allExpenses);

}
function expenses(){
    apiCall("api/view_expenses.php")
    .then(data=>{
        console.log(data);
        
        if(data.length===0){
            expensecontain.innerHTML=`
        <div class="empty-state">
            <h3>No Expenses Yet</h3>
            <p>Add your first expense.</p>
        </div>
    `;
            return;
        }
        allExpenses=data;
        renderExpense(allExpenses);
        
    })
    .catch(handleError);
}
function renderExpense(data){
        const visibleExpense=data.slice(0,visiblecount);
        const expensecontain=document.getElementById("expensecontain");
        expensecontain.innerHTML="";
        visibleExpense.forEach(expense=>{
            expensecontain.innerHTML+=`
            <div class="expensecard">
            <div class="expensetop">
            <div>
            <h3>${expense.title}</h3>
            <span class="badge">
            <p>${expense.category.toUpperCase()}</p>
            </span>
            </div>
            <h3 class="expenses">${formatMoney(expense.amount)}</h3>
            </div>
            <div class="expensebottom">
            <span>${formatDate(expense.expense_date)}</span>
            <div class="actionbuttons">
            <button id="editexp" onclick="editModal(${expense.id},'${expense.title}',${expense.amount},'${expense.expense_date}')">
            Edit
            </button>
            <button id="delexp" onclick="openDeleteModal(${expense.id})">
            Delete
            </button>
            </div>
            </div>
            </div>
            
            `;
        });
        updateLoadMoreButton(data);
}
function updateLoadMoreButton(data){
    const loadmorebtn=document.getElementById("loadmorebtn");
    if(visiblecount>=data.length){
        loadmorebtn.style.display="none";
    }
    else{
        loadmorebtn.style.display="block";
    }
}
function updateModal(){
    if(selectedupdateid!==null){
        updateexpense();
        closeeditModal();
    }
}
function editModal(id,title,amount,date){
    
    document.getElementById("editoverlay").style.display="flex";
    const editform=document.getElementById("editform");
    editform.innerHTML="";
    editform.innerHTML=`
    <input type="text" placeholder="Expense title" id="titlee"><br><br>
    <input type="number" placeholder="Amount" id="amounte"><br><br>
    <input type="date" id="datee"><br><br>
    `;
    selectedupdateid=id;
    document.getElementById("titlee").value=title;
    document.getElementById("amounte").value=amount;
    document.getElementById("datee").value=date;
}
function deletefun(id){
    const formdata=new FormData();
    formdata.append("id",id);
    console.log(id);
    apiCall("api/delete_expense.php","POST",formdata)
    .then(data=>{
        console.log(data);
        if(data.success){
            showToast(data.message,"success");
            expenses();
        }
        else{
            showToast(data.message,"error");
        }
    })
    .catch(handleError);
}
function formatMoney(amount){
    return "-BHD "+Number(amount).toFixed(2);
}
function formatDate(dateString){
    const date=new Date(dateString);
    const options={
        day:'numeric',
        month:'short',
        year:'numeric'
    };
    return date.toLocaleDateString('en-GB',options);
}
function closeeditModal(){
    document.getElementById("editoverlay").style.display="none";
    selectedupdateid=null;
}
function updateexpense(){
    const title=document.getElementById("titlee").value;
    const amount=document.getElementById("amounte").value;
    const date=document.getElementById("datee").value;
    const formdata=new FormData();
    formdata.append("id",selectedupdateid);
    formdata.append("title",title);
    formdata.append("amount",amount);
    formdata.append("date",date);
    apiCall("api/edit_expense.php","POST",formdata)
    .then(data=>{
        if(data.success){
            showToast(data.message,"success");
            expenses();
        }
        else{
            showToast(data.message,"error");
        }
    })
    .catch(handleError);
    const editform=document.getElementById("editform");
    editform.innerHTML="";
}
function setLoading(button,text){
    button.disabled=true;
    button.textContent=text;
}
function resetLoading(button,text){
    button.disabled=false;
    button.textContent=text;
}
function openDeleteModal(id){
    selectedexpenseid=id;
    document.getElementById("modaloverlay").style.display="flex";
}
function closeModal(){
    document.getElementById("modaloverlay").style.display="none";
    selectedexpenseid=null;
}
function confirmModal(){
    if(selectedexpenseid!==null){
        deletefun(selectedexpenseid);
        closeModal();
    }
}