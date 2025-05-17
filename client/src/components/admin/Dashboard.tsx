import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, Trash, Plus, Calendar, X, LogOut, Save } from "lucide-react";
import { Event, Photo } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface DashboardProps {
  onLogout: () => void;
}

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  fullDescription: z.string().min(1, "Full description is required"),
  imageUrl: z.string().url("Valid image URL is required"),
});

type EventFormValues = z.infer<typeof eventSchema>;

export default function Dashboard({ onLogout }: DashboardProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [section, setSection] = useState<'events' | 'photos'>('events');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/love-story-data');
        const data = await response.json();
        setEvents(data.events || []);
        setPhotos(data.photos || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (event?: Event) => {
    if (event) {
      setSelectedEvent(event);
      reset({
        title: event.title,
        date: new Date(event.date).toISOString().split('T')[0],
        shortDescription: event.shortDescription,
        fullDescription: event.fullDescription,
        imageUrl: event.imageUrl,
      });
    } else {
      setSelectedEvent(null);
      reset({
        title: '',
        date: new Date().toISOString().split('T')[0],
        shortDescription: '',
        fullDescription: '',
        imageUrl: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const onSubmit = async (data: EventFormValues) => {
    setIsSaving(true);
    
    try {
      // In a complete implementation, we would send this to the backend API
      // For now, we'll update our local state to demonstrate functionality
      
      const newEvent: Event = {
        id: selectedEvent ? selectedEvent.id : Math.max(0, ...events.map(e => e.id)) + 1,
        ...data,
        date: new Date(data.date).toISOString(),
      };
      
      if (selectedEvent) {
        // Update existing event
        setEvents(events.map(event => 
          event.id === selectedEvent.id ? newEvent : event
        ));
      } else {
        // Add new event
        setEvents([...events, newEvent]);
      }
      
      closeModal();
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEvent = (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Love Story Admin</h1>
          <button
            onClick={onLogout}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              section === 'events'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setSection('events')}
          >
            Timeline Events
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              section === 'photos'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setSection('photos')}
          >
            Photo Gallery
          </button>
        </div>

        {section === 'events' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Manage Timeline Events</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => openModal()}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add New Event
              </motion.button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {events.length === 0 ? (
                  <li className="px-6 py-12 text-center text-gray-500">
                    No events found. Add your first event!
                  </li>
                ) : (
                  events.map((event) => (
                    <li key={event.id} className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden">
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="h-12 w-12 object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(event.date, { day: '2-digit', month: '2-digit', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal(event)}
                          className="p-1.5 rounded-full text-gray-400 hover:text-primary hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </>
        )}

        {section === 'photos' && (
          <div className="text-center p-12 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Photo Gallery Management</h3>
            <p className="text-gray-500 mb-4">
              Photo gallery management will be implemented in the next phase.
            </p>
          </div>
        )}
      </main>

      {/* Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeModal}
            ></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {selectedEvent ? 'Edit Event' : 'Add New Event'}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Event Title
                    </label>
                    <input
                      type="text"
                      {...register('title')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      {...register('date')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Short Description
                    </label>
                    <input
                      type="text"
                      {...register('shortDescription')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                    {errors.shortDescription && (
                      <p className="mt-1 text-sm text-red-600">{errors.shortDescription.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Description (supports HTML)
                    </label>
                    <textarea
                      rows={4}
                      {...register('fullDescription')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                    {errors.fullDescription && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullDescription.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="text"
                      {...register('imageUrl')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                    {errors.imageUrl && (
                      <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 mt-5">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      {isSaving ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}