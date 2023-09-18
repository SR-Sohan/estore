<template>
  <div>
    <Header />
    <div v-if="this.isLogin()">
      <Spinner/>
    </div>
    <RouterView />
    <Footer />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Header from "../components/common/Header.vue";
import Footer from "../components/common/Footer.vue";
import Spinner from "../components/common/Spinner.vue";
export default {
  name: "ClientLayout",
  components: {
    Header,
    Footer,
    Spinner,
  },
  created() {
    this.isLogin(); 
  },
  methods: {
    isLogin() {
      return this.$store.getters.isLoading;
    },
  },
};
</script>
