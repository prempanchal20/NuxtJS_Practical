// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,

  modules: ["@pinia/nuxt", "@vee-validate/nuxt","@vueuse/nuxt"],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "vee-form",
      Field: "vee-field",
    },
  },
});
