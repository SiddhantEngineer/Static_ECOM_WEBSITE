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

let productContainer = document.getElementById("product-container");
fetchData();

async function fetchData() {
  let response = await fetch("https://dummyjson.com/products");
  let data = await response.json();
  displayData(data.products);
}

//cart data
let cartData = [];
let jsonCartData = localStorage.getItem("cartdata");
if (jsonCartData) {
  cartData = JSON.parse(jsonCartData);
  console.log(cartData);
}

//wishlist data
let wishData = [];
let jsonWishlistData = localStorage.getItem("wishdata");
if (jsonWishlistData) {
  wishData = JSON.parse(jsonWishlistData);
  console.log(wishData);
}

function displayData(data) {
  data.forEach((element) => {
    let isCartDisabled = "";
    if (cartData) {
      cartData.forEach((ele) => {
        if (element.id == ele.id) {
          isCartDisabled = "disabled";
        }
      });
    }

    let isWishDisabled = "";
    if (wishData) {
      wishData.forEach((ele) => {
        if (element.id == ele.id) {
          isWishDisabled = "disabled";
        }
      });
    }

    let subdiv = document.createElement("div");
    subdiv.innerHTML = `
    <div class="product-image-container">
      <div class="product-image" style="background-image: url(${element.images[0]});"></div>
    </div>
    <div class="product-info-container">
    <h2>${element.category}</h2>
      <p class="product-title">${element.title}</p>
      <div>
        Ratings: ${element.rating}
      </div>
      <div>
        <button class="see-more");">Read More...</button>
      </div>
    <div class="product-price-info">
      <div class="product-price">$${element.price}</div>
        <div>
          <button class="wish-button" ${isWishDisabled}> Add to Wishlist <i class="fa-regular fa-heart"></i></button>
          <button class="cart-button" ${isCartDisabled}>Add to Cart <i class="fa-regular fa-cart-shopping"></i></button>
        </div>
      </div>
    </div>
    `;

    //Cart
    let cartButton = subdiv.getElementsByClassName("cart-button");
    cartButton[0].addEventListener("click", (e) => {
      cartData.push(element);
      localStorage.setItem("cartdata", JSON.stringify(cartData));
      cartButton[0].disabled = true;
    });
    //---------

    //wish
    let wishButton = subdiv.getElementsByClassName("wish-button");
    wishButton[0].addEventListener("click", (e) => {
      wishData.push(element);
      localStorage.setItem("wishdata", JSON.stringify(wishData));
      wishButton[0].disabled = true;
    });
    //---------

    let button = subdiv.getElementsByClassName("see-more");
    button[0].addEventListener("click", () => {
      let popup = document.getElementById("info-popup");
      popup.style.display = "flex";
      popup.innerHTML = `
        <div class="product-image-container">
      <div class="product-image" style="background-image: url(${element.images[0]});"></div>
    </div>
    <div class="product-info-container">
      <h2>${element.category}</h2>
      <button class="close-button">X</button>
      <p class="product-title">${element.title}</p>
      <div>
        Ratings: ${element.rating}
      </div>
    <div class="product-desc">
      ${element.description}
    </div>
    <div class="product-price-info">
      <div class="product-price">$${element.price}</div>
        <div>
          <button  ${isWishDisabled} class="wish-button"> Add to Wishlist <i class="fa-regular fa-heart"></i></button>
          <button  ${isCartDisabled} class="cart-button">Add to Cart <i class="fa-regular fa-cart-shopping"></i></button>
        </div>
      </div>
    </div>
      `;

      let cartButton = popup.getElementsByClassName("cart-button");
      cartButton[0].addEventListener("click", (e) => {
        cartData.push(element);
        localStorage.setItem("cartdata", JSON.stringify(cartData));
        cartButton[0].disabled = true;
      });

      let wishButton = popup.getElementsByClassName("wish-button");
      wishButton[0].addEventListener("click", (e) => {
        wishData.push(element);
        localStorage.setItem("wishdata", JSON.stringify(wishData));
        wishButton[0].disabled = true;
      });

      let closebutton = popup.getElementsByClassName("close-button");
      closebutton[0].addEventListener("click", () => {
        popup.style.display = "none";
      });
    });

    productContainer.appendChild(subdiv);
  });
}
