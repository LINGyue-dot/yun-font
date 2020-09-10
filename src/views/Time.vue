<template>
  <div id="Time-app">
    <div id="time-block">
      <h1 class="time-block-h1">时光轴</h1>
      <transition name="slide-fade">
        <div class="timeline-con"
             v-show="!isLoading">
          <div class="timeline-post"
               v-for="(item,index) in obj"
               :key="index">
            <div class="timeline-date">{{item.date.slice(0,10)}}</div>
            <div class="timeline-icon-con">
              <div class="timeline-icon"></div>
            </div>
            <div class="timeline-content">
              <router-link :to="{name:'Article',params:{index:item.indexs}}">
                <p>{{item.title}}</p>
              </router-link>

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
  name: 'Time',
  data () {
    return {
      isLoading: true,
      obj: []
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
        this.obj = res.data.reverse()
        this.isLoading = false
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
  width: 96%;
  background-color: #fff;
  border-radius: 15px;
  padding-top: 20px;
  padding-left: 20px;
  box-shadow: #eee -7px -3px 106px;
}
.timeline-con {
  position: relative;
  margin: 30px 0px;
  padding-right: 2%;
}
.timeline-con::before {
  content: "";
  display: block;
  width: 1px;
  background: -webkit-linear-gradient(#feeeed, #5e72e4, #feeeed);
  position: absolute;
  left: 50%;
  height: 100%;
  top: 0;
}
.timeline-post {
  width: 50%;
  margin-bottom: 40px;
}
.timeline-post:nth-child(odd) {
  margin-left: 50%;
}
.timeline-post:nth-child(even) .timeline-date {
  margin-right: -150px;
}
.timeline-post:nth-child(even) .timeline-content {
  margin: 0 44px 0 0;
  text-align: right;
}
.timeline-date {
  font-size: 16px;
  font-weight: bold;
  color: #666;
  position: absolute;
  right: 50%;
  margin-top: 15px;
  margin-right: 24px;
}
.timeline-icon-con {
  width: 38px;
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  margin-left: -18px;
}
.timeline-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border: 3px solid #5e72e4;
}
.timeline-content {
  position: relative;
  top: -6px;
  color: #5e72e4;
  line-height: 36px;
  margin: 0 0 0 44px;
  padding: 15px 16px 20px;
  background-color: #fff;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
}
.timeline-content p {
  font-size: 22px;

  word-break: break-all;
  word-break: break-all;
}
</style>
