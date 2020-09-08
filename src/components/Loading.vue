<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style>
.loading {
  position: fixed;
  left: 10%;
  top: 220px;
  background: url("~@/assets/loading.svg") center center no-repeat #fff;
  /* background-color: #fff; */
  border-radius: 15px;
  width: 60%;
  height: 100%;
  z-index: 1000;
}
</style>
