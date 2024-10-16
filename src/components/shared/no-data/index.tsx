import { NoDataSvg } from "@assets/icons"


export const NoData = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-[50vh] gap-10">
            <NoDataSvg className="h-40 w-[300px]" />
            <p className="text-gray-400 ">No Data Found</p>
        </div>
    )
}