document.addEventListener("DOMContentLoaded",()=>{
    if(!protectPage()){
        return;
    }
    loadTransactions();
});
document.getElementById("loadmorebtn").addEventListener("click",()=>loadMore());
document.getElementById("sortSelect").addEventListener("change",()=>sortTransactions());
document.getElementById("searchinput").addEventListener("input",()=>searchTransactions());
document.getElementById("exportcsv").addEventListener("click",()=>exportcsv());
document.getElementById("exportpdf").addEventListener("click",()=>{
   exportpdf();
});
let allTransactions=[];
let visiblecount=10;
const transcontain=document.getElementById("transcontain");
function loadTransactions(){
    apiCall("api/all_transactions.php")
    .then(data=>{
        console.log(data);
        transcontain.innerHTML="";
    if(data.length===0){
        transcontain.innerHTML=`
        <div class="empty-state">
        <h3>No Transactions</h3>
        <p>Start by adding your first transaction!</p>
        </div>
        `;
        return;
    }
        allTransactions=data;
        renderTransaction(allTransactions);
    })
    .catch(handleError)
}
function renderTransaction(data){
    transcontain.innerHTML="";
    const visibleTransaction=data.slice(0,visiblecount);
        visibleTransaction.forEach(item=>{
            let sign="";
            let typeclass="";
            let badgeclass="";
            if(item.type==="income"){
                typeclass="income";
                badgeclass="income-badge"
                sign="+";
            }
            else{
                typeclass="expense";
                badgeclass="expense-badge"
                sign="-";
            }
            transcontain.innerHTML+=`
            <div class="transcard">
            <div class="trans-left">
            <h3>${item.title}</h3>
            <span class="${badgeclass}">
            ${item.type.toUpperCase()}</span>
            </div>
            <div class="trans-right">
            <h3 class="${typeclass}">${sign}${formatMoney(item.amount)}</h3>
            <p>${formatDate(item.transaction_date)}</p>
            </div> 
            </div>
            `;
        })
    updateLoadMoreButton(data);
}
function formatMoney(amount){
    return "BHD "+Number(amount).toFixed(2);
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
function searchTransactions(){
    const textInput=document.getElementById("searchinput").value.toLowerCase();
    let filteredTransactions=[];
    filteredTransactions=allTransactions.filter(item=>item.title.toLowerCase().includes(textInput));
    if(filteredTransactions.length===0){
        transcontain.innerHTML=`
        <div class="empty-state">
        <h3>No Results</h3>
        <p>No transactions match your search</p>
        </div>
        `;
        return;
    }
    renderTransaction(filteredTransactions);
}
function sortTransactions(){
    const sortText=document.getElementById("sortSelect").value;
    if(sortText==="newest"){
        allTransactions.sort((a,b)=>new Date(b.transaction_date)-new Date(a.transaction_date));
    }
    else if(sortText==="oldest"){
        allTransactions.sort((a,b)=>new Date(a.transaction_date)-new Date(b.transaction_date))
    }
    else if(sortText==="highestamount"){
        allTransactions.sort((a,b)=>b.amount-a.amount);
    }
    else if(sortText==="lowestamount"){
        allTransactions.sort((a,b)=>a.amount-b.amount);
    }
    renderTransaction(allTransactions);
}
function loadMore(){
    visiblecount=visiblecount+10;
    renderTransaction(allTransactions);

}
function exportcsv(){
    let csv="Title,Type,Amount,Date\n";
    allTransactions.forEach(item=>{
        csv+=`${item.title},${item.type},${item.amount},${item.transaction_date}\n`;
    });
    const blob=new Blob([csv],{type:"text/csv"});
const url=URL.createObjectURL(blob);
const a=document.createElement("a");
a.href=url;
a.download="transactions.csv";
a.click();
URL.revokeObjectURL(url);
}
function exportpdf(){
    fetch("api/export_pdf.php",{
        headers:getAuthHeaders()
    })
    .then(response=>{
        if(!response.ok){
            throw new Error("Download failed");
        }
        return response.blob()
    })
    .then(blob=>{
        const url=URL.createObjectURL(blob);
        const a=document.createElement("a");
        a.href=url;
        a.download="transactions.pdf";
        a.click();
        URL.revokeObjectURL(url);
    })
    .catch(handleError)
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