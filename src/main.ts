const mainProductsBox = document.querySelector<HTMLDivElement>(".products-box")!;
const mainProductDiv = document.querySelector<HTMLDivElement>(".product")!;
const mainAboutProductOverlay = document.querySelector<HTMLDivElement>(".about-product-overlay")!;
const mainCloseAboutProduct = document.querySelector<HTMLDivElement>(".close-about-product")!;
const mainAboutProduct = document.querySelector<HTMLDivElement>(".about-product")!;
const registerContainer = document.querySelector<HTMLDivElement>(".register-container")!;
const mainLoginBtn = document.querySelector<HTMLDivElement>(".main-login-btn")!;
const loader1 = document.querySelector<HTMLDivElement>(".loader")!;
const searchIcon = document.querySelector<HTMLDivElement>(".search-icon")!;
const hiddenSearch = document.querySelector<HTMLDivElement>(".hidden-search")!;
const closeHiddenSearch = document.querySelector<HTMLDivElement>(".close-hidden-search")!;
const htmlTitle = document.querySelector<HTMLTitleElement>('.main-title')!;

mainLoginBtn.addEventListener("click", () => {
   window.location.href = "register/";
});

const getMainProduct = async () => {
   const reponse = await fetch(`https://shopbackend-aaw0.onrender.com/api/products/`);
   const data = await reponse.json();
   loader1.classList.add('hide');
   htmlTitle.textContent = "Online Shop";
   return data.data;
};

searchIcon.addEventListener('click', () => {
   hiddenSearch.classList.toggle("show");
})
closeHiddenSearch.addEventListener('click', () => {
   hiddenSearch.classList.remove("show");
})


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
         productDiv.addEventListener("click", () => {
            let id = productDiv.getAttribute("data-id");
            if (id !== null) {
               localStorage.setItem("productID", id);
               htmlTitle.textContent = product.name;
               mainAboutProductOverlay.classList.add("show");
               mainAboutProduct.innerHTML = `
         <div class="about-product-img">
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
      }

   })
   .catch((error: any) => {
      console.error(error.message);
   });
mainCloseAboutProduct.addEventListener("click", () => {
   mainAboutProductOverlay.classList.remove("show");
   localStorage.setItem("productID", "");
   htmlTitle.textContent = "Online Shop";
});

window.addEventListener('load', async () => {
   let productID = localStorage.getItem('productID');
   if (productID) {
      loader1.classList.remove('hide');
      try {
         let response = await fetch(`https://shopbackend-aaw0.onrender.com/api/products/${productID}`);
         let { data } = await response.json();

         let { name, shopname, price, description, img } = data;
         htmlTitle.textContent = name;

         mainAboutProduct.innerHTML = `
               <div class="about-product-img">
                  <img src="${img}" alt="">
               </div>
               <div class="about-product-text">
                  <p class="productname">${name}</p>
                  <p class="shopname">brand: <span>${shopname}</span></p>
                  <p class="productprice">price: <span>${price} so'm</span></p>
                  <p class="description">${description}</p>
                  <button>Add to basket <i class="fa-solid fa-cart-arrow-down"></i></button>
               </div>`;

         mainAboutProductOverlay.classList.add("show");
      } catch (error) {
         console.error(error);
         console.log("Failed to load product. Please try again later.");
      }
   } else {
      mainAboutProductOverlay.classList.remove("show");
   }
});

// =========================== Show Prodcuts End =========================




