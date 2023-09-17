<script>
import { RouterLink } from "vue-router";
import logo from "../../assets/images/logo.svg";
</script>

<template>
  <header>
    <div class="top_header">
      <div
        class="container d-flex align-items-center justify-content-between text-white"
      >
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
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="@/assets/images/logo.svg" alt="" />
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
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="products">Products</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="contact"
                >Contact US</router-link
              >
            </li>
          </ul>
          <div class="navbar_right d-flex align-items-center">
            <div class="cart_section">
              <a href="" class="cart_icon">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>
                  <span>08</span>
                </p>
              </a>
            </div>
            <div class="auth ms-5">
              <div class="sing_in">
                <router-link to="/login">Login</router-link>
              </div>
              <!-- <div class="login_profile d-flex align-items-center">
                <div class="user_profile_img">
                  <img src="@/assets/images/user.jpg" alt="" />
                </div>
                <div id="dropDownUser" class="dropdown ms-1">
                  <button
                    class="btn  dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sohanur
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <router-link class="dropdown-item" to="profile">Profile</router-link>
                    </li>
                    <li>
                      <router-link class="dropdown-item" to="logout">Logout</router-link>
                    </li>
                  </ul>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
