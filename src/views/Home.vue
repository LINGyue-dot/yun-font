<template>
  <div class="home">
    <div class="bgi"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  }

}
</script>

<style >
.home {
  /* background-image: url(../assets/bg.jpg) fixed; */
  /* background-color: pink; */
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}

.bgi {
  background: url(../assets/bg.jpg);
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -2;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  /* opacity: 0; */
  /* transition: opacity 0.5s ease; */
}
</style>
