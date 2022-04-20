<template>
  <div class="comments">
    <v-container>
      <h1>Отзывы покупателей</h1>
      <v-form @submit.prevent="sendComment">
        <h4 style="margin: 1%">Оставьте отзыв</h4>
        <v-text-field v-model="username" label="Введите ваше имя" filled color="deep-purple" :rules="rules.required"/>
        <v-text-field v-model="comment" label="Отзыв" filled color="deep-purple" :rules="rules.required"/>
        <v-btn type="submit" color="#524b98" style="color:white" :disabled="!comment">Отправить</v-btn>
      </v-form>
      <div v-for="comment in COMMENTS.slice().reverse()" :key="comment._id" class="comment-item">
        <v-divider />
        <div>
          <h3>{{comment.username}}</h3>
        </div>
        <div>{{comment.comment}}</div>
        <div v-for="answer in ANSWERS" :key="answer._id" class="answer-item-div">
          <div v-if="answer.comment_id == comment._id">
            <v-divider />
            <div class="answer-item">
          <h3>Ответ от менеджера</h3>
          <div>{{answer.answer}}</div>
            </div>
        </div>
        </div>
      </div>
      <v-divider style="margin-left: 2%; margin-right: 2%;" />
      
    </v-container>
  </div>
</template>

<script>
import io from "socket.io-client";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "comments",
  components: {},
  props: {},
  data() {
    return {
      username: "",
      comment: "",
      answer: "",
      socket: io("localhost:3000"),
      rules: {
                required: [v => !!v || 'Это поле является обязательным к заполнению'],
            },
    };
  },
  computed: {
    ...mapGetters(["COMMENTS", "ANSWERS"])
  },
  created() {
    this.socket.on("comment", () => {
      this.GET_COMMENTS_FROM_DB();
    });

    this.socket.on("answer", () => {
      this.GET_ANSWERS_FROM_DB();
    });

    this.socket.on("delete-comment", () => {
      this.GET_COMMENTS_FROM_DB();
      this.GET_ANSWERS_FROM_DB();
    });

    this.GET_COMMENTS_FROM_DB();
    this.GET_ANSWERS_FROM_DB();
  },
  methods: {
    ...mapActions(["GET_COMMENTS_FROM_DB", "GET_ANSWERS_FROM_DB"]),
    async sendComment() {
      if (this.comment) {
        let comment = {
          username: this.username,
          comment: this.comment
        };
        this.$socket.emit("comment", comment);
        this.comment = "";
        this.GET_COMMENTS_FROM_DB();
        this.GET_ANSWERS_FROM_DB();
      }
    },
    mounted() {
    }
  }
};
</script>

<style lang="scss">
.comment-item {
  text-align: start;
  margin: 2%;
  margin-bottom: 0%;
}
.answer-item {
  text-align: start;
  margin-left: 5%;
  margin-top: 1%;
}
.answer-item-div {
  background-color: #f0f0f0;;
}
</style>