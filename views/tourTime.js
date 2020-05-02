export function convertToIslandTime(time, islandOffset) { 
  return new Date(time.getTime() + ((-localOffset() + +islandOffset) * 60 * 60 * 1000));
}

export function formatTourTime(timeStart, timeEnd, offset) {
  let timeStr = (time) => {
      return time.toLocaleTimeString([], {
        hour:"2-digit",
        minute:"2-digit"
      })
    }
    
  return `
    ${timeStart.toLocaleTimeString([], {
      month:"short",
      day:"2-digit",
      hour:"2-digit",
      minute:"2-digit",
    })}
    —
    ${timeEnd.toLocaleTimeString([], {
      hour:"2-digit",
      minute:"2-digit",
      timeZoneName: "short",
    })}
    ${
      offset != localOffset() ?
      `(Island time:
      ${timeStr(convertToIslandTime(timeStart, offset))}
      —
      ${timeStr(convertToIslandTime(timeEnd, offset))}
      )` : ''
    }
  `;
}

// Returns local timezone offset in GMT, i.e. central time: -5
export function localOffset() {
  return -(new Date().getTimezoneOffset()/60);
}