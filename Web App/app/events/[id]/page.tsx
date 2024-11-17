'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IEvent } from '@/models/eventModel';
import { useEffect, useState } from 'react';
import axios from '@/api/axios';

export default function EventDetailsPage() {
  const params = useParams();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/events/${params.id}`);
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-gray-700">Event not found!</h1>
          <Link
            href="/events"
            className="mt-4 inline-block px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-purple-600">{event.title}</h1>
      <p className="mt-2 text-center text-gray-500">
        {/* {new Date(event.date).toLocaleDateString()} */}
      </p>
      <div className="mt-8 relative w-full h-96 max-w-3xl mx-auto">
        <Image
          src={event.images[0]}
          alt={event.title}
          fill
          className="object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="mt-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-500">Description</h2>
        <p className="mt-2 text-gray-700">{event.description}</p>
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-purple-500">Wing</h2>
          <p className="mt-2 text-gray-700">{event.wing}</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          href="/events"
        >
          Back to Events
        </Link>
      </div>
    </div>
  );
}
