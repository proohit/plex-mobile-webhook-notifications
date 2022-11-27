import push from "pushsafer-notifications";
import logger from "./logger.js";

export async function pushNotification(event) {
  const pushsaferApiKey = process.env.PUSHSAFER_API_KEY;
  if (pushsaferApiKey) {
    const pushsaferRes = await pushPushsaferNotification(
      pushsaferApiKey,
      event
    );
    logger.info(`Pushsafer notification sent: ${pushsaferRes}`);
  }
}

export function pushPushsaferNotification(pushsaferApiKey, event) {
  return new Promise((resolve, reject) => {
    const p = new push({ k: pushsaferApiKey });
    p.send(
      {
        m: getNotificationMessageBody(event),
        t: "New media added to library",
      },
      (_, err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
}

function getNotificationMessageBody(event) {
  if (event.Metadata.type === "episode") {
    return `${event.Metadata.title} episode ${event.Metadata.index} of ${event.Metadata.parentTitle} was added to the library.`;
  }
  return `${event.Metadata.title} was added to the library.`;
}
