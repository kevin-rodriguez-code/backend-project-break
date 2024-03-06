const product = require("../models/product");

async function getProducts() {
    const productList = await product.find();
    const dashboardPage = 'http://localhost:3000/dashboard/';
    const productsPage = 'http://localhost:3000/products/';

    const productListHTML = productList.map(product => `
    <a href='#' onclick="redirect('${dashboardPage}${product._id}', '${productsPage}${product._id}')"><li>
            <p>Nombre: ${product.nombre}</p>
            <img src='${product.imagen}'>
            <p>Precio: ${product.precio}</p>
        </li></a>`).join('');

    const html = `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Products - Dashboard</title>
    </head>
    <body>
        <header>
            <nav>
                <a href='/'>Home</a>
                <a href='/dashboard'>Dashboard</a>
            </nav>
        </header>
        <main>
            <ul>
                <p>Productos</p>
                ${productListHTML}
            </ul>
        </main>
        <script>
            function redirect(dashboardUrl, productsUrl) {
                const currentUrl = window.location.href;
                if (currentUrl.includes('/dashboard')) {
                    window.location.href = dashboardUrl;
                } else {
                    window.location.href = productsUrl;
                }
            }
        </script>
    </body>
    </html>`;
    
    return html;
};


async function showProductById(_id) {
    const getProduct = await product.findById(_id)
    const showProduct = `<p>Nombre:${getProduct.nombre}</p> <p>Descripción:${getProduct.descripcion}</p> <img src='${getProduct.imagen}'> <p>Categoria:${getProduct.categoria}</p> <p>Talla: ${getProduct.talla}</p> <p>Precio:${getProduct.precio}</p>`
    const html = `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Products - Dashboard</title>
    </head>
    <body>
        <header>
            <nav>
                <a href='/'>Home</a>
                <a href='/dashboard'>Dashboard</a>
            </nav>
        </header>
        <main>
          <div>${showProduct}</div>
        </main>
    </body>
    </html>`
    return html
    
};

async function updateProduct (_id, newInfo) {
    const productUpdate = await product.findByIdAndUpdate(_id, newInfo)
}


module.exports = {getProducts, showProductById, updateProduct}