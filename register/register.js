let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let loginButton = document.getElementById("signin-button");

let registeredData = [];

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  let jsonData = localStorage.getItem("registeredData");

  if (jsonData) {
    registeredData = JSON.parse(jsonData);
    let userDetails = registeredData.find((ele) => ele.email === email.value);
    if (userDetails) {
      alert("User Already Exists");
    } else {
      registeredData.push({
        username: username.value,
        email: email.value,
        password: password.value,
      });

      localStorage.setItem("registeredData", JSON.stringify(registeredData));

      location.href = "../login/login.html";
    }
  } else {
    registeredData.push({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("registeredData", JSON.stringify(registeredData));

    location.href = "../login/login.html";
  }
});
