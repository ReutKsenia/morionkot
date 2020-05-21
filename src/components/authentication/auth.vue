<template>
  <div class="l-auth-container">
    <div class="l-auth">
      <v-form v-model="validLogin">
        <v-text-field label="Логин"
                      v-model="credentials.login"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      color="deep-purple">
        </v-text-field>

        <v-text-field label="Пароль"
                      v-model="credentials.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                      @click:append="() => (loginPasswordVisible = !loginPasswordVisible)"
                      :type="loginPasswordVisible ? 'text' : 'password'"
                      color="deep-purple"
                      required>
        </v-text-field>

        <v-btn block style="background-color: #524b98; color: white;" @click.native="submitAuthentication()">Войти</v-btn>
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
        timeout: 6000,
        rules: [ (value) => !!value || 'This field is required' ],
        credentials: {
          login: '',
          password: ''
        },
        message: ''
      }
    },
    computed: {
        ...mapGetters([
            'ADMIN'
        ]),
    },
    methods: {
      ...mapActions([
             'GET_ADMIN',
      ]),
      submitAuthentication () {
        Authentication.authenticate(this, this.credentials, '/admin-orders').then(() => {
          console.log(Authentication.admin.authenticated);
          this.GET_ADMIN(Authentication.admin.authenticated);
        })
      },
    }
  }
</script>

<style lang="scss">
  .l-auth {
    background-color: #00000033;
    padding: 15px;
    margin: 10% auto;
    min-width: 272px;
    max-width: 320px;
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
</style>