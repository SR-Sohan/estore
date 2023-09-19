<template>
  <div class="login_page my-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="form_img">
            <img class="img-fluid" src="@/assets/images/icon/i1.svg" alt="" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="auth_from">
            <form @submit.prevent="submitForm">
              <h1 className="text-center">Register</h1>
              <p className="text-center">
                Already have an account?
                <RouterLink to="/login">Sign In</RouterLink>
              </p>
              <hr />
              <div class="mb-3 form_input_wrap">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" v-model="formData.name" />
              </div>
              <div class="mb-3 form_input_wrap">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" v-model="formData.email" />
              </div>
              <div class="mb-3 form_input_wrap">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" v-model="formData.password" />
              </div>
              <div class="mb-3 form_input_wrap">
                <label for="cpassword">Confirm Password</label>
                <input type="password" name="cpassword" id="cpassword" v-model="formData.cpassword" />
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
import { mapMutations } from 'vuex';
import axios from "axios"
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        cpassword: ""
      },
    };
  },
  methods: {
    ...mapMutations(['SET_LOADING_STATUS']),
    async submitForm(){
        if(this.formData.name === ""){
            useToast().error("Name is Required");
        }else if(this.formData.email === ""){
            useToast().error("Email is Required");
        }else if(this.formData.password === "" || this.formData.password.length < 6){
            useToast().error("Password is Required and must be 6 Charcter");
        }else if(this.formData.cpassword === ""){
            useToast().error("Confrim password is Required");
        }else if(this.formData.password !== this.formData.cpassword){
            useToast().error("Password and Confrim Password Not Match");
        }else{
          this.SET_LOADING_STATUS(true);
          let res = await axios.post("http://127.0.0.1:8000/api/sign-up",this.formData)
          this.SET_LOADING_STATUS(false);

         if(res.status === 200){
          useToast().success("Login Successfull");
          this.$router.push({ name: 'login'});
         }else{
          useToast().error("Can't login");
         }
     
        }
    },
  },
};
</script>
