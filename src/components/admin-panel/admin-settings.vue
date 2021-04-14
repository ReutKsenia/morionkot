<template>
  <div class="admin-setting">
    <h1>Личные данные</h1>
    <v-form>
      <v-text-field
        label="Имя"
        v-model="admin.name"
        color="deep-purple"
        :rules="rules.required"
        filled
      >
      </v-text-field>

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
        :rules="rules.passSecond"
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
import employeeService from "../../services/employeeService.js"

export default {
  name: "admin-settings",
  props: {},
  data() {
    return {
        loginPasswordVisible: false,
      passwordSecond: "",
      dialog: false,
        admin: {
            name: '',
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
        passSecond: [ (v) => v == this.admin.password || "Пароли должны совпадать"]
      },
    };
  },
  computed: {
    ...mapGetters(["ADMIN_INFORMATION"]),

      isAddButtonDisabled() {
      if (!this.admin.login) return true;
      else if (!this.admin.password) return true;
      else if (this.passwordSecond != this.admin.password) return true;
      else return false;
    },
  },
  methods: {
    ...mapActions(["GET_ADMIN_INFORMATION_FROM_DB"]),

    save() {
      employeeService.saveAdmin(this.admin, this).then(() => {
        this.admin.password = '';
        this.passwordSecond = '';
      })
     },
  },
  mounted() {
    this.GET_ADMIN_INFORMATION_FROM_DB(this).then(() => {
      this.admin.name = this.ADMIN_INFORMATION.name;
    this.admin.login = this.ADMIN_INFORMATION.login;
    })
  },
};
</script>

<style lang="scss">
.admin-setting {
  padding: 5%;
}
</style>