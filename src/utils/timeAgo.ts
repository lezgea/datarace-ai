export function timeAgo(unixTimestamp: number): string {
    const now = new Date().getTime(); // Current time in milliseconds
    const date = new Date(unixTimestamp * 1000).getTime(); // Convert Unix timestamp to milliseconds
    const secondsAgo = Math.floor((now - date) / 1000);

    if (secondsAgo < 0) {
        return 'Just now';
    }

    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const weeksAgo = Math.floor(daysAgo / 7);
    const monthsAgo = Math.floor(daysAgo / 30);
    const yearsAgo = Math.floor(daysAgo / 365);

    if (secondsAgo < 60) {
        return secondsAgo === 1 ? '1 second ago' : `${secondsAgo} seconds ago`;
    } else if (minutesAgo < 60) {
        return minutesAgo === 1 ? '1 min ago' : `${minutesAgo} min ago`;
    } else if (hoursAgo < 24) {
        return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`;
    } else if (daysAgo < 7) {
        return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
    } else if (weeksAgo < 4) {
        return weeksAgo === 1 ? '1 week ago' : `${weeksAgo} weeks ago`;
    } else if (monthsAgo < 12) {
        return monthsAgo === 1 ? '1 month ago' : `${monthsAgo} months ago`;
    } else {
        return yearsAgo === 1 ? '1 year ago' : `${yearsAgo} years ago`;
    }
}