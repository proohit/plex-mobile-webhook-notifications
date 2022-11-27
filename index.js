import Koa from "koa";
import Router from "koa-router";
import body from "koa-body";

import "dotenv/config";
import { pushNotification } from "./notification-service.js";
import logger from "./logger.js";

const app = new Koa();
const router = new Router();

router.use(body({ multipart: true }));

router.post("/push-notification", handleWebhook);

function handleWebhook(ctx) {
  logger.info(`Received event: ${ctx.request.body.payload}`);
  const event = JSON.parse(ctx.request.body.payload);
  if (event.event === "library.new") {
    pushNotification(event);
  }
}

app.use(router.routes());

app.listen(process.env.PORT || 3000);
logger.info(`Listening on port ${process.env.PORT || 3000}`);
