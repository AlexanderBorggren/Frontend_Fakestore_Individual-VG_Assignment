window.onload = createNavbar ();

function createNavbar () {
  let navbar = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light" id=theNavBar>
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
                            <button class="btn btn-outline-dark dropdown-toggle" type="button" id="cartDropdown" aria-expanded="false">
                                <i class="bi-cart-fill me-1"></i>
                                Cart
                                <span id="productLength" class="badge bg-dark text-white ms-1 rounded-pill">0</span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end col-12" id="dropdownData" aria-labelledby="cartDropdown">
                               <!-- Inject cart items here-->
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    `;

  document.body.insertAdjacentHTML ('afterbegin', navbar);
}
