const profile = document.querySelector<HTMLHeadElement>(".profile")!;
const profileName = document.querySelector<HTMLDivElement>(".profile-name")!;
const shopname = document.querySelector<HTMLDivElement>(".shopname")!;
const imgBox = document.querySelector<HTMLDivElement>(".imgbox")!;
const profileMenu = document.querySelector<HTMLDivElement>(".profile-menu")!;
const editProfile = document.querySelector<HTMLDivElement>(".edit-profile")!;
const logOut = document.querySelector<HTMLDivElement>(".log-out")!;
const editProfileOverlay = document.querySelector<HTMLDivElement>(
  ".edit-profile-overlay"
)!;
const editForm = document.querySelector<HTMLFormElement>(".edit-form")!;
const closeEditForm =
  document.querySelector<HTMLDivElement>(".close-edit-form")!;

const getUser = async () => {
  let href = location.search;
  if (href !== "") {
    const params = new URLSearchParams(href);
    const id = params.get("id");
    const reponse = await fetch(`http://10.10.2.116:1010/api/users/${id}`);
    const data = await reponse.json();
    return data.data;
  }
};
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
  if (!(event.target as HTMLElement).closest(".profile")) {
    profileMenu.classList.remove("show");
  }
});

editProfile.addEventListener("click", async () => {
  editProfileOverlay.classList.add("show");

  try {
    const user = await getUser();

    let shopname = (editForm.shopname.value = user.shopname);
    let firstname = (editForm.firstname.value = user.firstname);
    let lastname = (editForm.lastname.value = user.lastname);
    let phone = (editForm.phone.value = user.phone);
    let date = (editForm.date.value = user.date);
    let email = (editForm.email.value = user.email);
    let password = (editForm.password.value = user.password);
    let avatar = (editForm.avatar.value = user.avatar);
  } catch (error: any) {
    console.error("Error editing user:", error.message);
  }
});

editForm.addEventListener("submit", async (event) => {
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
    getUser().then(async (user) => {
      const res = await fetch(`http://10.10.2.116:1010/api/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { data } = await res.json();
      console.log("data =", data);
      window.location.href = `../cabinet/?id=${user.id}`;
    });
  } catch (error: any) {
    console.error("Error updating user:", error.message);
  }
  // }
});

closeEditForm.addEventListener("click", () => {
  editProfileOverlay.classList.remove("show");
});

logOut.addEventListener("click", () => {
  window.location.href = '/';
});
