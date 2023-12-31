import { createRouter, createWebHistory } from "vue-router";
import ClientLayout from "@/layouts/ClientLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import HomeView from "@/views/client/HomeView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import NotFound from "@/views/NotFound.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import store from "../store/Store";
import BrandView from "../views/admin/BrandView.vue"
import CategoryView from "../views/admin/CategoryView.vue"
import ProductView from "../views/admin/ProductView.vue"
import ProductDetailsView from "../views/client/ProductDetailsView.vue"
import CartView from "../views/client/CartView.vue"
import CProductsView from "../views/client/CProductsView.vue"
import { isTokenDecode, isTokenValid } from "@/helper/jwtDecode.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //  Client Routes
    {
      name: "/",
      path: "/",
      component: ClientLayout,
      children: [
        {
          name: "home",
          path: "",
          component: HomeView,
        },
        {
          name: "login",
          path: "login",
          component: LoginView,
        },
        {
          name: "register",
          path: "register",
          component: RegisterView,
        },
        {
          name: "cart",
          path: "cart",
          component: CartView,
        },
        {
          name: "cproducts",
          path: "products",
          component: CProductsView,
        },
        {
          name: "productDetailsView",
          path: "products/:id",
          component: ProductDetailsView,
        },
        {
          path: "/:pathMatch(.*)",
          component: NotFound,
        },
      ],
    },

    // Admin Routes
    {
      name: "admin",
      path: "/admin",
      component: AdminLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: "",
          component: AdminView,
        },
        {
          path: "brand",
          component: BrandView,
        },
        {
          path: "category",
          component: CategoryView,
        },
        {
          path: "product",
          component: ProductView,
        },
        {
          path: "/admin/:pathMatch(.*)",
          component: NotFound,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = store.state.token || "";
    if (token) {
      let isValid = isTokenValid(token);
      let decodeData = isTokenDecode(token);
      
      if (isValid && decodeData.role === "admin") {
        
        next();
      } else if (isValid && decodeData.role === "user") {
        next("/");
      } else {
        next("/login");
      }
    } else {
      next("/login");
    }
  } else {
    if (to.name === "login" && store.state.token) {
      next("/");
    } else if (to.name === "register" && store.state.token) {
      next("/");
    } else {
      next();
    }
  }
});
export default router;
