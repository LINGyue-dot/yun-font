<template>
  <div id="about-app">
    <div id="about-main-block">
      <h3>YunShangV0.1</h3>
      <h4>功能</h4>
      <p>md格式文章浏览</p>
      <p>文章评论以及评论的回复</p>
      <p>搜索 分类 以及搜索即时显示结果&nbsp;</p>
      <h4>搭建</h4>
      <p>前端用Vue + 后端用 express </p>
      <p>(组件默认原生 日后H5C3完全熟练 考虑用element-ui来快速开发)</p>
      <p>大部分数据处理等都在前端进行，后端基本只进行数据库操作</p>
      <h4>涉及</h4>
      <p>vue-cli </p>
      <p>vue-router 路由管理</p>
      <p>vuex 部分数据存储(目前用于递归组件与父组件数据传递)</p>
      <p>marked 用于解析md格式的文章</p>
      <p>highlight.js md格式中code的高亮显示 </p>
      <p>axios 用于向后端发送ajax请求</p>
      <p>canvas 用于背景图片的绘制</p>
      <p>&nbsp;</p>
      <h4>部分花较长时间实现的功能</h4>
      <p>评论以及评论回复：类树结构的评论数据存储，用递归组件显示</p>
      <p>后台响应： promise 以及async 的异步操作数据库返回数据</p>
      <p>页码分页动态显示页码数据（未完成）</p>
      <p>md文章 添加目录； 正则表达式为标题添加 id 后用类树结构实现目录的动态跳转和显示（5层循环，待用循环组件改善）</p>
      <p>&nbsp;</p>
      <h4>其他</h4>
      <p>YunShang V 0.1 距离我理想中的博客仍然属于半成品 0.1版本，仅仅拥有博客的基本功能</p>
      <p>博客的组件 ui 代码风格以及数据操作方式 还需要更加深入的学习后进行重构</p>

    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {}
  }
}
</script>

<style>
#about-app {
  margin: 10px 9%;
}
#about-main-block {
  background-color: #fff;
  padding: 2%;
  width: 96%;
  box-shadow: #eee -7px -3px 106px;
}
#about-main-block h3,
#about-main-block h4 {
  line-height: 2;
  letter-spacing: 2px;
}
#about-main-block p {
  letter-spacing: 1px;
  line-height: 2;
}
</style>
