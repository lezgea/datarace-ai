import { useTranslations } from "next-intl";

export function timeAgo(unixTimestamp: number): string {
    const t = useTranslations();
    const now = new Date().getTime(); // Current time in milliseconds
    const date = new Date((unixTimestamp - 14400) * 1000).getTime(); // Convert Unix timestamp to milliseconds
    const secondsAgo = Math.floor((now - date) / 1000);

    if (secondsAgo < 60) {
        return t('justNow');
    }

    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const weeksAgo = Math.floor(daysAgo / 7);
    const monthsAgo = Math.floor(daysAgo / 30);
    const yearsAgo = Math.floor(daysAgo / 365);

    if (secondsAgo < 60) {
        return secondsAgo === 1 ? `1 ${t('secondAgo')}` : `${secondsAgo} ${t('secondsAgo')}`;
    } else if (minutesAgo < 60) {
        return minutesAgo === 1 ? `1 ${t('minuteAgo')}` : `${minutesAgo} ${t('minutesAgo')}`;
    } else if (hoursAgo < 24) {
        return hoursAgo === 1 ? `1 ${t('hourAgo')}` : `${hoursAgo} ${t('hoursAgo')}`;
    } else if (daysAgo < 7) {
        return daysAgo === 1 ? `1 ${t('dayAgo')}` : `${daysAgo} ${t('daysAgo')}`;
    } else if (weeksAgo < 4) {
        return weeksAgo === 1 ? `1 ${t('weekAgo')}` : `${weeksAgo} ${t('weeksAgo')}`;
    } else if (monthsAgo < 12) {
        return monthsAgo === 1 ? `1 ${t('monthAgo')}` : `${monthsAgo} ${t('monthsAgo')}`;
    } else {
        return yearsAgo === 1 ? `1 ${t('yearAgo')}` : `${yearsAgo} ${t('yearsAgo')}`;
    }
}