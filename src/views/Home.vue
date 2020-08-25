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
             :key=index>
          <div class="article-title"><a class="article-title-a"
               href="">{{item.title}}</a></div>
          <div class="article-time">
            <span class="iconfont bigfont"
                  v-show="item.top">&#xeb3e;&nbsp; |</span>
            <span class="iconfont bigfont">&#xeb2a;&nbsp; </span>
            <span class="article-date">{{item.date}}&nbsp; |</span>
            <span class="iconfont bigfont">&#xe7b4;&nbsp; </span>
            <span class="article-number">{{item.number}}&nbsp; |</span>
            <span class="iconfont bigfont">&#xe635;&nbsp; </span>
            <span class="article-talk">{{item.talk}}&nbsp; |</span>
            <span class="iconfont smallfont"> &#xe6ba;&nbsp; </span>
            <a href=""
               class="article-categories">{{item.categories}}</a>
          </div>
          <div class="article-word">
            <span class="iconfont smallfont"> &#xe6ba;&nbsp; </span>
          </div>
          <div class="article-short-text"> {{item.text}}</div>
          <div class="article-tag">
            <span class="iconfont">&#xe633;&nbsp; </span>
            <a href=""
               class="a-tag"
               v-for="(items,i) in item.tag"
               :key=i>{{items}}</a>
          </div>
        </div>
      </div>
      <div id="account">
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
            <span class="nav-number">22</span>
          </div>
          <div id="categroes-numbver"
               class="nav-site">
            <p>分类</p>
            <a class="nav-number">11</a>

          </div>
          <div id="tag-number"
               class="nav-site">
            <p>标签</p>
            <a class="nav-number">11</a>
          </div>
        </div>
      </div>
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
          title: 'asdasdddddddddddddddddddddddddddddddddddddddd',
          text: '我是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄嚄嚄是掌握嚄嚄是掌握嚄嚄是掌握嚄嚄嚄嚄嚄我我哦我我我我哦我 嚄嚄嚄嚄嚄我我我sssssssadadadawasdqweqweqweqweqwewqewqe我我我我我嚄嚄嚄嚄',
          date: '2020 - 08 - 25',
          number: 10,
          talk: 20,
          tag: ['名字', 'halo', '哦哦哦'],
          categories: '前端',
          top: true
        }, {
          title: 'asd',
          text: 'qweqweqweqweqweqwe',
          date: '2020 - 08 - 25',
          number: 10,
          talk: 20,
          tag: ['名字', 'halo', '哦哦哦'],
          categories: '前端',
          top: false
        }, {
          title: 'asd',
          text: 'qweqweqweqweqweqwe',
          date: '2020 - 08 - 25',
          number: 10,
          talk: 20,
          tag: ['名字', 'halo', '哦哦哦'],
          categories: '前端',
          top: false
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
  width: 65%;
}

.article-main {
  min-height: 300px;
  margin: 30px 0;
  padding: 30px;
  background-color: #fff;
  border-radius: 25px;
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
  width: 25%;
  height: 360px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 30px;
  padding: 0 10px;
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
</style>
