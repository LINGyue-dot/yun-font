<template>
  <div class="Banner">
    <div class="main">
      <div class="content">
        <router-link :to="{name:'Home'}">
          <span class="iconfont big">&#xe61b;</span>
          首页
        </router-link>
      </div>
      <div class="content">
        <router-link :to="{name:'Time'}"><span class="
                     iconfont">&#xe618;</span>时间轴</router-link>
      </div>
      <router-link class="content"
                   :to="{name:'Categories' ,params: {index: 'all'} }">
        <a href=""><span class="iconfont">&#xe616;</span>文章</a>
      </router-link>
      <!-- <div class="content">
        <router-link :to="{name: 'MessageBoard'}"><span class="iconfont">&#xe61d;</span>留言板</router-link>
      </div> -->
      <div class="content">
        <router-link :to="{name: 'FriendLink'}"><span class="iconfont">&#xe619;</span>友链</router-link>
      </div>
      <div class="content">
        <router-link :to="{name: 'About'}"><span class="iconfont">&#xe61c;</span>关于</router-link>
      </div>

      <div class="search">
        <input class="search-input"
               type="search"
               v-model="searchText"
               @keydown.enter="search()"
               @input="SearchNow()"
               @blur="NotSearchNow()" />
        <span class="search-span iconfont"
              @click=search()>
          &#xe61e;</span>
        <nav class="search-now-list">
          <ul>
            <li class="search-now-item"
                v-for="(item,index) in list"
                :key="index">
              <router-link class="search-now-item-link"
                           :to="{name:'Article',params:{index:item.indexs}}">{{item.title}}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Banner',
  data () {
    return {
      searchText: '',
      list: [1, 2, 3],
      obj: []
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
    },
    SearchNow () {
      this.list = this.ReturnSearchArray()
      document.querySelector('.search-now-list').style.display = 'block'
    },
    NotSearchNow () {
      document.querySelector('.search-now-list').style.display = 'none'
    },
    ReturnSearchArray () {
      const text = this.searchText
      var arr = []
      for (let i = 0; i < this.obj.length; i++) {
        const strText = JSON.stringify(this.obj[i])
        if (this.StrSrt(strText, text) !== -1) {
          arr.push(this.obj[i])
        }
      }
      return arr
    },
    StrSrt (haystack, needle) {
      // BM算法
      const haystackLength = haystack.length
      const needleLength = needle.length
      for (let i = 0; i <= haystackLength - needleLength; i++) {
        let j = 0
        for (j = 0; j < needleLength; j++) {
          if (needle.charAt(j) !== haystack.charAt(i + j)) {
            break
          }
        }
        if (j === needleLength) {
          return i
        }
      }
      return -1
    }
  },
  created () {
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    // 发起ajax请求获取文章
    axios.get('http://localhost:3000/', {
      params: {
      },
      header: {}
    })
      .then((res) => {
        this.obj = res.data.reverse()
        // this.isLoading = false
      })
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
  /* overflow: hidden; */
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
  width: 30%;
  margin-top: 10px;
}

.search-input {
  width: 100%;
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  padding-left: 1em;
  padding-right: 2em;
  color: #000;
  border: 0;
  margin-bottom: 2px;
  /* border-radius: 10px; */
}

.search-span {
  position: absolute;
  right: 7px;
  top: 3px;
  font-size: 24px !important;
  cursor: pointer;
}
.search-now-list {
  display: none;
  width: 100%;
  font-size: 16px;
  /* padding-right: 2em; */
  /* padding-left: 1em; */
  background-color: #fff;
}
.search-now-item {
  word-wrap: break-all;
  word-break: break-all;
  width: 84%;
  height: 30px;
  line-height: 30px;
  padding-right: 2em;
  padding-left: 1em;
}
.search-now-item:hover {
  background-color: #eee;
}
.search-now-item-link {
  display: block;
  width: 100%;
}
</style>
