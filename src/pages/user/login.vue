<template>
  <div class="container pt-3">
    <form>
      <div class="form-group">
        <label for="inputEmail">이메일</label>
        <input type="email" class="form-control" id="inputEmail" v-model="data.email"  @keyup.enter="login()">
      </div>
      <div class="form-group">
        <label for="inputPassword">비밀번호</label>
        <input type="password" class="form-control" id="inputPassword" v-model="data.password" @keyup.enter="login()">
      </div>
      <button type="button" class="btn btn-primary" @click="login()">로그인</button>
      <button type="button" class="btn btn-success" @click="moveToRegister()">회원가입</button>
    </form>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
import axios from 'axios';
import {ref} from 'vue';

export default {
  name: "login.vue",
  setup(){
    const router = useRouter();
    const data = ref({
      email:'',
      password:'',
    })
    const login = async () => {
      try{
        const res = await axios.post('http://localhost:8000/user/login', data.value, {withCredentials:true});
        console.log(res);
      }catch (e) {
        console.error(e);
      }
    }
    const moveToRegister = () => {
      router.push('/register');
    }

    return {
      login,
      moveToRegister,
      data,
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