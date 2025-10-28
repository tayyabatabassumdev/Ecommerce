import app from "./app";
import { connectDB } from "./config/db";
import { info } from "./utils/logger";
const PORT = process.env.PORT || 5000;
(async () => {
  await connectDB();
  app.listen(PORT, () => info(`Server running on port ${PORT}`));
})();
