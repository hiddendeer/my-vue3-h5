

<script>
import { useRouter } from "vue-router";
export default {

  props: {
    msg: String
  },
  setup(props) {
    const $router = useRouter();
    $router.push('/login')
  }
  
}
</script>

<template>

</template>

<style scoped>
a {
  color: #42b983;
}
</style>
