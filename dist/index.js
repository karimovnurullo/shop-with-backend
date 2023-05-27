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
const updateUserBtn = document.querySelector("#update_user_btn");
const getUsersBtn = document.querySelector("#get_users_btn");
const addUserBtn = document.querySelector("#add_user");
const registerForm = document.querySelector(".sign-form");
const loginForm = document.querySelector(".login-form");
const switchLoginFormBtn = document.querySelector('.login-btn');
const switchRegisterFormBtn = document.querySelector('.create-btn');
const baseURL = "http://localhost:1010/api/users";
function switchForm(hide, show) {
    hide.classList.add('hide');
    show.classList.remove('hide');
}
switchRegisterFormBtn.addEventListener('click', () => switchForm(loginForm, registerForm));
switchLoginFormBtn.addEventListener('click', () => switchForm(registerForm, loginForm));
function delay(time = 1000) {
    return new Promise((res) => {
        setTimeout(() => res(20), time);
    });
}
function alertFunction(text, color) {
    const alertElement = document.querySelector('.alert-element');
    alertElement.style.display = "flex";
    alertElement.textContent = text;
    alertElement.style.background = color ? "green" : "red";
    alertElement.style.color = color ? "#fff" : "#fff";
    setTimeout(() => {
        alertElement.style.display = "none";
    }, 2500);
}
const mockUser = {
    address: {
        state: "UZB",
        city: "Kokand",
    },
    username: "karimov_nurulloh",
    job: "PDP Mentor",
    email: "Karimovdeveloper@gmail.com",
    age: 10,
    name: "nurullo",
};
getUsersBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    yield universal(e.target, "Loading Users...", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield fetch(baseURL);
        const { data } = yield res.json();
        yield delay();
        console.log("data = ", data);
    }));
}));
updateUserBtn === null || updateUserBtn === void 0 ? void 0 : updateUserBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    yield universal(e.target, "Loading Users...", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield fetch(`${baseURL}/37659e08-e223-4109-bbc8-597b2dd0804b`, {
            method: "PUT",
            body: JSON.stringify(mockUser),
            headers: {
                "content-type": "application/json",
            },
        });
        const { data } = yield res.json();
        yield delay();
        console.log("data = ", data);
    }));
}));
addUserBtn === null || addUserBtn === void 0 ? void 0 : addUserBtn.addEventListener("click", () => { });
function universal(btn, loadingMsg, fetchFn) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const defaultText = btn.innerText;
            btn.innerText = loadingMsg;
            btn.disabled = true;
            yield fetchFn();
            btn.innerText = defaultText;
            btn.disabled = false;
        }
        catch (err) {
            console.error(err);
        }
    });
}
registerForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const firstname = registerForm.firstname.value.trim();
    const lastname = registerForm.lastname.value.trim();
    const phone = registerForm.phone.value;
    const date = registerForm.date.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();
    const confirmPassword = registerForm.passwordConfirm.value.trim();
    const avatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";
    const mockUser = { firstname, lastname, phone, date, email, password, avatar };
    try {
        if (password === confirmPassword) {
            const res = yield fetch(`${baseURL}`, {
                method: "POST",
                body: JSON.stringify(mockUser),
                headers: {
                    "content-type": "application/json",
                },
            });
            const { data } = yield res.json();
            window.location.href = `../cabinet/?id=${data.id}`;
        }
        else {
            alertFunction("Confirm password incorrect", false);
        }
    }
    catch (error) {
        alertFunction("Enter all inputs", false);
    }
}));
loginForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();
    try {
        const reponse = yield fetch(`${baseURL}`);
        const { data } = yield reponse.json();
        for (const user of data) {
            if (user.email === email && user.password === password) {
                window.location.href = `../cabinet/?id=${user.id}`;
            }
            else {
                return alertFunction("Login failed", false);
            }
        }
    }
    catch (error) {
        alertFunction("Error", false);
    }
}));
