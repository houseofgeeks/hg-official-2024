"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { useParams } from "next/navigation";
import axios from "@/api/axios";
import LevelRequest from "@/components/LevelRequest";
import { UserRole, Wing } from "@/utils/enums";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/store/userAtom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Levels {
  CP: number;
  SD: number;
  ML_AI: number;
  IOT_ROBOTICS: number;
  ARCANUM: number;
  CYBERSECURITY: number;
}

interface SocialLink {
  title: string;
  icon: string;
  link: string;
}

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
];

interface ApiResponse {
  profile: {
    uid: string;
    username: string;
    name: string;
    email: string;
    role: UserRole;
    levels: Levels;
    assignedWings: Wing[];
    branch: string;
    bio: string;
    skills: string;
    githubLink: string;
    linkedinLink: string;
    portfolioLink: string;
  };
}

const Page: React.FC = () => {
  const params = useParams();

  const user = useRecoilValue(userAtom);

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(links);
  const [name, setName] = useState<string>("");
  const [levels, setLevels] = useState<[string, number][]>([]);
  const [branch, setBranch] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [popoverOpen, setPopoverOven] = useState<boolean>(false);

  const update = async () => {
    console.log(socialLinks);
    try {
      await axios.patch("/api/v1/editprofile", {
        username,
        name,
        Branch: branch,
        Skills: skills,
        Bio: bio,
        githubLink: socialLinks[0].link,
        linkedinLink: socialLinks[1].link,
        portfolioLink: socialLinks[2].link,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleUpdate = async () => {
    if (isUpdate) {
      update();
    }
    setIsUpdate((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = params.username as string;
        const res = await axios.get<ApiResponse>(`/api/v1/user/${username}`);
        const githubLink = res.data.profile.githubLink;
        const portfolioLink = res.data.profile.portfolioLink;
        const linkedinLink = res.data.profile.linkedinLink;
        setSocialLinks((prev) => {
          const linksarray = prev;
          linksarray[0].link = githubLink;
          linksarray[1].link = linkedinLink;
          linksarray[2].link = portfolioLink;
          return linksarray;
        });
        setUsername(res.data.profile.username);
        setName(res.data.profile.name);
        const levelObject = res.data.profile.levels;
        setLevels(Object.entries(levelObject));
        setBranch(res.data.profile.branch);
        setSkills(res.data.profile.skills);
        setBio(res.data.profile.bio);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
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
              {username}
            </div>
            <div className="flex">
              <div className="font-spaceGrotesk text-xs flex flex-wrap justify-center md:justify-start gap-2 max-w-[30rem]">
                {levels.map(([key, value], index) => (
                  <div key={index} className="flex text-white">
                    <div className="bg-purple-500 px-3 py-1">{key}</div>
                    <div className="bg-black px-3 py-1">{value}</div>
                  </div>
                ))}
              </div>
              <LevelRequest />
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
        {links.map((link, index) =>
          !link.link && username !== user.username ? (
            ""
          ) : !link.link ? (
            <div key={index} className="flex flex-col items-center gap-3">
              <Popover open={popoverOpen}>
                <PopoverTrigger>
                  <div
                    className="hover:scale-110 cursor-pointer transition-all"
                    onClick={() => setPopoverOven(true)}
                  >
                    <Image
                      src="/assets/icons/plus.png"
                      alt="add icon"
                      height={30}
                      width={30}
                      className="w-10 h-10 md:w-15 md:h-15"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Set the link for your account.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Link</Label>
                        <Input
                          id="link"
                          defaultValue="https://"
                          className="col-span-2 h-8"
                          onChange={(e) => {
                            setSocialLinks((prev) => {
                              const linkArray = prev;
                              linkArray[index].link = e.target.value;
                              return linkArray;
                            });
                          }}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        update();
                        setPopoverOven(false);
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <div className="font-spaceGrotesk text-sm md:text-md text-center">
                Add {link.title}
              </div>
            </div>
          ) : (
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
          )
        )}
      </div>
      {/* Form Section */}+{" "}
      <div className="py-2 px-4 flex flex-col items-center justify-center font-spaceGrotesk">
        {username === user.username && (
          <div className="flex justify-start w-full md:w-[60%] lg:w-[40%] mb-5">
            <button
              className="rounded-full bg-blue-500 px-4 py-2 hover:scale-105 cursor-pointer transition-all text-white flex gap-3 items-center"
              onClick={toggleUpdate}
            >
              {isUpdate ? "Save" : "Edit profile"}
              <Image
                src={`/assets/icons/${isUpdate ? `save` : `edit`}.png`}
                alt="edit"
                height={15}
                width={15}
              />
            </button>
          </div>
        )}
        <form className="w-full md:w-[60%] lg:w-[40%] flex flex-col gap-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
            <label htmlFor="username" className="min-w-20">
              Name
            </label>
            <input
              id="username"
              className="rounded-full py-1 px-4 border w-full md:w-[70%] border-purple-500"
              placeholder="username"
              value={name}
              disabled={!isUpdate}
              onChange={(e) => handleInputChange(e, setName)}
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
