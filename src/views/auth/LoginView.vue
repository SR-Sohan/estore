<template>
  <div class="login_page my-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="form_img">
            <img class="img-fluid" src="@/assets/images/icon/i3.svg" alt="" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="auth_from">
            <form @submit.prevent="loginForm">
              <h1 className="text-center">Login</h1>
              <p className="text-center">
                Don't have an account?
                <RouterLink to="/register">Sign Up</RouterLink>
              </p>
              <hr />
              <div class="mb-3 form_input_wrap">
                <label for="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  v-model="this.formData.email"
                />
              </div>
              <div class="mb-3 form_input_wrap">
                <label for="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  v-model="this.formData.password"
                />
              </div>
              <input class="submitBtn" type="submit" value="Sign Up" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { mapMutations, mapGetters } from "vuex";
import axios from "axios";
import { isTokenDecode } from "@/helper/jwtDecode.js";

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapMutations(["SET_LOADING_STATUS", "AUTH_SUCCESS"]),
    ...mapGetters(["getToken"]),
    async loginForm() {
      if (this.formData.email === "") {
        useToast().error("Email is required");
      } else if (
        this.formData.password === "" ||
        this.formData.password.length < 8
      ) {
        useToast().error("Password is required and must be 8 character");
      } else {
        this.SET_LOADING_STATUS(true);
        let res = await axios.post(
          "http://127.0.0.1:8000/api/sign-in",
          this.formData
        );
        this.SET_LOADING_STATUS(false);

        if (res.status === 200) {
          useToast().success(res.data["message"]);
          localStorage.setItem("token", res.data["token"]);
            
          let tokenDecode = isTokenDecode(res.data['token']);

          this.$store.dispatch('authenticate', {
                token: res.data["token"],
                user:  tokenDecode,
            });
          this.$router.push({ name: "admin" });
        } else {
          useToast().error(res.data["message"]);
        }
      }
    },

    tokenDecode(token) {
      return isTokenDecode(token);
    },
  },
};
</script>
