import { createRouter, createWebHistory } from 'vue-router'
import ClientLayout from "@/layouts/ClientLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import HomeView from "@/views/client/HomeView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import NotFound from "@/views/NotFound.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //  Client Routes
    {
      path: "/",
      component: ClientLayout,
      children: [
        {
          path: "",
          component: HomeView
        },
        {
          path: "/:pathMatch(.*)",
          component: NotFound
        }
      ]
    },

    // Admin Routes
    {
      path: "/admin",
      component: AdminLayout,
      children: [
        {
          path: "",
          component: AdminView
        },
        {
          path: "/admin/:pathMatch(.*)",
          component: NotFound
        }
      ]
    },

 
  ]
})

export default router
