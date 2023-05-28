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
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    let href = location.search;
    if (href !== "") {
        const params = new URLSearchParams(href);
        const id = params.get("id");
        const reponse = yield fetch(`http://localhost:1010/api/users/${id}`);
        const data = yield reponse.json();
        return data.data;
    }
});
const getProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const reponse = yield fetch(`http://localhost:2020/api/products/`);
    const data = yield reponse.json();
    return data.data;
});
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
logOut.addEventListener("click", () => window.location.href = "/");
closeEditProducts.addEventListener("click", () => editProductsOverlay.classList.remove("show"));
closeEditProductForm.addEventListener("click", () => editProductOverlay.classList.remove("show"));
// =========================== Profile Setting End =========================
// =========================== Edit Profile Start =========================
editProfile.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    editProfileOverlay.classList.add("show");
    try {
        const user = yield getUser();
        const { shopname, firstname, lastname, phone, date, email, password, avatar } = user;
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
            const res = yield fetch(`http://localhost:1010/api/users/${user.id}`, {
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
        const mockProduct = { img, shopname: user.shopname, name, price, description, basket };
        const res = yield fetch(`http://localhost:2020/api/products`, {
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
        basketBtn.className = 'add-basket-product';
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
        // addProductForm.img.value = "";
        // addProductForm.productname.value = "";
        // addProductForm.price.value = "";
        // addProductForm.description.value = "";
        addProductForm.reset();
    }
    catch (error) {
        console.error(error.message);
    }
}));
// =========================== Add Prodcut End =========================
// =========================== Show Prodcuts Start =========================
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
        basket.className = 'add-basket-product';
        basket.innerHTML = `<i class="fa-solid fa-cart-plus" style="color: #000000;"></i>`;
        imgBox.append(productImage);
        productContent.append(productH2, productSpan, basket);
        productDiv.append(imgBox, productContent);
        productsBox.appendChild(productDiv);
        productDiv.addEventListener("click", () => {
            let id = productDiv.getAttribute("data-id");
            if (id !== null) {
                console.log("ID", id);
                console.log("Name", product.name);
                console.log("Name", product.price);
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
    }
})
    .catch((error) => {
    console.error(error.message);
});
closeAboutProduct.addEventListener("click", () => aboutProductOverlay.classList.remove("show"));
// =========================== Show Prodcuts End =========================
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
                // list.push(product);
                counter++;
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
                basket.className = 'add-basket-product';
                basket.innerHTML = `<i class="fa-solid fa-cart-plus" style="color: #000000;"></i>`;
                imgBox.append(productImage);
                productContent.append(productH2, productSpan, basket);
                productDiv.append(imgBox, productContent);
                aditProductsBox.appendChild(productDiv);
                productDiv.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
                    editProductOverlay.classList.add("show");
                    console.log("Clicked");
                    currentId = productDiv.getAttribute("data-id");
                    console.log(currentId);
                    console.log(typeof currentId);
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
                    // editProductForm.addEventListener("submit", async (event) => {
                    //   event.preventDefault();
                    //   const img = editProductForm.img.value;
                    //   const name = editProductForm.productname.value;
                    //   const price = parseFloat(editProductForm.price.value);
                    //   const description = editProductForm.description.value;
                    //   const updatedProduct = {
                    //     img,
                    //     name,
                    //     price,
                    //     description,
                    //     basket: false,
                    //   };
                    //   try {
                    //     const res = await fetch(`http://localhost:2020/api/products/${id}`, {
                    //       method: "PUT",
                    //       body: JSON.stringify(updatedProduct),
                    //       headers: {
                    //         "Content-Type": "application/json",
                    //       },
                    //     });
                    //     // Hide the edit overlay after successful update
                    //     editProductOverlay.classList.remove("show");
                    //   } catch (error: any) {
                    //     console.error("Error updating product:", error.message);
                    //   }
                    // });
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
                    const res = yield fetch(`http://localhost:2020/api/products/${product.id}`, {
                        method: "PUT",
                        body: JSON.stringify(updatedProduct),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    editProductOverlay.classList.remove("show");
                }
                catch (error) {
                    console.error("Error updating product:", error.message);
                }
            }
        }
    }));
}));
