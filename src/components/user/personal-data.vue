<template>
  <div class="personal-data-conteiner">
    <h1>Личные данные</h1>
    <v-form>
      <v-text-field
        label="Имя"
        v-model="user.first_name"
        color="deep-purple"
        filled
      >
      </v-text-field>
      <v-text-field
        label="Фамилия"
        v-model="user.last_name"
        color="deep-purple"
        filled
      >
      </v-text-field>

      <v-text-field
        label="Номер телефона"
        v-model="user.phone_number"
        color="deep-purple"
        :rules="rules.phone_number"
        filled
      >
      </v-text-field>

      <v-text-field
        label="E-Mail"
        v-model="user.email"
        :rules="rules.email"
        color="deep-purple"
        filled
        required
      >
      </v-text-field>

      <v-text-field
        label="Новый пароль"
        v-model="user.password"
        :rules="rules.password"
        :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
        @click:append="() => (loginPasswordVisible = !loginPasswordVisible)"
        :type="loginPasswordVisible ? 'text' : 'password'"
        color="deep-purple"
        filled
        required
      >
      </v-text-field>

      <v-text-field
        label="Подтверждение пароля"
        v-model="passwordSecond"
        :rules="rules.required"
        :type="loginPasswordVisible ? 'text' : 'password'"
        color="deep-purple"
        filled
        required
      >
      </v-text-field>

      <v-dialog v-model="dialog" max-width="290">
        <template v-slot:activator="{ on }">
          <v-btn
            style="margin: 2%; background-color: #524b98; color: white"
            @click="save()"
            v-on="on"
            :disabled="isAddButtonDisabled"
            >Сохранить</v-btn
          >
        </template>
        <v-card>
          <v-card-title class="headline" style="display: block"
            >Личные данные обновлены!</v-card-title
          >
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="deep-purple darken-1" text @click="dialog = false"
              >OK</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import userService from '../../services/userService.js'

export default {
  name: "personal-data",
  props: {},
  data() {
    return {
      loginPasswordVisible: false,
      passwordSecond: "",
      dialog: false,
      user: {
          _id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone_number: ""
      },
      rules: {
        phone_number: [
          (v) =>
            (v || "").match(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/) ||
            "Номер некорректный",
        ],
        email: [
          (v) =>
            (v || "").match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) || "email некорректный",
        ],
        password: [
          (v) =>
            (v || "").match(/.{5,}/) ||
            "Пароль должен содержать минимум 5 символов",
        ],
        required: [(v) => !!v || "Обязательно к заполнению"],
      },
    };
  },
  computed: {
    ...mapGetters(["USER_INFORMATION"]),

    isAddButtonDisabled() {
      if (!this.user.email) return true;
      else if (!this.user.password) return true;
      else if (this.passwordSecond != this.user.password) return true;
      else return false;
    },
  },
  methods: {
    ...mapActions(["GET_USER_INFORMATION_FROM_DB"]),

    save() {
        this.user._id = userService.getUserId(this);
        userService.saveUser(this, this.user).then(() => {
          this.user.password = '';
          this.passwordSecond ='';
        })
    },
  },
  mounted() {
    this.GET_USER_INFORMATION_FROM_DB(this).then(() => {
      this.user.first_name = this.USER_INFORMATION.first_name;
      this.user.last_name = this.USER_INFORMATION.last_name;
      this.user.email = this.USER_INFORMATION.email;
      if(this.USER_INFORMATION.phone_number != ''){
        this.user.phone_number = this.USER_INFORMATION.phone_number;
      }
    })
  },
};
</script>

<style lang="scss">
.personal-data-conteiner {
    padding: 5%;
}
</style>