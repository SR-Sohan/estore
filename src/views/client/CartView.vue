<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <div class="cart_wrap">
                    <h2 class="mb-3">Carit Item: </h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in products">
                                <td><img style="width: 100px; height: 60px; object-fit:cover" :src="'http://127.0.0.1:8000/storage/images/' + product.image" alt=""></td>
                                <td>{{product.title}}</td>
                                <td>
                                    <button  @click="decremnet(product.id)" class="btn btn-sm btn-success">-</button>
                                    <input 
                                    class="text-center p-2 w-25" type="number" name="qty" id="qty" :value="product.quantity">
                                    <button @click="incremnetQty(product.id)" class="btn btn-sm btn-success">+</button>
                                </td>
                                <td>${{product.price}}</td>
                                <td>${{product.price * product.quantity}}</td>
                                <td><button @click="removeFromCart(product.id)" class="btn btn-sm btn-danger">Remove</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="cart_checkout shadow-lg p-2">
                    <h2>Checkout</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.getCart();
  },
  methods: {
    checkout(){
      this.$router.push({ name: "checkout" });
    },
    getCart() {
      this.products = this.$store.getters.getCartitem;
    },
    
    incremnetQty(id){
      let qty = document.getElementById("qty").value
      this.$store.dispatch('incremnet', {id,qty});
    },
    decremnet(id){
      let qty = document.getElementById("qty").value
      if(qty > 1){
        this.$store.dispatch('decremnet', {id,qty});
      }
    },
    removeFromCart(id){
      this.$store.dispatch('removeItem', id);
      this.getCart();
    }
  },
};
</script>