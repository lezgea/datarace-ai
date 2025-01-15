// app/not-found.tsx
import { useLocale } from "next-intl";
import { redirect } from "next/navigation";

const NotFoundPage = () => {
    const lng = useLocale();

    // Redirect immediately to the main page
    redirect(`/${lng}`);
};

export default NotFoundPage;
