import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, Calendar, Heart, Trash2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSound } from "@/lib/SoundContext";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issues in React Leaflet
const DefaultIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom heart icon for special places
const heartIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1oZWFydCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBzdHlsZT0iZmlsbDojZmYzMzY2O3N0cm9rZTojZmYzMzY2Ij48cGF0aCBkPSJNMTkgMTRjMS40OS0xLjQ2IDMtMy4yMSAzLTUuNWE1LjUgNS41IDAgMCAwLTExIDAgTTEyIDhINy41YTUuNSA1LjUgMCAxIDAgMCAxMUgxMiI+PC9wYXRoPjwvc3ZnPg==',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// Component to recenter map when location changes
function ChangeMapView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

interface LocationMarker {
  id: string;
  name: string;
  description: string;
  date: Date;
  position: [number, number];
  isSpecial: boolean;
}

export default function LoveMapPage() {
  const [locations, setLocations] = useState<LocationMarker[]>([]);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.0060]); // Default NYC
  const [mapZoom, setMapZoom] = useState(13);
  const [selectedLocation, setSelectedLocation] = useState<LocationMarker | null>(null);
  const [newLocation, setNewLocation] = useState<Omit<LocationMarker, "id">>({
    name: "",
    description: "",
    date: new Date(),
    position: [0, 0],
    isSpecial: false
  });
  const { toast } = useToast();
  const { playClick } = useSound();

  // Load locations from localStorage
  useEffect(() => {
    const savedLocations = localStorage.getItem("loveMapLocations");
    if (savedLocations) {
      try {
        const parsed = JSON.parse(savedLocations);
        const validLocations = parsed.map((location: any) => ({
          ...location,
          date: new Date(location.date)
        }));
        setLocations(validLocations);
        
        // If we have locations, center the map on the first one
        if (validLocations.length > 0) {
          setMapCenter(validLocations[0].position);
        }
      } catch (error) {
        console.error("Error parsing saved locations:", error);
      }
    }
  }, []);

  // Save locations to localStorage
  useEffect(() => {
    if (locations.length > 0) {
      localStorage.setItem("loveMapLocations", JSON.stringify(locations));
    }
  }, [locations]);

  // Get user's current location
  const getUserLocation = () => {
    playClick();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setMapCenter([lat, lng]);
          setMapZoom(15);
          
          // Update new location position
          setNewLocation(prev => ({
            ...prev,
            position: [lat, lng]
          }));
          
          toast({
            title: "Location found",
            description: "Map centered on your current location."
          });
        },
        () => {
          toast({
            title: "Location error",
            description: "Unable to get your current location.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive"
      });
    }
  };
  
  const startAddingMarker = () => {
    playClick();
    setIsAddingMarker(true);
    toast({
      title: "Adding location",
      description: "Click on the map to place your memory marker."
    });
  };
  
  const handleMapClick = (e: any) => {
    if (!isAddingMarker) return;
    
    const { lat, lng } = e.latlng;
    setNewLocation(prev => ({
      ...prev,
      position: [lat, lng]
    }));
    
    setIsDialogOpen(true);
    setIsAddingMarker(false);
  };
  
  const handleSaveLocation = () => {
    playClick();
    
    if (!newLocation.name) {
      toast({
        title: "Missing information",
        description: "Please provide a name for this location.",
        variant: "destructive"
      });
      return;
    }
    
    const locationToAdd: LocationMarker = {
      ...newLocation,
      id: Date.now().toString()
    };
    
    setLocations(prev => [...prev, locationToAdd]);
    setNewLocation({
      name: "",
      description: "",
      date: new Date(),
      position: [0, 0],
      isSpecial: false
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Location saved",
      description: "Your romantic memory location has been added to the map."
    });
  };
  
  const handleDeleteLocation = (id: string) => {
    playClick();
    setLocations(prev => prev.filter(location => location.id !== id));
    toast({
      title: "Location deleted",
      description: "The memory location has been removed from your map."
    });
  };
  
  const handleViewLocation = (location: LocationMarker) => {
    playClick();
    setSelectedLocation(location);
    setMapCenter(location.position);
    setMapZoom(16);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="mb-4 text-gray-400 tracking-[0.4em] text-xs uppercase">
            Your Journey Together
          </div>
          <h1 className="text-3xl md:text-4xl font-script mb-6 text-gray-800">
            Love Story Map
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light tracking-wide">
            Map your romantic journey by marking special places you've visited together.
          </p>
        </motion.div>

        {/* Map controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Button onClick={getUserLocation} variant="outline" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Use Current Location
          </Button>
          <Button onClick={startAddingMarker} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Memory Location
          </Button>
        </div>

        {/* Map and locations list in grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Locations List */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
              <h2 className="text-xl font-heading mb-4 text-gray-800">Your Special Places</h2>
              
              {locations.length === 0 ? (
                <div className="text-center p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No locations yet</h3>
                  <p className="text-gray-500">
                    Add your first special place to start mapping your love story.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {locations.map(location => (
                    <div
                      key={location.id}
                      className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-all cursor-pointer"
                      onClick={() => handleViewLocation(location)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-2">
                          {location.isSpecial ? (
                            <Heart className="w-4 h-4 mt-1 text-primary fill-primary" />
                          ) : (
                            <MapPin className="w-4 h-4 mt-1 text-gray-400" />
                          )}
                          <div>
                            <h3 className="font-medium text-gray-800">{location.name}</h3>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              {format(location.date, "PP")}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLocation(location.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {location.description && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {location.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm h-[600px]">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: "100%", width: "100%" }}
                onClick={handleMapClick}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <ChangeMapView center={mapCenter} zoom={mapZoom} />
                
                {locations.map(location => (
                  <Marker
                    key={location.id}
                    position={location.position}
                    icon={location.isSpecial ? heartIcon : L.icon(L.Icon.Default.prototype.options)}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <h3 className="font-medium text-lg">{location.name}</h3>
                        <p className="text-gray-500 text-sm flex items-center mt-1">
                          <Calendar className="w-3.5 h-3.5 mr-1.5" />
                          {format(location.date, "PPP")}
                        </p>
                        {location.description && (
                          <p className="mt-2 text-gray-700">{location.description}</p>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
                
                {/* New location marker when selecting position */}
                {isAddingMarker && (
                  <Marker position={mapCenter}>
                    <Popup>Click to place your marker here</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Add Location Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Special Place</DialogTitle>
              <DialogDescription>
                Record a meaningful location from your relationship journey.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="place-name" className="text-right text-sm font-medium col-span-1">
                  Name
                </label>
                <Input
                  id="place-name"
                  placeholder="First date, Proposal spot, etc."
                  value={newLocation.name}
                  onChange={(e) => setNewLocation(prev => ({ ...prev, name: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-right text-sm font-medium col-span-1">
                  Date
                </label>
                <div className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {newLocation.date ? (
                          format(newLocation.date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={newLocation.date}
                        onSelect={(date) => date && setNewLocation(prev => ({ ...prev, date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="special" className="text-right text-sm font-medium col-span-1">
                  Special
                </label>
                <div className="col-span-3 flex items-center">
                  <input
                    type="checkbox"
                    id="special"
                    checked={newLocation.isSpecial}
                    onChange={(e) => setNewLocation(prev => ({ ...prev, isSpecial: e.target.checked }))}
                    className="mr-2 h-4 w-4"
                  />
                  <label htmlFor="special" className="text-sm text-gray-600">
                    Mark as a special milestone location
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="description" className="text-right text-sm font-medium col-span-1 pt-2">
                  Memory
                </label>
                <Textarea
                  id="description"
                  placeholder="What makes this place special..."
                  value={newLocation.description}
                  onChange={(e) => setNewLocation(prev => ({ ...prev, description: e.target.value }))}
                  className="col-span-3 resize-none h-24"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveLocation}>
                Save Location
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}