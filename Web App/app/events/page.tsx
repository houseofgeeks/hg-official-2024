'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "@/api/axios";
import { IEvent } from "@/models/eventModel";

export default function EventsPage() {
  const [selectedWing, setSelectedWing] = useState<string>('all');
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
    }
    getAllEvents();
  }, [])

  const wings = useMemo(() => {
    const uniqueWings = Array.from(new Set(events.map(event => event.wing)));
    return ['all', ...uniqueWings];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (selectedWing === 'all') {
      return events;
    }
    return events.filter(event => event.wing === selectedWing);
  }, [selectedWing, events]);

  console.log(loading);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-purple-600">Events</h1>
      <p className="mt-2 text-center text-gray-700">
        Discover the latest events organized by House of Geeks.
      </p>

      <div className="mt-8 max-w-xs mx-auto">
        <Select
          value={selectedWing}
          onValueChange={setSelectedWing}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Wing" />
          </SelectTrigger>
          <SelectContent>
            {wings.map((wing) => (
              <SelectItem key={wing} value={wing}>
                {wing === 'all' ? 'All Wings' : wing}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Card key={event.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{event.title}</CardTitle>
                <span className="text-sm text-purple-600 font-medium">{event.wing}</span>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-40">
                  <Image
                    src={event.images[0]}
                    alt={event.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="mt-2 text-gray-700">{event.description}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/events/${event.id}`}
                  className="w-full text-center py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  View Details
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No events found for the selected wing.</p>
          </div>
        )}
      </div>
    </div>
  );
}