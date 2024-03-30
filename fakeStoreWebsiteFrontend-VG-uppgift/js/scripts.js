function fetchProducts(handleProducts) {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            handleProducts(products);
        })
        .catch(error => console.error('Error:', error));
}

fetchProducts(products => {
        // if product has correct category then
    
    let row = document.querySelector('#products');

        products.forEach(product => {
            // Skapa nya element
            let col = document.createElement('div');
            let link = document.createElement('a');
            let card = document.createElement('div');
            let img = document.createElement('img');
            let body = document.createElement('div');
            let center = document.createElement('div');
            let title = document.createElement('h5');
            let price = document.createElement('p');
            let footer = document.createElement('div');
            let footerCenter = document.createElement('div');
            let button = document.createElement('button');
                
            // Ange attribut och innehåll
            col.className = 'col-12 col-sm-6 col-lg-4 mb-5';
            link.style.textDecoration = 'none'; //inline css

            link.addEventListener('click', function(event) {
                // Om användaren klickade på knappen, gör ingenting
                if (event.target === button) {
                    event.preventDefault();
                } else {
                // Annars, följ länken till produktsidan

                let selectedProduct = {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    description: product.description,
                };

                localStorage.setItem('sendToProducts', JSON.stringify(product));
                window.open('products.html', '_self');

                // Skapa ett tomt objekt för att lagra produkterna per kategori
                let productsByCategory = {};

                // Gå igenom varje produkt
                products.forEach(product => {
                // Om kategorin inte redan finns i objektet, skapa en ny lista för den
                if (!productsByCategory[product.category]) {
                    productsByCategory[product.category] = [];
                }

                // Lägg till produkten i listan för dess kategori
                productsByCategory[product.category].push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    description: product.description,
                });
            });

            // Lagra objektet i localStorage
            localStorage.setItem('relatedProducts', JSON.stringify(productsByCategory));
                
            }});

            card.className = 'card h-100';
            img.className = 'card-img-top';
            img.src = product.image;
            img.alt = product.title;
            img.style.height = '300px'; // inline css inte bäst practice
            img.style.width = '100%'; // inline css
            img.style.objectFit = 'cover'; // inline css
            body.className = 'card-body p-4';
            center.className = 'text-center';
            center.style.color = 'black'; //inline css
            center.style.textDecoration = 'none'; //inline css
            title.className = 'fw-bolder';
            title.textContent = product.title;
            price.textContent = `$${product.price}`;
            footer.className = 'card-footer p-4 pt-0 border-top-0 bg-transparent';
            footerCenter.className = 'text-center ';
            button.className = 'btn btn-outline-dark mt-auto';
            button.textContent = 'Add to cart';
            
            button.addEventListener('click', function(event) {
                event.stopPropagation();
                event.preventDefault();
                addToCart(product);
            });

            // Bygg upp HTML-strukturen
            center.appendChild(title);
            center.appendChild(price);
            body.appendChild(center);
            footerCenter.appendChild(button);
            footer.appendChild(footerCenter);
            card.appendChild(img);
            card.appendChild(body);
            card.appendChild(footer);
            link.appendChild(card);
            col.appendChild(link);

            // Lägg till det nya elementet i raden
            row.appendChild(col);
        });
    });
    //window.localStorage.clear();
    let allProducts= JSON.parse(localStorage.allProductsJSON || '[]');
    let row = document.querySelector('#productLength');
    row.textContent = allProducts.length;
function addToCart(product){
    let selectedProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
        };
    allProducts.push(selectedProduct);
    console.log(allProducts);
    localStorage.setItem('allProductsJSON', JSON.stringify(allProducts));

    let row = document.querySelector('#productLength');
        row.textContent = allProducts.length;
    
    }

    
