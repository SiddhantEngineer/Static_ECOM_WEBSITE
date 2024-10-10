//Profile popup
let profileIcon = document.getElementById("profile-icon");
let profileMenu = document.getElementById("profile-menu");
let profileText = document.getElementById("profile-text");
let profileLogout = document.getElementById("profile-logout");

let username = localStorage.getItem("Qusername");

if (!username) {
  location.href = "../login/login.html";
}

profileText.innerHTML = "Hello " + username;

profileIcon.addEventListener("mouseenter", (e) => {
  profileMenu.style.display = "block";
});

profileLogout.addEventListener("click", () => {
  localStorage.setItem("Qusername", "");
  location.href = "../login/login.html";
});

profileMenu.addEventListener("mouseleave", () => {
  profileMenu.style.display = "none";
});

//WishList
let wishContainer = document.getElementById("wish-container");
let wishData = [];
let jsonWishlistData = localStorage.getItem("wishdata");
if (jsonWishlistData) {
  wishData = JSON.parse(jsonWishlistData);
  console.log(wishData);
}

//Cart Container
let cartContainer = document.getElementById("cart-container");
let cartData = [];
let jsonCartData = localStorage.getItem("cartdata");
if (jsonCartData) {
  cartData = JSON.parse(jsonCartData);
}
console.log(cartData);
cartContainer.innerHTML = "";

let totalPrice = 0;

cartData.forEach((ele) => {
  let isWishDisabled = "";
  if (wishData) {
    wishData.forEach((ele1) => {
      if (ele.id == ele1.id) {
        isWishDisabled = "disabled";
      }
    });
  }

  totalPrice += ele.price;
  let subdiv = document.createElement("div");
  subdiv.classList.add("cart-element");
  subdiv.innerHTML = `
    <div>
      <img src="${ele.images[0]}">
      ${ele.title} $${ele.price} 
    </div>
    <div>
      <button class="wish-button" ${isWishDisabled}>Add To Wishlist</button>
      <button class="remove-cart">Remove from the cart</button>
    </div>
  `;
  cartContainer.appendChild(subdiv);

  //wish
  let wishButton = subdiv.getElementsByClassName("wish-button");
  wishButton[0].addEventListener("click", (e) => {
    wishData.push(ele);
    localStorage.setItem("wishdata", JSON.stringify(wishData));
    wishButton[0].disabled = true;
  });
  //---------

  let removeCartButton = subdiv.getElementsByClassName("remove-cart")[0];
  removeCartButton.addEventListener("click", () => {
    cartData = cartData.filter((ele1) => ele1.id !== ele.id);
    localStorage.setItem("cartdata", JSON.stringify(cartData));
    subdiv.style.display = "none";
    totalPrice -= ele.price;
    priceContainer.innerText = `Total Price = $ ${totalPrice}`;
    if (cartData.length == 0) {
      displayEmptyCart();
    }
  });
});

let priceContainer = document.createElement("h3");
priceContainer.innerHTML = `Total Price = $ ${totalPrice} <button id="checkout">Check Out</button>`;

cartContainer.appendChild(priceContainer);

let checkOutButton = document.getElementById("checkout");
checkOutButton.addEventListener("click", () => {
  alert("Order Placed Succefully");
});

if (cartData.length == 0) {
  displayEmptyCart();
}

function displayEmptyCart() {
  cartContainer.innerHTML = `
    <div id="cart-empty">
      No Pruducts in Cart yet
      <a href="../homepage/home.html">Click Here to Checkout Products</a>
    </div>
  `;
}
