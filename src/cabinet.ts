const USERS_API = "https://shopbackend-aaw0.onrender.com/api/users/";
const PRODUCTS_API = "https://shopbackend-aaw0.onrender.com/api/products/";
const BASKETS_API = "https://shopbackend-aaw0.onrender.com/api/baskets/";
const profile = document.querySelector<HTMLHeadElement>(".profile")!;
const profileName = document.querySelector<HTMLDivElement>(".profile-name")!;
const shopname = document.querySelector<HTMLDivElement>(".shopname")!;
const imgBox = document.querySelector<HTMLDivElement>(".imgbox")!;
const profileMenu = document.querySelector<HTMLDivElement>(".profile-menu")!;
const editProfile = document.querySelector<HTMLDivElement>(".edit-profile")!;
const logOut = document.querySelector<HTMLDivElement>(".log-out")!;
const addProduct = document.querySelector<HTMLDivElement>(".add-product")!;
const addProductOverlay = document.querySelector<HTMLDivElement>(
  ".add-product-overlay"
)!;
const productsBox = document.querySelector<HTMLDivElement>(".products-box")!;
const productDiv = document.querySelector<HTMLDivElement>(".product")!;
const aboutProductOverlay = document.querySelector<HTMLDivElement>(
  ".about-product-overlay"
)!;
const closeAboutProduct = document.querySelector<HTMLDivElement>(
  ".close-about-product"
)!;
const aboutProduct = document.querySelector<HTMLDivElement>(".about-product")!;
const addProductForm =
  document.querySelector<HTMLFormElement>(".add-product-form")!;
const editProfileOverlay = document.querySelector<HTMLDivElement>(
  ".edit-profile-overlay"
)!;
const editForm = document.querySelector<HTMLFormElement>(".edit-form")!;
const closeEditForm =
  document.querySelector<HTMLDivElement>(".close-edit-form")!;
const closeAddForm = document.querySelector<HTMLDivElement>(".close-add-form")!;
const editProductBtn = document.querySelector<HTMLDivElement>(".edit-product")!;
const editProductsOverlay = document.querySelector<HTMLDivElement>(
  ".edit-products-overlay"
)!;
const closeEditProducts = document.querySelector<HTMLDivElement>(
  ".close-edit-products"
)!;
const aditProductsBox =
  document.querySelector<HTMLDivElement>(".edit-products-box")!;
const productsNumber =
  document.querySelector<HTMLDivElement>(".products-number")!;
const editProductForm =
  document.querySelector<HTMLFormElement>(".edit-product-form")!;
const editProductOverlay = document.querySelector<HTMLDivElement>(
  ".edit-product-overlay"
)!;
const closeEditProductForm = document.querySelector<HTMLDivElement>(
  ".close-edit-product-form"
)!;
const deleteProductBtn =
  document.querySelector<HTMLButtonElement>(".delete-product")!;
const basketBtn = document.querySelector<HTMLDivElement>(".basket")!;
const basketOverlay =
  document.querySelector<HTMLDivElement>(".basket-overlay")!;
const closeBasket = document.querySelector<HTMLDivElement>(".close-basket")!;
const basketProductsNumber = document.querySelector<HTMLDivElement>(
  ".basket-products-number"
)!;
const basketIconNumber = document.querySelector<HTMLDivElement>(
  ".basket-icon-number"
)!;
const totalMoney = document.querySelector<HTMLDivElement>(
  ".total-money"
)!;

const getUser = async () => {
  let href = location.search;
  if (href !== "") {
    const params = new URLSearchParams(href);
    const id = params.get("id");
    const reponse = await fetch(`${USERS_API}${id}`);
    const data = await reponse.json();
    return data.data;
  }
};
const getProduct = async () => {
  const reponse = await fetch(`${PRODUCTS_API}`);
  const data = await reponse.json();
  return data.data;
};

const getBaskets = async () => {
  const reponse = await fetch(`${BASKETS_API}`);
  const data = await reponse.json();
  return data.data;
};

// getProduct()

// =========================== Profile Setting Start =========================

getUser()
  .then((user) => {
    profileName.textContent = user.lastname + " " + user.firstname;
    shopname.textContent = user.shopname;
    const avatar1 = document.createElement("img");
    const avatar2 = document.createElement("img");
    avatar1.src = user.avatar;
    avatar2.src = user.avatar;
    profile.appendChild(avatar1);
    imgBox.appendChild(avatar2);
  })
  .catch((error: any) => {
    console.error(error.message);
  });

profile.addEventListener("click", () => profileMenu.classList.toggle("show"));
window.addEventListener("click", (event) => {
  if (!(event.target as HTMLElement).closest(".profile")) {
    profileMenu.classList.remove("show");
  }
});
addProduct.addEventListener("click", () =>
  addProductOverlay.classList.add("show")
);
closeAddForm.addEventListener("click", () =>
  addProductOverlay.classList.remove("show")
);
logOut.addEventListener("click", () => (window.location.href = "/"));
closeEditProducts.addEventListener("click", () =>
  editProductsOverlay.classList.remove("show")
);
closeEditProductForm.addEventListener("click", () =>
  editProductOverlay.classList.remove("show")
);
basketBtn.addEventListener("click", () => basketOverlay.classList.add("show"));
closeBasket.addEventListener("click", () =>
  basketOverlay.classList.remove("show")
);

// =========================== Profile Setting End =========================

// =========================== Edit Profile Start =========================

editProfile.addEventListener("click", async () => {
  editProfileOverlay.classList.add("show");
  try {
    const user = await getUser();
    const {
      shopname,
      firstname,
      lastname,
      phone,
      date,
      email,
      password,
      avatar,
    } = user;
    editForm.shopname.value = shopname;
    editForm.firstname.value = firstname;
    editForm.lastname.value = lastname;
    editForm.phone.value = phone;
    editForm.date.value = date;
    editForm.email.value = email;
    editForm.password.value = password;
    editForm.avatar.value = avatar;
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

  try {
    getUser().then(async (user) => {
      const res = await fetch(`${USERS_API}${user.id}`, {
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

closeEditForm.addEventListener("click", () =>
  editProfileOverlay.classList.remove("show")
);

// =========================== Edit Profile End =========================

// =========================== Add Prodcut Start =========================

addProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = addProductForm.productname.value.trim();
  const price = addProductForm.price.value.trim();
  const img = addProductForm.img.value;
  const description = addProductForm.description.value.trim();
  const basket = false;
  try {
    const user = await getUser();
    const mockProduct = {
      img,
      shopname: user.shopname,
      name,
      price,
      description,
      basket,
    };

    const res = await fetch(`${PRODUCTS_API}`, {
      method: "POST",
      body: JSON.stringify(mockProduct),
      headers: {
        "content-type": "application/json",
      },
    });
    addProductOverlay.classList.remove("show");

    const { data } = await res.json();

    let productDiv = document.createElement("div");
    let imgBox = document.createElement("div");
    let productContent = document.createElement("div");
    let productImage = document.createElement("img");
    let productH2 = document.createElement("h2");
    let productSpan = document.createElement("span");
    let basketBtn = document.createElement("div");
    productDiv.className = "product";
    productDiv.setAttribute("data-id", `${data.id}`);
    imgBox.className = "img-box";
    productContent.className = "product-content";
    productImage.src = data.img;
    productH2.textContent = data.name;
    productSpan.textContent = data.price + " " + "so'm";
    basketBtn.className = "add-basket-product";
    basketBtn.innerHTML = `<i class="fa-solid fa-cart-plus" style="color: #000000;"></i>`;
    imgBox.append(productImage);
    productContent.append(productH2, productSpan, basketBtn);
    productDiv.append(imgBox, productContent);
    productsBox.appendChild(productDiv);
    productDiv.addEventListener("click", () => {
      aboutProductOverlay.classList.add("show");
      aboutProduct.innerHTML = `
        <div class="about-product-img">
            <img src="${data.img}" alt="">
        </div>
        <div class="about-product-text">
           <p class="productname">${data.name}</p>
           <p class="shopname">brend: <span> ${data.shopname}</span></p>
           <p class="productprice">price: <span> ${data.price} so'm</span></p>
           <p class="description">${data.description}</p>
           <button>Add to basket <i class="fa-solid fa-cart-arrow-down"></i></button>
        </div>`;
    });
    addProductForm.reset();
  } catch (error: any) {
    console.error(error.message);
  }
});

// =========================== Add Prodcut End =========================

// =========================== Show Prodcuts Start =========================
let currentBasketId;

getProduct()
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
      basket.className = "add-basket-product";
      basket.setAttribute("data-id", `${product.id}`);
      basket.innerHTML = `<i class="fa-solid fa-cart-plus" style="color: #000000;"></i>`;
      imgBox.append(productImage);
      productContent.append(productH2, productSpan, basket);
      productDiv.append(imgBox, productContent);

      productsBox.appendChild(productDiv);
      productDiv.addEventListener("click", () => {
        let id = productDiv.getAttribute("data-id");
        if (id !== null) {
          aboutProductOverlay.classList.add("show");
          aboutProduct.innerHTML = `<div class="about-product-img">
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

      basket.addEventListener("click", async (e) => {
        console.log("Cicked");
        let id = basket.getAttribute("data-id");
        currentBasketId = id;

        const currentUser = await getUser();
        const userID = currentUser.id;
        const productID = id;
        const baskets = await getBaskets();
        const existingBasket = baskets.find(
          (basket) => basket.productID === productID && basket.userID === userID
        );

        if (existingBasket) {
          alert("This product is already in your basket.");
        } else {
          showBaskets();
          basketIconNumber.textContent += (+1).toString();
          const newBasket = { userID, productID };
          const res = await fetch(`${BASKETS_API}`, {
            method: "POST",
            body: JSON.stringify(newBasket),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const { data } = await res.json();
        }
      });
    }
  })
  .catch((error: any) => {
    console.error(error.message);
  });
closeAboutProduct.addEventListener("click", () =>
  aboutProductOverlay.classList.remove("show")
);

// =========================== Show Prodcuts End =========================

let basketBox = document.querySelector<HTMLDivElement>(".basket-box")!;

async function showBaskets() {
  try {
    let moneys: number[] = [];
    const user = await getUser();
    const baskets = await getBaskets();

    const products = await getProduct();

    const userBaskets = baskets.filter(basket => basket.userID === user.id);
    let basketCount = 0;

    while (basketBox.children.length > 0) {
      basketBox.children[0].remove();
    }

    for (const basket of userBaskets) {
      const product = products.find(product => product.id === basket.productID);

      if (product) {

        basketIconNumber.textContent = (++basketCount).toString();
        basketProductsNumber.textContent = basketCount.toString();
        let productDiv = document.createElement("div");
        productDiv.innerHTML = `
          <div class="basket-product-left">
            <input type="checkbox" class="basket-product-checkbox">
            <img src="${product.img}" alt="">
            <div class="basket-product-text">
              <h3>${product.name}</h3>
              <p>brend: <span class="basket-product-shopname">${product.shopname}</span></p>
            </div>
          </div>
          <div class="basket-product-counter">
            <span class="decrement">-</span>
            <span> 1 </span>
            <span class="increment">+</span>
          </div>
          <div class="basket-product-right">
            <p class="basket-product-delete" onclick="deleteBasketItem(this)" data-id="${product.id}"><i class="fa-solid fa-trash-can"></i> Delete</p>
            <p><span class="basket-product-price">${product.price}</span> so'm</p>
          </div>`;

        productDiv.className = "basket-product";
        basketBox.appendChild(productDiv);

        const priceWithoutSpaces = product.price.replace(/\s/g, ''); // remove spaces from string
        const priceValue = parseFloat(priceWithoutSpaces); // convert string to number

        if (!isNaN(priceValue)) {
          moneys.push(priceValue);
        }
        console.log(moneys);
        let count = 0;
        for (const money of moneys) {
          count += money;
        }
        console.log("Total: " + count);
        totalMoney.textContent = count.toLocaleString();
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

showBaskets();
async function deleteBasketItem(el: any) {
  let id = el.getAttribute("data-id");
  let res = await fetch(`${PRODUCTS_API}${id}`);
  let { data } = await res.json();
  let name = data.name;
  console.log("This id", name);
  let baskets = await getBaskets();


  for (const basket of baskets) {
    if (basket.productID === id) {
      let basketId = basket.id;
      // let message = `Are you sure you want to delete ?`;
      let confirmMessage = confirm("Are you sure you want to delete");
      if (confirmMessage) {
        try {
          const response = await fetch(`${BASKETS_API}${basketId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          });
          showBaskets();

        } catch (error) {
          console.error(`An error occurred while deleting basket with ID ${basketId}:`, error);
        }
      }
    }
  }

}

document.querySelectorAll<HTMLDivElement>(".basket-product-delete").forEach((item) => {
  item.addEventListener("click", () => {
    let id = item.getAttribute("data-id");
    console.log("Item id: " + id);
    console.log("sas");
  })
});

async function showTotalMoney() {
  const basktes = await getBaskets();

}
showTotalMoney();

let currentId;

editProductBtn.addEventListener("click", async () => {
  while (aditProductsBox.children.length > 0) {
    aditProductsBox.children[0].remove();
  }
  editProductsOverlay.classList.add("show");
  let user = await getUser();
  let userShopname = user.shopname;

  getProduct().then((products) => {
    let counter = 0;
    for (const product of products) {
      if (product.shopname === userShopname) {
        counter++;
        let productDiv = document.createElement("div");
        let imgBox = document.createElement("div");
        let productContent = document.createElement("div");
        let productImage = document.createElement("img");
        let productH2 = document.createElement("h2");
        let productSpan = document.createElement("span");
        productDiv.className = "product";
        productDiv.setAttribute("data-id", `${product.id}`);
        imgBox.className = "img-box";
        productContent.className = "product-content";
        productImage.src = product.img;
        productH2.textContent = product.name;
        productSpan.textContent = product.price + "  " + "so'm";
        imgBox.append(productImage);
        productContent.append(productH2, productSpan);
        productDiv.append(imgBox, productContent);
        aditProductsBox.appendChild(productDiv);

        productDiv.addEventListener("click", async (e) => {
          editProductOverlay.classList.add("show");
          currentId = productDiv.getAttribute("data-id");
          deleteProductBtn.setAttribute("data-id", currentId);

          try {
            const { img, name, price, description } = product;
            editProductForm.img.value = img;
            editProductForm.productname.value = name;
            editProductForm.price.value = price;
            editProductForm.description.value = description;
          } catch (error: any) {
            console.error("Error editing user:", error.message);
          }
        });
      }
    }
    productsNumber.textContent = counter.toString();
  });
});

editProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  getProduct().then(async (products) => {
    for (const product of products) {
      if (product.id === currentId) {
        let img = editProductForm.img.value;
        let name = editProductForm.productname.value;
        let price = editProductForm.price.value;
        let description = editProductForm.description.value;
        let updatedProduct = {
          img,
          shopname: product.shopname,
          name,
          price,
          description,
          basket: false,
        };
        try {
          const res = await fetch(`${PRODUCTS_API}${product.id}`, {
            method: "PUT",
            body: JSON.stringify(updatedProduct),
            headers: {
              "Content-Type": "application/json",
            },
          });

          let user = await getUser();
          let userID = user.id;
          window.location.href = `?id=${userID}`;
          editProductOverlay.classList.remove("show");
        } catch (error: any) {
          console.error("Error updating product:", error.message);
        }
      }
    }
  });
});

deleteProductBtn.addEventListener("click", async (e) => {
  let id = deleteProductBtn.getAttribute("data-id")!;
  console.log(id);
  try {
    const res = await fetch(`${PRODUCTS_API}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      let user = await getUser();
      let userID = user.id;
      window.location.href = `?id=${userID}`;
    }
    editProductOverlay.classList.remove("show");
  } catch (error: any) {
    console.error("Error deleting product:", error.message);
  }
});
