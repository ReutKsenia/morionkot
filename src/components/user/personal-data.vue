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
      },
      rules: {
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
    isAddButtonDisabled() {
      if (!this.user.email) return true;
      else if (!this.user.password) return true;
      else return false;
    },
  },
  methods: {
    save() {
        this.user._id = userService.getUserId(this);
       userService.saveUser(this, this.user);
        this.user.first_name = '';
      this.user.last_name = '';
      this.user.email = '';
       this.user.password = '';
       this.user.passwordSecond ='';
    },
  },
  mounted() {
      userService.getUser(this).then(({data}) => {
    this.user.first_name = data.user.first_name;
      this.user.last_name = data.user.last_name;
      this.user.email = data.user.email;
        })
  },
};
</script>

<style lang="scss">
.personal-data-conteiner {
    padding: 5%;
}
</style>