<script>
import logo from "../../assets/images/logo.svg";
</script>

<template>
  <header>
    <div
      class="top_header "
    >
      <div class="container d-flex align-items-center justify-content-between text-white">
        <div>
          <i class="fa-solid fa-phone"></i>
          <a class="text-white" href="tel:+8801302460356">+8801302460356</a>
        </div>
        <div>
          <span>Get 50% Off on Selected Items Shop Now</span>
        </div>
        <div>
          <select name="" id="">
            <option value="english">English</option>
            <option value="bangla">Bangla</option>
          </select>
          <select name="" id="">
            <option value="-1">Location</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Khulna">Khulna</option>
            <option value="Rajshsi">Rajshsi</option>
          </select>
        </div>
      </div>
    </div>

    <!--  NavBar -->
    <nav class="navbar navbar-expand-lg ">
      <div class="container">
        <a class="navbar-brand" href="#">
            <img src="@/assets/images/logo.svg" alt="">
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link " aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact US</a>
            </li>
            
          </ul>
          <div class="navbar_right">
            <div class="cart_section">
                <a href="" class="cart_icon">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <p>
                        <span>08</span>
                    </p>
                </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
