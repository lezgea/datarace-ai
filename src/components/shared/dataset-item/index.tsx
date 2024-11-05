import { IDataset } from "@api/types/dataset-types";
import { ArrowGreenIcon, BookmarkIcon, HeartIcon } from "@assets/icons";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";


type DatasetProps = IDataset;


const DatasetItem: React.FC<DatasetProps> = (props) => {
    let lng = useLocale();

    let { id, title, description, visibility, userDto, datasetFileDownloadDto } = props
    const imageUrl = props.imageUrl || "svg/noimg.svg";

    return (
        <Link href={`/${lng}/datasets/${id}`} className="h-md rounded-custom_md select-none cursor-pointer overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg group active:shadow-none">
            <div className="relative overflow-hidden">
                {
                    !!visibility && visibility === 'PRIVATE' &&
                    <div className="absolute z-10 flex justify-between items-center w-full p-4">
                        <div className={`inline-flex px-4 py-2 bg-black bg-opacity-70 backdrop-blur-xl flex-shrink-0 rounded-xl`}>
                            <p className={`text-sm text-white rounded-md font-regmed`}>{visibility}</p>
                        </div>
                    </div>
                }
                <Image
                    src={imageUrl}
                    height="300"
                    width="300"
                    className="w-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 h-[15rem] object-cover"
                    alt={title}
                    priority={true}
                />
            </div>
            <div className="flex flex-col p-8 space-y-5 text-start items-between">
                <div className="space-y-2">
                    <h3 className="text-xl font-medium text-customBlue-900 truncate-text mb-3">{title}</h3>
                    <div className="flex justify-between">
                        <p className="text-md text-gray-500 truncate-text">by <strong>{userDto?.fullName}</strong></p>
                        <p className="text-md text-gray-500 truncate-text font-light">{!!datasetFileDownloadDto?.length ? `${datasetFileDownloadDto?.length} File (CSV)` : ` `}</p>
                    </div>
                    <p className="text-md text-gray-500 truncate-text font-light">{description}</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex aitems-center justify-between">
                        <p className="text-md text-gray-500 truncate-text">Usability <strong>9.4</strong>, 1MB</p>
                    </div>
                    <div className="relative w-[35px] h-[35px] min-w-[35px] min-h-[35px] rounded-full overflow-hidden">
                        <Image
                            src={userDto?.userImageUrl || "/png/user.png"}
                            alt="Avatar"
                            fill={true}
                            className="object-cover"
                            priority={true}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default DatasetItem;
