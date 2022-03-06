<template>
  <div>logout</div>
</template>

<script>
import {useStore} from "vuex";
export default {
  name: "logout",
  setup(){
    const store = useStore();
    store.dispatch('logout');

    return {

    }
  }
}
</script>

<style scoped>

</style>