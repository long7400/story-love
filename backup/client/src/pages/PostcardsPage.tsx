import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Download, X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSound } from "@/lib/SoundContext";

// Postcard templates
const POSTCARD_TEMPLATES = [
  {
    id: 1,
    name: "Romantic Sunset",
    bgImage: "/postcards/sunset.jpg",
    textColor: "text-white",
    shadowColor: "shadow-black/50"
  },
  {
    id: 2,
    name: "Floral Love",
    bgImage: "/postcards/floral.jpg",
    textColor: "text-gray-800",
    shadowColor: "shadow-black/30"
  },
  {
    id: 3,
    name: "Heart Pattern",
    bgImage: "/postcards/hearts.jpg",
    textColor: "text-white",
    shadowColor: "shadow-black/50"
  },
  {
    id: 4,
    name: "Minimalist",
    bgImage: "/postcards/minimalist.jpg",
    textColor: "text-gray-900",
    shadowColor: "shadow-black/20"
  }
];

export default function PostcardsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const { toast } = useToast();
  const { playClick } = useSound();

  const handleTemplateSelect = (templateId: number) => {
    playClick();
    setSelectedTemplate(templateId);
    if (!isEditing) setIsEditing(true);
  };

  const handleSavePostcard = () => {
    playClick();
    if (!recipient || !sender || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to create your postcard.",
        variant: "destructive"
      });
      return;
    }
    setIsEditing(false);
  };

  const handleShare = () => {
    playClick();
    toast({
      title: "Share Feature",
      description: "Sharing functionality would be implemented here."
    });
  };

  const handleDownload = () => {
    playClick();
    toast({
      title: "Download Feature",
      description: "Download functionality would be implemented here."
    });
  };

  const selectedPostcardTemplate = selectedTemplate
    ? POSTCARD_TEMPLATES.find(t => t.id === selectedTemplate)
    : null;

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
            Express Your Love
          </div>
          <h1 className="text-3xl md:text-4xl font-script mb-6 text-gray-800">
            Digital Love Postcards
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light tracking-wide">
            Create beautiful digital postcards to express your feelings and share them with your loved one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-heading mb-4 text-gray-800">Choose a Template</h2>
              <div className="grid grid-cols-2 gap-3">
                {POSTCARD_TEMPLATES.map(template => (
                  <div
                    key={template.id}
                    className={`aspect-[4/3] rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedTemplate === template.id
                        ? "border-primary scale-[1.02]"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${template.bgImage})` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Postcard Preview & Editor */}
          <div className="lg:col-span-2">
            {selectedTemplate ? (
              <div>
                {/* Postcard Display */}
                <div
                  className="aspect-[16/9] rounded-lg overflow-hidden relative shadow-lg mb-5"
                  style={{
                    backgroundImage: selectedPostcardTemplate
                      ? `url(${selectedPostcardTemplate.bgImage})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  {isEditing && (
                    <div className="absolute top-3 right-3 z-10">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/80 backdrop-blur-sm"
                        onClick={handleSavePostcard}
                      >
                        Save
                      </Button>
                    </div>
                  )}

                  {/* Postcard Content */}
                  <div
                    className={`absolute inset-0 p-8 flex flex-col justify-between ${
                      selectedPostcardTemplate?.textColor
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <div>
                          <Input
                            placeholder="To: Recipient's Name"
                            value={recipient}
                            onChange={e => setRecipient(e.target.value)}
                            className="bg-white/70 backdrop-blur-sm mb-2 border-white/50"
                          />
                        </div>
                        <div className="flex-1 my-3">
                          <Textarea
                            placeholder="Write your message here..."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            className="h-full bg-white/70 backdrop-blur-sm border-white/50 resize-none"
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="From: Your Name"
                            value={sender}
                            onChange={e => setSender(e.target.value)}
                            className="bg-white/70 backdrop-blur-sm mt-2 border-white/50"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={`text-xl font-script ${selectedPostcardTemplate?.shadowColor}`}>
                          To: {recipient}
                        </div>
                        <div className={`text-lg my-4 font-light ${selectedPostcardTemplate?.shadowColor}`}>
                          {message}
                        </div>
                        <div className={`text-xl font-script text-right ${selectedPostcardTemplate?.shadowColor}`}>
                          From: {sender}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {!isEditing ? (
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <div className="space-x-3">
                      <Button variant="outline" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button onClick={handleDownload}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="aspect-[16/9] rounded-lg border border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400">
                Select a template to create your postcard
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}