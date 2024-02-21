// schedule.scheduleJob(scheduling - type, callback);
export const slackbot = async () => {
  try {
    function createrandomtime(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomtime = createrandomtime(0, 5);

    const slackJob = schedule.scheduleJob(randomtime, 0, 0, 0, 0, 0, () => {
      console.log("schedule is executed");
    });
    const message = "테스트";
    await slackbot.chat.postMessage({
      channel: channel,
      text: message,
    });
  } catch (err) {
    console.log(err.message);
  }
};
