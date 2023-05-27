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
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    const userID = location.search.split("=")[1];
    const divElement = document.createElement("div");
    let message = "";
    try {
        const res = yield fetch(`https://jsonplaceholder.typicode.com/users/${userID}`);
        if (res.status === 404)
            throw new Error("User not found");
        const user = yield res.json();
        message = `<h1>${user.name}</h1>`;
    }
    catch (err) {
        message = err.message;
    }
    divElement.innerHTML = message;
    document.body.replaceChild(divElement, document.body.children[0]);
}));
