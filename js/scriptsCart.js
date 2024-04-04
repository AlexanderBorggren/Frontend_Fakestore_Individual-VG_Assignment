window.addEventListener('load', function() {
    let allProducts = JSON.parse(localStorage.getItem('allProductsJSON'));

    let totalPriceSum = 0;
    let totalProductsCount = 0;

    allProducts.forEach(selectedProduct => {
        totalProductsCount += selectedProduct.quantity;
        let productTotalPrice = selectedProduct.price * selectedProduct.quantity;
        totalPriceSum += productTotalPrice;
    
        let linkA = document.createElement('a');
        let productImage = document.createElement('img');
        let title = document.createElement('p');
        let price = document.createElement('span');
        let quantityInput = document.createElement('input');
        let productTotal = document.createElement('span');
        let br = this.document.createElement('br');
    
        title.style.marginLeft = "20px";
        title.style.fontWeight = "bold";
        title.style.fontSize = "16px";
        price.setAttribute("class", "price");
        linkA.setAttribute("href", "#");
        productImage.setAttribute("src", selectedProduct.image);
        productImage.style.height = '90px';
        productImage.style.width = '90px';
        productImage.style.objectFit = 'cover';
        productImage.style.float = 'left';
        productImage.style.marginRight = "10px";
    
        title.textContent = selectedProduct.title;
        price.textContent = '$' + productTotalPrice.toFixed(2); 
        quantityInput.style.fontSize = '14px';
        quantityInput.type = 'number';
        quantityInput.min = '1';
        quantityInput.value = selectedProduct.quantity;
        quantityInput.className = 'quantity-input';
        quantityInput.style.height = '30px';
        quantityInput.style.width = '45px';

        quantityInput.onchange = function () {
            // Uppdatera kvantiteten av produkten i allProducts array
            selectedProduct.quantity = parseInt (this.value);
            if (quantityInput.value === 0) {
              removeItem (product);
            }
            // Uppdatera localStorage
            localStorage.setItem (
              'allProductsJSON',
              JSON.stringify (allProducts)
            );
            // Uppdatera kundkorgen
            updateCart();
            updateCartCount();
            loadCart();
            
          };

        productTotal.textContent = '$' + selectedProduct.price.toFixed(2);
        productTotal.style.fontSize = '12px';
        productTotal.style.fontWeight = 'normal';
        price.style.fontSize = '14px';
    
        let row2 = document.querySelector('#start-list');
        row2.appendChild(productImage);
        row2.appendChild(title);
        row2.appendChild(quantityInput);
        title.appendChild(linkA);
        title.appendChild(br);
        title.appendChild(price);
        
        title.appendChild(productTotal);

        let hr = document.createElement('hr');
        row2.appendChild(hr);

        function updateCart() {
            let allProducts = JSON.parse(localStorage.getItem('allProductsJSON'));
            // Uppdatera totalpriset och produktantalet
            totalPriceSum = allProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
            totalProductsCount = allProducts.reduce((sum, product) => sum + product.quantity, 0);
            boldTotalPrice.textContent = '$' + totalPriceSum.toFixed(2);
            totalProductsCountElement.textContent = totalProductsCount.toString();
            price.textContent = '$' + (selectedProduct.price * selectedProduct.quantity).toFixed(2);

        };

        function removeItem(productToRemove) {
            // Ta bort produkten från allProducts array
            allProducts = allProducts.filter(product => product !== productToRemove);
            // Uppdatera localStorage
            localStorage.setItem('allProductsJSON', JSON.stringify(allProducts));
            // Uppdatera kundvagnen
            updateCart();
        }
    });

    let totalPrice = document.createElement('span');
    let totalPriceTitle = document.createElement('p');
    let boldTotalPrice = document.createElement('b');

    totalPriceTitle.style.fontWeight = "bold";
    totalPrice.className = 'price';
    totalPrice.style.color = "black";
    totalPriceTitle.style.fontSize = "22px";
    totalPriceTitle.style.marginBottom = "-1px";
    totalPrice.style.fontSize = "18px";
    totalPriceTitle.textContent = 'Total';
    boldTotalPrice.textContent = '$' + totalPriceSum.toFixed(2);

    let row2 = document.querySelector('#start-list');
    row2.appendChild(totalPriceTitle);
    totalPrice.appendChild(boldTotalPrice);
    totalPriceTitle.appendChild(totalPrice);

    let totalProductsCountElement = document.querySelector('#totalProductsCount');
    let totalProductsCountText = document.createTextNode(totalProductsCount.toString());
    totalProductsCountElement.textContent = totalProductsCountText.nodeValue;
    
});

