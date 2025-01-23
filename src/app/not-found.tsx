import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

const NotFound = () => {
    const lng = useLocale();
    const t = useTranslations();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - {t("pageNotFoundTitle")}</h1>
            <p className="text-lg text-gray-600 mb-6">
                {t("pageNotFoundDescription")}
            </p>
            <Link href={`/${lng}`} className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primaryDark">
                {t("returnToHome")}
            </Link>
        </div>
    );
};

export default NotFound;
