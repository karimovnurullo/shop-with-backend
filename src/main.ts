const mainProductsBox = document.querySelector<HTMLDivElement>(".products-box")!;
const mainProductDiv = document.querySelector<HTMLDivElement>(".product")!;
const mainLoginBtn = document.querySelector<HTMLDivElement>(".main-login-btn")!;
const loader1 = document.querySelector<HTMLDivElement>(".loader1")!;
const searchIcon = document.querySelector<HTMLDivElement>(".search-icon")!;
const hiddenSearch = document.querySelector<HTMLDivElement>(".hidden-search")!;
const closeHiddenSearch = document.querySelector<HTMLDivElement>(".close-hidden-search")!;
const htmlTitleHome = document.querySelector<HTMLTimeElement>(".main-title")!;


const getMainProduct = async () => {
   const reponse = await fetch(`https://shopbackend-aaw0.onrender.com/api/products/`);
   const data = await reponse.json();
   loader1.classList.add('hide');
   htmlTitleHome.textContent = "Online Shop";
   return data.data;
};

mainLoginBtn.addEventListener("click", () => window.location.href = "register/");
searchIcon.addEventListener('click', () => hiddenSearch.classList.toggle("show"));
closeHiddenSearch.addEventListener('click', () => hiddenSearch.classList.remove("show"));


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
         productDiv.addEventListener("click", async () => {
            let id = productDiv.getAttribute("data-id");
            if (id !== null) window.location.href = `about/?id=${id}`;
         });
      }
   })
   .catch((error: any) => {
      console.error(error.message);
   });
