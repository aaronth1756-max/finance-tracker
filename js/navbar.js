const menubtn=document.getElementById("menutoggle");
const mobile=document.querySelector(".mobile-menu");
menubtn.addEventListener("click",()=>{
    mobile.classList.toggle("show");
})