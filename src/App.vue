<template>
  <div id="app">
    <div id="show"
         v-show="($route.path !== '/NotFound')">
      <Banner />
      <canvas id="canvas"></canvas>
      <div id="title">
        <h1 id="name">yundingzhishang</h1>
      </div>
    </div>
    <router-view v-if="isRouterAlive" />
    <Bottom />
  </div>
</template>

<script>
import Banner from './components/Banner.vue'
import Bottom from './components/Bottom.vue'
export default {
  name: 'app',
  data () {
    return {
      isRouterAlive: true
    }
  },
  provide () { // 提供
    return {
      reload: this.reload
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  components: {
    Banner,
    Bottom
  },
  mounted () {
    document.addEventListener('touchmove', function (e) {
      e.preventDefault()
    })
    var c = document.getElementsByTagName('canvas')[0]
    var x = c.getContext('2d')
    var pr = window.devicePixelRatio || 1
    var w = window.innerWidth
    var h = window.innerHeight
    var f = 90
    var q
    var m = Math
    var r = 0
    var u = m.PI * 2
    var v = m.cos
    var z = m.random
    c.width = w * pr
    c.height = h * pr
    x.scale(pr, pr)
    x.globalAlpha = 0.6
    function i () {
      x.clearRect(0, 0, w, h)
      q = [{ x: 0, y: h * 0.7 + f }, { x: 0, y: h * 0.7 - f }]
      while (q[1].x < w + f) {
        d(q[0], q[1])
      }
    }
    function d (i, j) {
      x.beginPath()
      x.moveTo(i.x, i.y)
      x.lineTo(j.x, j.y)
      var k = j.x + (z() * 2 - 0.25) * f
      var n = y(j.y)
      x.lineTo(k, n)
      x.closePath()
      r -= u / -50
      x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
      x.fill()
      q[0] = q[1]
      q[1] = { x: k, y: n }
    }
    function y (p) {
      var t = p + (z() * 2 - 1.1) * f
      return (t > h || t < 0) ? y(p) : t
    }
    document.onclick = i
    document.ontouchstart = i
    i()
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
  overflow: hidden;
}

#canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

#title {
  padding-top: 140px;
  text-align: center;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: #eee;
} /* 这是针对缺省样式 (必须的) */

::-webkit-scrollbar-thumb {
  /* border-radius: 10px; */
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #5e90e4;
}
</style>
