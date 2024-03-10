const product = require("../models/product");

function home () {
    const html =`
    <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Products</title>
        </head>
        <body>
            <header>
                <nav>
                    <a href='/'>Home</a>
                    <a href='/dashboard'>Dashboard</a>
                    <a href='/products'>Productos</a>
                    <a href='/dashboard/new'>Nuevo Producto</a>
                </nav>
            </header>
        </body>
    </html>`

    return html;
}

async function getProducts() {
    const productList = await product.find();
    const dashboardPage = 'http://localhost:3000/dashboard/';
    const productsPage = 'http://localhost:3000/products/';

    const productListHTML = productList.map(product => `
    <a href='#' onclick="redirect('${dashboardPage}${product._id}', '${productsPage}${product._id}')" style= text-decoration:none >
        <li>
            <p>Nombre: ${product.nombre}</p>
            <img src='${product.imagen}' height='200px'>
            <p>Precio: ${product.precio} €</p>
        </li>
    </a>`).join('');

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
                <a href='/products'>Productos</a>
                <a href='/dashboard/new'>Nuevo Producto</a>
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
    const getProduct = await product.findById(_id);
    
    const editButton = `<button id="editButton" onclick="redirect()">Actualizar producto</button>`
    const delButton = `<button id="delButton" onclick="sendDelete()">Borrar producto</button>`;
    const showProduct = `
    <p>Nombre: ${getProduct.nombre}
    </p> <p>Descripción: ${getProduct.descripcion}</p> 
    <img src='${getProduct.imagen}' height='200px'> 
    <p>Categoria: ${getProduct.categoria}</p> 
    <p>Talla: ${getProduct.talla}</p> 
    <p>Precio: ${getProduct.precio} € </p>`;

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
                <a href='/products'>Productos</a>
                <a href='/dashboard/new'>Nuevo Producto</a>
            </nav>
        </header>
        <main>
          <div>${showProduct}</div>
          <div>${editButton}</div><div>${delButton}</div>
        </main>
        <script>
            const currentUrl = window.location.href;
            const delButtonElement = document.getElementById('delButton');
            const editButtonElement = document.getElementById('editButton');

            if (currentUrl.includes('/dashboard')) {
                delButtonElement.style.display = 'block';
                editButtonElement.style.display = 'block';
                function sendDelete() {
                    fetch(window.location.href + '/delete', {method: 'DELETE'})
                    window.location.href = 'http://localhost:3000/dashboard/'
                }
                function redirect() {
                    window.location.href = '/dashboard/${getProduct._id}/edit'
                }
            } else {
                delButtonElement.style.display = 'none';
                editButtonElement.style.display = 'none';
            }
        </script>
    </body>
    </html>`;

    return html;
    
};

async function updateProduct (_id, newInfo) {
    const productUpdate = await product.findByIdAndUpdate(_id, newInfo, {new:true});
    return productUpdate
};

async function showNewProduct () {
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
                <a href='/products'>Productos</a>
                <a href='/dashboard/new'>Nuevo Producto</a>
            </nav>
        </header>
        <main>
            <form action="/dashboard" method="post">
                <label>Nombre: <input type="text" name="nombre" id="nombre" required/></label><br>
                <label>Descripción: <input type="text" name="descripcion" id="descripcion" required/></label><br>
                <label>Imagen: <input type="text" name="imagen" id="imagen" required/></label><br>
                <label>Categoria: <select name="categoria" id="categoria" required>
                    <option value="Camisetas">Camisetas</option>
                    <option value="Pantalones">Pantalones</option>
                    <option value="Zapatos">Zapatos</option>
                    <option value="Accesorios">Accesorios</option>
                </select></label><br>
                <label>Talla: <select name="talla" id="talla" required>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select></label><br>
                <label>Precio: <input type="number" name="precio" id="precio" required/></label><br>
                <input type="submit" value="Crear" />
                <input type="reset" value="Reestablecer todo" />
            </form>
        </main>
    </body>
    </html>`;

    return html;
};

async function showEditProduct (_id) {
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
                <a href='/products'>Productos</a>
                <a href='/dashboard/new'>Nuevo Producto</a>
            </nav>
        </header>
        <main>
            <form action="/dashboard/${_id}" method="put">
                <label>Nombre: <input type="text" name="nombre" id="nombre"/></label><br>
                <label>Descripción: <input type="text" name="descripcion" id="descripcion" /></label><br>
                <label>Imagen: <input type="text" name="imagen" id="imagen" /></label><br>
                <label>Categoria: <select name="categoria" id="categoria" >
                    <option value="Camisetas">Camisetas</option>
                    <option value="Pantalones">Pantalones</option>
                    <option value="Zapatos">Zapatos</option>
                    <option value="Accesorios">Accesorios</option>
                </select></label><br>
                <label>Talla: <select name="talla" id="talla" >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select></label><br>
                <label>Precio: <input type="number" name="precio" id="precio" /></label><br>
                <input type="submit" value="Actualizar" />
                <input type="reset" value="Reestablecer todo" />
            </form>
        </main>
    </body>
    </html>`;

    return html;

};

async function deleteProduct (_id) {
    const deletingProduct = await product.findByIdAndDelete(_id)
    
};

module.exports = {home, getProducts, showProductById, updateProduct, showNewProduct, showEditProduct, deleteProduct}