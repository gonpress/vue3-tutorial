<template>
  <div class="container">
    <div class="header border">
      주문목록
    </div>
    <div class="body border" v-if="products.length > 1">
      <div class="product border" v-for="product in products" :key="product.id">
        <div class="left">
          <img :src="product.img" class="product-img" @click="moveToDetail(product.id)">
        </div>
        <div class="right">
          <div class="right-name">({{product.brand}}) {{product.name}}</div>
          <div class="right-price">{{product.price}}</div>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import {useStore} from 'vuex';
import {computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    const products = computed(() => store.state.cart);
    return {
      products,
    }
  }
}
</script>

<style scoped>
.header{
  padding-top:5px;
  padding-bottom:5px;
  text-align: center;
}
.product{
  margin: 25px 25px 25px 25px;
  display:flex;
  align-items: center;
}
.product-img{
  width:50px;
  height:50px;
}
.left{
  flex:1;
}
.right{
  flex:6;
  display:flex;
  flex-direction: row;
}
.right-name{
  flex:3;
}
.right-price{
  flex:2;
}
</style>