import products from '../assets/data1.js'

const createProductCard = product => {
  return `
                                <div class="product-card">
                                                <div class="image-container">
                                                                <img src="${product.imgURL}" alt="${product.name}" class="product-image"/>
                                                </div>
                                                <div><h2 class="product-name">${product.name}</h2>
                                                <p class="product-description">${product.id}</p>
                                                <p class="product-description">${product.description}</p>
                                                <p class="product-price">$${product.price}</p>
                                                <p class="product-category">${product.category}</p></div>
                                </div>
                `
}

const renderProducts = products => {
  const productGrid = document.createElement('div')
  productGrid.className = 'product-grid'
  productGrid.innerHTML = products.map(createProductCard).join('')
  document.body.appendChild(productGrid)
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products)
})

// Minimal CSS styles
const style = document.createElement('style')
style.innerHTML = `
                .product-grid {
                                display: flex;
                                flex-wrap: wrap;
                                gap: 20px;
                                padding: 20px;
                }
                .product-card {
                display: flex;
                flex-direction: column;
                                border: 1px solid #ccc;
                                border-radius: 8px;
                                padding: 16px;
                                width: 385px;
                                height: 282px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .image-container {
                                width: 385px;
                                height: 282px;
                                overflow: hidden;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                border-bottom: 1px solid #ccc;
                                margin-bottom: 16px;
                }
                .product-image {
                                max-width: 100%;
                                max-height: 100%;
                                object-fit: cover;
                }
                .product-name {
                                font-size: 18px;
                                margin: 0 0 8px;
                }
                .product-description {
                                font-size: 14px;
                                color: #555;
                                margin: 0 0 8px;
                }
                .product-price {
                                font-size: 16px;
                                font-weight: bold;
                                color: #000;
                }
                .product-category {
                                font-size: 14px;
                                color: #888;
                                margin-top: 8px;
                }
`
document.head.appendChild(style)
