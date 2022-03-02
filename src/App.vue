<template>
  <Header />
  <router-view />
</template>

<script>
import Header from '@/components/Header.vue';

export default{
  components:{
    Header
  },
  setup(){
    const greeting = (hh) => {
      return hh;
    }
    return {
      greeting,
    }
  }
}
</script>

<style>
.name{
  color:red;
}
</style>