<template>
  <div class="container border text-center" v-if="authorized">
    <div class="header">
      <div class="item-left">상품 상세정보</div>
      <div class="item-right"><button type="button" class="btn btn-danger" @click="deleteModal(product._id)">상품삭제</button><button type="button" class="btn btn-info" @click="editProduct(product._id)">상품수정</button></div>
    </div>
    <div class="card-header border">상품</div>
    <div class="product" v-if="!loading">
      <div class="product-left border-right"><img :src="product.img" /></div>
      <div class="product-right">
        <div class="product-right brand">{{ product.brand }}</div>
        <div class="product-right name">{{ product.name }}</div>
        <div class="product-right price">{{ product.price }}원</div>
        <div class="product-right-bottom">
          <div class="pb-3 pt-3"><button type="button" class="btn btn-primary" @click="orderItem(product)">장바구니</button></div>
          <div class="pb-3 pt-3"><button type="button" class="btn btn-warning" @click="backPage()">뒤로가기</button></div>
        </div>
      </div>
    </div>
    <div class="card-header border">상품 상세설명 </div>
    <div class="product-bottom desc">
      {{product.desc}}
    </div>
  </div>
  <div class="container border text-center" v-if="!authorized">조회 권한이 없습니다.</div>
  <Modal v-if="showModal" :modal="modal" @close="closeModal()" @delete="deleteProduct()" />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { ref} from 'vue';
import axios from 'axios';
import Modal from '@/components/Modal.vue';
import {useStore} from 'vuex';
import { useCookies } from "vue3-cookies";

export default {
  components:{
    Modal
  },
  setup(){
    const { cookies } = useCookies();
    const store = useStore();
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
    const authorized = ref(false);

    const getProduct = async () => {
      loading.value = true;
      try {
        const headers = {
          "Authorization" : '',
        }
        if(cookies.get('user'))
        {
          headers.Authorization = `Bearer ${cookies.get('user')}`;
        }
        const res = await axios.get(`http://localhost:8000/products/${route.params.id}`, {headers});

        product.value = res.data;
        loading.value=false;
        authorized.value=true;
      } catch (e) {
        loading.value=false;
        authorized.value=false;
        console.error(e);
      }
    };

    getProduct();

    const orderItem = async (id) => {
      try {
        store.dispatch('addCartProduct', id);
      }catch (e) {
        console.log(e);
      }
    }
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
      orderItem,
      authorized,
    }
  }
}
</script>

<style scoped>
.header{
  display:flex;
}
.item-left{
  flex:3;
  text-align: center;
}
.item-right{
  flex:1;
  text-align: right;
  margin-left: auto;
}
.product{
  display:flex;
  align-items: center;
  width:100%;
}
.product-left{
  padding-left:15px;
  padding-right:15px;
  flex:1;
}
.product-right{
  display:flex;
  flex-direction: column;
  align-items:center;
  flex:4;
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
  margin: 5px 5px 5px 5px;
  width:100px;
}
</style>