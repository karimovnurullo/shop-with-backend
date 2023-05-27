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
const addProductForm = document.querySelector(".add-product-form");
const editProfileOverlay = document.querySelector(".edit-profile-overlay");
const editForm = document.querySelector(".edit-form");
const closeEditForm = document.querySelector(".close-edit-form");
const closeAddForm = document.querySelector(".close-add-form");
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
getUser().then((user) => {
    profileName.textContent = user.lastname + " " + user.firstname;
    shopname.textContent = user.shopname;
    const avatar1 = document.createElement("img");
    const avatar2 = document.createElement("img");
    avatar1.src = user.avatar;
    avatar2.src = user.avatar;
    profile.appendChild(avatar1);
    imgBox.appendChild(avatar2);
}).catch((error) => {
    console.error(error.message);
});
profile.addEventListener("click", () => {
    profileMenu.classList.toggle("show");
});
window.addEventListener("click", (event) => {
    if (!event.target.closest(".profile")) {
        profileMenu.classList.remove("show");
    }
});
addProduct.addEventListener("click", () => {
    addProductOverlay.classList.add("show");
});
editProfile.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    editProfileOverlay.classList.add("show");
    try {
        const user = yield getUser();
        let shopname = (editForm.shopname.value = user.shopname);
        let firstname = (editForm.firstname.value = user.firstname);
        let lastname = (editForm.lastname.value = user.lastname);
        let phone = (editForm.phone.value = user.phone);
        let date = (editForm.date.value = user.date);
        let email = (editForm.email.value = user.email);
        let password = (editForm.password.value = user.password);
        let avatar = (editForm.avatar.value = user.avatar);
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
closeEditForm.addEventListener("click", () => {
    editProfileOverlay.classList.remove("show");
});
closeAddForm.addEventListener("click", () => {
    addProductOverlay.classList.remove("show");
});
logOut.addEventListener("click", () => {
    window.location.href = "/";
});
addProductForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const shopname = addProductForm.shopname.value.trim();
    const name = addProductForm.productname.value.trim();
    const price = addProductForm.price.value.trim();
    const img = addProductForm.img.value.trim();
    const description = addProductForm.description.value.trim();
    const mockProduct = {
        img,
        shopname,
        name,
        price,
        description,
    };
    try {
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
        productDiv.className = "product";
        let productContent = document.createElement("div");
        productContent.className = "product-content";
        let productImage = document.createElement("img");
        productImage.src = data.img;
        let productH2 = document.createElement("h2");
        productH2.textContent = data.name;
        let productP = document.createElement("p");
        productP.textContent = data.description;
        let productSpan = document.createElement("span");
        productSpan.textContent = data.price;
        productContent.append(productH2, productP, productSpan);
        productDiv.append(productImage, productContent);
        productsBox.appendChild(productDiv);
    }
    catch (error) {
        console.error(error.message);
    }
}));
getProduct().then((products) => {
    for (const product of products) {
        let productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.setAttribute('data-id', `${product.id}`);
        let productContent = document.createElement("div");
        productContent.className = "product-content";
        let productImage = document.createElement("img");
        productImage.src = product.img;
        let productH2 = document.createElement("h2");
        productH2.textContent = product.name;
        let productP = document.createElement("p");
        productP.textContent = product.description;
        let productSpan = document.createElement("span");
        productSpan.textContent = product.price;
        productContent.append(productH2, productP, productSpan);
        productDiv.append(productImage, productContent);
        productsBox.appendChild(productDiv);
        productDiv.addEventListener('click', () => {
            let id = productDiv.getAttribute("data-id");
            if (id !== null) {
                console.log("ID", id);
                console.log("Name", product.name);
                console.log("Name", product.price);
                aboutProductOverlay.classList.add("show");
            }
        });
    }
}).catch((error) => {
    console.error(error.message);
});
closeAboutProduct.addEventListener("click", () => {
    aboutProductOverlay.classList.remove("show");
});
