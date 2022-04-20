<template>
  <div class="l-auth-container">
    <div class="l-auth-user" v-if="!signUpVisible">
      <v-form v-model="validLogin">
        <v-text-field
          label="Логин (email)"
          v-model="credentials.email"
          prepend-icon="account_box"
          :rules="rules.email"
          required
          color="deep-purple"
        >
        </v-text-field>

        <v-text-field
          label="Пароль"
          v-model="credentials.password"
          prepend-icon="lock"
          :rules="rules.required"
          :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
          @click:append="() => (loginPasswordVisible = !loginPasswordVisible)"
          :type="loginPasswordVisible ? 'text' : 'password'"
          color="deep-purple"
          required
        >
        </v-text-field>

        <v-btn
          block
          style="background-color: #524b98; color: white"
          @click.native="submitAuthentication()"
          >Войти</v-btn
        >
        <a style="color: #524b98" @click="signUpVisible = true"
          >Зарегистрироваться</a
        >
        <div>
        <router-link style="color: #524b98"  to="/user-forgot-password">Забыли пароль?</router-link>
        </div>
      </v-form>
    </div>
    <div class="l-signup-user" v-else>
      <v-form v-model="validSignUp">
        <h2>Регистрация</h2>
        <v-text-field
          label="Имя"
          v-model="credentials.first_name"
          color="deep-purple"
        >
        </v-text-field>
        <v-text-field
          label="Фамилия"
          v-model="credentials.last_name"
          color="deep-purple"
        >
        </v-text-field>

        <v-text-field
          label="E-Mail"
          v-model="credentials.email"
          :rules="rules.email"
          color="deep-purple"
          required
        >
        </v-text-field>

        <v-text-field
          label="Пароль"
          v-model="credentials.password"
          :rules="rules.password"
          :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
          @click:append="() => (loginPasswordVisible = !loginPasswordVisible)"
          :type="loginPasswordVisible ? 'text' : 'password'"
          color="deep-purple"
          required
        >
        </v-text-field>

        <v-text-field
          label="Подтверждение пароля"
          v-model="passwordSecond"
          :rules="rules.required"
          :type="loginPasswordVisible ? 'text' : 'password'"
          color="deep-purple"
          required
        >
        </v-text-field>

        <v-btn
          block
          style="background-color: #524b98; color: white"
          @click.native="submitSignUp()"
          >Зарегистрироваться</v-btn
        >
        <a style="color: #524b98" @click="signUpVisible = false">Войти</a>
      </v-form>
    </div>
    <div>
      <v-snackbar
        :timeout="timeout"
        bottom="bottom"
        color="red lighten-1"
        v-model="snackbar"
      >
        {{ message }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import AuthenticationRegistration from "../../services/userService";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      snackbar: false,
      validLogin: false,
      loginPasswordVisible: false,
      signUpVisible: false,
      timeout: 6000,
      passwordSecond: "",
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
      credentials: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      },
      message: "",
    };
  },
  computed: {
    ...mapGetters(["USER"]),
  },
  methods: {
    ...mapActions(["GET_USER"]),
    submitAuthentication() {
      AuthenticationRegistration.authenticate(
        this,
        this.credentials,
        "/personal-account"
      );
      this.GET_USER(true);
    },
    submitSignUp() {
      if (this.credentials.password == this.passwordSecond) {
        AuthenticationRegistration.signup(
          this,
          this.credentials,
          "/personal-account"
        );
        this.GET_USER(true);
      } else {
        this.snackbar = true;
        this.message = "Проверьте правильность паролей";
      }
    },
  },
};
</script>

<style lang="scss">
.l-auth-user {
  background-color: #00000033;
  padding: 15px;
  margin: 10% auto;
  min-width: 272px;
  max-width: 320px;
  animation: bounceIn 1s forwards ease;
  label,
  input,
  .icon {
    color: rgb(82, 75, 152) !important;
  }
  .input-group__details {
    &:before {
      background-color: $color !important;
    }
  }
}
.l-signup-user {
  @extend .l-auth-user;
  animation: slideInFromLeft 1s forwards ease;
}
</style>