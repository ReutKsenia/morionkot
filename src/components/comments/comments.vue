<template>
  <div class="comments">
    <v-container>
      <h1>Отзывы покупателей</h1>
      <v-form @submit.prevent="sendComment">
        <h4>Оставьте отзыв</h4>
        <v-text-field v-model="username" label="Введите ваше имя" filled color="deep-purple" :rules="rules.required"/>
        <v-text-field v-model="comment" label="Отзыв" filled color="deep-purple" :rules="rules.required"/>
        <v-btn type="submit" color="#524b98" style="color:white" :disabled="!comment">Отправить</v-btn>
      </v-form>
      <div
        v-for="comment in this.comments.slice().reverse()"
        :key="comment._id"
        class="comment-item"
      >
        <v-divider />
        <div>
          <h3>{{comment.username}}</h3>
        </div>
        <div>{{comment.comment}}</div>
      </div>
      <div v-for="comment in COMMENTS.slice().reverse()" :key="comment._id" class="comment-item">
        <v-divider />
        <div>
          <h3>{{comment.username}}</h3>
        </div>
        <div>{{comment.comment}}</div>
      </div>
      <v-divider />
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
      comments: [],
      socket: io("localhost:3000"),
      rules: {
                required: [v => !!v || 'Это поле является обязательным к заполнению'],
            },
    };
  },
  computed: {
    ...mapGetters(["COMMENTS"])
  },
  created() {
    this.socket.on("comment", data => {
      this.comments.push({
        username: data.username,
        comment: data.comment
      });
    });

    this.GET_COMMENTS_FROM_DB();
  },
  methods: {
    ...mapActions(["GET_COMMENTS_FROM_DB"]),
    async sendComment() {
      if (this.comment) {
        let comment = {
          username: this.username,
          comment: this.comment
        };
        this.$socket.emit("comment", comment);
        this.comment = "";
      }
    },
    mounted() {
      this.GET_COMMENTS_FROM_DB();
    }
  }
};
</script>

<style lang="scss">
.comment-item {
  text-align: start;
  margin: 2%;
}
</style>