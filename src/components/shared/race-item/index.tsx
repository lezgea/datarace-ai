import { ArrowGreenIcon, BookmarkIcon } from "@assets/icons";
import Image from "next/image";
import Link from "next/link";


interface IRacesItemProps {
    id: number | string,
    name: string,
    text: string,
    imageUrl?: string | null,
    awardAmount: number | string,
    lifeTimeDays: number | string,
};

const RaceItem: React.FC<IRacesItemProps> = (props) => {
    let { id, name, text, imageUrl, lifeTimeDays, awardAmount } = props

    return (
        <Link href={`/races/${id}`} className="h-md rounded-custom_md select-none cursor-pointer overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg group active:shadow-none">
            <div className="relative overflow-hidden">
                <div className="absolute z-10 flex justify-between items-center w-full p-4">
                    <div className="inline-flex px-4 py-2 bg-white bg-opacity-50 backdrop-blur-xl flex-shrink-0 rounded-full">
                        <p className="text-sm font-regmed">Ends in {lifeTimeDays} days</p>
                    </div>
                    <div className="inline-flex bg-white bg-opacity-50 backdrop-blur-xl p-2 flex-shrink-0 rounded-full">
                        <BookmarkIcon />
                    </div>
                </div>

                <Image
                    src={imageUrl || "svg/noimg.svg"}
                    height="300"
                    width="300"
                    className="w-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 h-[15rem] object-cover"
                    alt={name}
                    priority={true}
                />
            </div>
            <div className="flex flex-col p-8 space-y-3 text-start items-between">
                <div className="h-20">
                    <h3 className="text-xl font-medium text-customBlue-900">{name}</h3>
                    <p className="text-md text-gray-500 truncate-text">{text}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[1.5rem] text-customBlue-900">$ {awardAmount}</p>
                    <div className="w-[4rem] h-[4rem] rounded-full border border-gray-300 flex items-center justify-center transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:border-primaryLight group-active:scale-100">
                        <ArrowGreenIcon />
                    </div>
                    {/* <p className="bg-customBlue-500 text-sm content-center px-4 rounded-xl text-white">{expiry_date}</p> */}
                </div>
            </div>
        </Link>

    )
};

export default RaceItem;