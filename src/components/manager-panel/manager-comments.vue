<template>
  <div>
    <h1>Коментарии</h1>
    <v-container>
      <div
        v-for="comment in COMMENTS.slice().reverse()"
        :key="comment._id"
        class="comment-item"
      >
        <v-divider />
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="9">
            <div>
              <h3>{{ comment.username }}</h3>
            </div>
            <div>{{ comment.comment }}</div>
            <div
              v-for="answer in ANSWERS"
              :key="answer._id"
              class="answer-item-div"
            >
              <div v-if="answer.comment_id == comment._id">
                <v-divider />
                <div class="answer-item">
                  <h3>Ответ от менеджера</h3>
                  <div>{{ answer.answer }}</div>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="2">
            <v-row style="margin: 5%%">
              <v-col cols="10">
                <v-dialog v-model="dialog" max-width="400" :retain-focus="false">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      @click="comment_id = comment._id"
                      style="
                        margin-top: 10px;
                        color: white;
                        background-color: orange;
                      "
                      >Ответить</v-btn
                    >
                    </template>
                    <v-card>
                      <v-card-title class="headline" style="display: block"
                        >Ответ пользователю</v-card-title
                      >
                      <v-textarea
                        filled
                        color="orange"
                        label="Напишите отзыв"
                        style="margin: 2%"
                        v-model="answer"
                      ></v-textarea>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          style="color: white"
                          color="orange"
                          :disabled="isAddButtonDisabled"
                          @click="sendAnswer()"
                          >Ответить</v-btn
                        >
                        <v-btn text @click="notNow"> Закрыть </v-btn>
                      </v-card-actions>
                    </v-card>
                  
                </v-dialog>
              </v-col>
              <v-col cols="2">
                <v-icon @click="deleteComment(comment)" style="margin-top: 10px"
                  >delete</v-icon
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <v-divider style="margin-left: 2%; margin-right: 2%" />
    </v-container>
  </div>
</template>

<script>
import io from "socket.io-client";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "manager-comments",
  props: {},
  data() {
    return {
      dialog: false,
      username: "",
      comment: "",
      comment_id: "",
      answers: [],
      answer: "",
      socket: io("localhost:3000"),
      rules: {
        required: [(v) => !!v || "Это поле является обязательным к заполнению"],
      },
    };
  },
  computed: {
    ...mapGetters(["COMMENTS", "ANSWERS"]),

    isAddButtonDisabled() {
      if (!this.answer) return true;
      else return false;
    }
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
    async sendAnswer() {
      if (this.answer) {
        let answer = {
          answer: this.answer,
          comment_id: this.comment_id,
        };
        this.$socket.emit("answer", answer);
        this.answer = "";
        this.dialog = false;
        this.GET_COMMENTS_FROM_DB();
        this.GET_ANSWERS_FROM_DB();
      }
    },

    async deleteComment(item) {
      let comment = {
        _id: item._id,
        username: item.username,
        comment: item.comment
        };
        for(let i=0; i<this.ANSWERS.length; i++){

          if(this.ANSWERS[i].comment_id == item._id) {
            this.answers.push(this.ANSWERS[i]);
          }
        }
        this.$socket.emit("delete-comment", comment, this.answers)
        this.GET_COMMENTS_FROM_DB();
        this.GET_ANSWERS_FROM_DB();
        this.GET_COMMENTS_FROM_DB();
        this.GET_ANSWERS_FROM_DB();
        this.answers = [];
      },

      notNow() {
      this.dialog = false;
    },
  },
  mounted() {},
};
</script>

