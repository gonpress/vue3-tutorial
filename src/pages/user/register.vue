<template>
  <div class="container pt-3">
    <form>
      <div class="form-group">
        <label for="inputEmail">이메일</label>
        <input type="email" class="form-control" id="inputEmail" v-model="data.email">
      </div>
      <div class="form-group">
        <label for="inputPassword">비밀번호</label>
        <input type="password" class="form-control" id="inputPassword" v-model="data.password">
      </div>
      <div class="form-group">
        <label for="inputName">이름</label>
        <input type="text" class="form-control" id="inputName" v-model="data.name">
      </div>
      <button type="button" class="btn btn-success" @click="register()">등록</button>
      <button type="button" class="btn btn-warning" @click="moveToBack()">취소</button>
    </form>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
import axios from 'axios';
import {ref} from 'vue';

export default {
  name: "register",
  setup(){
    const router = useRouter();
    const data = ref({
      email:'',
      password:'',
      name:'',
    });
    const register = async () => {
      try{
        const res = await axios.post('http://localhost:8000/user/register', data.value);
        console.log(res.data);
        if(res){
          router.push('/login');
        }
      } catch (e) {
        console.log(e);
        console.error(e);
      }
    }
    const moveToBack = () => {
      router.push('/login');
    }
    return {
      data,
      register,
      moveToBack,
    }
  }
}
</script>

<style scoped>

.container{
  width:500px;
}
.btn{
  width:470px;
  margin-bottom:15px;
}
</style>