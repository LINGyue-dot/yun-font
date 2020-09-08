<template>
  <div class="Banner">
    <div class="main">
      <div class="content">
        <a href="">
          <span class="iconfont big">&#xe61b;</span>
          首页</a>
      </div>
      <div class="content">
        <router-link :to="{name:'Time'}"><span class="
                     iconfont">&#xe618;</span>时间轴</router-link>
      </div>
      <router-link class="content"
                   :to="{name:'Categories' ,params: {index: 'all'} }">
        <a href=""><span class="iconfont">&#xe616;</span>文章</a>
      </router-link>
      <div class="content">
        <router-link :to="{name: 'MessageBoard'}"><span class="iconfont">&#xe61d;</span>留言板</router-link>
      </div>
      <div class="content">
        <router-link :to="{name: 'FriendLink'}"><span class="iconfont">&#xe619;</span>友链</router-link>
      </div>
      <div class="content">
        <router-link :to="{name: 'About'}"><span class="iconfont">&#xe61c;</span>关于</router-link>
      </div>

      <div class="search">
        <input class="search-input"
               type="text"
               v-model="searchText" />
        <span class="search-span iconfont"
              @click=search()>
          &#xe61e;</span>
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
    handleScroll () {
      // 获取滚动时的高度
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      const bgOpacity = document.querySelector('.bg')
      const banners = document.querySelector('.Banner')
      if (scrollTop < 500) {
        banners.style.height = 90 + 'px'
        bgOpacity.style.opacity = (1 / 500) * scrollTop + 0.5
      }
      if (scrollTop > 500) {
        banners.style.height = 0 + 'px'
      }
    },
    search () {
      if (this.searchText === '') {
        return
      }
      this.$router.push({ name: 'Search', params: { index: this.searchText } })
      this.searchText = ''
    }
  },
  created () {
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    document.removeEventListener('scroll', this.handleScroll)
    // clearVuexAlong() // localStorage 和 sessionStorage 都会被清理
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
  z-index: 3;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  /* background-color: #5e90e4; */
  background-color: rgb(94, 114, 228);
  opacity: 0.5;
}

.main {
  position: relative;
  padding-top: 20px;
  margin: 0 9%;
  z-index: 4;
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
