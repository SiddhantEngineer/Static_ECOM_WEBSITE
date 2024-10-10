let registeredData = JSON.parse(localStorage.getItem("registeredData"));
let email = document.getElementById("email");
let password = document.getElementById("password");
let loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (!registeredData) {
    alert("Invalid username or password");
    return;
  }

  let userDetails = registeredData.find(
    (ele) => ele.email === email.value && ele.password === password.value
  );

  if (userDetails) {
    alert("Login Succesful");
    localStorage.setItem("Qusername", userDetails.username);
    location.href = "../homepage/home.html";
  } else {
    alert("Invalid username or password");
  }
});
