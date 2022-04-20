<template>
  <div class="current">
     <div class="user-forgot-password">
     <v-form>
         <div>Чтобы восстановить пароль, введите электронную почту, которую вы указывали при регистрации. 
             На этот адрес электронной почты Вам будет выслано письмо со ссылкой на восстановления пароля.</div>
        <v-text-field
          label="email"
          v-model="email"
          prepend-icon="account_box"
          :rules="rules.email"
          required
          color="deep-purple"
        >
        </v-text-field>

        <v-btn
          block
          style="background-color: #524b98; color: white"
          :disabled="isAddButtonDisabled"
          @click.native="sendEmail()"
          >Отправить</v-btn
        >
        
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
import userService from '../../services/userService.js'

export default {
  name: "forgot-password",
  props: {},
  data() {
    return {
        snackbar: false,
        timeout: 6000,
        message: '',
        email: '',
        rules: {
        email: [
          (v) =>
            (v || "").match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) || "email некорректный",
        ],
        }
    };
  },
  computed: {
      isAddButtonDisabled() {
      if (!this.email) return true;
      else return false;
    },

  },
  methods: {
      sendEmail(){
          userService.forgotPassword(this, this.email);
      }
  },
  mounted() {
  },
};
</script>

<style lang="scss">
.user-forgot-password {
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
</style>