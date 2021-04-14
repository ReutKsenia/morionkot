<template>
  <div class="courier-settings">
    <h1>Личные данные</h1>
    <v-form>
      <v-text-field
        label="Имя"
        v-model="courier.name"
        color="yellow"
        :rules="rules.required"
        filled
      >
      </v-text-field>

      <v-text-field
        label="Логин"
        v-model="courier.login"
        color="yellow"
        :rules="rules.login"
        filled
        required
      >
      </v-text-field>
      <v-text-field
        label="Новый пароль"
        v-model="courier.password"
        :rules="rules.password"
        :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
        @click:append="() => (loginPasswordVisible = !loginPasswordVisible)"
        :type="loginPasswordVisible ? 'text' : 'password'"
        color="yellow"
        filled
        required
      >
      </v-text-field>

      <v-text-field
        label="Подтверждение пароля"
        v-model="passwordSecond"
        :rules="rules.passSecond"
        :type="loginPasswordVisible ? 'text' : 'password'"
        color="yellow"
        filled
        required
      >
      </v-text-field>

      <v-dialog v-model="dialog" max-width="290">
        <template v-slot:activator="{ on }">
          <v-btn
            style="margin: 2%; background-color: yellow; color: white"
            @click="saveCourier()"
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
            <v-btn color="yellow darken-1" text @click="dialog = false"
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
  name: "courier-settings",
  props: {},
  data() {
    return {
      loginPasswordVisible: false,
      passwordSecond: "",
      dialog: false,
      courier: {
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
          (v) => v == this.courier.password || "Пароли должны совпадать",
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["COURIER_INFORMATION"]),

    isAddButtonDisabled() {
      if (!this.courier.login) return true;
      else if (!this.courier.password) return true;
      else if (this.passwordSecond != this.courier.password) return true;
      else return false;
    },
  },
  methods: {
    ...mapActions(["GET_COURIER_INFORMATION_FROM_DB"]),

    saveCourier() {
      employeeService.saveCourier(this.courier, this).then(() => {
        this.courier.password = "";
        this.passwordSecond = "";
      });
    },
  },
  mounted() {
    this.GET_COURIER_INFORMATION_FROM_DB(this).then(() => {
      this.courier.name = this.COURIER_INFORMATION.name;
      this.courier.login = this.COURIER_INFORMATION.login;
    });
  },
};
</script>

<style lang="scss">
.courier-settings {
  padding: 5%;
}
</style>