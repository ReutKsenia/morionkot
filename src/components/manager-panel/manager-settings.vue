<template>
  <div class="manager-settings">
    <h1>Личные данные</h1>
    <v-form>
      <v-text-field
        label="Имя"
        v-model="manager.name"
        color="orange"
        :rules="rules.required"
        filled
      >
      </v-text-field>

      <v-text-field
        label="Логин"
        v-model="manager.login"
        color="orange"
        :rules="rules.login"
        filled
        required
      >
      </v-text-field>
      <v-text-field
        label="Новый пароль"
        v-model="manager.password"
        :rules="rules.password"
        :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
        @click:append="() => (loginPasswordVisible = !loginPasswordVisible)"
        :type="loginPasswordVisible ? 'text' : 'password'"
        color="orange"
        filled
        required
      >
      </v-text-field>

      <v-text-field
        label="Подтверждение пароля"
        v-model="passwordSecond"
        :rules="rules.passSecond"
        :type="loginPasswordVisible ? 'text' : 'password'"
        color="orange"
        filled
        required
      >
      </v-text-field>

      <v-dialog v-model="dialog" max-width="290">
        <template v-slot:activator="{ on }">
          <v-btn
            style="margin: 2%; background-color: orange; color: white"
            @click="saveManager()"
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
            <v-btn color="orange darken-1" text @click="dialog = false"
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
import employeeService from "../../services/employeeService.js";

export default {
  name: "manager-settings",
  props: {},
  data() {
    return {
      loginPasswordVisible: false,
      passwordSecond: "",
      dialog: false,
      manager: {
        name: "",
        login: "",
        password: "",
      },
      rules: {
        login: [
          (v) =>
            (v || "").match(/.{4,}/) ||
            "Логин должен содержать минимум 4 символов",
        ],
        password: [
          (v) =>
            (v || "").match(/.{5,}/) ||
            "Пароль должен содержать минимум 5 символов",
        ],
        required: [(v) => !!v || "Обязательно к заполнению"],
        passSecond: [
          (v) => v == this.manager.password || "Пароли должны совпадать",
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["MANAGER_INFORMATION"]),

    isAddButtonDisabled() {
      if (!this.manager.login) return true;
      else if (!this.manager.password) return true;
      else if (this.passwordSecond != this.manager.password) return true;
      else return false;
    },
  },
  methods: {
    ...mapActions(["GET_MANAGER_INFORMATION_FROM_DB"]),

    saveManager() {
      employeeService.saveManager(this.manager, this).then(() => {
        this.manager.password = "";
        this.passwordSecond = "";
      });
    },
  },
  mounted() {
    this.GET_MANAGER_INFORMATION_FROM_DB(this).then(() => {
      this.manager.name = this.MANAGER_INFORMATION.name;
      this.manager.login = this.MANAGER_INFORMATION.login;
    });
  },
};
</script>

<style lang="scss">
.manager-settings {
  padding: 5%;
}
</style>