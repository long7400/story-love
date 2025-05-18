import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Image, Plus, X, Upload, ArrowRight, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSound } from "@/lib/SoundContext";
import { Photo } from "@/lib/types";
import GalleryModal from "@/components/GalleryModal";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
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

export default function PhotoGalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ file: File; preview: string }[]>([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    date: new Date(),
    description: ""
  });
  
  const { toast } = useToast();
  const { playClick, playSuccess } = useSound();

  // Load photos from localStorage
  useEffect(() => {
    const savedPhotos = localStorage.getItem("loveStoryPhotos");
    if (savedPhotos) {
      try {
        setPhotos(JSON.parse(savedPhotos));
      } catch (error) {
        console.error("Error parsing saved photos:", error);
      }
    }
  }, []);

  // Save photos to localStorage
  useEffect(() => {
    if (photos.length > 0) {
      localStorage.setItem("loveStoryPhotos", JSON.stringify(photos));
    }
  }, [photos]);

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [uploadedFiles]);

  const handleOpenGallery = (index: number) => {
    playClick();
    setSelectedPhotoIndex(index);
  };

  const handleCloseGallery = () => {
    setSelectedPhotoIndex(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList)
      .filter(file => file.type.startsWith("image/"))
      .map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
    
    if (newFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please upload image files only (JPG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }
    
    setUploadedFiles(newFiles);
    setIsDialogOpen(true);
    playClick();
  };

  const clearUploadedFiles = () => {
    uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    setUploadedFiles([]);
  };

  const handleSavePhotos = () => {
    playClick();
    
    if (!newPhoto.title) {
      toast({
        title: "Missing information",
        description: "Please provide a title for your photo(s).",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newPhotos = uploadedFiles.map((file, index) => ({
        id: Date.now() + index,
        title: index === 0 ? newPhoto.title : `${newPhoto.title} (${index + 1})`,
        description: newPhoto.description,
        date: format(newPhoto.date, "yyyy-MM-dd"),
        imageUrl: file.preview
      }));
      
      setPhotos(prev => [...prev, ...newPhotos]);
      setIsUploading(false);
      setIsDialogOpen(false);
      clearUploadedFiles();
      setNewPhoto({
        title: "",
        date: new Date(),
        description: ""
      });
      
      playSuccess();
      toast({
        title: "Photos added",
        description: `${newPhotos.length} photo(s) added to your gallery successfully.`
      });
    }, 1500);
  };

  const handleDeletePhoto = (id: number) => {
    playClick();
    setPhotos(prev => prev.filter(photo => photo.id !== id));
    toast({
      title: "Photo deleted",
      description: "The photo has been removed from your gallery."
    });
  };
  
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="mb-4 text-gray-400 tracking-[0.4em] text-xs uppercase">
            Capture Your Story
          </div>
          <h1 className="text-3xl md:text-4xl font-script mb-6 text-gray-800">
            Love Memory Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light tracking-wide">
            Drag and drop your precious moments to create a beautiful photo gallery of your love story.
          </p>
        </motion.div>

        {/* Drag and drop area */}
        <div
          className={`max-w-4xl mx-auto mb-12 border-2 border-dashed rounded-lg p-12 text-center transition-all ${
            dragOver
              ? "border-primary bg-pink-50"
              : "border-gray-300 hover:border-gray-400 bg-gray-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
          />
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {dragOver ? "Drop photos here" : "Drag photos here"}
            </h3>
            <p className="text-gray-500 mb-4">or click to browse files</p>
            <Button variant="outline" onClick={(e) => {
              e.stopPropagation();
              openFileDialog();
            }}>
              <ImagePlus className="w-4 h-4 mr-2" />
              Choose Photos
            </Button>
          </div>
        </div>

        {/* Photos grid */}
        {photos.length === 0 ? (
          <div className="text-center p-12 border border-dashed border-gray-300 rounded-lg bg-gray-50 max-w-4xl mx-auto">
            <Image className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No photos yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Add your first photos to start creating your love story gallery.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative"
              >
                <div 
                  className="cursor-pointer overflow-hidden rounded-lg shadow-sm border border-gray-100 aspect-square bg-gray-100"
                  onClick={() => handleOpenGallery(index)}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePhoto(photo.id);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2">
                  <h3 className="text-sm font-medium text-gray-800 truncate">{photo.title}</h3>
                  <p className="text-xs text-gray-500">{format(new Date(photo.date), "PP")}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View photo modal */}
        {selectedPhotoIndex !== null && (
          <GalleryModal
            photos={photos}
            initialIndex={selectedPhotoIndex}
            onClose={handleCloseGallery}
          />
        )}

        {/* Upload dialog */}
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open && !isUploading) {
            clearUploadedFiles();
            setIsDialogOpen(false);
          }
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Photos to Gallery</DialogTitle>
              <DialogDescription>
                Add details for your uploaded photos.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {uploadedFiles.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {uploadedFiles.map((file, i) => (
                    <div key={i} className="aspect-square rounded-md overflow-hidden bg-gray-100">
                      <img
                        src={file.preview}
                        alt={`Preview ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right text-sm font-medium col-span-1">
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="Memory title"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, title: e.target.value }))}
                  className="col-span-3"
                  disabled={isUploading}
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
                        disabled={isUploading}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {newPhoto.date ? (
                          format(newPhoto.date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newPhoto.date}
                        onSelect={(date) => date && setNewPhoto(prev => ({ ...prev, date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="description" className="text-right text-sm font-medium col-span-1 pt-2">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Tell the story behind these photos..."
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, description: e.target.value }))}
                  className="col-span-3 resize-none h-20"
                  disabled={isUploading}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  if (!isUploading) {
                    clearUploadedFiles();
                    setIsDialogOpen(false);
                  }
                }}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button onClick={handleSavePhotos} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Save Photos
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}