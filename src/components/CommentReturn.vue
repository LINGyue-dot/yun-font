<template>
  <div class="CommentReturn">
    <div class="Comment-return-list"
         v-for="(item,index) in ReturnCommentList()"
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
        <div class="comment-text">
          <a>@{{name}}&nbsp; &nbsp; &nbsp; </a>{{item.text}}
        </div>
        <div class="comment-response"
             @click="ResponseComments(item)">回复</div>
        <hr>
      </div>
      <CommentReturn :deep="item.deep+1"
                     :id="item.id"
                     :comment="comment"
                     :name="item.name" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentReturn',
  props: {
    // deep
    // id
    // comment数组
    deep: Number,
    id: String,
    comment: Array,
    name: String
    // ResponseComment: Function
  },
  data () {
    return {
    }
  },
  methods: {
    ResponseComments (item) {
      var items = {}
      items.deep = item.deep + 1
      items.name = item.name
      items.id = item.id
      this.$store.commit('ChangeDeep', items)
    },
    ReturnCommentList () {
      var c = []
      for (var i = 0; i < this.comment.length; i++) {
        if (this.comment[i].responseId === this.id && this.comment[i].deep === this.deep) {
          c.push(this.comment[i])
        }
      }
      return c
    }
  },
  mounted () {
    // console.log(this.ResponseComment)
  }
}
</script>

<style>
.Comment-return-list {
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
</style>
