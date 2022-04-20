<template>
  <div class="current">
     <div class="user-forgot-password">
     <v-form>
         <div>Введите новый пароль</div>
        <v-text-field
          label="Новый пароль"
          v-model="newPassword"
          prepend-icon="lock"
          :rules="rules.newPassword"
          required
          color="deep-purple"
        >
        </v-text-field>

        <v-btn
          block
          style="background-color: #524b98; color: white"
          :disabled="isAddButtonDisabled"
          @click.native="sendNewPassword()"
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
  name: "reset-password",
  props: ['token'],
  data() {
    return {
        snackbar: false,
        timeout: 6000,
        message: '',
        newPassword: '',
        rules: {
        newPassword: [
          (v) =>
            (v || "").match(/.{5,}/) ||
            "Пароль должен содержать минимум 5 символов",
        ],
        }
    };
  },
  computed: {
      isAddButtonDisabled() {
      if (!this.newPassword) return true;
      else return false;
    },

  },
  methods: {
      sendNewPassword(){
          userService.resetPassword(this, this.newPassword, this.token);
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