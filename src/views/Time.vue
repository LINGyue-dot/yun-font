<template>
  <div id="Time-app">
    <div id="time-block">
      <h1 class="time-block-h1">时光轴</h1>
      <transition name="slide-fade">

        <div class='time-line'
             v-show="!isLoading">
          <div v-for='(item,index) in testList'
               v-show="index!==0"
               :key="index"
               class='time-line-div'>
            <p>{{item.time}}</p>
            <p ref='circular'></p>
            <p>
              <router-link :to="{name:'Article',params:{index:item.indexs}}">{{item.text}}</router-link>
            </p>
          </div>
          <div class='img-dotted'
               ref='dotted'></div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import axios from 'axios'// 为什么无法全局引用
export default {
  name: 'Time',
  data () {
    return {
      testList: [{
        time: '2020-8-26',
        title: '芜湖'
      }],
      isLoading: true
    }
  },
  mounted () {
    this.$refs.dotted.style.left = this.$refs.circular[0].offsetLeft - 12 + 'px'
    // 发起ajax请求获取文章
    axios.get('http://localhost:3000/categories', {
      params: {
      },
      header: {}
    })
      .then((res) => {
        const obj = res.data
        for (var i = 0; i < obj.length; i++) {
          var c = {}
          c.time = obj[i].date.slice(0, 10)
          c.text = obj[i].title
          c.indexs = obj[i].indexs
          this.testList.push(c)
          this.isLoading = false
        }
      })
  }
}
</script>

<style>
#Time-app {
  margin: 10px 9%;
}
#time-block {
  display: inline-block;
  width: 73%;
  background-color: #fff;
  border-radius: 15px;
  padding-top: 20px;
  padding-left: 20px;
  box-shadow: #eee -7px -3px 106px;
}
.time-block-h1 {
  font-size: 40px;
  color: #32325d;
  margin-bottom: 20px;
}
.time h2 {
  color: #ff6600;
  margin: 20px auto 30px auto;
}
.time-line {
  position: relative;
  float: left;
  width: 300px;
  margin: 0 auto;
}
.time-line-div {
  position: relative;
  min-height: 85px;
}
.time-line-div > p:nth-child(1) {
  position: absolute;
  left: 0;
  width: 100px;
}
.time-line-div > p:nth-child(2) {
  position: absolute;
  left: 100px;
  width: 15px;
  height: 15px;
  top: 10px;
  background: #5e72e4;
  border-radius: 50%;
  z-index: 10;
}
.time-line-div > p:nth-child(3) {
  position: absolute;
  left: 130px;
  padding: 10px;
  font-size: 20px;
  color: #317ef3;
}
.img-dotted {
  position: absolute;
  width: 20px;
  height: 100%;
  top: 0;
  z-index: 1;
}
.time-line-detail > p {
  margin-left: 30px;
  margin-bottom: 10px;
  word-break: break-all;
}
</style>
