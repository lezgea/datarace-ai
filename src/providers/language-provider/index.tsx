"use client";

import { Loader } from '@components/shared';
import { useTranslation } from 'app/i18n';
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

interface LanguageContextProps {
    lng: string;
    t: (key: string) => string; // Translation function
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

export const LanguageProvider = ({
    lng,
    children,
}: {
    lng: string;
    children: ReactNode;
}) => {
    const [t, setT] = useState<(key: string) => string>(() => (key: string) => key); // Default translation function
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const { t: translationFunc } = await useTranslation(lng); // Load translations
                setT(() => translationFunc); // Set the translation function in state
                setLoading(false); // Indicate that loading is complete
            } catch (err) {
                setError('Failed to load translations'); // Handle any errors
                setLoading(false);
            }
        };
        loadTranslations();
    }, [lng]);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <LanguageContext.Provider value={{ lng, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
