<template>
  <div class="l-auth-container">
    <div class="l-auth">
      <v-form v-model="validLogin">
        <v-text-field label="Username"
                      v-model="credentials.login"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Password"
                      v-model="credentials.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                      @click:append="() => (loginPasswordVisible = !loginPasswordVisible)"
                      :type="loginPasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>

        <v-btn block color="light-blue lighten-1" @click.native="submitAuthentication()">Login</v-btn>
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
  import {mapActions} from 'vuex'

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
    methods: {
      ...mapActions([
             'GET_ADMIN',
      ]),
      submitAuthentication () {
        Authentication.authenticate(this, this.credentials, '/admin-panel');
        if(Authentication.admin){ this.GET_ADMIN(Authentication.admin); }
      },
    }
  }
</script>

<style lang="scss">
  .l-auth {
    background-color: $color;
    padding: 15px;
    margin: 45px auto;
    min-width: 272px;
    max-width: 320px;
    animation: bounceIn 1s forwards ease;
    label, input, .icon {
      color: #29b6f6!important;
    }
    .input-group__details {
      &:before {
        background-color: $color !important;
      }
    }
  }
</style>