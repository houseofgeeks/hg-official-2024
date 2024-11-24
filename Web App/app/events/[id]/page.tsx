'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { IEvent } from '@/models/eventModel';
import axios from '@/api/axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import AnimatingText from "@/components/AnimatingText";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function EventDetailsPage() {
  const params = useParams();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/event/${params.id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEvent();
    }
  }, [params.id]);

  const formatDate = (firestoreTimestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(firestoreTimestamp.seconds * 1000);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
          <div className="container mx-auto">
            <Navbar />
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="space-y-4 text-center flex flex-col items-center justify-center font-pixel">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-sm animate-pulse text-white">Loading event details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black">
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
          <div className="container mx-auto">
            <Navbar />
          </div>
        </div>
        <div className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold font-pixel text-white">EVENT NOT FOUND</h1>
            <p className="text-gray-400 font-pixel">The event you're looking for doesn't exist or has been removed.</p>
          </div>
          <Link
            href="/events"
            className="mt-6 bg-purple-600 text-white font-semibold px-6 py-3 rounded-sm font-pixel 
              hover:bg-purple-700 transition-colors"
          >
            BACK TO EVENTS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black overflow-y-auto">
      <div className="fixed top-0 left-0 w-full h-full">
        <div className="absolute inset-0 overflow-hidden opacity-20 h-full">
          <div className="grid grid-cols-12 gap-4 p-4 text-purple-500 font-mono h-full text-xs">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="animate-fade-in-down" style={{ animationDelay: `${i * 0.1}s` }}>
                {Math.random().toString(2).substr(2, 8)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto">
          <Navbar />
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="mb-8">
          <AnimatingText
            lines={[event.title]}
            bgColor=""
            textColor="white"
            cursorColor="purple-500"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2">
            <Card className="bg-black border border-purple-500/30 rounded-sm overflow-hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  {event.images?.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={image || '/assets/images/25329.jpg'}
                          alt={`${event.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-black rounded-none">
              <div className="grid grid-cols-2 w-full">
                <div className="h-4 w-4 bg-black" />
                <div className="h-4 w-4 bg-black ml-auto" />
              </div>

              <CardHeader className="p-4 border-black">
                <CardTitle className="font-pixel text-xl text-white">
                  EVENT INFORMATION
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="font-pixel text-sm font-bold text-white">DATE:</span>
                    <span className="font-pixel text-sm text-purple-500">
                      {formatDate(event.date)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-pixel text-sm font-bold text-white">VENUE:</span>
                    <span className="font-pixel text-sm text-purple-500">
                      {event.location || 'BSNL campus'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-pixel text-sm font-bold text-white">WING:</span>
                    <span className="px-3 py-1 bg-purple-500 text-white font-pixel text-sm">
                      {event.wing}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-pixel text-lg text-purple-500 font-bold">
                    {'<HOW TO PARTICIPATE??? />'}
                  </h3>
                  <p className="font-pixel text-sm text-white">
                    {event.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-pixel text-lg text-purple-400 font-bold">
                    {'<About the event />'}
                  </h3>
                  <p className="font-pixel text-sm text-white">
                    {event.description || "Join us for an exciting event that brings together innovation and creativity."}
                  </p>
                </div>
              </CardContent>

              <div className="p-4 mt-auto">
                <Link
                  href="/events"
                  className="flex items-center justify-center w-full bg-purple-500 text-white font-semibold px-6 py-3 
                    rounded-sm font-pixel hover:bg-purple-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  BACK TO EVENTS
                </Link>
              </div>
              <div className="grid grid-cols-2 w-full">
                <div className="h-4 w-4 bg-black" />
                <div className="h-4 w-4 bg-black ml-auto" />
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}