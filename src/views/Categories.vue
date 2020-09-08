<template>
  <div id="categories-app">
    <transition name="slide-fade">
      <div id="category-block"
           v-if="!isloading">
        <h1 class="category-result">Category:
          <span>{{this.$route.params.index}}</span>
        </h1>
        <div class="category-result-all">
          <span>{{articleLength}}</span>
          篇文章
        </div>
      </div>
    </transition>
    <div id="categories-article">
      <transition name="slide-fade">
        <div v-if="!isloading">
          <div class="categories-article-main"
               v-for="(item,index) in articleList"
               :key=index>
            <div class="article-title">
              <router-link :to="{name:'Article',params:{index:item.indexs}}"
                           class="article-title-a">{{item.title}}</router-link>
            </div>
            <div class="article-time">
              <span class="iconfont bigfont"
                    v-if="false">&#xeb3e;&nbsp; |</span>
              <span class="iconfont bigfont">&#xeb2a;&nbsp; </span>
              <span class="article-date">{{item.date.slice(0,10)}}&nbsp; |</span>
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
    <transition name="slide-fade">
      <div id="categories-list"
           v-if="!isloading">
        <div class="category-list"
             v-for="(item,index) in categoryList"
             :key=index>
          <router-link :to="{name:'Categories' ,params: {index: item.name}}">
            <p class="
                     list-style">{{item.name}}</p>
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'// 为什么无法全局引用
export default {
  name: 'categories',
  data () {
    return {
      obj: '',
      categoryList: [],
      articleList: [],
      articleLength: '',
      isloading: true
    }
  },
  inject: ['reload'], // 注解
  methods: {
    GetCategoriesList () {
      this.categoryList = []
      for (var i = 0; i < this.obj.length; i++) {
        var flag = -1
        for (var j = 0; j < this.categoryList.length; j++) {
          if (this.categoryList[j].name === this.obj[i].categories) {
            flag = 0
            this.categoryList[j].children.push(this.obj[i].indexs)
            break
          }
        }
        if (flag === -1) {
          this.categoryList[this.categoryList.length] = {}// 初始化才可以添加对象属性
          this.categoryList[this.categoryList.length - 1].name = this.obj[i].categories
          this.categoryList[this.categoryList.length - 1].children = []
          this.categoryList[this.categoryList.length - 1].children.push(this.obj[i].indexs)
        }
      }
    },
    ReturnCategoryList () {
      this.GetCategoriesList()
      var arr = []
      var name = this.$route.params.index
      if (name === 'all') {
        arr = this.obj
      } else {
        arr = this.GET()
      }
      this.articleList = arr
      return arr
    },
    GET () {
      var c = []
      for (var i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].name === this.$route.params.index) {
          for (var j = 0; j < this.categoryList[i].children.length; j++) {
            c.push(this.obj[this.categoryList[i].children[j]])
          }
        }
      }
      return c
    }
  },
  mounted () {
    // 发起ajax请求获取文章
    axios.get('http://localhost:3000/categories', {
      params: {
      },
      header: {}
    })
      .then((res) => {
        this.obj = res.data
        this.articleLength = this.ReturnCategoryList().length
        this.isloading = false
      })
  },
  watch: {
    $route (to, from) {
      // 对路由变化作出响应...(待完善用vue-router)
      // 对路由变化做出响应
      this.reload()// 局部刷新
      // 页面需要重新加载的地方
      this.articleList = this.ReturnCategoryList()
    }
  }
}
</script>

<style>
#categories-app {
  margin: 10px 10%;
}

#category-block {
  width: 100%;
  height: 150px;
  background-color: #fff;
  padding-top: 30px;
  padding-left: 30px;
  border-radius: 15px;
  box-shadow: #eee -7px -3px 106px;
}
.category-result {
  font-size: 40px;
  color: #32325d;
}
.category-result-all {
  font-size: 20px;
}

#categories-article {
  float: left;
  width: 75%;
}
.categories-article-main {
  position: relative;
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

#categories-list {
  float: right;
  width: 20%;
  height: 360px;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 30px;
  padding: 0 10px;
  padding-top: 30px;
  box-shadow: #eee -7px -3px 106px;
}

.list-style {
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}

.list-style:hover {
  background-color: #eee;
}
</style>
