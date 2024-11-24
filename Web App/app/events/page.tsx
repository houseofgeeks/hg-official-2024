'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "@/api/axios";
import { IEvent } from "@/models/eventModel";
import Navbar from "@/components/Navbar";
import AnimatingText from "@/components/AnimatingText";
import { motion } from "framer-motion";

export default function EventsPage() {
  const [selectedWing, setSelectedWing] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('upcoming');
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('api/v1/wing');
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllEvents();
  }, []);

  const wings = useMemo(() => {
    const uniqueWings = Array.from(new Set(events.map(event => event.wing)));
    return ['all', ...uniqueWings];
  }, [events]);

  const formatDate = (firestoreTimestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(firestoreTimestamp.seconds * 1000);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const convertFirestoreTimestamp = (timestamp: { seconds: number; nanoseconds: number }) => {
    return new Date(timestamp.seconds * 1000);
  };

  const filteredEvents = useMemo(() => {
    const now = new Date();
    let filtered = events;

    if (selectedWing !== 'all') {
      filtered = filtered.filter(event => event.wing === selectedWing);
    }

    filtered = filtered.filter(event => {
      const eventDate = convertFirestoreTimestamp(event.date);
      return selectedTimeframe === 'upcoming' ? eventDate >= now : eventDate < now;
    });

    return filtered.sort((a, b) => {
      const dateA = convertFirestoreTimestamp(a.date).getTime();
      const dateB = convertFirestoreTimestamp(b.date).getTime();
      return selectedTimeframe === 'upcoming' ? dateA - dateB : dateB - dateA;
    });
  }, [selectedWing, selectedTimeframe, events]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-black">
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto">
          <Navbar />
        </div>
      </div>

      <div className="flex-1 container mx-auto flex flex-col px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 my-8">
          <div className="w-full md:w-auto">
            <AnimatingText
              lines={["Events"]}
              bgColor=""
              textColor="white"
              cursorColor="purple-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="w-full sm:w-48">
              <Select value={selectedWing} onValueChange={setSelectedWing}>
                <SelectTrigger className="bg-purple-600/90 text-white font-semibold border-none rounded-none font-pixel uppercase hover:bg-purple-600 transition-colors">
                  <SelectValue placeholder="ALL WINGS" />
                </SelectTrigger>
                <SelectContent className="bg-purple-600 border-none rounded-sm">
                  {wings.map((wing) => (
                    <SelectItem key={wing} value={wing} className="text-white font-pixel uppercase hover:bg-purple-600/80">
                      {wing === 'all' ? 'ALL WINGS' : wing}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-48">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="bg-purple-600/90 text-white font-semibold border-none rounded-none font-pixel uppercase hover:bg-purple-600 transition-colors">
                  <SelectValue placeholder="UPCOMING EVENTS" />
                </SelectTrigger>
                <SelectContent className="bg-purple-600 border-none rounded-sm">
                  <SelectItem value="upcoming" className="text-white font-pixel">
                    UPCOMING EVENTS
                  </SelectItem>
                  <SelectItem value="past" className="text-white font-pixel">
                    PAST EVENTS
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col mt-5">
          {loading ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-purple-500 space-y-4 text-center flex flex-col items-center justify-center font-pixel">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
                </div>
                <p className="text-sm animate-pulse text-white">Loading events...</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold font-pixel bg-white bg-clip-text text-transparent">
                  {selectedTimeframe === 'upcoming' ? 'UPCOMING EVENTS' : 'PAST EVENTS'}
                </h2>
                <span className="px-4 py-2 rounded-none font-bold bg-purple-600 text-black font-pixel text-sm">
                  {filteredEvents.length}
                </span>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 overflow-y-auto"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <motion.div key={event.id} variants={itemVariants}>
                        <Card className="group bg-white backdrop-blur-sm rounded-sm transition-all duration-300 h-full flex flex-col">
                          <CardHeader className="p-0">
                            <div className="relative h-48 w-full overflow-hidden">
                              <div className="flex z-[30] justify-end w-full">
                                <div className="h-4 w-4 bg-black"></div>
                              </div>
                              <Image
                                src={event.images[0]}
                                alt={event.title}
                                fill
                                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                          </CardHeader>
                          <CardContent className="pt-6 pb-4 flex-1">
                            <CardTitle className="font-pixel text-xl text-black uppercase group-hover:text-purple-500 transition-colors">
                              {event.title}
                            </CardTitle>
                            <p className="font-pixel text-sm text-gray-400 mb-3">{formatDate(event.date)}</p>
                            <p className="font-pixel text-sm text-black line-clamp-2">
                              {event.description.length > 40 ? event.description.substring(0, 40) + '...' : event.description}
                            </p>
                          </CardContent>
                          <CardFooter className="flex flex-col">
                            <Link
                              href={`/events/${event.id}`}
                              className="w-full text-black font-pixel uppercase font-bold"
                            >
                              <button className="bg-purple-600/80 py-2 mr-4 px-4 rounded-full text-white font-pixel hover:bg-purple-600">
                                {`>`}
                              </button>
                              FIND OUT MORE
                            </Link>
                          </CardFooter>
                          <div className="flex justify-between w-full">
                            <div className="h-4 w-4 bg-black"></div>
                            <div className="h-4 w-4 bg-black"></div>
                          </div>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full text-center py-12"
                    >
                      <p className="text-purple-500 font-pixel text-lg">
                        No {selectedTimeframe} events found for {selectedWing === 'all' ? 'any wing' : `${selectedWing} wing`}.
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}