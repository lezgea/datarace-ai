import React from 'react';
import { Modal } from '../modal';
import { useTranslations } from 'next-intl';


interface IConfirmationModalProps {
    visible: boolean,
    onClose: () => void,
    onConfirm: () => void,
}

export const FooterTermsModal: React.FC<IConfirmationModalProps> = (props) => {
    let { visible, onConfirm, onClose } = props;

    return (
        <Modal
            visible={visible}
            content={
                <TermsModalContent
                    onConfirm={onConfirm}
                    onClose={onClose}
                />
            }
            onClose={onClose}
        />
    )
}

interface ITermsModalContent {
    onConfirm: () => void,
    onClose: () => void,
}

const TermsModalContent: React.FC<ITermsModalContent> = (props) => {
    let { onConfirm, onClose } = props;

    const t = useTranslations();

    return (
        <div className="flex flex-col items-center p-6 space-y-5 text-center max-w-[800px] max-h-[800px] pt-10 pb-[100px] px-10 overflow-auto">
            <h2 className="text-2xl mx-3">MƏXFİLİYIN TƏMİN EDİLMƏSİ</h2>
            <div className="w-full flex-column items-start text-start space-y-3 font-light">
                <p>
                    <strong className="font-medium">1.</strong> Məxfilik qaydası
                </p>
                <p>
                    <strong className="font-medium">1.1.</strong> Bu Məxfilik qaydası “Elektron hərrac Portalı”ndan (bundan sonra - Portal) “İstifadəyə
                    dair razılaşma”nın ayrılmaz tərkib hissəsidir.
                </p>
                <p>
                    <strong className="font-medium">1.2.</strong>   Bu   Məxfilik   qaydası   İstifadəçinin   şəxsi   məlumatlarının   alınması,   saxlanılması,
                    işlənilməsi, istifadəsi, açılması və müdafiəsi qaydasını müəyyən edir.
                </p>
                <p>
                    <strong className="font-medium">1.3.</strong> İstifadəçinin şəxsi məlumatları - İstifadəçinin Portaldan istifadə prosesində təqdim etdiyi
                    və Portaldan istifadə prosesində avtomatik olaraq ötürülən və ya avtomatik olaraq əldə
                    edilən informasiyaların məcmusudur;
                </p>
                <p>
                    <strong className="font-medium">1.4.</strong> İstifadəçilərin şəxsi məlumatları Portalın məlumat bazasında yerləşir və saxlanılır.
                </p>
                <p>
                    <strong className="font-medium">1.5.</strong> İstifadəçilərə aid şəxsi məlumatlar bazasının sərəncamçısı Portaldır.
                </p>
                <p>
                    <strong className="font-medium">1.6.</strong> İstifadəçi qeydiyyat zamanı, Portaldan istifadə prosesində, müvafiq məlumatları, o cümlədən şəxsi məlumatları verir. Məlumatların toplanması Portalın İstifadəçiləri arasında sorğularının keçirilməsi, qanunvericilklə nəzərdə tutulan digər hallarda da həyata keçirilə bilər.
                </p>
                <p>
                    <strong className="font-medium">1.7.</strong> İstifadəçi Portala şəxsi məlumatlarını və istənilən başqa məlumatları könüllü olaraq verir (yerləşdirir). Həmin məlumatların Portal tərəfindən başqa İstifadəçilərə və (və ya) üçüncü şəxslərə ötürülməsi yalnız istifadəçinin razılığı ilə və ya qanunla nəzərdə tutulan hallarda ola bilər.
                </p>
                <p>
                    <strong className="font-medium">1.8.</strong> Şəxsi məlumatların işlənməsi həmin məlumatlarala bağlı istənilən hərəkətlərdən (onların toplanması, qeydiyyatı, saxlanması, uyğunlaşdırılması, dəyişdirilməsi, yenilənməsi, istifadəsi və yayılması, ləğv edilməsi) ibarətdir.
                </p>
                <p>
                    <strong className="font-medium">1.9.</strong> Portalın topladığı şəxsi məlumatlar habelə bu məlumatların işlənməsi hərracla bağlı həyata keçirilən fəaliyyət və istifadəçilərə göstərdiyi xidmətlərlə bağlıdır.
                </p>
                <p>
                    <strong className="font-medium">1.10.</strong> Portaldan istifadə prosesində İstifadəçilər tərəfindən verilmiş məlumatlar və şəxsi məlumatlar satılmır, istifadəyə və icarəyə verilmir.
                </p>
                <p>
                    <strong className="font-medium">1.11.</strong> İstifadəçi Portaldan istifadə prosesində verdiyi şəxsi və başqa məlumatları istənilən vaxt qismən dəyişdirmək, silmək və ya ona başqa üsulla düzəliş etmək imkanına malikdir.
                </p>
                <p>
                    <strong className="font-medium">1.12.</strong> İstifadəçi Portala verdiyi (daxil etdiyi) istənilən məlumatların dəqiqliyi və düzgünlüyü üçün məsuliyyət daşıyır.
                </p>
                <p>
                    <strong className="font-medium">1.13.</strong> Portal, istifadəçinin şəxsi məlumatlarının üçüncü şəxslərin icazəsiz girişindən müdafiəsi üçün bütün səmərəli tədbirləri görür.
                </p>
                <p>
                    <strong className="font-medium">1.14.</strong> Portal tərəfindən toplanmış və işlənmiş bütün şəxsi məlumatlar bir və ya bir neçə qorunan şəbəkədən kənarda giriş olmayan serverdə saxlanılır. Portal istifadəçilərin şəxsi və başqa məlumatlarına giriş və onlardan istifadə səlahiyyəti olan bütün əməkdaşları bu məlumatların üçüncü şəxslərə yayılmaması haqqında razılaşma imzalamışlar.
                </p>
                <p>
                    <strong className="font-medium">1.15.</strong> Portalın istifadəçisi şəxsi məlumatlarının Portaldan silinməsinə dair ərizə göndərə bilər. Belə bir ərizə olduqda, həmin İstifadəçi haqqında toplanan bütün şəxsi məlumatlar silinəcək.
                </p>
                <p className="text-red">
                    <strong className="font-medium">1.16.</strong> Portal informasiyanın saxlanılması üçün cookies fayllarından, veb-mayaklardan və başqa oxşar texnologiyalardan istifadə edə bilər. Bu fayllar veb-saytın və onun əlavələrinin istifadəsini yüngülləşdirmək məqsədi ilə, Portalın xidmətlərinin keyfiyyətinin artırılması məqsədi ilə (həmçinin təhlükəsizlik), həmçinin reklam məqsədi ilə istifadə olunur.
                </p>
                <p>
                    <strong className="font-medium">1.17.</strong> Portalda olan texniki xarakterli informasiya, məsələn, ip-ünvanlar, Servis tərəfindən şəbəkə avadanlığının xidməti üçün, həmçinin statistik və başqa informasiyanın ümumiləşdirilməsi üçün istifadə olunur.
                </p>
                <p>
                    <strong className="font-medium">1.18.</strong> Portala göstərilən xidmətlərin istifadəçinin fərdi ehtiyaclarına və maraqlarına uyğun olmaqla yüksək keyfiyyətini təmin etmək məqsədi ilə Portal istifadəçinin sistemə son girişinin məlumatlarını saxlayır.
                </p>
                <p>
                    <strong className="font-medium">2.</strong> Məxfilik qaydasına dəyişikliklərin daxil etməsi
                </p>
                <p>
                    <strong className="font-medium">2.1.</strong> Portal Məxfilik qaydasına dəyişikliklər edə və onları yeniləyə bilər.
                </p>
                <p>
                    <strong className="font-medium">2.2.</strong> Əgər İstifadəçi daxil edilmiş dəyişikliklərlə razı deyilsə, o Portaldan istifadəni dayandıra bilər. Əgər İstifadəçi Portaldan istifadə etməyə davam edirsə, o, dəyişiklilərlə razılaşmış sayılır və bütün dəyişiklikləri və Məxfilik qaydasının yeni redaksiyasını bütövlükdə qəbul etmiş hesab edilir.
                </p>
            </div>
        </div>
    )
}
