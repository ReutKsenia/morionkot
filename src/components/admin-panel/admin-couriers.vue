<template>
  <div class="container-admin-couriers">
    <h1>Курьеры</h1>
        <v-container>
        <v-data-table :headers="headers" :items="ALL_COURIERS" class="elevation-1">
        <template v-slot:[`item.delete`]="{ item }">
              <v-icon @click="deleteCourier(item)">delete</v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import employeeService from "../../services/employeeService.js"

export default {
  name: "admin-couriers",
  props: {},
  data() {
    return {
      headers: [
        { text: "Имя менеджера", value: "name", sortable: false },
        { text: "Логин", value: "login", sortable: false },
        { text: "Удалить", value: "delete", sortable: false },
        
      ],
    };
  },
  computed: {
    ...mapGetters(["ALL_COURIERS"]),
  },
  methods: {
    ...mapActions(["GET_ALL_COURIERS_FROM_DB"]),

    deleteCourier(item) {
      employeeService.deleteCourier(item, this)
      .then(() => {
        this.GET_ALL_COURIERS_FROM_DB(this);
      })
    },
  },
  mounted() {
    this.GET_ALL_COURIERS_FROM_DB(this);
  },
};
</script>

<style lang="scss">
.container-admin-couriers {
  margin-bottom: 2%;
  h1 {
    margin-bottom: 4%;
  }
}
</style>