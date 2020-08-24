<template>
  <div class="Banner">
    <div class="main">
      <div class="content"><a href="">
          <span class="iconfont big">&#xe61b;</span>
          首页</a></div>
      <div class="content"><a href=""><span class="iconfont">&#xe618;</span>时间轴</a></div>
      <div class="content"><a href=""><span class="iconfont">&#xe616;</span>文章</a></div>
      <div class="content"><a href=""><span class="iconfont">&#xe61d;</span>留言板</a></div>
      <div class="content"><a href=""><span class="iconfont">&#xe619;</span>友链</a></div>
      <div class="content"><a href=""><span class="iconfont">&#xe61c;</span>关于我</a></div>

      <div class="search">
        <input class="search-input"
               type="text"
               v-model="searchText">
        <span class="search-span iconfont">&#xe61e;</span>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    handleScroll () { // 获取滚动时的高度
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const bgOpacity = document.querySelector('.bg')
      const banners = document.querySelector('.Banner')
      if (scrollTop < 500) {
        banners.style.height = 90 + 'px'
        bgOpacity.style.opacity = 1 / 500 * scrollTop
      }
      if (scrollTop > 500) {
        banners.style.height = 0 + 'px'
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    document.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Banner {
  position: fixed;
  width: 100%;
  height: 90px;
  overflow: hidden;
  transition: height 0.3s;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  /* background-color: #5e90e4; */
  background-color: rgb(94, 114, 228);
  opacity: 0;
  z-index: -1;
}

.main {
  position: relative;
  padding-top: 20px;
  margin: 0 9%;
}

.content {
  display: inline-block;
  height: 100%;
  line-height: 50px;
  font-size: 18px;
  padding: 0 1%;
}
.content:hover a {
  color: #fff;
  opacity: 0.8;
}

.content > a {
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: center;
}

.search {
  position: absolute;
  display: inline-block;
  right: 0;
  margin-top: 10px;
}

.search-input {
  width: 240px;
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  padding-left: 1em;
  padding-right: 2em;
  color: #000;
  border: 0;
  border-radius: 10px;
}

.search-span {
  position: absolute;
  right: 7px;
  top: 3px;
  font-size: 24px !important;
  cursor: pointer;
}
</style>
