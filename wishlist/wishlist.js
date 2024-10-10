//profile popup
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

//cart data
let cartData = [];
let jsonCartData = localStorage.getItem("cartdata");
if (jsonCartData) {
  cartData = JSON.parse(jsonCartData);
  console.log(cartData);
}

//WishList
let wishContainer = document.getElementById("wish-container");
let wishData = [];
let jsonWishlistData = localStorage.getItem("wishdata");
if (jsonWishlistData) {
  wishData = JSON.parse(jsonWishlistData);
  console.log(wishData);
}

wishContainer.innerHTML = "";

wishData.forEach((ele) => {
  let isCartDisabled = "";
  if (cartData) {
    cartData.forEach((ele1) => {
      if (ele.id == ele1.id) {
        isCartDisabled = "disabled";
      }
    });
  }
  let subdiv = document.createElement("div");
  subdiv.classList.add("wish-element");
  subdiv.innerHTML = `
    <div>
      <img src="${ele.images[0]}">
      ${ele.title} $${ele.price} 
    </div>
    <div>
      <button class="remove-wish">Remove from Wishlist</button>
      <button class="cart-button" ${isCartDisabled}>Add to cart</button>
    </div>
  `;
  wishContainer.appendChild(subdiv);

  let removeWishButton = subdiv.getElementsByClassName("remove-wish")[0];
  removeWishButton.addEventListener("click", () => {
    wishData = wishData.filter((ele1) => ele1.id !== ele.id);
    localStorage.setItem("wishdata", JSON.stringify(wishData));
    subdiv.style.display = "none";
    if (wishData.length == 0) {
      displayNoWish();
    }
  });

  let cartButton = subdiv.getElementsByClassName("cart-button");
  cartButton[0].addEventListener("click", (e) => {
    cartData.push(ele);
    localStorage.setItem("cartdata", JSON.stringify(cartData));
    cartButton[0].disabled = true;
    wishData = wishData.filter((ele1) => ele1.id !== ele.id);
    localStorage.setItem("wishdata", JSON.stringify(wishData));
    subdiv.style.display = "none";
    if (wishData.length == 0) {
      displayNoWish();
    }
  });
});

if (wishData.length == 0) {
  displayNoWish();
}

function displayNoWish() {
  wishContainer.innerHTML = `
  <div id="wishlist-empty">
    No Pruducts in Wish List yet
    <a href="../homepage/home.html">Click Here to Checkout Products</a>
  </div>
  `;
}
