"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { useParams } from "next/navigation";
import axios from "@/api/axios";

// Define interfaces for our data structures
interface Levels {
  CP: number;
  SD: number;
  ML_AI: number;
  IOT_ROBOTICS: number;
  ARCANUM: number;
  CYBERSECURITY: number;
}

interface UserProfile {
  name: string;
  levels: Levels;
  branch: string;
  skills: string;
  bio: string;
}

interface SocialLink {
  title: string;
  icon: string;
  link: string;
}

// Initial user data
const user: UserProfile = {
  name: "Agnish Bhattacharya",
  levels: {
    CP: 2,
    SD: 2,
    ML_AI: 0,
    IOT_ROBOTICS: 0,
    ARCANUM: 0,
    CYBERSECURITY: 0,
  },
  branch: "Electronics and Communication Engineering",
  skills: "JavaScript, TypeScript, ReactJs, NextJs, NodeJs",
  bio: "Aspiring software engineer",
};

// Social links data
const links: SocialLink[] = [
  {
    title: "GitHub",
    icon: "/assets/icons/github.png",
    link: "",
  },
  {
    title: "LinkedIn",
    icon: "/assets/icons/linkedin.png",
    link: "",
  },
  {
    title: "Portfolio",
    icon: "/assets/icons/portfolio.png",
    link: "",
  },
  {
    title: "Twitter/X",
    icon: "/assets/icons/twitter.png",
    link: "",
  },
];

// API response interface
interface ApiResponse {
  profile: {
    name: string;
    levels: Levels;
  }
}

const Page: React.FC = () => {
  const params = useParams();

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [levels, setLevels] = useState<[string, number][]>([]);
  const [branch, setBranch] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = params.username as string;
        const res = await axios.get<ApiResponse>(`/api/v1/user/${username}`);
        setUsername(res.data.profile.name);
        const levelObject = res.data.profile.levels;
        setLevels(Object.entries(levelObject));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    setBranch(user.branch);
    setSkills(user.skills);
    setBio(user.bio);
  }, [params.username]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (isUpdate) {
      setter(e.target.value);
    }
  };

  return (
    <section className="overflow-x-hidden">
      {/* Header Background */}
      <div className="w-full h-40 bg-black">
        <div className="text-white font-spaceGrotesk text-xl flex gap-5 p-10">
          <ArrowLeftIcon className="h-7 w-7" />
          <Link href="/">
            <span className="cursor-pointer hover:underline">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Black shapes */}
          <div className="w-32 h-16 max-md:hidden bg-black"></div>
          <div className="w-32 h-8 max-md:hidden bg-black"></div>

          {/* Profile Image */}
          <div className="relative -top-20 px-5">
            <Image
              src="/assets/images/profile_image.png"
              alt="profile"
              height={150}
              width={150}
              className="rounded-full"
            />
          </div>

          {/* Profile Info */}
          <div className="flex flex-col gap-3 mt-2 items-center md:items-start">
            <div className="text-4xl font-spaceGrotesk text-center md:text-left">
              {user.name}
            </div>
            <div className="font-spaceGrotesk text-xs flex flex-wrap justify-center md:justify-start gap-2 max-w-[40rem]">
              {levels.map(([key, value], index) => (
                <div key={index} className="flex text-white">
                  <div className="bg-purple-500 px-3 py-1">{key}</div>
                  <div className="bg-black px-3 py-1">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="hidden md:flex">
          <div className="w-32 h-8 bg-black"></div>
          <div className="w-32 h-16 bg-black flex justify-center items-center">
            <Image
              src="/assets/icons/hg_logo_1.png"
              alt="logo"
              className="relative -top-5"
              width={100}
              height={60}
            />
          </div>
          <div className="w-32 h-8 bg-black"></div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-20 px-4 py-8">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.link}
            className="flex flex-col items-center gap-3"
          >
            <div>
              <Image
                src={link.icon}
                alt={`${link.title} icon`}
                height={30}
                width={30}
                className="w-10 h-10 md:w-15 md:h-15"
              />
            </div>
            <div className="font-spaceGrotesk text-sm md:text-md text-center">
              {link.title}
            </div>
          </a>
        ))}
      </div>

      {/* Form Section */}
      <div className="mt-10 py-2 px-4 flex items-center justify-center font-spaceGrotesk">
        <form className="w-full md:w-[60%] lg:w-[40%] flex flex-col gap-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
            <label htmlFor="username" className="min-w-20">
              Username
            </label>
            <input
              id="username"
              className="rounded-full py-1 px-4 border w-full md:w-[70%] border-purple-500"
              placeholder="username"
              value={username}
              disabled={!isUpdate}
              onChange={(e) => handleInputChange(e, setUsername)}
            />
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
            <label htmlFor="branch" className="min-w-20">
              Branch
            </label>
            <input
              id="branch"
              className="rounded-full py-1 px-4 border w-full md:w-[70%] border-purple-500"
              placeholder="branch"
              value={branch}
              disabled={!isUpdate}
              onChange={(e) => handleInputChange(e, setBranch)}
            />
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
            <label htmlFor="skills" className="min-w-20">
              Skills
            </label>
            <input
              id="skills"
              className="rounded-full py-1 px-4 border w-full md:w-[70%] border-purple-500"
              placeholder="Your skills"
              value={skills}
              disabled={!isUpdate}
              onChange={(e) => handleInputChange(e, setSkills)}
            />
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
            <label htmlFor="bio" className="min-w-20">
              Bio
            </label>
            <input
              id="bio"
              className="rounded-full py-1 px-4 border w-full md:w-[70%] border-purple-500"
              placeholder="write your short bio"
              value={bio}
              disabled={!isUpdate}
              onChange={(e) => handleInputChange(e, setBio)}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;