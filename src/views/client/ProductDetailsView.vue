<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-lg-5">
                <div class="img_container">
                    <img class="img-fluid" :src="'http://127.0.0.1:8000/storage/images/' + product.image" alt="">
                </div>
            </div>
            <div class="col-lg-6 ms-5"> 
                <div class="contanet">
                    <h1>{{product.title}}</h1>
                    <p>{{product.short_des}}</p>
                    <h5>Brand: {{product.brand?.name}}</h5>
                    <h5>Price: ${{product.price}}</h5>
                    <h5>Stock: {{product.stock}}</h5>
                    <h5>Stock: {{product.stock}}</h5>
                    <button @click="addToCart(product)" class="btn btn-outline-success mt-3">Add To Cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
        
        data(){
            return {
                product: {},
                cart: []
            }
        },

        methods:{
            getData(){
                fetch("http://127.0.0.1:8000/api/id-get-product/"+this.$route.params.id)
                .then( res => res.json())
                .then( data => this.product = data)     
            
            },      
            addToCart(product){                            
                this.$store.dispatch('addToCart', product);
            }
        },
        created(){
            this.getData()
        }

     
    }
</script>