let btnSignUp = document.querySelector(".btnSignUp");
let inputEmail = document.querySelector(".inputEmail");
let inputUsername = document.querySelector(".inputUsername");
let inputPassword = document.querySelector(".inputPassword");

let errorMessage = document.querySelector(".errorMessage");
let btnCloseError = document.querySelector(".btnCloseError");
let textBodyError = document.querySelector(".textBodyError");

let succcessSignUp = document.querySelector(".succcessSignUp");

btnSignUp.addEventListener("click", function () {
  let flag = 0;
  textBodyError.innerHTML = ``;
  let checkEmail = checkData(inputEmail.value.trim(), "email");
  let checkUsername = checkData(inputUsername.value.trim(), "username");
  let checkPassword = checkData(inputPassword.value, "password");
  let checkUserSignUp = checkData(
    inputEmail.value,
    "userSignUp",
    inputUsername.value
  );
  if (checkEmail != "valid") {
    let span = document.createElement("span");
    span.className = "textDetailed";
    span.textContent = `${checkEmail}`;
    textBodyError.appendChild(span);
    flag = 1;
  }
  if (checkUsername != "valid") {
    let span = document.createElement("span");
    span.className = "textDetailed";
    span.textContent = `${checkUsername}`;
    textBodyError.appendChild(span);
    flag = 1;
  }
  if (checkPassword != "valid") {
    let span = document.createElement("span");
    span.className = "textDetailed";
    span.textContent = `${checkPassword}`;
    textBodyError.appendChild(span);
    flag = 1;
  }
  if (checkUserSignUp != "valid" && flag == 0) {
    let span = document.createElement("span");
    span.className = "textDetailed";
    span.textContent = `${checkUserSignUp}`;
    textBodyError.appendChild(span);
    flag = 1;
  }
  if (flag == 1) {
    errorMessage.classList.add("displayMessage");
    setTimeout(() => {
      errorMessage.classList.remove("displayMessage");
    }, 1500);
  } else {
    let newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      username: inputUsername.value.trim(),
      email: inputEmail.value.trim(),
      password: inputPassword.value,
      created_at: new Date().toISOString(),
      boards: [],
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    succcessSignUp.classList.add("displayMessage");
    setTimeout(() => {
      succcessSignUp.classList.remove("displayMessage");
      window.location = getRedirectPath("login.html");
    }, 1000);
  }
});
