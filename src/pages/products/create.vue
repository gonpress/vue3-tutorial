<template>
  <div class="container border">
    <form class="form">
      <div class="form-group">
        <label for="inputBrand">브랜드</label>
        <input type="text" class="form-control" id="inputBrand" name="inputBrand" v-model="data.brand">
      </div>
      <div class="form-group">
        <label for="inputProduct">상품</label>
        <input type="text" class="form-control" id="inputProduct" name="inputProduct" v-model="data.name">
      </div>
      <div class="form-group">
        <label for="inputPrice">가격</label>
        <input type="number" class="form-control" id="inputPrice" name="inputPrice" v-model="data.price">
      </div>
      <div class="form-group">
        <label for="inputDesc">설명</label>
        <textarea class="form-control" id="inputDesc" name="inputDesc" rows="3" v-model="data.description"></textarea>
      </div>
      <div class="right"><button type="button" class="btn btn-primary" @click="onCreate()">등록</button></div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import {ref} from 'vue';

export default {
  setup(){
    const router = useRouter();

    const data = ref({
      brand:'',
      name:'',
      price:'',
      description:'',
    })

    const onCreate = async () => {
      console.log(data.value);
      try{
        const res = await axios.post(`http://localhost:8000/products`, data.value);
        if(res){
          console.log('success create');
          router.push(`/products`);
        }
      } catch (e) {
        console.error(e);
      }
    }

    return {
      onCreate,
      data,
    }
  }
}
</script>

<style scoped>
.form{
  width:100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
.right{
  margin-bottom:15px;
  margin-left: auto;
}
.btn{
  width:200px;
}
</style>