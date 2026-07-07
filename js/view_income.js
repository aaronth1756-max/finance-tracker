document.addEventListener("DOMContentLoaded",()=>{
    if(!protectPage()){
        return;
    }
    income();
});

let selectedupdateid=null;
let selectedexpenseid=null;
let visiblecount=10;
let allIncomes=[];
document.getElementById("cancelbtn").addEventListener("click",()=>closeModal());
document.getElementById("loadmorebtn").addEventListener("click",()=>loadMore());
document.getElementById("deletebtn").addEventListener("click",()=>confirmModal());
document.getElementById("canceledit").addEventListener("click",()=>closeeditModal());
document.getElementById("updateedit").addEventListener("click",()=>updateModal());
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
function updateModal(){
    if(selectedupdateid!==null){
        updateincome();
        closeeditModal();
    }
}
function loadMore(){
    visiblecount=visiblecount+10;
    renderIncome(allIncomes);

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
function closeeditModal(){
    document.getElementById("editoverlay").style.display="none";
    selectedupdateid=null;
}
function formatMoney(amount){
    return "+BHD "+Number(amount).toFixed(2);
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
function income(){
    apiCall("api/get_income.php")
    .then(data=>{
        console.log(data);
        
        if(data.length===0){
            incomecontain.innerHTML=`
        <div class="empty-state">
            <h3>No Income Yet</h3>
            <p>Add income to start tracking!</p>
        </div>
    `;
            return;
        }
        allIncomes=data;
        renderIncome(allIncomes)
        
    })
    .catch(handleError)
}
function renderIncome(data){
    const visibleIncome=data.slice(0,visiblecount);
    const incomecontain=document.getElementById("incomecontain");
        incomecontain.innerHTML="";
        visibleIncome.forEach(income=>{
            incomecontain.innerHTML+=`
            <div class="expensecard">
            <div class="expensetop">
            <div>
            <h3>${income.title}</h3>
            </div>
            <h3 class="incomeamt">${formatMoney(income.amount)}</h3>
            </div>
            <div class="expensebottom">
            <span>${formatDate(income.income_date)}</span>
            <div class="actionbuttons">
            <button id="editexp" onclick="editModal(${income.id},'${income.title}',${income.amount},'${income.income_date}')">
            Edit
            </button>
            <button id="delexp" onclick="openDeleteModal(${income.id})">
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
function deletefun(id){
    const formdata=new FormData();
    formdata.append("id",id);
    apiCall("api/delete_income.php","POST",formdata)
    .then(data=>{
        console.log(data);
        if(data.success){
            showToast(data.message,"success");
            income();
        }
        else{
            showToast(data.message,"error");
        }
    })
    .catch(handleError);
}
function updateincome(){
    const title=document.getElementById("titlee").value;
    const amount=document.getElementById("amounte").value;
    const date=document.getElementById("datee").value;
    const formdata=new FormData();
    formdata.append("id",selectedupdateid);
    formdata.append("title",title);
    formdata.append("amount",amount);
    formdata.append("date",date);
    apiCall("api/update_income.php","POST",formdata)
    .then(data=>{
        if(data.success){
            showToast(data.message,"success");
            income();
        }
        else{
            showToast(data.message,"error")
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