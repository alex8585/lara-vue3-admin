import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import CategoriesView from "../views/categories/IndexView.vue";
import TagsView from "../views/tags/IndexView.vue";
import PostsView from "../views/posts/IndexView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import LogoutView from "@/components/LogoutView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: DashboardView,
    },
    {
      path: "/apptags",
      name: "Tags",
      component: TagsView,
    },
    {
      path: "/categories",
      name: "Categories",
      component: CategoriesView,
    },
    {
      path: "/posts",
      name: "Posts",
      component: PostsView,
    },

    {
      path: "/register",
      name: "Registration",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },

    {
      path: "/logout",
      name: "Logout",
      component: LogoutView,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
