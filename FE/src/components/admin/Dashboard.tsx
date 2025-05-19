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
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [section, setSection] = useState<'events' | 'photos' | 'postcards' | 'countdown' | 'map' | 'quiz'>('events');

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
  
  // Chức năng xử lý cho Photo Gallery
  const openPhotoModal = (photo?: Photo) => {
    if (photo) {
      setSelectedPhoto(photo);
      // Reset photo form with existing data
    } else {
      setSelectedPhoto(null);
      // Reset photo form with empty values
    }
    setIsPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false);
    setSelectedPhoto(null);
  };

  const handleEditPhoto = (photo: Photo) => {
    openPhotoModal(photo);
  };

  const handleDeletePhoto = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ảnh này?")) {
      setPhotos(photos.filter(photo => photo.id !== id));
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
        <div className="flex flex-wrap border-b border-gray-200 mb-6">
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
          <button
            className={`px-4 py-2 text-sm font-medium ${
              section === 'postcards'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setSection('postcards')}
          >
            Love Postcards
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              section === 'countdown'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setSection('countdown')}
          >
            Countdown Timers
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              section === 'map'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setSection('map')}
          >
            Love Map
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              section === 'quiz'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setSection('quiz')}
          >
            Love Language Quiz
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
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Manage Photo Gallery</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => openPhotoModal()}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add New Photos
              </motion.button>
            </div>
            <p className="text-gray-600 mb-4">
              Easily manage your photo gallery with drag-and-drop uploading and organization.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {photos.map(photo => (
                <div key={photo.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={photo.imageUrl} 
                      alt={photo.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      className="p-1 rounded-full bg-white text-gray-700"
                      onClick={() => handleEditPhoto(photo)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="p-1 rounded-full bg-white text-red-500 ml-2"
                      onClick={() => handleDeletePhoto(photo.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm font-medium truncate">{photo.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {section === 'postcards' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Love Postcards Management</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Postcard Template
              </motion.button>
            </div>
            <p className="text-gray-600 mb-4">
              Manage postcard templates and backgrounds for creating personalized digital love postcards.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="aspect-[4/3] rounded-md bg-gray-100 mb-3"></div>
                  <h3 className="font-medium">Postcard Template {i}</h3>
                  <div className="flex justify-end mt-2">
                    <button className="p-1 rounded-full bg-gray-100 text-gray-700">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 rounded-full bg-gray-100 text-red-500 ml-2">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {section === 'countdown' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Countdown Timers</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add New Countdown
              </motion.button>
            </div>
            <p className="text-gray-600 mb-4">
              Manage special date countdowns for your love story.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium">Anniversary {i}</h3>
                  <p className="text-sm text-gray-500">December 25, 2025</p>
                  <div className="flex justify-between mt-4 text-xs">
                    <div className="text-center">
                      <div className="font-medium text-lg">134</div>
                      <div>days</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-lg">12</div>
                      <div>hours</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-lg">55</div>
                      <div>mins</div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button className="p-1 rounded-full bg-gray-100 text-gray-700">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 rounded-full bg-gray-100 text-red-500 ml-2">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {section === 'map' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Love Map Locations</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add New Location
              </motion.button>
            </div>
            <p className="text-gray-600 mb-4">
              Manage the locations on your love story map.
            </p>
            <div className="border border-gray-200 rounded-lg h-64 bg-gray-100 mb-4 flex items-center justify-center text-gray-400">
              Map preview will appear here
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Special Place {i}</h3>
                    <p className="text-xs text-gray-500">June 15, 2023</p>
                  </div>
                  <div className="flex">
                    <button className="p-1 rounded-full bg-gray-100 text-gray-700">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 rounded-full bg-gray-100 text-red-500 ml-2">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {section === 'quiz' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Love Language Quiz</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Quiz Settings
              </motion.button>
            </div>
            <p className="text-gray-600 mb-4">
              Customize your love language quiz questions and results.
            </p>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-2">Quiz Questions</h3>
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">Question {i}</span>
                      <button className="p-1 rounded-full hover:bg-gray-200">
                        <Edit className="h-3 w-3 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-2">Results Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Words of Affirmation', 'Physical Touch', 'Acts of Service', 'Quality Time', 'Receiving Gifts'].map((cat, i) => (
                    <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">{cat}</span>
                      <button className="p-1 rounded-full hover:bg-gray-200">
                        <Edit className="h-3 w-3 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Photo Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {selectedPhoto ? 'Chỉnh sửa ảnh' : 'Thêm ảnh mới'}
                  </h3>
                  <button
                    onClick={closePhotoModal}
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="Nhập tiêu đề ảnh"
                      defaultValue={selectedPhoto?.title || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ngày chụp</label>
                    <input
                      type="date"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      defaultValue={selectedPhoto ? new Date(selectedPhoto.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                    <textarea
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      rows={3}
                      placeholder="Nhập mô tả cho ảnh"
                      defaultValue={selectedPhoto?.description || ''}
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">URL ảnh</label>
                    <input
                      type="url"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="Nhập URL ảnh"
                      defaultValue={selectedPhoto?.imageUrl || ''}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closePhotoModal}
                >
                  {selectedPhoto ? 'Lưu thay đổi' : 'Thêm ảnh'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={closePhotoModal}
                >
                  Hủy
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">

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