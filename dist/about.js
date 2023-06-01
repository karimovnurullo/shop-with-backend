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
const htmlTitleAbout = document.querySelector('.about-html-title');
const mainAboutProductOverlay = document.querySelector(".about-product-overlay");
const mainCloseAboutProduct = document.querySelector(".close-about-product");
const mainAboutProduct = document.querySelector(".about-product");
const loader2 = document.querySelector(".loader2");
const getProductID = () => __awaiter(void 0, void 0, void 0, function* () {
    let href = location.search;
    if (href !== "") {
        console.log("Loading products");
        loader2.classList.remove('hide');
        const params = new URLSearchParams(href);
        const id = params.get("id");
        const reponse = yield fetch(`https://shopbackend-aaw0.onrender.com/api/products/${id}`);
        const data = yield reponse.json();
        loader2.classList.add('hide');
        console.log("Loaded");
        return data.data;
    }
});
mainCloseAboutProduct.addEventListener("click", () => {
    window.location.href = "/";
});
getProductID().then((product) => {
    console.log(product);
    try {
        let { name, shopname, price, description, img } = product;
        htmlTitleAbout.textContent = name;
        mainAboutProduct.innerHTML = `
            <div class="about-product-img show">
            <img src="${img}" alt="product image">
         </div>
         <div class="about-product-content">
            <div class="product-name">${name}</div>
            <div class="shopname">Seller: <span>${shopname}</span></div>
            <div class="product-price"> Price: <span>${price}</span>
            </div>
            <div class="buttons">
               <div class="buy-button">Buy</div>
               <div class="buy-button">Add to Cart</div>
            </div>
            <div class="description">
               <div>Description: </div>
               <p>${description}</p>
            </div>
         </div>`;
        // mainAboutProductOverlay.classList.add("show");
    }
    catch (error) {
        console.error(error);
        console.log("Failed to load product. Please try again later.");
    }
});
