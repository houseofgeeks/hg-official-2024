"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "@/api/axios";
import { IEvent } from "@/models/eventModel";
import Navbar from "@/components/Navbar";
import AnimatingText from "@/components/AnimatingText";

export default function EventsPage() {
  const [selectedWing, setSelectedWing] = useState<string>("all");
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<string>("upcoming");
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("api/v1/wing");
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
    const uniqueWings = Array.from(new Set(events.map((event) => event.wing)));
    return ["all", ...uniqueWings];
  }, [events]);

  const formatDate = (firestoreTimestamp: {
    seconds: number;
    nanoseconds: number;
  }) => {
    const date = new Date(firestoreTimestamp.seconds * 1000);
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const convertFirestoreTimestamp = (timestamp: {
    seconds: number;
    nanoseconds: number;
  }) => {
    return new Date(timestamp.seconds * 1000);
  };

  const filteredEvents = useMemo(() => {
    const now = new Date();
    let filtered = events;

    if (selectedWing !== "all") {
      filtered = filtered.filter((event) => event.wing === selectedWing);
    }

    filtered = filtered.filter((event) => {
      const eventDate = convertFirestoreTimestamp(event.date);
      if (selectedTimeframe === "upcoming") {
        return eventDate >= now;
      } else {
        return eventDate < now;
      }
    });

    return filtered.sort((a, b) => {
      const dateA = convertFirestoreTimestamp(a.date).getTime();
      const dateB = convertFirestoreTimestamp(b.date).getTime();
      if (selectedTimeframe === "upcoming") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }, [selectedWing, selectedTimeframe, events]);

  return (
    // <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950">
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 pb-16">
        {/* <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg rounded-lg"> */}
        <Navbar />
        {/* </div> */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 my-12">
          <div className="w-full md:w-auto">
            <AnimatingText
              lines={["Events"]}
              bgColor="white"
              textColor="black"
              cursorColor="green-700"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="w-full sm:w-44">
              <Select value={selectedWing} onValueChange={setSelectedWing}>
                <SelectTrigger className="bg-black/40 border-purple-500/30 text-purple-100 hover:bg-black/60 transition-all duration-300">
                  <SelectValue placeholder="Filter by Wing" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-purple-500/30 text-purple-100">
                  {wings.map((wing) => (
                    <SelectItem key={wing} value={wing}>
                      {wing === "all" ? "All Wings" : wing}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-44">
              <Select
                value={selectedTimeframe}
                onValueChange={setSelectedTimeframe}
              >
                <SelectTrigger className="bg-black/40 border-purple-500/30 text-purple-100 hover:bg-black/60 transition-all duration-300">
                  <SelectValue placeholder="Select Timeframe" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-purple-500/30 text-purple-100">
                  <SelectItem
                    value="upcoming"
                    className="hover:bg-purple-900/20 hover:text-white"
                  >
                    Upcoming Events
                  </SelectItem>
                  <SelectItem value="past">Past Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-purple-100 space-y-2 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-sm">Loading events...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-lg font-medium text-purple-100 flex items-center gap-3">
                {selectedTimeframe === "upcoming"
                  ? "Upcoming Events"
                  : "Past Events"}
                <span className="px-3 py-1 text-sm font-normal text-purple-200 bg-purple-900/40 rounded-full border border-purple-500/30">
                  {filteredEvents.length}{" "}
                  {filteredEvents.length === 1 ? "event" : "events"}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="group bg-black/40 border-purple-500/30 hover:bg-black/60 transition-all duration-500 hover:border-purple-500/50 backdrop-blur-lg"
                  >
                    <CardHeader className="pb-2 space-y-2">
                      <div className="flex flex-col space-y-3">
                        <CardTitle className="text-base font-bold bg-white bg-clip-text text-transparent">
                          {event.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <span
                            className="relative inline-flex items-center px-3 py-1 text-xs font-medium rounded-full
                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/20 before:to-purple-800/20 before:rounded-full before:animate-pulse
                      after:absolute after:inset-0 after:bg-gradient-to-r after:from-purple-500/10 after:to-purple-800/10 after:rounded-full after:blur-sm
                      border border-purple-500/30 hover:border-purple-500/50 transition-colors duration-300"
                          >
                            <span className="relative z-10 bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent">
                              {event.wing}
                            </span>
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 pb-4">
                      <div className="relative h-36 w-full overflow-hidden rounded-lg">
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-purple-900/20 group-hover:opacity-0 transition-all duration-500 z-10" />
                        <Image
                          src={event.images[0]}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-xs text-purple-200/70 font-medium flex items-center space-x-2">
                        <span className="inline-block w-1 h-1 bg-purple-400 rounded-full"></span>
                        <span>{formatDate(event.date)}</span>
                      </p>
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {event.description.length > 40
                          ? event.description.substring(0, 0) + "..."
                          : event.description}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Link
                        href={`/events/${event.id}`}
                        className="w-full py-2 text-sm text-center text-purple-100 bg-purple-900/40 rounded-lg transition-all duration-300 
                    hover:bg-purple-800/40 border border-purple-500/30 hover:border-purple-500/50
                    focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black
                    active:scale-98 relative group/button overflow-hidden"
                      >
                        <span className="relative z-10">Find out more</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-800/20 translate-y-full group-hover/button:translate-y-0 transition-transform duration-300"></div>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center py-16">
                  <p className="text-purple-200/70 text-center px-4 py-8 rounded-lg border border-purple-500/30 bg-black/40 backdrop-blur-sm">
                    No {selectedTimeframe} events found for{" "}
                    {selectedWing === "all"
                      ? "any wing"
                      : `${selectedWing} wing`}
                    .
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
