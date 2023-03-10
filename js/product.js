let productBox = document.querySelector('.product-box')
let parametrs = new URLSearchParams( window.location.search )
let productId = parametrs.get('productId')


let getProduct = async()=> {
  try {
    let res = await fetch(`https://ssi-pro-server-production.up.railway.app/product/api/${productId}`, {method: 'GET'} )
    
    let product = await res.json()         
    console.log(product);

    productBox.innerHTML = `
      <h4 class="mt-3">
        ${product.title}
      </h4>
      <img style="min-width: 400px;" src="${product.image.url}" alt="${product.title}" class="prod-img">
      
      <p class="mb-0">

        ${product.price ? 'цена: ' : ''}
        <span class="text-muted text-decoration-line-through me-3">${product.oldPrice}</span>
        ${product.price}
      </p>

      <div class="description">
        ${product.desc}
      </div>
    `

  } catch (error) {
    console.log(error.message);        
  }
}

getProduct()


