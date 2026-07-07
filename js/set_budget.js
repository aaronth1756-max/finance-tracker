document.addEventListener("DOMContentLoaded",()=>{
    if(!protectPage()){
        return;
    }
    loadcategories();
});
document.getElementById("budgetform").addEventListener("submit",saveBudget);
function loadcategories(){
    apiCall("api/get_categories.php")
    .then(data=>{
        console.log(data);
        const catform=document.getElementById("category");
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
function saveBudget(e){
    console.log("save button");
    e.preventDefault();
    const category=document.getElementById("category").value;
    const budget=document.getElementById("budget").value;
    const formdata=new FormData();
    formdata.append("category_id",category);
    formdata.append("budget",budget);
    apiCall("api/set_budget.php","POST",formdata)
    .then(data=>{
        console.log(data);
        if(data.success){
            showToast(data.message,"success");
            document.getElementById("budgetform").reset();
        }
        else{
            showToast(data.message,"error");
        }
    })
    .catch(handleError);
}