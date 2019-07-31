import mongoose from "mongoose";
import logger from "./logger";

mongoose.Promise = global.Promise;
mongoose.set("debug", process.env.APP_MONGOOSE_DEBUG_MODE);

export default async () => {
  const { MONGOOSE_USERNAME, MONGOOSE_PASSWORD } = process.env;

  try {
    await mongoose.connect(`mongodb+srv://${MONGOOSE_USERNAME}:${MONGOOSE_PASSWORD}@sushil-test-cluster-nk2fa.mongodb.net/test?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    logger.info("Connected to mongo!!!");
  } catch (e) {
    logger.error("Could not connect to MongoDB", e);
    process.exit(1);
  }
}

