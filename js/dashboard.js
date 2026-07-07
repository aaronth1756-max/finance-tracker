document.addEventListener("DOMContentLoaded",()=>{
    if(!protectPage()){
        return;
    }
    dashboard();
    transaction();
    loadmonth();
    report();
});
document.getElementById("transbutton").addEventListener("click",()=>{
    window.location.href="transaction.php";
});
const mbox=document.getElementById("month-chart-box");
const cbox=document.getElementById("cat-chart-box");
let allTransactions=[];
const transcontain=document.getElementById("transcontain");
document.getElementById("logout").addEventListener("click",()=>logout());
function dashboard(){
    apiCall("api/dashboard.php")
    .then(data=>{
        const dashcontain=document.getElementById("dashcontain");
        dashcontain.innerHTML="";
        dashcontain.innerHTML=`
        <div class="dashcard">
        <div class="dashboard income-card">
        <p>Total Income</p>
        <h2>${formatMoney(data.total_income)}</h2>
        </div>
        </div>
        <div class="dashcard">
        <div class="dashboard expense-card">
        <p>Total Expense</p>
        <h2>${formatMoney(data.total_expense)}</h2>
        </div>
        
        </div>
        <div class="dashcard">
        <div class="dashboard balance-card">
        <p>Total Balance</p>
        <h2>${formatMoney(data.balance)}</h2>
        </div>
        
        </div>
        `;
    })
    .catch(handleError);
}
function transaction(){
    apiCall("api/transaction.php")
    .then(data=>{
        console.log(data);
        allTransactions=data;
        renderTransaction(allTransactions);
    })
    .catch(handleError)
}
function loadmonth(){
    apiCall("api/month_report.php")
    .then(data=>{
        const ctx=document.getElementById("canvas");
        if(data.length===0){
            mbox.innerHTML=`
            <div class="empty-state">
            <h3>No Report data</h3>
            <p>Add transactions to generate analysis</p>
        </div>
            `;
            return;
        }
        console.log(data);   
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
                    data:values,
                    backgroundColor:"#4F7CFF",
                    hoverBackgroundColor:"#295BFF",
                    borderRadius:10,
                    borderWidth:0,
                    barPercentage:0.8,
                    categoryPercentage:0.7
                }]
            },
            options:{
                plugins:{
                    legend:{
                        display:false
                    },
                    tooltip:{
                        callbacks:{
                            label:function(context){
                                return formatMoney(context.raw)
                            }
                        }
                    }
                },
                scales:{
                    y:{
                        grid:{
                            color:"rgba(0,0,0,0.08)"
                        }
                    },
                    x:{
                        grid:{
                            display:false
                        }
                    }
                },
                animation:{
                    duration:3000
                }
            }
        });
    })
    .catch(handleError);
}
function report(){
    apiCall("api/report.php")
    .then(data=>{
        console.log(data);
        const ctx=document.getElementById("piecanvas");
        if(data.length===0){
            cbox.innerHTML=`
            <div class="empty-state">
            <h3>No Report data</h3>
            <p>Add transactions to generate analysis</p>
        </div>
            `;
            return;
        }
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
                    radius:"100%",
                    data:values,
                    backgroundColor:[
    "#4F7CFF",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#14B8A6",
    "#F97316",
    "#64748B"
],
borderColor:"#ffffff",
borderWidth:3,
hoverOffset:18
                }]
            },
            options:{
                responsive:true,
                maintainAspectRatio:false,
                plugins:{
                    legend:{
                        position:"bottom",
                        labels:{
                            boxWidth:14,
                            padding:15
                        },
                        
                    },
                    tooltip:{
                        callbacks:{
                            label:function(context){
                                return formatMoney(context.raw);
                            }
                        }
                    }
                },
                animation:{
                    duration:3000
                }
            }
        });
    })
    .catch(handleError);
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
function formatMoney(amount){
    return "BHD "+Number(amount).toFixed(2);
}
function logout(){
    localStorage.removeItem("token");
    showToast("Logged out successfully","success");
    window.location.href="login.php";
}
function renderTransaction(data){
    transcontain.innerHTML="";
    if(data.length===0){
        transcontain.innerHTML="<p>No Matching Transactions found</p>";
        return;
    }
        data.forEach(item=>{
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
}