export default defineNuxtConfig({
  devtools: { enabled: false },
  components: true,
  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  modules: ["@pinia/nuxt", "@vee-validate/nuxt", "@vueuse/nuxt", "@nuxt/image"],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "vee-form",
      Field: "vee-field",
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
