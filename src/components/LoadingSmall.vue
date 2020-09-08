<template>
  <div class="loadingsmall"></div>
</template>

<script>
export default {
  name: 'loadingsmall'
}
</script>

<style>
.loadingsmall {
  position: absolute;
  left: 0;
  top: 0;
  background: url("~@/assets/loading.svg") center center no-repeat #fff;
  /* background-color: #fff; */
  border-radius: 15px;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
</style>
