export function getFormattedTimeAgo(date) {
  const past = new Date(date);
  const now = new Date();

  if(date===""||date=== null)
    return 'NA'

  // Difference in seconds
  let seconds = Math.floor((now - past) / 1000);

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);

  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  // Under 7 days -> display days
  if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  // Weeks and leftover days
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;

  // Under 1 month (~30 days) -> display weeks + remaining days
  if (days < 30) {
    if (remainingDays === 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    }
    return `${weeks} week${weeks > 1 ? "s" : ""} ${remainingDays} day${remainingDays > 1 ? "s" : ""} ago`;
  }

  // Months and years
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}