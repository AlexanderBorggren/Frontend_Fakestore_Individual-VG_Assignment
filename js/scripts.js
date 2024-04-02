

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
            button.id = 'addToCart'
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
        let existingProduct = allProducts.find(p => p.id === product.id);
    if (existingProduct) {
        // Om produkten redan finns i kundkorgen, öka kvantiteten
        existingProduct.quantity++;
    } else {
        let selectedProduct = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                description: product.description,
                quantity: 1,
            };
        allProducts.push(selectedProduct);
    }
        console.log(allProducts); //LOGG
        localStorage.setItem('allProductsJSON', JSON.stringify(allProducts));
   
            updateCartCount();
            loadCart();

            //FOR MOBILE VERSION
            let navbarToggler = document.querySelector('.navbar-toggler');
            // Kontrollera om navbar-toggler är synlig
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                // Om den är synlig, trigga ett klick på den
                navbarToggler.click();
                setTimeout(function() {
                    navbarToggler.click();
                }, 1000);
            }
            dropdownData.scrollTop = dropdownData.scrollHeight;
        }

    function loadCart() {
        if (allProducts.length > 0) {
        let dropdownData = document.querySelector('#dropdownData');   
        // Rensa dropdownData innan du lägger till nya produkter
        if (dropdownData) {
            dropdownData.innerHTML = '';

            console.log("ifDropDown");
        
        let totalPrice = 0;
    
        allProducts.forEach(function(product) {
            let li = document.createElement('li');
            let outerDiv = document.createElement('div');
            let div = document.createElement('div');
            let img = document.createElement('img');
            let title = document.createElement('h4');
            let price = document.createElement('p');
            let closeButton = document.createElement('img');
            let quantityInput = document.createElement('input');  // Skapa en ny input för kvantitet
            let actionDiv = document.createElement('div');  // Skapa en ny div för "X"-knappen och kvantitetsinputen
    
            outerDiv.className = 'outer-div col-12 d-flex';
            div.className = 'dropdown-item col-10';
            img.src = product.image;
            title.textContent = product.title.length > 30 ? product.title.substring(0, 27) + '...' : product.title;
            price.textContent = "$" + product.price;
            closeButton.src = 'assets/close.svg';  // Ange källan till din SVG-ikon
            closeButton.className = 'close-button';
            closeButton.onclick = removeItem(product);
            quantityInput.type = 'number';  // Sätt input-typen till number
            quantityInput.min = '0';  // Sätt minsta tillåtna värde
            quantityInput.value = product.quantity;  // Sätt ett initialt värde
            quantityInput.className = 'quantity-input'; // Lägg till col-1 till kvantitetsinputen
            
            quantityInput.onchange = function() {
                // Uppdatera kvantiteten av produkten i allProducts array
                product.quantity = parseInt(this.value);
                // Uppdatera localStorage
                localStorage.setItem('allProductsJSON', JSON.stringify(allProducts));
                // Uppdatera kundkorgen
                updateCartCount();
                loadCart();
                if (quantityInput.value === 0){
                    removeItem(product);
                }
            };

            actionDiv.className = 'action-div d-flex flex-column align-items-end';  // Lägg till d-flex, flex-column och align-items-end till actionDiv
    
            img.style.height = '30px';
            img.style.width = '30px';
            title.style.fontSize = '10px';
            price.style.fontSize = '10px';
    
    
    
            div.appendChild(img);
            div.appendChild(title);
            div.appendChild(price);
            actionDiv.appendChild(quantityInput);  // Lägg till kvantitetsinputen till actionDiv
            actionDiv.appendChild(closeButton);  // Lägg till "X"-knappen till actionDiv
            li.appendChild(div);
            li.appendChild(actionDiv);  // Lägg till actionDiv till den yttre diven
            outerDiv.appendChild(li);
            dropdownData.appendChild(outerDiv);
    
            totalPrice += product.price * product.quantity;

        });
        let totalElement = document.createElement('li');
        totalElement.textContent = "Total: $" + totalPrice.toFixed(2);
        dropdownData.appendChild(totalElement);
        
    }
        
    }
}
function toggleCart() {
    let dropdownData = document.querySelector('#dropdownData');
    console.log(dropdownData);
    if (allProducts.length > 0 && dropdownData.style.display === 'none') {
        console.log("Toggle Cart");
        dropdownData.style.display = 'block';
    } else {
        dropdownData.style.display = 'none';
        console.log("Hide Cart");
    }
}

let cartButton = document.querySelector('#cartDropdown');
/*cartButton.addEventListener('click', function(event) {
    toggleCart();
    event.stopPropagation();  // Förhindra eventet från att bubbla upp till dokumentet
});*/
function updateCartCount() {
        let row = document.querySelector('#productLength');
        row.textContent = allProducts.length;
    }
$(document).click(function() {
        toggleCart();
    });

function removeItem(product)
{
    return function() {
        let index = allProducts.indexOf(product);
        allProducts.splice(index, 1);
        localStorage.setItem('allProductsJSON', JSON.stringify(allProducts));
        updateCartCount();
        loadCart();
        toggleCart();
    }
}

window.onload = loadCart();
