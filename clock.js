export function updateClockMinutes(form) {
  let prev = parseInt(form.elements["timeIslandMinute"].value);
  let next = new Date().getMinutes();
  
  if (prev != next) {
    form.elements["timeIslandMinute"].value = next.toString().length == 1 ? '0' + next : next;
    if (next == 0) {
      let hr = parseInt(form.elements["timeIslandHour"].value);
      if (hr == 12) {
        form.elements["timeIslandHour"].value = 1;
        // Flip AM<>PM
        form.elements["timeIslandAMPM"].selectedIndex =
          (form.elements["timeIslandAMPM"].selectedIndex + 1) % 2;
      } else {
        form.elements["timeIslandHour"].value = hr + 1;
      }
    }
  }
}
export function updateClock(form) {
  form.elements["timeIslandHour"].value = new Date().getHours() % 12;
  updateClockMinutes(form);
  form.elements["timeIslandAMPM"].value = (new Date().getHours() / 12) < 1
    ? "AM"
    : "PM";
}