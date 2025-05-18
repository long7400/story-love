import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/Timeline";
import PhotoGallery from "@/components/PhotoGallery";
import Footer from "@/components/Footer";
import SummaryHeader from "@/components/SummaryHeader";
import { useState } from "react";
import EventDetailsModal from "@/components/EventDetailsModal";
import GalleryModal from "@/components/GalleryModal";
import { LoveStoryData, Event, Photo } from "@/lib/types";

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const { data, isLoading, error } = useQuery<LoveStoryData>({
    queryKey: ['/api/love-story-data'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading our love story...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-700 mb-6">
            We couldn't load our love story data. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleOpenGallery = (index: number) => {
    setCurrentPhotoIndex(index);
    setGalleryOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection 
        profiles={data.profiles} 
        relationship={data.relationship} 
      />
      <SummaryHeader
        relationship={data.relationship}
        profileNames={{
          profile1: data.profiles.profile1.name,
          profile2: data.profiles.profile2.name
        }}
      />
      <Timeline 
        events={data.events}
        onEventClick={handleEventClick}
      />
      <PhotoGallery 
        photos={data.photos}
        onPhotoClick={handleOpenGallery}
      />
      <Footer 
        profile1Name={data.profiles.profile1.name}
        profile2Name={data.profiles.profile2.name}
      />
      
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
      
      {galleryOpen && (
        <GalleryModal
          photos={data.photos}
          initialIndex={currentPhotoIndex}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </div>
  );
}
