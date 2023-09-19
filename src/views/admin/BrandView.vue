<template>
    <div
    class="page_heading d-flex align-items-center justify-content-between my-5 p-5"
  >
    <h1>Categories</h1>
    <div class="d-flex justify-content-end">
      <span>
        <i class="bi bi-plus-square" id="showFormBtn"></i>
      </span>
    </div>
    <div
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      id="formToggle"
      class="btn btn-outline-success"
    >
      <i class="fa-solid fa-plus"></i>
    </div>
  </div>

  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Category</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="category">Brand</label>
            <input
              class="form-control"
              type="text"
              name="name"
              id="category"
              v-model="this.data.name"
            />
          </div>
          <div class="mb-3">
            <input
              class="form-control"
              type="file"
              name="image"
              id="image"
              @change="onFileChange"
            />
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
            Add Brand
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container categories_wrap my-4">
    <table class="table table-success table-striped">
      <thead>
        <tr>
          
          <th>SL.</th>
          <th>Name</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="tbody">
        <tr v-for="(item,index) in brand">
          <td>{{index + 1}}</td>
          <td>{{item.name}}</td>
          <td><img class="w-25" style="height: 100px" :src="'http://127.0.0.1:8000/storage/images/' + item.image" alt=""></td>
          <td>
              <button class="btn btn-sam btn-outline-success">Edit</button>
              <button @click="deleteItem(item.id,item.image)" class="btn btn-sam btn-outline-danger ms-3">Delete</button>
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
        name: "",
        image: "",
      },
      brand: null
    };
  },
  created(){
    this.getData();
  },
  methods: {
    ...mapMutations(["SET_LOADING_STATUS"]),

  async  getData(){
        this.SET_LOADING_STATUS(true);
        let res = await axios.get("http://127.0.0.1:8000/api/get-brand");
        this.SET_LOADING_STATUS(false);

        if(res.status === 200){
            this.brand = res.data
        }
     },
    async handleSubmit() {
      let config = {
        "Content-Type": "multipart/form-data",
        "token" : localStorage.getItem("token")
      };
      if (this.data.name === "") {
        useToast().error("Name is Required");
      } else if (this.data.image === "") {
        useToast().error("Image is Required");
      } else {
        let formData = new FormData();

        formData.append("name", this.data.name);
        formData.append("image", this.data.image);

        this.SET_LOADING_STATUS(true);
        let res = await axios.post("http://127.0.0.1:8000/api/create-brand",formData,config);
        this.SET_LOADING_STATUS(false);

        if(res.status === 200){
            useToast().success("Brand Created");
            document.getElementById("closeBtn").click()
            this.data.name = ""
            this.data.image = ""
            this.getData();
        }else{
            useToast().error("Brand Can't Create");
        }
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.data.image = file;
    },
   async deleteItem(id,image){
        this.SET_LOADING_STATUS(true);
        let res = await axios.post("http://127.0.0.1:8000/api/delete-brand",{id: id,image: image});
        this.SET_LOADING_STATUS(false);

        if(res.status === 200){
          this.getData();
          useToast().success("Delete Item")
        }else{
          useToast().success("Can't Delete Item")
        }
    }
  },
};
</script>
