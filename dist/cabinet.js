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
const profile = document.querySelector('.profile');
const profileName = document.querySelector('.profile-name');
const profileUsername = document.querySelector('.profile-username');
const imgBox = document.querySelector('.imgbox');
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
getUser().then((user) => {
    profileName.textContent = user.lastname + ' ' + user.firstname;
    const avatar = document.createElement('img');
    avatar.src = user.avatar;
    profile.appendChild(avatar);
    imgBox.appendChild(avatar);
});
