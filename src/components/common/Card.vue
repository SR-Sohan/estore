<script>
export default {
  props: {
    product: {},
  },
};
</script>

<template>
    <div class="single_card shadow-lg rounded">
        <div class="card_img">
            <img class="img-fluid" :src="'http://127.0.0.1:8000/storage/images/' + product.image" alt="">
        </div>
        <div class="card_content p-3">
            <h2>{{product.title}}</h2>
            <p>Brand: {{product.brand.name}}</p>
            <p>Price: ${{product.price}}</p>
            <a class="btn btn-outline-success" :href="'/products/'+ product.id">View Details</a>
        </div>
    </div>
</template>

<style>
    .card_img {
        height: 260px;
    }
    .card_img img{
        height: 100%;
    }
    .card_content{
        text-align: center;
    }
    .card_content h2{
        color: #003d29;
    }
</style>