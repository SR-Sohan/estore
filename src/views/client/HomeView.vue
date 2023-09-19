<script>
import slider from '../../components/client/slider.vue';
import axios from "axios";
import { mapMutations } from "vuex";
import Card from "@/components/common/Card.vue";
  export default{
    components: {
      slider,
      Card
    },
    data(){
      return {
        brand: [],
        category: [],
        products: []
      }
    },
    created(){
      this.getBrand(),
      this.getCategories(),
      this.getProduct()
    },
    methods: {
      ...mapMutations(["SET_LOADING_STATUS"]),
     async getBrand(){
        this.SET_LOADING_STATUS(true)
        let res = await axios.get("http://127.0.0.1:8000/api/get-brand")
        this.brand = res.data;
      },
     async getCategories(){
        let res = await axios.get("http://127.0.0.1:8000/api/get-category")
        this.category = res.data;
      },
     async getProduct(){
        let res = await axios.get("http://127.0.0.1:8000/api/get-product")
        this.SET_LOADING_STATUS(false)
        this.products = res.data;
      }
    }
  }
</script>

<template>
  <main>
    <slider/>
   <div class="container my-5">
    <h3>Brand</h3>
    <hr>
      <div class="row g-3">
        <div v-for="item in brand" class="col-lg-3">
            <div class="single_items">
              <div class="single_items_img">
                <img :src="'http://127.0.0.1:8000/storage/images/' + item.image" alt="">
              </div>
              <h3>{{item.name}}</h3>
            </div>
        </div>
      </div>
   </div>
   <div class="container my-5">
    <h3>Categories</h3>
    <hr>
      <div class="row g-3">
        <div v-for="item in category" class="col-lg-3">
            <div class="single_items">
              <div class="single_items_img">
                <img :src="'http://127.0.0.1:8000/storage/images/' + item.image" alt="">
              </div>
              <h3>{{item.name}}</h3>
            </div>
        </div>
      </div>
   </div>
   <div class="container my-5">
    <h3>Products</h3>
    <hr>
      <div class="row g-3">
        <div v-for="item in products" class="col-lg-3">
            <Card :product="item"/>
        </div>
      </div>
   </div>
  </main>
</template>

<style>
  .single_items{position: relative;overflow: hidden;}
  .single_items::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .4;
  }
  .single_items h3{
    position: absolute;
    left: 50%;
    top: 50%;
    transform:  translate(-50%, -50%);
    text-align: center;
    color: #fff;
    z-index: 35;
  }
  .single_items:hover .single_items_img img{
    transform: scale(1.2);
  }
  .single_items_img img{
    width: 100%;
    height: 180px;
    transition: .5s;
    object-fit: cover;
  }
</style>
