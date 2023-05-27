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
const editProfileOverlay = document.querySelector(".edit-profile-overlay");
const editForm = document.querySelector(".edit-form");
const closeEditForm = document.querySelector(".close-edit-form");
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    let href = location.search;
    if (href !== "") {
        const params = new URLSearchParams(href);
        const id = params.get("id");
        const reponse = yield fetch(`http://10.10.2.116:1010/api/users/${id}`);
        const data = yield reponse.json();
        return data.data;
    }
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
});
profile.addEventListener("click", () => {
    profileMenu.classList.toggle("show");
});
window.addEventListener("click", (event) => {
    if (!event.target.closest(".profile")) {
        profileMenu.classList.remove("show");
    }
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
    // let href = location.search;
    // if (href !== "") {
    //   const params = new URLSearchParams(href);
    //   const id = params.get("id");
    try {
        getUser().then((user) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield fetch(`http://10.10.2.116:1010/api/users/${user.id}`, {
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
logOut.addEventListener("click", () => {
    window.location.href = '/';
});
