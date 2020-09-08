<template>
  <div id="about">
    <div id="one"></div>
    <div id="two"></div>
    <div class="hc1"
         v-for="(itemH1,indexH1) in reArray(0, content)"
         :key=indexH1>
      <p :class="'H'+itemH1.level">{{itemH1.title}}</p>
      <div class="hc2"
           v-for="(itemH2,indexH2) in reArray(itemH1.index ,content)"
           :key=indexH2>
        <p :class="'H'+itemH2.level">{{itemH2.title}}</p>
        <div class="hc3"
             v-for="(itemH3,indexH3) in reArray(itemH2.index,content)"
             :key=indexH3>
          <p :class="'H'+itemH3.level">{{itemH3.title}}</p>
          <div class="hc4"
               v-for="(itemH4,indexH4) in reArray(itemH3.index,content)"
               :key=indexH4>
            <p :class="'H'+itemH4.level">{{itemH4.title}}</p>
            <div class="hc5"
                 v-for="(itemH5,indexH5) in reArray(itemH4.index ,content)"
                 :key="indexH5">
              <p :class="'H'+itemH5.level">{{itemH5.title}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <a href="#菜单栏">qwe</a>
  </div>
</template>

<script>
import marked from '../config/marked'
import 'highlight.js/styles/monokai-sublime.css'
export default {
  name: 'about',
  data () {
    return {
      content: '',
      nav: ''
    }
  },
  methods: {
    showTOC () {
      // marked 渲染器
      var rendererMD = new marked.Renderer()
      rendererMD.heading = function (text, level) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
        return '<h' + level + '><a name="' + text + '" class="anchor" href="#' + escapedText + '"><span class="header-link"></span></a>' + text + '</h' + level + '>'
      }
      return marked(this.$store.state.articleText[0].text, { renderer: rendererMD })
    },
    getTitle (content) {
      const tempArr = []
      let index = 1
      content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function (match, m1, m2) {
        // m2是匹配到的位置
        const title = match.replace('\n', '')
        const level = m1.length // #的数量
        tempArr.push({
          title: title.replace(/^#+/, '').replace(/\([^)]*?\)/, ''),
          level: level,
          parent: -2,
          index: index++
        })
      })
      this.reBuild(tempArr)
    },
    // 为每个元素添加父节点
    reBuild (arr) {
      var nowParent = 0
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
      console.log(arr)
      this.content = arr
    },
    // 挑选出子节点
    reArray (parent, arr) {
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
    }
  },
  mounted () {
    // this.showTOC()
    this.getTitle(this.$store.state.articleText[0].text)
  }
}
</script>

<style>

</style>
