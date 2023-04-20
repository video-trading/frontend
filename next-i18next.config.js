const path = require("path");
module.exports = {
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["en", "zh-Hans", "zh-Hant"],
    localePath: path.resolve("./public/locales"),
  },
};
