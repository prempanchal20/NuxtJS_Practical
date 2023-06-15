export default defineNuxtConfig({
  devtools: { enabled: false },
  components: true,

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
