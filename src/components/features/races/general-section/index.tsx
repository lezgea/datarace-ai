import React from 'react';


export const GeneralSection: React.FC = () => {
    return (
        <>
            {/* Description */}
            <div className="space-y-4" >
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="text-gray-700">
                    Arcu dictumst ac imperdiet egestas scelerisque dui vitae turpis purus. Dui dui vel ultricies augue consectetur dignissim lectus senectus at. Placerat nulla pretium commodo lobortis nunc. Aliquam etiam pretium dictum mi arcu et a bibendum magna. Nec ac sed donec egestas nunc. Nisl vel lectus velit eu ac. Vestibulum justo faucibus arcu sodales cras placerat sagittis. Eros ut justo ullamcorper risus. Lectus feugiat ipsum neque viverra eget bibendum. Nisl et ipsum aenean pellentesque. Nunc quam urna mauris scelerisque malesuada aenean.
                    Turpis sed pretium sit magna. Nulla feugiat est nisl purus eros. Sagittis tempor accumsan id vitae ut. Facilisis tortor sed lacus est gravida                                </p>
                {/* Additional paragraphs can be added similarly */}
            </div >

            {/* Accordion (Evaluation, FAQ, Citation) */}
            <div className="mt-8 space-y-4" >
                <div>
                    <button className="w-full flex justify-between items-center text-lg text-left font-semibold">
                        Evaluation <span>+</span>
                    </button>
                </div>
                <div>
                    <button className="w-full flex justify-between items-center text-lg text-left font-semibold">
                        FAQ <span>+</span>
                    </button>
                </div>
                <div>
                    <button className="w-full flex justify-between items-center text-lg text-left font-semibold">
                        Citation <span>+</span>
                    </button>
                </div>
            </div>
        </>
    )
}