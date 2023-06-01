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
const mainLoginBtn = document.querySelector(".main-login-btn");
const loader1 = document.querySelector(".loader1");
const searchIcon = document.querySelector(".search-icon");
const hiddenSearch = document.querySelector(".hidden-search");
const closeHiddenSearch = document.querySelector(".close-hidden-search");
const htmlTitleHome = document.querySelector(".main-title");
const getMainProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const reponse = yield fetch(`https://shopbackend-aaw0.onrender.com/api/products/`);
    const data = yield reponse.json();
    loader1.classList.add('hide');
    htmlTitleHome.textContent = "Online Shop";
    return data.data;
});
mainLoginBtn.addEventListener("click", () => window.location.href = "register/");
searchIcon.addEventListener('click', () => hiddenSearch.classList.toggle("show"));
closeHiddenSearch.addEventListener('click', () => hiddenSearch.classList.remove("show"));
// =========================== Show Prodcuts Start =========================
getMainProduct()
    .then((products) => {
    loader1.classList.add('show');
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
        productDiv.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
            let id = productDiv.getAttribute("data-id");
            if (id !== null)
                window.location.href = `about/?id=${id}`;
        }));
    }
})
    .catch((error) => {
    console.error(error.message);
});
