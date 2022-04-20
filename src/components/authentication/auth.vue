<template>
  <div class="l-auth-container">
    <div class="l-auth" v-if="!signUpVisible">
      <v-form v-model="validLogin" >
        <v-text-field label="Логин"
                      v-model="credentials.login"
                      prepend-icon="account_box"
                      :rules="rules.required"
                      required
                      color="deep-purple">
        </v-text-field>

        <v-text-field label="Пароль"
                      v-model="credentials.password"
                      prepend-icon="lock"
                      :rules="rules.required"
                      :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                      @click:append="() => (loginPasswordVisible = !loginPasswordVisible)"
                      :type="loginPasswordVisible ? 'text' : 'password'"
                      color="deep-purple"
                      required>
        </v-text-field>

                        <v-radio-group
        v-model="credentials.role"
        row>
        <v-radio
          label="админ"
          value="admin"
          color="indigo darken-2"
        ></v-radio>
        <v-radio
          label="менеджер"
          value="manager"
          color="indigo darken-2"
        ></v-radio>
        <v-radio
          label="курьер"
          value="courier"
          color="indigo darken-2"
        ></v-radio>
      </v-radio-group>

        <v-btn block style="background-color: #524b98; color: white;" @click.native="submitAuthentication()">Войти</v-btn>
        <a style="color: #524b98;" @click="signUpVisible = true">Зарегистрироваться</a>
      </v-form>
    </div>

 <div class="l-signup" v-else>
      <v-form v-model="validSignUp">
        <h2>Регистрация</h2>

        <v-text-field label="ФИО"
                      v-model="credentials.name"
                      :rules="rules.required"
                      color="deep-purple">
        </v-text-field>

          <v-text-field label="Логин"
                      v-model="credentials.login"
                      :rules="rules.login"
                      color="deep-purple"
                      required>
        </v-text-field>

        <v-text-field label="Пароль"
                      v-model="credentials.password"
                      :rules="rules.password"
                      :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                      @click:append="() => (loginPasswordVisible = !loginPasswordVisible)"
                      :type="loginPasswordVisible ? 'text' : 'password'"
                      color="deep-purple"
                      required>
        </v-text-field>

        <v-text-field label="Подтверждение пароля"
                      v-model="passwordSecond"
                      :rules="rules.required"
                      
                      :type="loginPasswordVisible ? 'text' : 'password'"
                      color="deep-purple"
                      required>
        </v-text-field>

        <v-radio-group
        v-model="credentials.role"
        row>
        <v-radio
          label="админ"
          value="admin"
          color="indigo darken-2"
        ></v-radio>
        <v-radio
          label="менеджер"
          value="manager"
          color="indigo darken-2"
        ></v-radio>
        <v-radio
          label="курьер"
          value="courier"
          color="indigo darken-2"
        ></v-radio>
      </v-radio-group>

        <v-btn block style="background-color: #524b98; color: white;" @click.native="submitSignUp()">Зарегистрироваться</v-btn>
        <a style="color: #524b98;" @click="signUpVisible = false">Войти</a>
      </v-form>
    </div>

    <div>
    <v-snackbar :timeout="timeout"
                bottom="bottom"
                color="red lighten-1"
                v-model="snackbar">
      {{ message }}
    </v-snackbar>
  </div>
</div>

</template>

<script>
  import Authentication from '../../services/authService'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data () {
      return {
        snackbar: false,
        validLogin: false,
        loginPasswordVisible: false,
        signUpVisible: false,
        timeout: 6000,
        passwordSecond: '',
        rules: {
          login: [v => (v || "").match(/.{4,}/) || "Логин должен содержать минимум 4 символов"],
          password: [v => (v || "").match(/.{5,}/) || "Пароль должен содержать минимум 5 символов"],
          required: [v => !!v || "Обязательно к заполнению"]
        },
        credentials: {
          name: '',
          login: '',
          password: '',
          role: ''
        },
        message: ''
      }
    },
    computed: {
        ...mapGetters([
            'ADMIN', 'MANAGER', 'COURIER'
        ]),
    },
    methods: {
      ...mapActions([
             'GET_ADMIN', 'GET_MANAGER', 'GET_COURIER'
      ]),
      submitAuthentication () {
        if(this.credentials.role == 'admin'){
          Authentication.authenticate(this, this.credentials, '/admin-products').then(() => {
          console.log(Authentication.admin.authenticated);
          this.GET_ADMIN(Authentication.admin.authenticated);
        })
        }
        if(this.credentials.role == 'manager'){
          Authentication.authenticate(this, this.credentials, '/manager-orders').then(() => {
          console.log(Authentication.manager.authenticated);
          this.GET_MANAGER(Authentication.manager.authenticated);
        })
        }
        if(this.credentials.role == 'courier'){
          Authentication.authenticate(this, this.credentials, '/courier-orders').then(() => {
          console.log(Authentication.courier .authenticated);
          this.GET_COURIER(Authentication.courier.authenticated);
        })
        }
        else{
          // this.snackbar = true;
          // this.message = 'Выберете один из вариантов (админ, менеджер, курьер)';
        }
      },
      submitSignUp() {
        if(this.credentials.password == this.passwordSecond){
          if(this.credentials.role == 'admin'){
          Authentication.signup(this, this.credentials, '/admin-products').then(() => {
          console.log(Authentication.admin.authenticated);
          this.GET_ADMIN(Authentication.admin.authenticated);
        })
        }
        else if(this.credentials.role == 'manager'){
          Authentication.signup(this, this.credentials, '/manager-orders').then(() => {
          console.log(Authentication.manager.authenticated);
          this.GET_MANAGER(Authentication.manager.authenticated);
        })
        }
        else if(this.credentials.role == 'courier'){
          Authentication.signup(this, this.credentials, '/courier-orders').then(() => {
          console.log(Authentication.courier.authenticated);
          this.GET_COURIER(Authentication.courier.authenticated);
        })
        }
        else if (this.credentials.role == ''){
          this.snackbar = true;
          this.message = 'Выберете один из вариантов (админ, менеджер, курьер)'
        }
        }
        else{
          // this.snackbar = true;
          // this.message = 'Проверьте правильность паролей'
        }
      }
    }
  }
</script>

<style lang="scss">
  .l-auth {
    background-color: #00000033;
    padding: 15px;
    margin: 10% auto;
    min-width: 272px;
    max-width: 350px;
    animation: bounceIn 1s forwards ease;
    label, input, .icon {
      color: rgb(82, 75, 152) !important;
    }
    .input-group__details {
      &:before {
        background-color: $color !important;
      }
    }
  }
  .l-signup {
    @extend .l-auth;
    animation: slideInFromLeft 1s forwards ease;
  }
</style>