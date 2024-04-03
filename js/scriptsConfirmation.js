window.addEventListener('load', function() {

    let orderedProducts = JSON.parse(localStorage.getItem('allProductsJSON'));

    let orderConfirmText = document.createElement('div');
    let ordernumber = document.createElement('b');
    let orderItems = document.createElement('div');
    let rowSpace = document.createElement('p');
    
    orderConfirmText.textContent = "Tack för din beställning med ordernummer: "
    ordernumber.textContent = orderNumberRNG();
    
    let row = document.querySelector('#orderConfirmation');
    
    row.appendChild(orderConfirmText);
    orderConfirmText.appendChild(ordernumber);
    row.appendChild(orderItems);
    row.appendChild(rowSpace);
    
    let totalProductsCount = 0;
    let totalPriceSum = 0;
    
    orderedProducts.forEach(selectedProduct => {
        totalProductsCount += selectedProduct.quantity;
        let productTotalPrice = selectedProduct.price * selectedProduct.quantity;
        totalPriceSum += productTotalPrice;
        console.log(totalProductsCount);
    
        let linkA = document.createElement('a');
        let productImage = document.createElement('img');
        let title = document.createElement('p');
        let price = document.createElement('span');
        let quantity = document.createElement('span');
        let productTotal = document.createElement('span');
        let br = this.document.createElement('br');
    
        title.style.marginLeft = "20px";
        title.style.fontWeight = "bold";
        title.style.fontSize = "16px";
        price.setAttribute("class", "price");
        linkA.setAttribute("href", "#");
        productImage.setAttribute("src", selectedProduct.image);
        productImage.style.height = '30px';
        productImage.style.width = '30px';
        productImage.style.objectFit = 'cover';
        productImage.style.float = 'left';
        productImage.style.marginRight = "10px";
    
        title.textContent = selectedProduct.title;
        price.textContent = '$' + productTotalPrice.toFixed(2); 
        quantity.textContent = selectedProduct.quantity + 'x';
        quantity.style.fontSize = '12px';
        quantity.style.fontWeight = 'bold';
        productTotal.textContent = '$' + selectedProduct.price.toFixed(2);
        productTotal.style.fontSize = '12px';
        productTotal.style.fontWeight = 'normal';
        price.style.fontSize = '14px';
    
        let row2 = document.querySelector('#start-list');
        row2.appendChild(productImage);
        row2.appendChild(title);
        title.appendChild(linkA);
        title.appendChild(br);
        title.appendChild(price);
        row2.appendChild(quantity);
        title.appendChild(productTotal);

        let hr = document.createElement('hr');
        row2.appendChild(hr);
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

function orderNumberRNG() {
        return Math.floor(Math.random() * (99999 - 1 + 1)) + 1;
}
