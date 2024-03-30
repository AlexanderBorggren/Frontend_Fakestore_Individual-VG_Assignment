window.onload = createNavbar();

function createNavbar() {
    let navbar = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand">Fake store</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item"><a class="nav-link active" aria-current="page" href="index.html">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
                    </ul>
                    <form class="d-flex">
                        <div class="nav-item dropdown">
                            <button class="btn btn-outline-dark dropdown-toggle" onclick=loadCart() type="button" id="cartDropdown" aria-expanded="false">
                                <i class="bi-cart-fill me-1"></i>
                                Cart
                                <span id="productLength" class="badge bg-dark text-white ms-1 rounded-pill">0</span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end" id="dropdownData" aria-labelledby="cartDropdown">
                               <!-- Inject cart items here-->
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navbar);
}

function loadCart() {
    window.location.href = 'cart.html';
}
$(document).ready(function(){
    // Funktion för att uppdatera dropdown-menyn
    function updateDropdown() {
        let allProducts= JSON.parse(localStorage.allProductsJSON || '[]'); 

        // Om allProducts-arrayen inte är tom, lägg till dropdown-menyn
        if (allProducts.length !== 0) {
            if ($('#dropdownData').length === 0) {
                $('#cartDropdown').append('<ul class="dropdown-menu dropdown-menu-end" id="dropdownData" aria-labelledby="cartDropdown"></ul>');
            }
        } else {
            // Om allProducts-arrayen är tom, ta bort dropdown-menyn
            $('#dropdownData').remove();
        }
    }

    // Uppdatera dropdown-menyn när sidan laddas
    updateDropdown();

    
    $('#cartDropdown').hover(function(){
            let dropdownData = document.querySelector('#dropdownData'); 
            updateDropdown();  
        // Rensa dropdownData innan du lägger till nya produkter
            
            if (dropdownData) {
            dropdownData.innerHTML = '';
    
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
            quantityInput.type = 'number';  // Sätt input-typen till number
            quantityInput.min = '1';  // Sätt minsta tillåtna värde
            quantityInput.value = '1';  // Sätt ett initialt värde
            quantityInput.className = 'quantity-input';  // Lägg till col-1 till kvantitetsinputen
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
    
            totalPrice += product.price;
        });
    
        
        // Lägg till totalpriset längst ner i dropdown-menyn
        let totalPriceDiv = document.createElement('div');
        totalPriceDiv.textContent = "Total: $" + totalPrice;
        dropdownData.appendChild(totalPriceDiv);
        
            }
    });

    
});



