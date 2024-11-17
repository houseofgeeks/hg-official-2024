'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { IEvent } from '@/models/eventModel';
import axios from '@/api/axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

import {
  Carousel,
  CarouselContent,
  CarouselItem
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950">
        <div className="container mx-auto px-4 h-full">
          <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg rounded-lg">
            <Navbar />
          </div>
          <div className="flex justify-center items-center h-[calc(100vh-80px)]">
            <div className="text-purple-100 space-y-2 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-sm">Loading event details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950">
        <div className="container mx-auto px-4 h-full">
          <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg rounded-lg">
            <Navbar />
          </div>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-purple-100">Event Not Found</h1>
              <p className="text-purple-200/70">The event you`&apos;`re looking for doesn`&apos;`t exist or has been removed.</p>
            </div>
            <Link
              href="/events"
              className="px-6 py-3 text-sm text-purple-100 bg-purple-900/40 rounded-lg transition-all duration-300 
                hover:bg-purple-800/40 border border-purple-500/30 hover:border-purple-500/50
                focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black"
            >
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 overflow-y-auto">
      <div className="container mx-auto px-4 pb-8">
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg rounded-lg">
          <Navbar />
        </div>

        <div className="text-3xl text-white mt-16 mb-5">
          {event.title}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 lg:mr-5">
            <div className="relative bg-black/40 border border-purple-500/30 backdrop-blur-lg rounded-lg p-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {event.images && event.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden">
                        <Image
                          src={image || "/assets/images/event1.jpeg"}
                          alt={`${event.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-lg flex flex-col">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg font-bold bg-white bg-clip-text text-transparent">
                  Event Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-6 flex-grow">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-purple-200">Date</h3>
                    <p className="text-sm text-purple-200/70">
                      {formatDate(event.date)}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-purple-200">Wing</h3>
                    <span className="relative inline-flex items-center px-3 py-1 text-sm font-medium rounded-full
                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/20 before:to-purple-800/20 before:rounded-full before:animate-pulse
                      after:absolute after:inset-0 after:bg-gradient-to-r after:from-purple-500/10 after:to-purple-800/10 after:rounded-full after:blur-sm
                      border border-purple-500/30">
                      <span className="relative z-10 bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent">
                        {event.wing}
                      </span>
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-purple-200">Description</h3>
                    <p className="text-sm text-gray-300">
                      {event.description}
                    </p>
                  </div>
                </div>
              </CardContent>
              <div className="p-4 border-t border-purple-500/30">
                <Link
                  href="/events"
                  className="block w-full py-2.5 text-sm text-center text-purple-100 bg-purple-900/40 rounded-lg transition-all duration-300 
                    hover:bg-purple-800/40 border border-purple-500/30 hover:border-purple-500/50
                    focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black
                    active:scale-98 relative group overflow-hidden"
                >
                  <span className="relative z-10">Back to Events</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-800/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}