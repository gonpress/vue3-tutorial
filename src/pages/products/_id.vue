<template>
  <div class="card text-center">
    <div class="header">
      <div class="item-right"><button type="button" class="btn btn-danger" @click="deleteModal(product._id)">상품삭제</button><button type="button" class="btn btn-info" @click="editProduct(product._id)">상품수정</button></div>
    </div>
    <div class="card-header">상품</div>
    <div class="product" v-if="!loading">
      <div class="product-left border-right"><img :src="product.img" /></div>
      <div class="product-right">
        <div class="product-right brand">{{ product.brand }}</div>
        <div class="product-right name">{{ product.name }}</div>
        <div class="product-right price">{{ product.price }}원</div>
        <div class="product-right-bottom">
          <div class="pb-3 pt-3"><button type="button" class="btn btn-primary">구매</button></div>
          <div class="pb-3 pt-3"><button type="button" class="btn btn-warning" @click="backPage()">취소</button></div>
        </div>
      </div>
    </div>
    <div class="card-header border-top">상품 상세설명 </div>
    <div class="product-bottom desc">
      {{product.desc}}
    </div>
  </div>
  <Modal v-if="showModal" :modal="modal" @close="closeModal()" @delete="deleteProduct()" />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import {ref} from 'vue';
import axios from 'axios';
import Modal from '@/components/Modal.vue';

export default {
  components:{
    Modal
  },
  setup(){
    const route = useRoute();
    const router = useRouter();
    const product = ref({
      brand:'',
      name:'',
      price:'',
      desc:'',
    });
    const loading = ref(false);
    const showModal = ref(false);
    const deleteProductId = ref(null);

    const getProduct = async () => {
      loading.value = true;
      try {
        const res = await axios.get(`http://localhost:8000/products/${route.params.id}`);
        console.log(res.data);
        product.value = res.data;
        loading.value=false;
      } catch (e) {
        loading.value=false;
        console.error(e);
      }
    };

    getProduct();

    const backPage = () => {
      router.push(`/products`);
    }

    const editProduct = async (id) => {
      try{
        router.push(`/products/edit/${id}`);
      } catch(e){
        console.error(e);
      }
    }

    const deleteModal = (id) => {
      showModal.value = true;
      deleteProductId.value = id;
    }

    const closeModal = () => {
      showModal.value = false;
    }

    const deleteProduct = async () => {
      try{
        const id = deleteProductId.value;
        if(id){
          await axios.delete(`http://localhost:8000/products/${id}`);
          router.push(`/products`);
        }
      } catch(e){
        console.error(e);
      }
    }

    const modal = {
      title:"삭제 확인",
      body:"진짜 삭제하시겠어요?"
    }

    return {
      product,
      backPage,
      deleteProduct,
      editProduct,
      loading,
      showModal,
      closeModal,
      deleteModal,
      modal,
    }
  }
}
</script>

<style scoped>
.header{
  display:flex;
}
.item-right{
  margin-left: auto;
}
.product{
  display:flex;
}
.product-left{
  padding-top:15px;
  padding-left:15px;
  padding-right:15px;
}
.product-right{
  display:flex;
  flex-direction: column;
  align-items:center;
}
.product-right-bottom{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}
.brand{
  font-size:50px;
}
.name{
  font-size:35px;
}
.price{
  font-size:30px;
  font-weight:bold;
}
.desc{
  font-size:25px;
}
.product-bottom{
}
.btn{
  width:100px;
}
</style>