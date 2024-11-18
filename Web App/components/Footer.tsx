const socialMediaLinks = [
  {
    platform: "GitHub",
    link: "https://github.com/houseofgeeks",
  },
  {
    platform: "LinkedIn",
    link: "https://www.linkedin.com/company/houseofgeeks",
  },
  {
    platform: "X(Twitter)",
    link: "https://twitter.com/houseofgeeks",
  },
  {
    platform: "Instagram",
    link: "https://instagram.com/houseofgeeks",
  },
  {
    platform: "Facebook",
    link: "https://facebook.com/houseofgeeks",
  },
];

const legalLinks = [
  {
    platform: "Terms",
    link: "https://github.com/houseofgeeks",
  },
  {
    platform: "Policy",
    link: "https://www.linkedin.com/company/houseofgeeks",
  },
  {
    platform: "Community",
    link: "https://twitter.com/houseofgeeks",
  },
  {
    platform: "Guidelines",
    link: "https://instagram.com/houseofgeeks",
  },
];

const Footer = () => {
  return (
    <section
      className="h-fit min-h-[26rem] bg-[#9A43B1] relative overflow-hidden"
      id="intro"
    >
      <div className="flex m-20 gap-10">
        <div className="bg-white p-10 font-spaceGrotesk font-semibold w-fit h-fit rounded-xl ">
          <div className="text-xl text-[#9A43B1] uppercase mb-5 border-b border-dashed border-[#9A43B1]">
            Follow
          </div>
          <ul className="list-none flex flex-col gap-2 text-black text-sm">
            {socialMediaLinks.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.link}>{item.platform}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="bg-white p-10 font-spaceGrotesk font-semibold w-fit h-fit rounded-xl">
          <div className="text-xl text-[#9A43B1] uppercase mb-5 border-b border-dashed border-[#9A43B1]">
            Legal
          </div>
          <ul className="list-none flex flex-col gap-2 text-black text-sm">
            {legalLinks.map((item, index) => {
              return (
                <li key={index} className="hover:underline cursor-pointer">
                  <a href={item.link}>{item.platform}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="text-white font-spaceGrotesk my-10 mx-20 text-lg">
        Copyright @ House of Geeks, 2024
      </div>
      <div className="absolute bottom-0 right-0 max-md:hidden">
        <img
          src="/assets/images/hg_logo.png"
          className="object-contain h-96 mx-20 mb-10"
          alt="hg_logo.png"
        />
      </div>
    </section>
  );
};

export default Footer;
