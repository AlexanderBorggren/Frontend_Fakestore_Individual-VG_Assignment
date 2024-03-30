
 window.onload = function() {
        // Hämta den valda produkten från localStorage
        let product = JSON.parse(localStorage.getItem('sendToProducts'));

        // Selektor i products.html
        let productContainer = document.querySelector('.row.gx-4.gx-lg-5.align-items-center');

        // Skapa nya element
        let colImg = document.createElement('div');
        let img = document.createElement('img');
        let colInfo = document.createElement('div');
        let sku = document.createElement('div');
        let title = document.createElement('h1');
        let price = document.createElement('div');
        let description = document.createElement('p');
        let inputGroup = document.createElement('div');
        let input = document.createElement('input');
        let button = document.createElement('button');

        // Ange attribut och innehåll
        colImg.className = 'col-md-6';
        img.className = 'card-img-top mb-5 mb-md-0';
        img.src = product.image;
        img.alt = product.title;
        colInfo.className = 'col-md-6';
        sku.className = 'small mb-1';
        sku.textContent = `SKU: ${product.id}`; // Använd produktens ID som SKU
        title.id = 'product-id';
        title.className = 'display-5 fw-bolder';
        title.textContent = product.title;
        price.className = 'fs-5 mb-5';
        price.innerHTML = '$' + product.price;
        description.className = 'lead';
        description.textContent = product.description;
        inputGroup.className = 'd-flex';
        input.className = 'form-control text-center me-3';
        input.id = 'inputQuantity';
        input.type = 'num';
        input.value = '1';
        input.style.maxWidth = '3rem'; //inline css
        button.className = 'btn btn-outline-dark flex-shrink-0';
        button.type = 'button';
        button.innerHTML = '<i class="bi-cart-fill me-1"></i>Add to cart';

        button.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
    
            let selectedProduct = {
                id: product.id,
                title: product.title,
                price: product.price,
            };
        
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            window.open('cart.html', '_self');
        });

        // Bygg upp HTML-strukturen
        colImg.appendChild(img);
        inputGroup.appendChild(input);
        inputGroup.appendChild(button);
        colInfo.appendChild(sku);
        colInfo.appendChild(title);
        colInfo.appendChild(price);
        colInfo.appendChild(description);
        colInfo.appendChild(inputGroup);
        productContainer.appendChild(colImg);
        productContainer.appendChild(colInfo);

        function createRelatedProductElement(product, container) {
            // Skapa nya element
            let col = document.createElement('div');
            let card = document.createElement('div');
            let img = document.createElement('img');
            let cardBody = document.createElement('div');
            let textCenter = document.createElement('div');
            let title = document.createElement('h5');
            let reviews = document.createElement('div');
            let price = document.createElement('span');
            let cardFooter = document.createElement('div');
            let buttonDiv = document.createElement('div');
            let button = document.createElement('a');
        
            // Ange attribut och innehåll
            col.className = 'col mb-5';
            card.className = 'card h-100';
            img.className = 'card-img-top';
            img.src = product.image;
            img.alt = product.title;

            img.style.height = '150px'; // Ange höjden till 100% av container
            img.style.objectFit = 'scale-down'; // Behåll bildens proportioner
            col.style.maxWidth = '300px'; // Ange maxbredden till 200 pixlar
            col.style.maxHeight = '100%'; // Ange maxhöjden till 300 pixlar
            

            cardBody.className = 'card-body p-4';
            textCenter.className = 'text-center';
            title.className = 'fw-bolder';
            title.textContent = product.title;
            reviews.className = 'd-flex justify-content-center small text-warning mb-2';

            for (let i = 0; i < 5; i++) {
                let star = document.createElement('div');
                star.className = 'bi-star-fill';
                reviews.appendChild(star);
            }

            price.textContent = '$' + product.price;
            cardFooter.className = 'card-footer p-4 pt-0 border-top-0 bg-transparent';
            buttonDiv.className = 'text-center';
            button.className = 'btn btn-outline-dark mt-auto';
            button.href = '#';
            button.textContent = 'Add to cart';
        
            // Bygg upp HTML-strukturen
            textCenter.appendChild(title);
            textCenter.appendChild(reviews);
            textCenter.appendChild(price);
            cardBody.appendChild(textCenter);
            buttonDiv.appendChild(button);
            cardFooter.appendChild(buttonDiv);
            card.appendChild(img);
            card.appendChild(cardBody);
            card.appendChild(cardFooter);
            col.appendChild(card);
            container.appendChild(col);
        }

        let selectedProductCategory = product.category;
        let productsByCategory = JSON.parse(localStorage.getItem('relatedProducts'));

        // Hämta produkterna i samma kategori som den valda produkten
        // Filtera produkterna i samma kategori som den valda produkten, 
        // Slumpar produkterna i samma kategori
        // Väljer ut max 4 produkter
        let relatedProducts = productsByCategory[selectedProductCategory]
            .filter(products => products.id !== product.id)
            .sort(() => Math.random()-0.5)
            .slice(0, 4);

        // Kontrollera om det finns några relaterade produkter
        if (relatedProducts.length > 0) {
            // Selektor för relaterade produkter
            let relatedProductsContainer = document.querySelector('#relatedProducts');
            // Skapa upp varje relaterad produkt
            relatedProducts.forEach(relatedProduct => {
                createRelatedProductElement(relatedProduct, relatedProductsContainer);
            });
        } else {
            console.log('Inga relaterade produkter hittades i samma kategori som den valda produkten.');
        }   
    };
