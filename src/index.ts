const updateUserBtn =
  document.querySelector<HTMLButtonElement>("#update_user_btn")!;
const getUsersBtn =
  document.querySelector<HTMLButtonElement>("#get_users_btn")!;
const addUserBtn = document.querySelector<HTMLButtonElement>("#add_user")!;
const registerForm = document.querySelector<HTMLFormElement>(".sign-form")!;
const loginForm = document.querySelector<HTMLFormElement>(".login-form")!;
const switchLoginFormBtn =
  document.querySelector<HTMLDivElement>(".login-btn")!;
const switchRegisterFormBtn =
  document.querySelector<HTMLDivElement>(".create-btn")!;
const baseURL = "http://10.10.2.116:1010/api/users";

function switchForm(hide: any, show: any) {
  hide.classList.add("hide");
  show.classList.remove("hide");
}
switchRegisterFormBtn.addEventListener("click", () =>
  switchForm(loginForm, registerForm)
);
switchLoginFormBtn.addEventListener("click", () =>
  switchForm(registerForm, loginForm)
);

function delay(time = 1000) {
  return new Promise((res) => {
    setTimeout(() => res(20), time);
  });
}

function alertFunction(text: string, color: true | false) {
  const alertElement =
    document.querySelector<HTMLDivElement>(".alert-element")!;
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

getUsersBtn.addEventListener("click", async (e) => {
  await universal(
    e.target as HTMLButtonElement,
    "Loading Users...",
    async () => {
      const res = await fetch(baseURL);
      const { data } = await res.json();
      await delay();
      console.log("data = ", data);
    }
  );
});

updateUserBtn?.addEventListener("click", async (e) => {
  await universal(
    e.target as HTMLButtonElement,
    "Loading Users...",
    async () => {
      const res = await fetch(
        `${baseURL}/37659e08-e223-4109-bbc8-597b2dd0804b`,
        {
          method: "PUT",
          body: JSON.stringify(mockUser),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const { data } = await res.json();
      await delay();
      console.log("data = ", data);
    }
  );
});

addUserBtn?.addEventListener("click", () => {});

async function universal(
  btn: HTMLButtonElement,
  loadingMsg: string,
  fetchFn: () => Promise<any>
) {
  try {
    const defaultText = btn.innerText;
    btn.innerText = loadingMsg;
    btn.disabled = true;

    await fetchFn();

    btn.innerText = defaultText;
    btn.disabled = false;
  } catch (err: any) {
    console.error(err);
  }
}

registerForm.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  const shopname = registerForm.shopname.value.trim();
  const firstname = registerForm.firstname.value.trim();
  const lastname = registerForm.lastname.value.trim();
  const phone = registerForm.phone.value;
  const date = registerForm.date.value.trim();
  const email = registerForm.email.value.trim();
  const password = registerForm.password.value.trim();
  const confirmPassword = registerForm.passwordConfirm.value.trim();
  const avatar =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";
  const mockUser = {
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
    if (password === confirmPassword) {
      const res = await fetch(`${baseURL}`, {
        method: "POST",
        body: JSON.stringify(mockUser),
        headers: {
          "content-type": "application/json",
        },
      });
      const { data } = await res.json();
      window.location.href = `../cabinet/?id=${data.id}`;
    } else {
      alertFunction("Confirm password incorrect", false);
    }
  } catch (error: any) {
    alertFunction("Enter all inputs", false);
  }
});

loginForm.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();
  try {
    const reponse = await fetch(`${baseURL}`);
    const { data } = await reponse.json();

    for (const user of data) {
      if (user.email === email && user.password === password) {
        window.location.href = `../cabinet/?id=${user.id}`;
      } else {
        alertFunction("Login failed", false);
      }
    }
  } catch (error: any) {
    alertFunction("Error", false);
  }
});
