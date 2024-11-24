"use client";

import Hero from "@/components/HomePage/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import WingsSection from "@/components/HomePage/Wings";
import { alumnis, testimonials, wings } from "@/utils/constants";
import React from "react";
import ConnectWithUs from "@/components/HomePage/ConnectWithUs";
import EventsCarousel from "@/components/HomePage/EventsCarousel";
import TestimonialsSection from "@/components/HomePage/Testimonials";
import Footer from "@/components/Footer";

const Separator: React.FC<{ image: string }> = ({ image }) => {
  return (
    <div className="w-full relative h-28">
      <Image src={`/assets/images/${image}`} alt="separator" fill />
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Separator image="separator1.png" />
      <WingsSection wings={wings} />
      <Separator image="separator2.png" />
      <ConnectWithUs />
      <Separator image="separator3.png" />
      <EventsCarousel />
      <Separator image="separator4.png" />
      <TestimonialsSection testimonials={testimonials} alumnis={alumnis} />
      <Separator image="separator5.png" />
      <Footer />
    </div>
  );
};

export default HeroSection;
