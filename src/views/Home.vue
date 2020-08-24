<template>
  <div class="home">
    <div class="bgi"></div>
    <div id="title">
      <h1 id="name">yundingzhishang</h1>
    </div>
    <div id="main">
      <div id="account"></div>
      <div id="article"></div>
    </div>
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
  width: 100%;
  height: 100%;
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
#title {
  padding-top: 140px;
  text-align: center;
}

#name {
  font-size: 40px;
}
</style>
