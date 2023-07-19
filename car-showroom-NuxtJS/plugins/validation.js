import { defineRule, configure } from "vee-validate";
import {
  required,
  min,
  max,
  url,
  email,
  regex,
  min_value as minVal,
  numeric,
} from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  defineRule("required", required);
  defineRule("min", min);
  defineRule("max", max);
  defineRule("url", url);
  defineRule("email", email);
  defineRule("regex", regex);
  defineRule("min_value", minVal);
  defineRule("age", numeric);

  defineRule("confirmed", (value, [target]) => {
    if (value === target) {
      return true;
    }
    return "Password does not match";
  });

  configure({
    generateMessage: (ctx) => {
      const messages = {
        required: `This  ${ctx.field} Field is Required`,
        min: `This ${ctx.field} Field is Too Short`,
        max: `This ${ctx.field} Field is Too Long`,
        url: `This ${ctx.field} Field is not Valid URL`,
        email: `This ${ctx.field} Field is not Valid Email`,
        regex: `This ${ctx.field} Field Must contain at least one numeric digit and a special character`,
        confirm: `Password does not Match `,
        min_value: `This ${ctx.field} Field Must be Greater than 1`,
        age: `This ${ctx.field} Field Must be Greater than 1`,
      };

      const message = messages[ctx.rule.name]
        ? messages[ctx.rule.name]
        : "Invalid Field";
      return message;
    },
  });
});
