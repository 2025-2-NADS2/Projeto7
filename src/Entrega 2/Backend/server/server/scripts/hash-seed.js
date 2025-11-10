const bcrypt = require("bcryptjs");

(async () => {
  const admin = await bcrypt.hash("admin123", 10);
  const doador = await bcrypt.hash("doador123", 10);
  console.log({ admin, doador });
})();
