<template>
  <div class="home">
    <div class="bgi"></div>
    <div id="title">
      <h1 id="name">yundingzhishang</h1>
    </div>
    <div id="main">
      <div id="article">
        <div class="article-main"
             v-for="(item ,index) in article"
             :key=index>{{item}}</div>

      </div>
      <div id="account"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      article: [
        {
          title: 'asd',
          text: 'qweqweqweqweqweqwe'
        }, {
          title: 'asd',
          text: 'qweqweqweqweqweqwe'
        }, {
          title: 'asd',
          text: 'qweqweqweqweqweqwe'
        }
      ]
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

#main {
  margin: 10px 10%;
}

#article {
  float: left;
  width: 70%;
  background-color: pink;
}

.article-main {
  min-height: 300px;
  margin: 30px 0;
}
</style>
