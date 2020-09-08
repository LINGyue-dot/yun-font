<template>
  <div id="search-app">
    <transition name="slide-fade">
      <div id="search-block"
           v-if="!isLoading">
        <h1 class="search-result">Search:
          <span>{{this.$route.params.index}}</span>
        </h1>
        <div class="search-result-all">
          <span>{{ReturnSearchArray().length}}</span>
          篇文章
        </div>
      </div>
    </transition>
    <div id="search-article">
      <transition name="slide-fade">
        <div v-if="!isLoading">
          <div class="search-article-main"
               v-for="(item,index) in ReturnSearchArray()"
               :key=index>
            <div class="article-title">
              <router-link :to="{name:'Article',params:{index:item.index}}"
                           class="article-title-a">{{item.title}}</router-link>
            </div>
            <div class="article-time">
              <span class="iconfont bigfont"
                    v-show="false">&#xeb3e;&nbsp; |</span>
              <span class="iconfont bigfont">&#xeb2a;&nbsp; </span>
              <span class="article-date">{{item.date}}&nbsp; |</span>
              <span class="iconfont bigfont">&#xe7b4;&nbsp; </span>
              <span class="article-number">{{item.view}}&nbsp; |</span>
              <span class="iconfont bigfont">&#xe635;&nbsp; </span>
              <span class="article-talk">{{item.commit}}&nbsp; |</span>
              <span class="iconfont smallfont"> &#xe6ba;&nbsp; </span>
              <router-link :to="{name: 'Categories',params:{index:item.categories}}"
                           class="article-categories">{{item.categories}}</router-link>
            </div>
            <div class="article-word">
              <span class="iconfont smallfont"> &#xe6ba;&nbsp; </span>
            </div>
            <div class="article-short-text"> {{item.text}}</div>
            <div class="article-tag">
              <span class="iconfont">&#xe633;&nbsp; </span>
              <a href=""
                 class="a-tag"
                 v-for="(items,i) in item.tag.split(',')"
                 :key=i>{{items}}</a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'// 为什么无法全局引用
export default {
  name: 'Search',
  data () {
    return {
      obj: '',
      searchText: '',
      searchArry: [],
      isLoading: true
    }
  },
  methods: {
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
  mounted () {
    // 发起ajax请求获取文章
    axios.get('http://localhost:3000/search', {
      params: {
      },
      header: {}
    })
      .then((res) => {
        this.obj = res.data
        this.searchText = this.$route.params.index
        this.isLoading = false
      })
  }
}
</script>

<style>
#search-app {
  margin: 10px 10%;
}
#search-block {
  width: 100%;
  height: 150px;
  background-color: #fff;
  padding-top: 30px;
  padding-left: 30px;
  border-radius: 15px;
  box-shadow: #eee -7px -3px 106px;
}

.search-result {
  font-size: 40px;
  color: #32325d;
}
.search-result-all {
  font-size: 20px;
}

#search-article {
  float: left;
  width: 75%;
}

.search-article-main {
  min-height: 300px;
  margin: 30px 0;
  padding: 30px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: #eee -7px -3px 106px;
}

.article-title {
  text-align: center;
}

.article-title-a {
  font-size: 26px;
  word-wrap: break-word;
  letter-spacing: 1px;
  transition: all 0.5s;
}

.article-title-a:hover {
  letter-spacing: 2.5px;
}

.article-time,
.article-word {
  height: 30px;
  text-align: center;
}

.article-categories {
  display: inline-block;
}

.article-short-text {
  margin-bottom: 10px;
  line-height: 1.8;
  height: 90px;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 18px;
  letter-spacing: 1.2px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.article-tag {
  margin-top: 30px;
}

.a-tag {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  color: #000;
  font-weight: 600;
  font-size: 12px;
  background-color: #eee;
  border-radius: 0.25rem;
  padding: 4px;
  margin: 0 5px;
}
</style>
