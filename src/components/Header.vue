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
          <router-link class="nav-link" to="/login">로그인</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">상품목록</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/orders">주문목록</router-link>
        </li>
      </ul>
      <ul class="navbar-info">
        <div v-if="!loggedin">반가워요</div>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header"
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
  flex:1;
  margin-left: auto;
}
</style>