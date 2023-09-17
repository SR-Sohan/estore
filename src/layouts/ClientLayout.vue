<template>
  <div>
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Header from "../components/common/Header.vue";
import Footer from "../components/common/Footer.vue";
export default {
  name: 'ClientLayout',
  components: {
    Header,
    Footer
  }
}
</script>
