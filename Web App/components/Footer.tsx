import { legalLinks, socialMediaLinks } from '@/utils/constants';
import React from 'react';

const Footer = () => {
    return (
        <section 
            className="h-fit bg-[#9A43B1] relative overflow-hidden py-10 px-4 md:px-20"
            id="intro"
        >
            <div className="flex flex-col md:flex-row gap-10 justify-start">
                <div className="bg-white p-6 md:p-10 font-spaceGrotesk font-semibold w-full md:w-fit h-fit rounded-xl">
                    <div className="text-xl text-[#9A43B1] uppercase mb-5 border-b border-dashed border-[#9A43B1]">
                        Follow
                    </div>
                    <ul className="list-none flex flex-col gap-2 text-black text-sm">
                        {socialMediaLinks.map((item, index) => (
                            <li key={index} className="hover:underline">
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    {item.platform}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="bg-white p-6 md:p-10 font-spaceGrotesk font-semibold w-full md:w-fit h-fit rounded-xl">
                    <div className="text-xl text-[#9A43B1] uppercase mb-5 border-b border-dashed border-[#9A43B1]">
                        Legal
                    </div>
                    <ul className="list-none flex flex-col gap-2 text-black text-sm">
                        {legalLinks.map((item, index) => (
                            <li key={index} className="hover:underline cursor-pointer">
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    {item.platform}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <div className="text-white font-spaceGrotesk my-10 text-center md:text-left text-lg">
                Copyright @ House of Geeks, 2024
            </div>
            
            <div className="absolute bottom-0 right-0 max-md:hidden">
                <img
                    src="/assets/images/hg_logo.png"
                    className="object-contain h-64 lg:h-96 mx-10 mb-10"
                    alt="hg_logo.png"
                />
            </div>
        </section>
    );
};

export default Footer;