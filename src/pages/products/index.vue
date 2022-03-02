<template>
  <div class="container">
    <div class="header border">
      <div class="left">상품목록</div>
      <div class="right"><button class="btn btn-success" @click="moveToCreate()">상품등록</button></div>
    </div>
    <div class="body border">
      <div class="card" v-for="product in products" :key="product.id">
        <img :src="product.img" class="card-img-top" @click="moveToDetail(product.id)">
        <div class="card-body">
          <h5 class="card-title">{{product.name}} ({{product.brand}})</h5>
          <p class="card-text">{{ product.desc }}</p>
          <p class="card-price">{{ product.price }}원</p>
          <button class="btn btn-primary" @click="moveToDetail(product.id)">상세보기</button>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
export default {

  setup() {
    const router = useRouter();
    const store = useStore();
    console.log(store.state);

    const products = ref([]);
    const getProducts = async () =>{
      try{
        const res = await axios.get('http://localhost:8000/products');
        products.value = res.data.products;

      } catch(e){
        console.log(e);
      }
    }

    getProducts();

    const moveToDetail = (id) => {
      router.push(`/products/${id}`);
    }
    const moveToCreate = () => {
      router.push(`/products/create`);
    }
    return {
      products,
      moveToDetail,
      moveToCreate,
    }
  }
}
</script>

<style scoped>
.header{
  padding-top:5px;
  padding-bottom:5px;
  display:flex;
}
.left{
  flex:3;
  text-align: center;
}
.right{
  flex:1;
  margin-left: auto;
  margin-right:15px;
  text-align: right;
}
.body{
  display:flex;
  justify-content: space-between;
  flex-wrap:wrap;
}
.card{
  margin:15px;
  width:240px;
}
.card-price{
  font-size:14px;
  font-weight:bold;
}
.card-img-top{
  cursor: pointer;
}
.btn{
  width:200px;
}
</style>