<template>
  <div class="container my-5">
    <h3>Products</h3>
    <hr />
    <div class="row g-3">
      <div v-for="item in products" class="col-lg-3">
        <Card :product="item" />
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import { mapMutations } from "vuex";
import Card from "@/components/common/Card.vue";
  export default{
    components: {   
      Card
    },
    data(){
      return {
        products: []
      }
    },
    created(){
      this.getProduct()
    },
    methods: {
      ...mapMutations(["SET_LOADING_STATUS"]),
   
     async getProduct(){
        this.SET_LOADING_STATUS(true)
        let res = await axios.get("http://127.0.0.1:8000/api/get-product")
        this.SET_LOADING_STATUS(false)
        this.products = res.data;
      }
    }
  }
</script>
