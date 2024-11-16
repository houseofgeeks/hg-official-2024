"use client";

import AnimatingText from "@/components/AnimatingText";
import EventsCarousel from "@/components/EventsCarousel";
import Navbar from "@/components/Navbar";
import PageNav from "@/components/PageNav";
import Wing from "@/components/Wing";
import { li } from "framer-motion/client";

const wings = [
  {
    title: "Software Development",
    description:
      "The Software Dev Wing: fueled by caffeine, fixing bugs, breaking code (for science), and turning all-nighters into digital magic!",
    cornerPosition1: "corner-top-left",
    cornerPosition2: "corner-bottom-right",
  },
  {
    title: "Competitive Programming",
    description:
      "The Competitive Programming Wing: problem-solving machines, thriving on algorithmic challenges and optimized solutions!",
    cornerPosition1: "corner-top-right",
    cornerPosition2: "corner-bottom-right",
  },
  {
    title: "AI / Machine Learning",
    description:
      "The AI Wing: unleashing the power of data and making predictions that matter!",
    cornerPosition1: "corner-top-left",
    cornerPosition2: "corner-bottom-left",
  },
  {
    title: "Robotics and IoT",
    description:
      "The Robotics Wing: building machines to do our bidding, one servo motor at a time!",
    cornerPosition1: "corner-top-left",
    cornerPosition2: "corner-bottom-right",
  },
  {
    title: "Spark (Electronics)",
    description:
      "The Spark Wing: lighting up circuits, from breadboards to PCB prototypes, powering the world one circuit at a time!",
    cornerPosition1: "corner-top-right",
    cornerPosition2: "corner-bottom-left",
  },
  {
    title: "Cybersecurity",
    description:
      "The Cybersecurity Wing: defending systems, securing networks, and locking down data!",
    cornerPosition1: "corner-top-right",
    cornerPosition2: "corner-bottom-right",
  },
  {
    title: "Arcanum (UI/UX and Game Dev)",
    description:
      "The Arcanum Wing: crafting immersive experiences, from intuitive UIs to engaging game worlds!",
    cornerPosition1: "corner-bottom-left",
    cornerPosition2: "corner-top-right",
  },
];

const testimonials = [
  {
    name: "Agnish Bhattacharya",
    text: "House of Geeks has been an incredible platform for learning and growth. The hackathons and workshops provide a great opportunity to enhance coding skills and collaborate with like-minded peers.",
    image: "/assets/images/profile_image.png",
  },
  {
    name: "Devansh Khandelwal",
    text: "The events organized by House of Geeks are top-notch. They are well-structured and provide a fantastic environment for innovation and problem-solving. A great club for tech enthusiasts!",
    image: "/assets/images/profile_image.png",
  },
  {
    name: "Utkarsh Pratap",
    text: "Being a part of House of Geeks has been a rewarding experience. The club's focus on skill development and fostering creativity through workshops is truly commendable.",
    image: "/assets/images/profile_image.png",
  },
];

const alumnis = [
  {
    name: "Agnish Bhattacharya",
    image: "/assets/images/profile_image.png",
    jobTitle: "Software Engineer at Google",
    linkedin: "https://www.linkedin.com/in/agnish-bhattacharya",
  },
  {
    name: "Devansh Khandelwal",
    image: "/assets/images/profile_image.png",
    jobTitle: "Data Scientist at Microsoft",
    linkedin: "https://www.linkedin.com/in/devansh-khandelwal",
  },
  {
    name: "Utkarsh Pratap",
    image: "/assets/images/profile_image.png",
    jobTitle: "Full-Stack Developer at Amazon",
    linkedin: "https://www.linkedin.com/in/utkarsh-pratap",
  },
];

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

export default function Home() {
  return (
    <>
      <section
        className="h-fit bg-[#9A43B1] relative overflow-hidden"
        id="intro"
      >
        <Navbar />
        <PageNav
          navItems={["INTRO", "WINGS", "CONNECT", "EVENTS", "TESTIMONIALS"]}
        />
        <div className="m-24 max-md:mx-10 p-10 flex flex-col gap-10">
          <div>
            <AnimatingText
              lines={["House of", "Geeks"]}
              bgColor="white"
              textColor="black"
              cursorColor="[#47a13d]"
            />
          </div>
          <div className="text-xl max-md:w-[90%] max-md:text-sm font-spaceGrotesk font-semibold text-white w-[38%]">
            House of Geeks is IIIT Ranchi's coding club, hosting hackathons and
            workshops to build skills and foster innovation among tech
            enthusiasts.
          </div>
        </div>
        <div className="absolute w-[60%] top-0 right-0 max-md:hidden">
          <img
            src="/assets/images/binary_bg.png"
            className="w-full h-[60vh] opacity-50"
          />
        </div>
      </section>
      <img src="/assets/images/separator1.png" className="w-full" />
      <section className="h-fit bg-white" id="wings">
        <div className="m-24 p-10 text-[#9A43B1]">
          <AnimatingText
            lines={["Let's take a look at our wings"]}
            bgColor="none"
            textColor="[#9A43B1]"
            cursorColor="black"
          />
        </div>
        <div className="m-20 flex flex-wrap gap-20 justify-around">
          {wings.map((wing) => (
            <Wing
              key={wing.title}
              title={wing.title}
              description={wing.description}
              cornerPosition1={wing.cornerPosition1}
              cornerPosition2={wing.cornerPosition2}
            />
          ))}
        </div>
      </section>
      <img src="/assets/images/separator2.png" className="w-full" />
      <section className="w-full h-fit bg-black flex gap-20 pb-40" id="connect">
        <div className="m-24 mt-0 p-10 relative top-40 h-fit">
          <AnimatingText
            lines={["Connect with", "us for updates"]}
            textColor="black"
            bgColor="white"
            cursorColor="[#9A43B1]"
          />
          <div className="text-xl font-spaceGrotesk font-semibold text-white max-w-[600px] mt-10">
            Join IIIT Ranchi’s House of Geeks! Sign up to connect with tech
            enthusiasts, work on exciting projects, and access exclusive events
            and workshops. Let’s innovate together!
          </div>
        </div>
        <div className="w-[30%] relative top-48 h-fit">
          <div className="relative min-w-full text-center inline-block p-10 text-lg font-semibold text-white bg-[#9A43B1] font-spaceGrotesk corner-all">
            <div>
              Connect with IIIT Ranchi’s House of Geeks! Let’s innovate and
              build the future of technology together—follow us on LinkedIn!
            </div>
            <button className="bg-white text-black rounded-full py-3 px-5 mt-5 text-base uppercase font-spaceGrotesk">
              Connect on LinkedIn
            </button>
          </div>
        </div>
      </section>
      <img src="/assets/images/separator3.png" className="w-full" />
      <section className="h-fit bg-white" id="events">
        <div className="mx-20 mb-10 mt-0 p-10 text-white">
          <AnimatingText
            lines={["Logs from our event lifecycle"]}
            bgColor="none"
            textColor="[#9A43B1]"
            cursorColor="black"
          />
        </div>
        <div>
          <EventsCarousel />
        </div>
      </section>
      <img src="/assets/images/separator4.png" className="w-full" />
      <section className="bg-black h-fit pb-10" id="testimonials">
        <div className="mx-20 mt-0 p-10 text-white">
          <AnimatingText
            lines={["Testimonials"]}
            textColor="black"
            bgColor="white"
            cursorColor="[#9A43B1]"
          />
        </div>
        <div className="flex gap-20 m-20 justify-between">
          {testimonials.map((item, index) => {
            return (
              <div
                key={index}
                className="h-fit pb-5 font-spaceGrotesk font-semibold text-sm bg-[#9A43B1] text-black"
              >
                <div className="flex items-center gap-5 justify-center w-full relative -top-[4rem]">
                  <img
                    src="/assets/icons/double_quotes.png"
                    className="h-20 w-20 transform rotate-180"
                  />
                  <img src={item.image} className="h-32 w-32" />
                  <img
                    src="/assets/icons/double_quotes.png"
                    className="h-20 w-20"
                  />
                </div>
                <div className="relative -top-[2rem] px-10 flex flex-col gap-5 justify-center items-center text-center">
                  <div className="text-xl text-white">{item.name}</div>
                  <div className="text-[#ffe8ff]">{item.text}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-5xl text-black font-semibold mx-28 flex items-center bg-white w-fit px-5 py-2">
          <span className="mr-5 text-green-700">#</span>Alumni
        </div>
        <div className="flex gap-20 m-20 justify-between mt-32">
          {alumnis.map((item, index) => {
            return (
              <div
                key={index}
                className="h-fit font-spaceGrotesk font-semibold text-sm bg-[#9A43B1] text-black"
              >
                <div className="flex items-center gap-5 justify-center w-full relative -top-[4rem]">
                  <img
                    src="/assets/icons/double_quotes.png"
                    className="h-20 w-20 transform rotate-180"
                  />
                  <img src={item.image} className="h-32 w-32" />
                  <img
                    src="/assets/icons/double_quotes.png"
                    className="h-20 w-20"
                  />
                </div>
                <div className="relative -top-[2rem] px-10 flex flex-col justify-center items-center text-center">
                  <div className="text-xl text-white">{item.name}</div>
                  <div className="text-[#ffe8ff]">{item.jobTitle}</div>
                  <a
                    href={item.linkedin}
                    className="bg-white text-black rounded-full py-3 px-5 mt-5 text-base uppercase font-spaceGrotesk"
                  >
                    Follow on LinkedIn
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <img src="/assets/images/separator5.png" className="w-full" />
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
        <div className="text-white font-spaceGrotesk my-10 mx-20 text-lg">Copyright @ House of Geeks, 2024</div>
        <div className="absolute bottom-0 right-0 max-md:hidden">
          <img
            src="/assets/images/hg_logo.png"
            className="object-contain h-96 mx-20 mb-10"
          />
        </div>
      </section>
    </>
  );
}
