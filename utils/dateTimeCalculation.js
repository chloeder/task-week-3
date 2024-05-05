function calculateDuration(startDate, endDate) {
  const timeDiff = Date.parse(endDate) - Date.parse(startDate);
  const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  const diffMonths = Math.floor(diffDays / 30.4167);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffYears > 0) {
    duration = `${diffYears} Years`;
  } else if (diffMonths > 0) {
    duration = `${diffMonths} Months`;
  } else {
    duration = `${diffDays} Days`;
  }

  return duration;
}

function dateFormat(date) {
  const newDate = new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return newDate;
}

function diffForHumans(date) {
  const timeDiff = Math.round((new Date() - date) / 1000);

  const minute = 60,
    hour = minute * 60,
    day = hour * 24,
    month = day * 30.4167,
    year = month * 12;

  if (timeDiff < 30) {
    return `${timeDiff} seconds ago`;
  } else if (timeDiff < minute) {
    return `${Math.floor(timeDiff / 60)} minutes ago`;
  } else if (timeDiff < hour) {
    return `${Math.floor(timeDiff / hour)} hours ago`;
  } else if (timeDiff < day) {
    return `${Math.floor(timeDiff / day)} days ago`;
  } else if (timeDiff < month) {
    return `${Math.floor(timeDiff / month)} months ago`;
  } else {
    return `${Math.floor(timeDiff / year)} years ago`;
  }
}

module.exports = { diffForHumans, calculateDuration, dateFormat };
