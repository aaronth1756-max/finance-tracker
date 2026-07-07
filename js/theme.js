const themebtn=document.getElementById("themebtn");
const theme=localStorage.getItem("theme");
if(theme=="darkmode"){
    document.body.classList.add("dark-theme");
}
themebtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        themebtn.textContent="☀️Light Mode";
        localStorage.setItem("theme","darkmode");
    }
    else{
        themebtn.textContent="🌙Dark Mode";
        localStorage.setItem("theme","lightmode");
    }
});