// 页面滚动动画函数
function Jump (top) {
  // 将二级标题再原界面中的offsetTop获取并赋值，实现页面内的跳转
  const ScrollTop = (number = 0, time) => {
    if (!time) {
      document.body.scrollTop = document.documentElement.scrollTop = number
      return number
    }
    const spacingTime = 20 // 设置循环的间隔时间  值越小消耗性能越高
    let spacingInex = time / spacingTime // 计算循环的次数
    let nowTop =
      document.body.scrollTop + document.documentElement.scrollTop // 获取当前滚动条位置
    const everTop = (number - nowTop) / spacingInex // 计算每次滑动的距离
    const scrollTimer = setInterval(() => {
      if (spacingInex > 0) {
        spacingInex--
        ScrollTop((nowTop += everTop))
      } else {
        clearInterval(scrollTimer) // 清除计时器
      }
    }, spacingTime)
  }
  ScrollTop(top, 300)
}
module.exports = { Jump }
