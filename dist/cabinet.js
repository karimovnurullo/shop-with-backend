"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const USERS_API = "http://10.10.2.141:1010/api/users/";
const PRODUCTS_API = "http://10.10.2.141:2020/api/products/";
const BASKETS_API = "http://10.10.2.141:3030/api/baskets/";
const profile = document.querySelector(".profile");
const profileName = document.querySelector(".profile-name");
const shopname = document.querySelector(".shopname");
const imgBox = document.querySelector(".imgbox");
const profileMenu = document.querySelector(".profile-menu");
const editProfile = document.querySelector(".edit-profile");
const logOut = document.querySelector(".log-out");
const addProduct = document.querySelector(".add-product");
const addProductOverlay = document.querySelector(".add-product-overlay");
const productsBox = document.querySelector(".products-box");
const productDiv = document.querySelector(".product");
const aboutProductOverlay = document.querySelector(".about-product-overlay");
const closeAboutProduct = document.querySelector(".close-about-product");
const aboutProduct = document.querySelector(".about-product");
const addProductForm = document.querySelector(".add-product-form");
const editProfileOverlay = document.querySelector(".edit-profile-overlay");
const editForm = document.querySelector(".edit-form");
const closeEditForm = document.querySelector(".close-edit-form");
const closeAddForm = document.querySelector(".close-add-form");
const editProductBtn = document.querySelector(".edit-product");
const editProductsOverlay = document.querySelector(".edit-products-overlay");
const closeEditProducts = document.querySelector(".close-edit-products");
const aditProductsBox = document.querySelector(".edit-products-box");
const productsNumber = document.querySelector(".products-number");
const editProductForm = document.querySelector(".edit-product-form");
const editProductOverlay = document.querySelector(".edit-product-overlay");
const closeEditProductForm = document.querySelector(".close-edit-product-form");
const deleteProductBtn = document.querySelector(".delete-product");
const basketBtn = document.querySelector(".basket");
const basketOverlay = document.querySelector(".basket-overlay");
const closeBasket = document.querySelector(".close-basket");
const basketProductsNumber = document.querySelector(".basket-products-number");
const basketIconNumber = document.querySelector(".basket-icon-number");
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    let href = location.search;
    if (href !== "") {
        const params = new URLSearchParams(href);
        const id = params.get("id");
        const reponse = yield fetch(`${USERS_API}${id}`);
        const data = yield reponse.json();
        return data.data;
    }
});
const getProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const reponse = yield fetch(`${PRODUCTS_API}`);
    const data = yield reponse.json();
    return data.data;
});
const getBaskets = () => __awaiter(void 0, void 0, void 0, function* () {
    const reponse = yield fetch(`${BASKETS_API}`);
    const data = yield reponse.json();
    return data.data;
});
// getProduct()
// =========================== Profile Setting Start =========================
getUser()
    .then((user) => {
    profileName.textContent = user.lastname + " " + user.firstname;
    shopname.textContent = user.shopname;
    const avatar1 = document.createElement("img");
    const avatar2 = document.createElement("img");
    avatar1.src = user.avatar;
    avatar2.src = user.avatar;
    profile.appendChild(avatar1);
    imgBox.appendChild(avatar2);
})
    .catch((error) => {
    console.error(error.message);
});
profile.addEventListener("click", () => profileMenu.classList.toggle("show"));
window.addEventListener("click", (event) => {
    if (!event.target.closest(".profile")) {
        profileMenu.classList.remove("show");
    }
});
addProduct.addEventListener("click", () => addProductOverlay.classList.add("show"));
closeAddForm.addEventListener("click", () => addProductOverlay.classList.remove("show"));
logOut.addEventListener("click", () => (window.location.href = "/"));
closeEditProducts.addEventListener("click", () => editProductsOverlay.classList.remove("show"));
closeEditProductForm.addEventListener("click", () => editProductOverlay.classList.remove("show"));
basketBtn.addEventListener("click", () => basketOverlay.classList.add("show"));
closeBasket.addEventListener("click", () => basketOverlay.classList.remove("show"));
// =========================== Profile Setting End =========================
// =========================== Edit Profile Start =========================
editProfile.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    editProfileOverlay.classList.add("show");
    try {
        const user = yield getUser();
        const { shopname, firstname, lastname, phone, date, email, password, avatar, } = user;
        editForm.shopname.value = shopname;
        editForm.firstname.value = firstname;
        editForm.lastname.value = lastname;
        editForm.phone.value = phone;
        editForm.date.value = date;
        editForm.email.value = email;
        editForm.password.value = password;
        editForm.avatar.value = avatar;
    }
    catch (error) {
        console.error("Error editing user:", error.message);
    }
}));
editForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    let shopname = editForm.shopname.value;
    let firstname = editForm.firstname.value;
    let lastname = editForm.lastname.value;
    let phone = editForm.phone.value;
    let date = editForm.date.value;
    let email = editForm.email.value;
    let password = editForm.password.value;
    let avatar = editForm.avatar.value;
    let updatedUser = {
        shopname,
        firstname,
        lastname,
        phone,
        date,
        email,
        password,
        avatar,
    };
    try {
        getUser().then((user) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield fetch(`${USERS_API}${user.id}`, {
                method: "PUT",
                body: JSON.stringify(updatedUser),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const { data } = yield res.json();
            console.log("data =", data);
            window.location.href = `../cabinet/?id=${user.id}`;
        }));
    }
    catch (error) {
        console.error("Error updating user:", error.message);
    }
    // }
}));
closeEditForm.addEventListener("click", () => editProfileOverlay.classList.remove("show"));
// =========================== Edit Profile End =========================
// =========================== Add Prodcut Start =========================
addProductForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const name = addProductForm.productname.value.trim();
    const price = addProductForm.price.value.trim();
    const img = addProductForm.img.value;
    const description = addProductForm.description.value.trim();
    const basket = false;
    try {
        const user = yield getUser();
        const mockProduct = {
            img,
            shopname: user.shopname,
            name,
            price,
            description,
            basket,
        };
        const res = yield fetch(`${PRODUCTS_API}`, {
            method: "POST",
            body: JSON.stringify(mockProduct),
            headers: {
                "content-type": "application/json",
            },
        });
        addProductOverlay.classList.remove("show");
        const { data } = yield res.json();
        let productDiv = document.createElement("div");
        let imgBox = document.createElement("div");
        let productContent = document.createElement("div");
        let productImage = document.createElement("img");
        let productH2 = document.createElement("h2");
        let productSpan = document.createElement("span");
        let basketBtn = document.createElement("div");
        productDiv.className = "product";
        productDiv.setAttribute("data-id", `${data.id}`);
        imgBox.className = "img-box";
        productContent.className = "product-content";
        productImage.src = data.img;
        productH2.textContent = data.name;
        productSpan.textContent = data.price + " " + "so'm";
        basketBtn.className = "add-basket-product";
        basketBtn.innerHTML = `<i class="fa-solid fa-cart-plus" style="color: #000000;"></i>`;
        imgBox.append(productImage);
        productContent.append(productH2, productSpan, basketBtn);
        productDiv.append(imgBox, productContent);
        productsBox.appendChild(productDiv);
        productDiv.addEventListener("click", () => {
            aboutProductOverlay.classList.add("show");
            aboutProduct.innerHTML = `
        <div class="about-product-img">
            <img src="${data.img}" alt="">
        </div>
        <div class="about-product-text">
           <p class="productname">${data.name}</p>
           <p class="shopname">brend: <span> ${data.shopname}</span></p>
           <p class="productprice">price: <span> ${data.price} so'm</span></p>
           <p class="description">${data.description}</p>
           <button>Add to basket <i class="fa-solid fa-cart-arrow-down"></i></button>
        </div>`;
        });
        addProductForm.reset();
    }
    catch (error) {
        console.error(error.message);
    }
}));
// =========================== Add Prodcut End =========================
// =========================== Show Prodcuts Start =========================
let currentBasketId;
getProduct()
    .then((products) => {
    for (const product of products) {
        let productDiv = document.createElement("div");
        let imgBox = document.createElement("div");
        let productContent = document.createElement("div");
        let productImage = document.createElement("img");
        let productH2 = document.createElement("h2");
        let productSpan = document.createElement("span");
        let basket = document.createElement("div");
        productDiv.className = "product";
        productDiv.setAttribute("data-id", `${product.id}`);
        imgBox.className = "img-box";
        productContent.className = "product-content";
        productImage.src = product.img;
        productH2.textContent = product.name;
        productSpan.textContent = product.price + "  " + "so'm";
        basket.className = "add-basket-product";
        basket.setAttribute("data-id", `${product.id}`);
        basket.innerHTML = `<i class="fa-solid fa-cart-plus" style="color: #000000;"></i>`;
        imgBox.append(productImage);
        productContent.append(productH2, productSpan, basket);
        productDiv.append(imgBox, productContent);
        productsBox.appendChild(productDiv);
        productDiv.addEventListener("click", () => {
            let id = productDiv.getAttribute("data-id");
            if (id !== null) {
                aboutProductOverlay.classList.add("show");
                aboutProduct.innerHTML = `<div class="about-product-img">
          <img src="${product.img}" alt="">
         </div>
         <div class="about-product-text">
            <p class="productname">${product.name}</p>
            <p class="shopname">brend: <span> ${product.shopname}</span></p>
            <p class="productprice">price: <span> ${product.price} so'm</span></p>
            <p class="description">${product.description}</p>
            <button>Add to basket <i class="fa-solid fa-cart-arrow-down"></i></button>
         </div>`;
            }
        });
        basket.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Cicked");
            let id = basket.getAttribute("data-id");
            currentBasketId = id;
            const currentUser = yield getUser();
            const userID = currentUser.id;
            const productID = id;
            const baskets = yield getBaskets();
            const existingBasket = baskets.find((basket) => basket.productID === productID && basket.userID === userID);
            if (existingBasket) {
                alert("This product is already in your basket.");
            }
            else {
                showBaskets();
                basketIconNumber.textContent += (+1).toString();
                const newBasket = { userID, productID };
                const res = yield fetch(`${BASKETS_API}`, {
                    method: "POST",
                    body: JSON.stringify(newBasket),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const { data } = yield res.json();
                // console.log("User id", data.userID);
                // console.log("Product id", data.productID);
                // console.log("Product name", product.name);
            }
        }));
    }
})
    .catch((error) => {
    console.error(error.message);
});
closeAboutProduct.addEventListener("click", () => aboutProductOverlay.classList.remove("show"));
// =========================== Show Prodcuts End =========================
let basketBox = document.querySelector(".basket-box");
// async function showBaskets() {
//   let user = await getUser();
//   let products = await getProduct();
//   getBaskets().then((baskets) => {
//     while (basketBox.children.length > 0) {
//       basketBox.children[0].remove();
//     }
//     let counter = 0;
//     for (const basket of baskets) {
//       if (user.id === basket.userID) {
//         counter++;
//         basketIconNumber.textContent = counter.toString();
//         basketProductsNumber.textContent = counter.toString();
//         for (const product of products) {
//           if (product.id === basket.productID) {
//             let productDiv = document.createElement("div");
//             productDiv.innerHTML = `
//                    <div class="basket-product-left">
//                       <input type="checkbox" class="basket-product-checkbox">
//                       <img src="${product.img}" alt="">
//                       <div class="basket-product-text">
//                          <h3>${product.name}</h3>
//                          <p>brend: <span class="basket-product-shopname">${product.shopname}</span></p>
//                       </div>
//                    </div>
//                    <div class="basket-product-counter">
//                       <span class="decrement">-</span>
//                       <span> 1 </span>
//                       <span class="increment">+</span>
//                    </div>
//                    <div class="basket-product-right">
//                       <p class="basket-product-delete"><i class="fa-solid fa-trash-can"></i> Delete</p>
//                       <p><span class="basket-product-price">${product.price}</span> so'm</p>
//                    </div>
//         `;
//             productDiv.className = "basket-product";
//             basketBox.appendChild(productDiv);
//           }
//         }
//       }
//     }
//   });
// }
function showBaskets() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let lengthArray = [];
            const user = yield getUser();
            const baskets = yield getBaskets();
            // Get all products once and filter them later
            const products = yield getProduct();
            const userBaskets = baskets.filter(basket => basket.userID === user.id);
            let basketCount = 0;
            // Clear existing content before appending new items
            while (basketBox.children.length > 0) {
                basketBox.children[0].remove();
            }
            // Loop through user's baskets and matching products
            for (const basket of userBaskets) {
                const product = products.find(product => product.id === basket.productID);
                if (product) {
                    basketIconNumber.textContent = (++basketCount).toString();
                    basketProductsNumber.textContent = basketCount.toString();
                    let productDiv = document.createElement("div");
                    productDiv.innerHTML = `
          <div class="basket-product-left">
            <input type="checkbox" class="basket-product-checkbox">
            <img src="${product.img}" alt="">
            <div class="basket-product-text">
              <h3>${product.name}</h3>
              <p>brend: <span class="basket-product-shopname">${product.shopname}</span></p>
            </div>
          </div>
          <div class="basket-product-counter">
            <span class="decrement">-</span>
            <span> 1 </span>
            <span class="increment">+</span>
          </div>
          <div class="basket-product-right">
            <p class="basket-product-delete"><i class="fa-solid fa-trash-can"></i> Delete</p>
            <p><span class="basket-product-price">${product.price}</span> so'm</p>
          </div>`;
                    productDiv.className = "basket-product";
                    basketBox.appendChild(productDiv);
                }
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    });
}
showBaskets();
let currentId;
editProductBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    while (aditProductsBox.children.length > 0) {
        aditProductsBox.children[0].remove();
    }
    editProductsOverlay.classList.add("show");
    let user = yield getUser();
    let userShopname = user.shopname;
    getProduct().then((products) => {
        let counter = 0;
        for (const product of products) {
            if (product.shopname === userShopname) {
                counter++;
                let productDiv = document.createElement("div");
                let imgBox = document.createElement("div");
                let productContent = document.createElement("div");
                let productImage = document.createElement("img");
                let productH2 = document.createElement("h2");
                let productSpan = document.createElement("span");
                productDiv.className = "product";
                productDiv.setAttribute("data-id", `${product.id}`);
                imgBox.className = "img-box";
                productContent.className = "product-content";
                productImage.src = product.img;
                productH2.textContent = product.name;
                productSpan.textContent = product.price + "  " + "so'm";
                imgBox.append(productImage);
                productContent.append(productH2, productSpan);
                productDiv.append(imgBox, productContent);
                aditProductsBox.appendChild(productDiv);
                productDiv.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
                    editProductOverlay.classList.add("show");
                    currentId = productDiv.getAttribute("data-id");
                    deleteProductBtn.setAttribute("data-id", currentId);
                    try {
                        const { img, name, price, description } = product;
                        editProductForm.img.value = img;
                        editProductForm.productname.value = name;
                        editProductForm.price.value = price;
                        editProductForm.description.value = description;
                    }
                    catch (error) {
                        console.error("Error editing user:", error.message);
                    }
                }));
            }
        }
        productsNumber.textContent = counter.toString();
    });
}));
editProductForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    getProduct().then((products) => __awaiter(void 0, void 0, void 0, function* () {
        for (const product of products) {
            if (product.id === currentId) {
                let img = editProductForm.img.value;
                let name = editProductForm.productname.value;
                let price = editProductForm.price.value;
                let description = editProductForm.description.value;
                let updatedProduct = {
                    img,
                    shopname: product.shopname,
                    name,
                    price,
                    description,
                    basket: false,
                };
                try {
                    const res = yield fetch(`${PRODUCTS_API}${product.id}`, {
                        method: "PUT",
                        body: JSON.stringify(updatedProduct),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    let user = yield getUser();
                    let userID = user.id;
                    window.location.href = `?id=${userID}`;
                    editProductOverlay.classList.remove("show");
                }
                catch (error) {
                    console.error("Error updating product:", error.message);
                }
            }
        }
    }));
}));
deleteProductBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    let id = deleteProductBtn.getAttribute("data-id");
    console.log(id);
    try {
        const res = yield fetch(`${PRODUCTS_API}${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            let user = yield getUser();
            let userID = user.id;
            window.location.href = `?id=${userID}`;
        }
        editProductOverlay.classList.remove("show");
    }
    catch (error) {
        console.error("Error deleting product:", error.message);
    }
}));
