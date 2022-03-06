<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">곤프 마켓</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">홈</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">상품목록</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/orders">주문목록</router-link>
        </li>
      </ul>
      <ul class="navbar-nav navbar-info">
        <li class="nav-item" v-if="loggedin">
          <div class="nav-link">반가워요 {{name}} 님!</div>
        </li>
        <li class="nav-item" v-if="!loggedin">
          <router-link class="nav-link" to="/login">로그인</router-link>
        </li>
        <li class="nav-item" v-if="loggedin">
          <router-link class="nav-link" to="/logout">로그아웃</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {useStore} from "vuex";
import {computed, ref} from "vue";
export default {
  name: "Header",
  setup(){
    const store = useStore();

    const loggedin = computed(() => { return store.getters.isAuthenticated ? true : false } );
    const name = computed(() => { return store.state.user.name});
    const email = ref(null);

    return {
      loggedin,
      name,
      email,
    }
  }
}
</script>

<style scoped>
#navbarNav{
  display:flex;
}
.navbar-nav{
  flex:8;
  text-align: left;
}
.navbar-info{
  flex:2;
  margin-left: auto;
}
</style>