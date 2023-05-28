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
const mainProductsBox = document.querySelector(".products-box");
const mainProductDiv = document.querySelector(".product");
const mainAboutProductOverlay = document.querySelector(".about-product-overlay");
const mainCloseAboutProduct = document.querySelector(".close-about-product");
const mainAboutProduct = document.querySelector(".about-product");
const registerContainer = document.querySelector(".register-container");
const mainLoginBtn = document.querySelector(".main-login-btn");
mainLoginBtn.addEventListener("click", () => {
    window.location.href = "register/";
});
const getMainProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const reponse = yield fetch(`http://localhost:2020/api/products/`);
    const data = yield reponse.json();
    return data.data;
});
// =========================== Show Prodcuts Start =========================
getMainProduct()
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
        mainProductsBox.appendChild(productDiv);
        productDiv.addEventListener("click", () => {
            let id = productDiv.getAttribute("data-id");
            if (id !== null) {
                console.log("ID", id);
                console.log("Name", product.name);
                console.log("Name", product.price);
                mainAboutProductOverlay.classList.add("show");
                mainAboutProduct.innerHTML = `
         <div class="about-product-img">
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
mainCloseAboutProduct.addEventListener("click", () => mainAboutProductOverlay.classList.remove("show"));
// =========================== Show Prodcuts End =========================
