module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/styles.sass"`
      },
      scss: {
        prependData: `@import "@/assets/styles/styles.scss";`
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}