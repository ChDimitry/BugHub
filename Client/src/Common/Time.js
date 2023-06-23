// Get the time of today
const current = new Date();
const time =
  current.getHours() +
  ":" +
  (current.getMinutes() >= 10
    ? current.getMinutes()
    : "0" + current.getMinutes());

const date = current.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export { time, date };
