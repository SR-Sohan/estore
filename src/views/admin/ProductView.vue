<template>
    <div
      class="page_heading d-flex align-items-center justify-content-between my-5 p-4"
    >
      <h1>Products</h1>
      <div class="d-flex justify-content-end">
        <span>
          <i class="bi bi-plus-square" id="showFormBtn"></i>
        </span>
      </div>
      <div
        data-bs-toggle="modal"
        data-bs-target="#productModal"
        id="formToggle"
        class="btn btn-outline-primary"
      >
        <i class="fa-solid fa-plus"></i>
      </div>
    </div>
  
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Product</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="brand">Brand</label>
              <select
                class="form-select"
                name="brand"
                id="brand"
                v-model="this.data.brand_id"
              >
                <option selected value="-1">Select Brand</option>
                <option v-for="item in brand" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="category">Category</label>
              <select
                class="form-select"
                name="category"
                id="category"
                v-model="this.data.cat_id"
              >
                <option selected value="-1">Select Category</option>
                <option v-for="item in category" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="title">Name</label>
              <input
                class="form-control"
                type="text"
                name="title"
                id="title"
                v-model="this.data.title"
              />
            </div>
            <div class="mb-3">
              <label for="short_des">Short Description</label>
              <input
                class="form-control"
                type="text"
                name="short_des"
                id="short_des"
                v-model="this.data.short_des"
              />
            </div>
            <div class="mb-3">
              <label for="price">Price</label>
              <input
                class="form-control"
                type="number"
                name="price"
                id="price"
                v-model="this.data.price"
              />
            </div>
            <div class="mb-3">
              <label for="stock">Stock</label>
              <input
                class="form-control"
                type="number"
                name="stock"
                id="stock"
                v-model="this.data.stock"
              />
            </div>
            <div class="mb-3">
              <label for="remark">Remark</label>
              <select
                class="form-select"
                name="remark"
                id="remark"
                v-model="this.data.remark"
              >
                <option value="-1">Select Remark</option>
                <option value="popular">Popular</option>
                <option value="new">New</option>
                <option value="top">Top</option>
                <option value="special">Special</option>
                <option value="trending">Trending</option>
                <option value="regular">Regular</option>
              </select>
            </div>
  
            <div class="mb-3">
              <input @change="fileChange" type="file" class="form-control" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              id="closeBtn"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button @click="handleSubmit" type="button" class="btn btn-primary">
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <div class="container categories_wrap my-4">
      <table class="table table-info table-striped">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Category</th>
            <th>Title</th>
            <th>Image</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Remark</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr v-for="(item,index) in products">
              <td>{{ item.brand.name }}</td>
              <td>{{ item.cat_id }}</td>
              <td>{{ item.title }}</td>
              <td><img class="w-25" style="height: 60px" :src="'http://127.0.0.1:8000/storage/images/' + item.image" alt=""></td>
              <td>{{ item.price }}</td>
              <td>{{ item.stock }}</td>
              <td>{{ item.remark }}</td>
              <td>
              <button class="btn btn-sam btn-outline-success">Edit</button>
                <button @click="deleteItem(item.id,item.image)" class="btn btn-sam btn-outline-danger">Delete</button>
              </td>
          </tr>
        </tbody>
      </table>
  
    </div>
  </template>
  
  <script>
  import { useToast } from "vue-toastification";
  import axios from "axios";
  import { mapMutations } from "vuex";
  export default {
      
    data() {
      return {
        data: {
          brand_id: "-1",
          cat_id: "-1",
          title: "",
          short_des: "",
          price: "",
          stock: "",
          remark: "-1",
          image: "",
        },
        brand: null,
        category: null,
        products: null,
      };
    },
    created() {
      this.getBrand();
      this.getCategory();
      this.loadData();
    },
    methods: {
      ...mapMutations(["SET_LOADING_STATUS"]),
  
      async loadData() {
        this.SET_LOADING_STATUS(true);
        let res = await axios.get("http://127.0.0.1:8000/api/get-product");
        this.SET_LOADING_STATUS(false);
        if(res.status === 200){
          this.products = res.data;
        } 
    
      },
  
      async getBrand() {
        let res = await axios.get("http://127.0.0.1:8000/api/get-brand");
        this.brand = res.data;
      },
      async getCategory() {
        let res = await axios.get("http://127.0.0.1:8000/api/get-category");
        this.category = res.data;
      },
      async handleSubmit() {
        if (this.data.brand_id == "-1") {
          useToast.error("Brand Required");
        } else if (this.data.cat_id == "-1") {
          useToast.error("Category Required");
        } else if (this.data.title === "") {
          useToast.error("Title Required");
        } else if (this.data.short_des === "") {
          useToast.error("Short Description Required");
        } else if (this.data.price === "") {
          useToast.error("Price Required");
        } else if (this.data.stock === "") {
          useToast.error("Stock Required");
        } else if (this.data.remark == "-1") {
          useToast.error("Remark Required");
        } else if (this.data.image === "") {
          useToast.error("Image Required");
        } else {
          let config = {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          };
  
          let formData = new FormData();
          formData.append("brand_id", this.data.brand_id);
          formData.append("cat_id", this.data.cat_id);
          formData.append("title", this.data.title);
          formData.append("short_des", this.data.short_des);
          formData.append("price", this.data.price);
          formData.append("stock", this.data.stock);
          formData.append("remark", this.data.remark);
          formData.append("image", this.data.image);
  
          this.SET_LOADING_STATUS(true);
          let res = await axios.post(
            "http://127.0.0.1:8000/api/create-product",
            formData,
            config
          );
          this.SET_LOADING_STATUS(false);
  
          if (res.status === 200) {
            document.getElementById("closeBtn").click();
            this.data = {
              brand_id: "-1",
              cat_id: "-1",
              title: "",
              short_des: "",
              price: "",
              stock: "",
              remark: "-1",
              image: "",
            };
            this.loadData();
            useToast().success("Product Created");
          }
        }
      },
  
      fileChange(event) {
        const file = event.target.files[0];
        this.data.image = file;
      },
     async deleteItem(id,image){
  
          if(confirm("Are you Want Delete?")){
              this.SET_LOADING_STATUS(true)
              let res  = await axios.post("http://127.0.0.1:8000/api/delete-product",{
                  id: id,
                  image: image
              })
              this.SET_LOADING_STATUS(true)
              if(res.status === 200){
                  useToast().success("item delete");
                  this.loadData();
              }
          }
      }
    },
  };
  </script>
  