<template>
  <div class="Article">
    <transition name="slide-fade">
      <div id="article-main"
           v-show="!isLoading">
        <div id="titles">
          <h1 id="text-title">{{this.obj.title}}</h1>
        </div>
        <div id="md-main"></div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div id="article-comment"
           v-show="!isLoading">
        <h3>评论</h3>
        <div class="comm"
             v-for="(item,index) in  NowIndexDeepCommentTextList"
             :key="index">
          <div class="comment-item">
            <div class="name-picture"
                 v-html="item.name.slice(0,1)"></div>
            <div class="first-floor">
              <div class="comment-name">{{item.name}}</div>
              <div class="comment-date"
                   v-html="item.date.slice(0,10)"></div>
              <br>
            </div>
            <div class="comment-text">{{item.text}}</div>
            <div class="comment-response"
                 @click="ResponseComment(item)">回复</div>
            <hr>
          </div>
          <div class="CommentReturnStyle">
            <CommentReturn :deep="item.deep+1"
                           :id="item.id"
                           :comment="CommentTextList"
                           :name="item.name" />
          </div>
        </div>
      </div>

    </transition>
    <transition name="slide-fade">
      <div id="user-comment"
           v-show="!isLoading">
        <h3>发送评论</h3>
        <span v-if="$store.state.name!==''">回复{{this.$store.state.name}}</span>
        <form action="">
          <div class="center-box">
            <textarea cols="3"
                      required="required"
                      placeholder="评论内容 ，长度限制156 "
                      maxlength="156"
                      id="input-text"
                      v-model="commentText"></textarea>
            <input type="text"
                   required="required"
                   placeholder="昵称，长度限制15"
                   maxlength="15"
                   id="user-name"
                   v-model="commentName">
            <input type="text"
                   required="required"
                   placeholder="邮箱，长度限制40"
                   maxlength="40"
                   id="user-email"
                   v-model="commentEmail">
          </div>
          <button id="cancle-comment-button"
                  type="button"
                  @click="CancleComment()">取消</button>
          <button id="comment-button"
                  type="button"
                  @click="PostComment()">发送</button>
        </form>
      </div>
    </transition>
    <transition name="slide-fade">
      <div id="article-catalogue"
           v-show="!isLoading">
        <div id="catalogue">文章目录</div>
        <div class="hc1"
             v-for="(itemH1,indexH1) in ReArray(0, content)"
             :key=indexH1>
          <p :class="'H'+itemH1.level">
            <span @click="ContentJump(itemH1.title)">{{itemH1.title}}</span>
          </p>
          <div class="hc2"
               v-for="(itemH2,indexH2) in ReArray(itemH1.index ,content)"
               :key=indexH2>
            <p :class="'H'+itemH2.level"><span @click="ContentJump(itemH2.title)">{{itemH2.title}}</span></p>
            <div class="hc3"
                 v-for="(itemH3,indexH3) in ReArray(itemH2.index,content)"
                 :key=indexH3>
              <p :class="'H'+itemH3.level"><span @click="ContentJump(itemH3.title)">{{itemH3.title}}</span></p>
              <div class="hc4"
                   v-for="(itemH4,indexH4) in ReArray(itemH3.index,content)"
                   :key=indexH4>
                <p :class="'H'+itemH4.level"><span @click="ContentJump(itemH4.title)">{{itemH4.title}}</span></p>
                <div class="hc5"
                     v-for="(itemH5,indexH5) in ReArray(itemH4.index ,content)"
                     :key="indexH5">
                  <p :class="'H'+itemH5.level"><span @click="ContentJump(itemH5.title)">{{itemH5.title}}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import marked from '../config/marked'
import 'highlight.js/styles/monokai-sublime.css'
import axios from 'axios'// 为什么无法全局引用
import { Jump } from '../config/function'
import CommentReturn from '../components/CommentReturn'
// import store from '../router/index'
export default {
  name: 'Article',
  components: {
    CommentReturn
  },
  data () {
    return {
      content: '', // 存放目录数组
      text: '',
      obj: '',
      aData: [],
      commentText: '',
      commentName: '',
      commentEmail: '',
      comment: '',
      isLoading: true,
      CommentTextList: [],
      thisComment: {},
      NowIndexDeepCommentTextList: []
    }
  },
  methods: {
    CancleComment () {
      this.$store.commit('InitDeep')
    },
    ResponseComment (item) {
      var items = {}
      items.deep = item.deep + 1
      items.name = item.name
      items.id = item.id
      console.log(item.id)
      this.$store.commit('ChangeDeep', items)
    },
    SelectComment () {
      var c = []
      for (let i = 0; i < this.comment.length; i++) {
        if (this.comment[i].indexs === parseInt(this.$route.params.index)) {
          c.push(this.comment[i])
        }
      }
      return c
    },
    SelectNowIndexDeepCommentList () {
      for (var i = 0; i < this.CommentTextList.length; i++) {
        if (this.CommentTextList[i].deep === 0) {
          this.NowIndexDeepCommentTextList.push(this.CommentTextList[i])
        }
      }
    },
    ContentJump (obj) {
      const arr = document.getElementsByClassName('anchor')
      var objTop = 100
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].getAttribute('name') === obj) {
          objTop = this.GetElementTop(arr[i])
        }
      }
      Jump(objTop - 100)
    },
    ShowTOC () {
      // marked 渲染器
      var rendererMD = new marked.Renderer()
      rendererMD.heading = function (text, level) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
        return '<h' + level + '><a name="' + text + '" class="anchor" href="#' + escapedText + '"><span class="header-link"></span></a>' + text + '</h' + level + '>'
      }
      return marked(this.obj.text, { renderer: rendererMD })
    },
    GetTitle (content) {
      const tempArr = []
      let index = 1
      content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function (match, m1, m2) {
        // m2是匹配到的位置
        const title = match.replace('\n', '')
        const level = m1.length // #的数量
        tempArr.push({
          title: title.replace(/^#+/, '').replace(/\([^)]*?\)/, '').substring(1, title.length),
          level: level,
          parent: -2,
          index: index++
        })
      })
      this.ReBuild(tempArr)
    },
    // 为每个元素添加父节点
    ReBuild (arr) {
      var nowParent = 0
      if (!arr[0]) {
        return
      }
      arr[0].parent = nowParent
      for (var i = 1; i < arr.length; i++) {
        if (arr[i - 1].level < arr[i].level) {
          nowParent = i
          arr[i].parent = nowParent
        } else if (arr[i - 1].level === arr[i].level) {
          arr[i].parent = nowParent
        } else {
          var flag = 0
          for (var k = i - 1; k >= 0; k--) {
            if (arr[k].level < arr[i].level) {
              flag = k + 1
              break
            }
          }
          nowParent = flag
          arr[i].parent = flag
        }
      }
      this.content = arr
    },
    // 挑选出子节点
    ReArray (parent, arr) {
      // filter错误
      // function Filter (element, index, array) {
      //   return element.parent === parent
      // }
      // return arr.filter(Filter)
      var c = []
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].parent === parent) {
          c.push(arr[i])
        }
      }
      return c
    },
    GetElementTop (elem) { // 获取元素距离页面顶部的距离
      var elemTop = elem.offsetTop// 获得elem元素距相对定位的父元素的top
      elem = elem.offsetParent// 将elem换成起相对定位的父元素
      while (elem != null) { // 只要还有相对定位的父元素
        // 获得父元素 距他父元素的top值,累加到结果中
        elemTop += elem.offsetTop
        // 再次将elem换成他相对定位的父元素上;
        elem = elem.offsetParent
      }
      return elemTop
    },
    HandleContent () { // 添加 下拉动画
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      const contentList = document.getElementById('article-catalogue')
      if (scrollTop < 164) {
        contentList.style.transition = ''
        contentList.style.position = 'absolute'
        contentList.style.marginTop = '90px'
        contentList.style.top = '190px'
      }
      if (scrollTop > 164) {
        contentList.style.position = 'fixed'
        contentList.style.marginTop = 0 + 'px'
        contentList.style.top = '110px'
      }
      if (scrollTop > 500) {
        contentList.style.transition = '.3s top'
        contentList.style.top = '20px'
      }
    },
    PostComment () {
      if (this.commentText.length !== 0 && this.commentName.length !== 0 && this.commentEmail.length !== 0) {
        // 发送数据
        axios.get('http://localhost:3000/article', {
          params: {
            indexs: this.$route.params.index,
            text: this.commentText,
            name: this.commentName,
            email: this.commentEmail,
            // 评论的深度 默认是0
            deep: this.$store.state.deep,
            responseId: this.$store.state.parentId
          },
          header: {}
        })
          .then((res) => {
            this.obj = res.data
            var t = {}
            t.chrome = 0
            t.date = '2020-09-08T16:00:00.000Z'
            t.email = this.commentEmail
            t.indexs = this.$route.params.index
            t.name = this.commentName
            t.text = this.commentText
            t.url = 'www.yundingzhishang.com'
            t.winmac = 1
            this.commentText = ''
            this.commentName = ''
            this.commentEmail = ''
            this.obj = res.data
            this.CommentTextList.push(t)
          })
      }
    }
  },
  mounted () {
    this.$store.commit('InitDeep')
    Jump(100)// 跳转至文章头部
    axios.get('http://localhost:3000/article', {
      params: {
        // searchText: this.searchText
        index: this.$route.params.index
      },
      header: {}
    })
      .then((res) => {
        this.comment = res.data.comment
        this.obj = res.data.article
        this.text = this.obj.text
        this.CommentTextList = this.SelectComment()
        this.SelectNowIndexDeepCommentList()
        document.getElementById('md-main').innerHTML = this.ShowTOC()
        this.GetTitle(this.obj.text)
        this.isLoading = false
        if (!this.text) {
          // 无法找到文章时候404
          this.$router.push({ path: '/404.html' })
        }
      })
    window.addEventListener('scroll', this.HandleContent)
  },
  destroyed () {
    window.removeEventListener('scroll', this.HandleContent)
  },
  computed: {
  },
  watch: {
    $route (to, from) {
      // 对路由变化作出响应...(待完善用vue-router)
      window.location.reload()
    }
  }
}
</script>

<style>
@import url("../style/md.css");
.Article {
  width: 80%;
  margin: 0 9%;
}

#article-main {
  float: left;
  position: relative;
  margin-top: 90px;
  width: 75%;
  padding: 0 10px;
  min-height: 200px;
  border-radius: 15px;
  background-color: #fff;
  z-index: 1;
  box-shadow: #eee -7px -3px 106px;
}

#titles {
  margin-top: 30px;
  text-align: center;
  margin-bottom: 40px;
}

#text-title {
  font-size: 28px;
  font-weight: 600;
}
#article-comment {
  float: left;
  position: relative;
  margin-top: 40px;
  width: 75%;
  padding: 0 10px;
  min-height: 200px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: #eee -7px -3px 106px;
}
#article-comment h3 {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
}

.comm {
  width: 100%;
  min-height: 80px;
  position: relative;
  background-color: #fff;
  margin-top: 20px;
}

.comment-item:hover .comment-response {
  display: block;
}

.name-picture {
  float: left;
  background-color: #d4e34a;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  margin-bottom: 20px;
  margin-right: 20px;
}
.first-floor {
  height: 20px;
  line-height: 20px;
}
.comment-name {
  float: left;
  color: #525f7f;
  font-size: 18px;
  font-weight: 500;
}

.comment-date {
  float: right;
  color: #525f7f;
  font-size: 14px;
}

.comment-text {
  display: inline-block;
  padding-right: 10px;
  margin-bottom: 20px;
  word-break: break-all;
  color: #99a0b3;
  margin-top: 20px;
}
.comment-response {
  display: none;
  position: absolute;
  top: 30px;
  right: 30px;
  width: 50px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #eee;
  background-color: #afb9f2;
  color: #fff;
  cursor: pointer;
}
.CommentReturnStyle {
  width: 90%;
  margin-left: 10%;
}

#user-comment {
  float: left;
  position: relative;
  margin-top: 40px;
  width: 75%;
  padding: 0 10px;
  min-height: 200px;
  border-radius: 15px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: #eee -7px -3px 106px;
}
#input-text {
  margin: 20px 0;
  width: 100%;
  padding: 10px 9px;
  white-space: pre-wrap;
  font-weight: 400;
  line-height: 1.5;
  height: 82px;
  font-size: 14px;
  color: #8898aa;
  border: #fff 0px;
  border-radius: 0.25rem;
  box-sizing: border-box;
  /* box-shadow: 4px 4px 9px #8898aa;
   */
  box-shadow: #eee -7px -3px 106px;
  overflow: auto;
  word-break: break-all;
}

.center-box {
  margin: 0 3px;
}
#user-name {
  margin-right: 20px;
}
#user-email {
  width: 64%;
}

#user-name,
#user-email {
  color: #8898aa;
  font-weight: 400;
  padding: 5px 5px;
  line-height: 1.5;
  font-size: 14px;
  border-radius: 0.25rem;
  border: #fff 0;
  box-sizing: border-box;
  /* box-shadow: 4px 4px 9px #8898aa; */
  box-shadow: #eee -7px -3px 106px;
  background-color: #fff;
}

#user-comment h3 {
  margin-top: 20px;
}
#comment-button {
  height: 32px;
  width: 62px;
  line-height: 1.5;
  letter-spacing: 3px;
  font-weight: 600;
  font-size: 16px;
  background-color: #5e72e4;
  color: #fff;
  border: 0;
  border-radius: 0.25rem;
  margin: 25px 0;
  float: right;
  text-decoration: none;
}
#cancle-comment-button {
  height: 32px;
  width: 62px;
  line-height: 1.5;
  letter-spacing: 3px;
  font-weight: 600;
  font-size: 16px;
  background-color: #5e72e4;
  color: #fff;
  border: 0;
  border-radius: 0.25rem;
  margin: 25px 10px;
  float: right;
}

#article-catalogue {
  position: absolute;
  right: 8%;
  margin-top: 90px;
  padding: 30px 10px;
  width: 12%;
  min-height: 200px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: #eee -7px -3px 106px;
}

#catalogue {
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
  word-break: break-all;
}

#article-catalogue span {
  display: block;
  padding-left: 5px;
  line-height: 1.7;
  cursor: pointer;
}

#article-catalogue p {
  word-break: break-all;
}

#article-catalogue span:hover {
  background-color: #eee;
  border-radius: 5px;
}

.v-note-wrapper {
  z-index: 1 !important;
}

.H1 {
}

.H2 {
  margin-left: 1em;
}

.H3 {
  margin-left: 2em;
}

.H4 {
  margin-left: 3em;
}

.H5 {
  margin-left: 4em;
}
</style>
