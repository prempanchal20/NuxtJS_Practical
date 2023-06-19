import { createI18n } from "vue-i18n";
import en from "../locals/en.json";
import hi from "../locals/hi.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "en",
    messages: {
      en,
      hi,
    },
  });
  vueApp.use(i18n);
});
