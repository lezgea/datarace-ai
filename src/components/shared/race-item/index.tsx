import Image from "next/image";

interface RacesItemProps {
    title: string;
    description: string;
    img: string;
    price: string,
    expiry_date: string | number,
};

export const RaceItem: React.FC<RacesItemProps> = (props) => {
    let { title, description, img, expiry_date, price } = props

    return (
        <div className="h-md rounded-custom_md cursor-pointer overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg group">
            <div className="overflow-hidden">
                <Image
                    src={img}
                    alt="Feature 1"
                    height="300"
                    width="300"
                    className="w-full transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                />
            </div>
            <div className='column p-6 space-y-3'>
                <h4 className="text-md font-medium text-customBlue-900">{title}</h4>
                <p className="text-sm text-customBlue-900">{description}</p>
                <div className='flex justify-between pt-5'>
                    <p className="text-[22px] font-medium text-customBlue-900">{price}</p>
                    <p className="bg-customBlue-500 text-sm content-center px-4 rounded-xl text-white">{expiry_date}</p>
                </div>
            </div>
        </div>
    )
};