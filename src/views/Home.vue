<template>
  <div class="home">
    <div id="main">
      <div>
        <transition name="fade">
          <loading v-show="isLoading" />
        </transition>
      </div>

      <div id="article">
        <transition name="slide-fade">
          <div v-show="!isLoading">
            <div class="article-main"
                 v-for="(item ,index) in nowText"
                 :key=index>
              <div class="article-title">
                <router-link :to="{name:'Article',params:{index:item.indexs}}"
                             class="article-title-a">{{item.title}}</router-link>
              </div>
              <div class="article-time">
                <span class="iconfont bigfont"
                      v-show="false">&#xeb3e;&nbsp; |</span>
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

        <nav class="page">
          <ul>
            <li class="front-page page-link"
                v-show="nowIndex !== 1"
                @click="ChangePage(nowIndex-2)">0</li>
            <li class="page-link liArray"
                v-for="(item,index) in ReturnPageArray()"
                :key="index"
                @click="ChangePage(index)">{{item}}</li>
            <li class="next-page page-link"
                v-show="nowIndex !==totalPage"
                @click="ChangePage(nowIndex)">N</li>
          </ul>
        </nav>
      </div>
      <transition name="slide-fade">
        <div id="account"
             v-show="!isLoading">
          <div id="account-img-div">
            <img id="account-img"
                 src="../assets/1.jpeg"
                 alt="">
          </div>
          <div id="account-id">
            <span id="acc-id">千泷</span>
          </div>
          <hr>
          <div id="aacount-site">
            <div id="article-number"
                 class="nav-site">
              <p>文章</p>
              <span class="nav-number">{{this.$store.state.articleText.length}}</span>
            </div>
            <div id="categroes-numbver"
                 class="nav-site">
              <p>分类</p>
              <router-link class="nav-number"
                           :to="{name:'Categories' ,params: {index: 'all'} }">
                1
              </router-link>
            </div>
            <div id="tag-number"
                 class="nav-site">
              <p>标签</p>
              <a class="nav-number">2</a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'// 为什么无法全局引用
import { Jump } from '../config/function'
import loading from '@/components/Loading'
export default {
  name: 'Home',
  data () {
    return {
      nowIndex: 1,
      clickIndex: 1,
      LR: true,
      nowText: [],
      total: 1,
      indexArray: [],
      totalPage: '',
      isLoading: true
    }
  },
  components: {
    loading
  },
  methods: {
    SelectTextArray () {
      // 返回当前页面的文章数组
      for (var i = (this.nowIndex - 1) * 10; i < (this.nowIndex - 1) * 10 + 10 && i < this.text.length; i++) {
        this.nowText.push(this.text[i])
      }
      this.nowText.reverse()
    },
    GetCategoriesList () {
    },
    ChangePage (index) {
      Jump(0)
      index++
      this.clickIndex = index
      this.LR = this.nowIndex < this.clickIndex // 判断前进后退
      this.nowIndex = this.clickIndex
      this.nowText = []
      this.SelectTextArray()
      const liArray = document.getElementsByClassName('liArray')
      for (var i = 0; i < liArray.length; i++) {
        liArray[i].style.backgroundColor = '#fff'
        liArray[i].style.color = '#9eabba'
      }
      liArray[index - 1].style.backgroundColor = '#5e72e4'
      liArray[index - 1].style.color = '#fff'
    },
    ReturnPageArray () {
      // 仅仅显示 4 个页码选择
      var arr = [1]
      return arr
    }
  },
  mounted () {
    // 发起ajax请求获取文章
    axios.get('http://localhost:3000', {
      params: {
      },
      header: {}
    })
      .then((res) => {
        this.$store.commit('InitArticle', res.data)
        this.text = this.$store.state.articleText
        this.SelectTextArray()
        this.total = res.data.length
        this.totalPage = Math.ceil(this.total / 10)
        this.isLoading = false
      })
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}

#name {
  font-size: 40px;
}

#main {
  margin: 10px 9%;
}

#article {
  float: left;
  width: 75%;
}

.article-main {
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

#account {
  float: right;
  width: 20%;
  height: 360px;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 30px;
  padding: 0 10px;
  box-shadow: #eee -7px -3px 106px;
}

#account-img-div {
  width: 100px;
  margin: 10px auto;
  border-radius: 50px;
  overflow: hidden;
}

#account-img {
  max-width: 100%;
}

#account-id {
  text-align: center;
  margin-bottom: 10px;
}
#acc-id {
  font-size: 20px;
}

#aacount-site {
  text-align: center;
  margin-top: 20px;
}

.nav-site {
  display: inline-block;
  width: 60px;
  vertical-align: top;
}

nav-site > p {
  color: #525f82;
}
.nav-number {
  font-weight: 600;
  font-size: 18px;
  color: #000;
}

/* pagelink */

.page {
  text-align: center;
  margin: 30px 10%;
}
.page ul {
  margin: 0 auto;
  display: inline-block;
}
.page-link {
  display: table-cell;
  width: 30px;
  margin: 0 30px;
  height: 30px;
  border-radius: 1em;
  background-color: #fff;
  color: #9eabba;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.liArray:nth-child(1) {
  background-color: #5e72e4;
  color: #fff;
}
</style>
