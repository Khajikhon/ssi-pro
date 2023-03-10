
const loader = document.querySelector("#loadingIndicator");

let partnersList = document.querySelector('.patners-list');
let brandsList = document.querySelector('.brands-list');
let productsList = document.querySelector('.products-list');
let videoList = document.querySelector('.video-list');

// myModal.show();

// document.onreadystatechange = () => {
//   if (document.readyState === "complete") {
//     myModal.hide();
//     setTimeout(() => {
//       myModal.hide();
//     }, "500");
//   }
// };


function sendMail() {
  if(document.getElementById('name').value == "" || document.getElementById('phone').value == "" || document.getElementById('message').value == "") {
    alert("пожалуйста, заполните форму полностью!")
    return
  }

  let params = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value,
  }

  const serviceID = "service_770doa7";
  const templateID = "template_3uufz7y"
  
  emailjs.send(serviceID, templateID, params)
  .then(
    res => {
      document.getElementById('name').value = "";
      document.getElementById('email').value = "";
      document.getElementById('phone').value = "";
      document.getElementById('message').value = "";
  
      console.log(res);
      alert("ваше сообщение успешно отправлено!")
    }
  )
  .catch(err => console.log(err))
}


let getBrands = async ()=> {
  try {
    let res = await fetch(`https://ssi-pro-server-production.up.railway.app/brand/api`, {method: "GET"})

    let brands = await res.json()
    let contentParters = ''
    let contentBrands = ''

    brands.forEach(brand => {
      if(brand.type === 'partner') {
        contentParters = contentParters + `
          <div class="partner-image-container">
            <img
              src="${brand.image.url}"
              alt="partner_image"
              class="partner-image"
            />
          </div>
        `
      } else {
        contentBrands = contentBrands + `
          <div class="brand-image-container">
            <img
              src="${brand.image.url}"
              alt="brand_image"
              class="brand-image"
            />
          </div>
        `
      }
    });

    partnersList.innerHTML = contentParters;
    brandsList.innerHTML = contentBrands;

  } catch (error) {
    console.log(error);
  }
}

getBrands()

let getProducts = async ()=> {
  try {
    let res = await fetch(`https://ssi-pro-server-production.up.railway.app/product/api`, {method: "GET"})

    let products = await res.json()

    let activeProducts = products.filter(prod => prod.isPublished == true)
    
    let lastProducts = activeProducts.reverse().splice(0, 4)

    let content = '';

    lastProducts.forEach(product => {
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
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">
                ${product.title}
                </h5>
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
                  href="./pages/productitem.html?productId=${product._id}"
                  >Подробнее</a
                >
              </div>
            </div>

          </div>
        </div>
      `
    })

    productsList.innerHTML = content;

  } catch (error) {
    console.log(error);
  }
}

getProducts()


let getVideos = async ()=> {
  try {
    let res = await fetch(`https://ssi-pro-server-production.up.railway.app/videos/api`, {method: "GET"})

    let videos = await res.json()
    
    let lastVideos = videos.reverse().splice(0, 6)

    let content = '';

    lastVideos.forEach(video => {
      content = content + `
        <div class="mb-4 video-box p-2">
          ${video.content}

          <h6>${video.title}</h6>
        </div>
      `
    })

    videoList.innerHTML = content;

  } catch (error) {
    console.log(error);
  }
}

getVideos()