let btnSignIn = document.querySelector(".btnSignIn");
let inputEmail = document.querySelector(".inputEmail");
let inputPassword = document.querySelector(".inputPassword");
let inputCheckbox = document.querySelector(".inp-cbx");

let errorMessage = document.querySelector(".errorMessage");
let btnCloseError = document.querySelector(".btnCloseError");
let textBodyError = document.querySelector(".textBodyError");

let successSignIn = document.querySelector(".successSignIn");

btnSignIn.addEventListener("click",function(){
    let flag = 0;
    textBodyError.innerHTML=``;
    let checkEmail = checkData(inputEmail.value.trim(),"email");
    let checkPassword = checkData(inputPassword.value,"password");
    let checkUser = checkData(inputEmail.value.trim(), "user",inputPassword.value);
    if(checkEmail != "valid"){
        let span = document.createElement("span");
        span.className="textDetailed";
        span.textContent=`${checkEmail}`;
        textBodyError.appendChild(span);
        flag =1;
    } 
    if(checkPassword!="valid"){
        let span = document.createElement("span");
        span.className="textDetailed";
        span.textContent=`${checkPassword}`;
        textBodyError.appendChild(span);
        flag =1;
    }

    if(checkUser!="valid" && flag == 0){
        let span = document.createElement("span");
        span.className="textDetailed";
        span.textContent=`${checkUser}`;
        textBodyError.appendChild(span);
        flag = 1;
    }
    if(flag==1){
        errorMessage.classList.add("displayMessage");
        setTimeout(() => {
        errorMessage.classList.remove("displayMessage");
        }, 2000);
    } else {
        successSignIn.classList.add("displayMessage");
        setTimeout(() => {
        successSignIn.classList.remove("displayMessage");
        let user = users.find(element => element.email == inputEmail.value.trim())
        localStorage.setItem("user",JSON.stringify(user));
        window.location = "../pages/index.html";
        }, 1000);
        
    }
});