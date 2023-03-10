let categoryList = document.querySelector('.category-list');
let productList = document.querySelector('.product-list')
let subCatName = document.querySelector('#subcat0002')
let categoryNameTop = document.querySelector('.category-title-top')
let categoryName = document.querySelector('.category-name')
let searchInput = document.querySelector('.search-input')

let getCategories = async()=> {
  try {
    let res = await fetch(`https://ssi-pro-server-production.up.railway.app/category/api`, {method: 'GET', headers: {'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',
    }} )
    
    let categories = await res.json() 
    
    let content = `
        <li class="mb-1" onclick="getProductAll()">
        <button
          class="btn w-75 btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"          
          onclick="changeHeading('Все оборудование')"            
        >
          Все          
        </button>
      </li>
    `;

    categories.forEach(category => {
      let sbContent = '';

      
      category.subCategories.forEach(sbCat => {
        sbContent = sbContent + `
          <li class="border-bottom my-1" onclick="getProductByCategory('${sbCat._id}', '${sbCat.title}')">
            <a href="#" class="link-dark d-inline-flex text-decoration-none rounded w-75">
              ${sbCat.title}
            </a>
          </li>
        `
      })

      content = content + `
        <li class="mb-1">
          <button
            class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#a${category._id}"
            aria-expanded="false"
            onclick="changeHeading('${category.title}')"            
          >
            ${category.title}
          </button>
          <div class="collapse" id="a${category._id}">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">                  
              ${sbContent}           
            </ul>
          </div>
        </li>
      `
    })

    categoryList.innerHTML = content;
  } catch (error) {
    console.log(error.message);        
  }
}
getCategories()


let products = []

let display = (arr) => { 
  
  if(arr.length == 0) {
    productList.innerHTML = '<h2 class="w-100 text-center text-info">В этой категории товаров не найдено.</h2>'
    return
  }
  
  let content = ''
    arr.reverse().forEach(product => {
      if(product.isPublished) {
        content = content + `
          <div class="col mb-5">
            <div class="card h-100">
              <!-- Sale badge-->
              ${product.isPromotion ? `<div
                class="badge bg-danger text-white position-absolute"
                style="top: 0.5rem; right: 0.5rem"
              >
                Акция
              </div>` : ``}
              
              <!-- Product image-->
              <div style="height: 180px;" class="overflow-hidden mx-auto">
              <img
                class="img-fluid h-100"
                src="${product.image.url}"
                alt="${product.title}"
              />
              </div>
              <!-- Product details-->
              <div class="card-body p-2">
                <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder">${product.title}</h5>
                  
                  <!-- Product price-->
                  <p class="mb-0">
                    <span class="text-muted text-decoration-line-through me-3">${product.oldPrice}</span>
                    ${product.price}
                  </p>
                </div>
              </div>
              <!-- Product actions-->
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                  <a
                    class="btn btn-outline-dark mt-auto"
                    href="./productitem.html?productId=${product._id}"
                    >Подробнее</a
                  >
                </div>
              </div>
              
            </div>
          </div>
        `
      }
    }
  )

  productList.innerHTML = content;
}

let getProduct = async()=> {
  try {
    let res = await fetch(`https://ssi-pro-server-production.up.railway.app/product/api`, {method: 'GET'} )
    
    products = await res.json()         
    display(products)

  } catch (error) {
    console.log(error.message);        
  }
}

getProduct()

let getProductByCategory = (id, content) => {
  let filteredProduct = products.filter(prod => prod.subCategory == id)
  display(filteredProduct)
  subCatName.textContent = content
}

let getProductAll = () => {
  display(products.reverse())
  subCatName.textContent = 'Приветствуем вас в каталоге нашей компании'
}

let changeHeading = (content) => {
  categoryNameTop.textContent = content
  categoryName.textContent = content
}


searchInput.addEventListener('keyup', ()=> {
  const key = new RegExp(searchInput.value, "i");

  let filteredProducts = products.filter(prod => prod.title.match(key))

  display(filteredProducts.reverse())
})