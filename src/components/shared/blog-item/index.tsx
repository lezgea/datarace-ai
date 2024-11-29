import { IDataset } from "@api/types/dataset-types";
import { RootState } from "@store/store";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";


interface BlogItemProps {
    id: string | number,
    image: string | null,
    title: string,
    date: string,
    // onClick?: (e: any) => void,
};


const BlogItem: React.FC<BlogItemProps> = (props) => {
    let lng = useLocale();
    let t = useTranslations();

    let { id, image, title, date } = props

    const imageUrl = image || "/svg/noimg.svg";


    return (
        <Link href={`/${lng}/blog/${id}`} className="h-md rounded-custom_md select-none cursor-pointer overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg group active:shadow-none bg-white">
            <div className="relative overflow-hidden">
                <Image
                    src={imageUrl}
                    height="300"
                    width="300"
                    className="w-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 h-[15rem] object-cover"
                    alt={title}
                    priority={true}
                />
            </div>
            <div className="flex flex-col px-7 py-6 space-y-2 text-start items-between">
                <div className="mb-3 space-y-2">
                    <h3 className="text-xl font-medium text-customBlue-900 truncate-text">{title}</h3>
                    <p className="text-md text-gray-500 truncate-text description-font">{date}</p>
                </div>
                <div className="flex justify-between items-center">
                    <Link href={`/${lng}/blog`} className="inline-flex w-auto text-center font-regmed items-center bg-gray-100 px-6 py-3 text-gray-900 transition-all rounded-xl sm:w-auto hover:bg-primaryDark hover:text-white hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none">
                        {t('seeMore')}
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>
            </div>
        </Link>
    );
};

export default BlogItem;
