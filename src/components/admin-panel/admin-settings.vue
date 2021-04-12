<template>
  <div>
    <h1>Личные данные</h1>
    <v-form>
      <v-text-field
        label="Логин"
        v-model="admin.login"
        color="deep-purple"
        :rules="rules.login"
        filled
        required
      >
      </v-text-field>
      <v-text-field
        label="Новый пароль"
        v-model="admin.password"
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
//import authService from '../../services/authService.js'

export default {
  name: "admin-settings",
  props: {},
  data() {
    return {
        loginPasswordVisible: false,
      passwordSecond: "",
      dialog: false,
        admin: {
            login: '',
            password: ''
        },
        rules: {
            login: [v => (v || "").match(/.{4,}/) || "Логин должен содержать минимум 4 символов"],
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
      if (!this.admin.login) return true;
      else if (!this.admin.password) return true;
      else if (!this.passwordSecond) return true;
      else return false;
    },
  },
  methods: {
    save() {
      
    //    userService.saveUser(this, this.user);
    //     this.user.first_name = '';
    //   this.user.last_name = '';
    //   this.user.email = '';
    //    this.user.password = '';
    //    this.user.passwordSecond ='';
     },
  },
  mounted() {
  },
};
</script>

