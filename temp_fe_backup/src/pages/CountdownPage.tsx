import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format, differenceInSeconds } from "date-fns";
import { Calendar as CalendarIcon, Heart, Clock, X, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useSound } from "@/lib/SoundContext";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Countdown {
  id: string;
  title: string;
  date: Date;
  description: string;
  timeLeft?: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export default function CountdownPage() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [newCountdown, setNewCountdown] = useState<Omit<Countdown, "id">>({
    title: "",
    date: new Date(),
    description: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { playClick } = useSound();

  // Load countdowns from local storage
  useEffect(() => {
    const savedCountdowns = localStorage.getItem("loveCountdowns");
    if (savedCountdowns) {
      try {
        const parsed = JSON.parse(savedCountdowns);
        const validCountdowns = parsed.map((countdown: any) => ({
          ...countdown,
          date: new Date(countdown.date)
        }));
        setCountdowns(validCountdowns);
      } catch (error) {
        console.error("Error parsing saved countdowns:", error);
      }
    }
  }, []);

  // Save countdowns to local storage
  useEffect(() => {
    if (countdowns.length > 0) {
      localStorage.setItem("loveCountdowns", JSON.stringify(countdowns));
    }
  }, [countdowns]);

  // Update countdown timers
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns(current =>
        current.map(countdown => {
          const seconds = differenceInSeconds(new Date(countdown.date), new Date());
          if (seconds <= 0) {
            return {
              ...countdown,
              timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 }
            };
          }
          
          const days = Math.floor(seconds / (60 * 60 * 24));
          const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
          const minutes = Math.floor((seconds % (60 * 60)) / 60);
          const remainingSeconds = seconds % 60;
          
          return {
            ...countdown,
            timeLeft: {
              days,
              hours,
              minutes,
              seconds: remainingSeconds
            }
          };
        })
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleCreateCountdown = () => {
    playClick();
    
    if (!newCountdown.title || !newCountdown.date) {
      toast({
        title: "Missing information",
        description: "Please provide a title and date for your countdown.",
        variant: "destructive"
      });
      return;
    }
    
    const now = new Date();
    if (newCountdown.date <= now) {
      toast({
        title: "Invalid date",
        description: "Please select a future date for your countdown.",
        variant: "destructive"
      });
      return;
    }
    
    const newCountdownItem: Countdown = {
      ...newCountdown,
      id: Date.now().toString()
    };
    
    setCountdowns(prev => [...prev, newCountdownItem]);
    setNewCountdown({
      title: "",
      date: new Date(),
      description: ""
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Countdown created",
      description: "Your romantic countdown has been created successfully."
    });
  };
  
  const handleDeleteCountdown = (id: string) => {
    playClick();
    setCountdowns(prev => prev.filter(countdown => countdown.id !== id));
    toast({
      title: "Countdown deleted",
      description: "Your countdown has been removed."
    });
  };

  // Format number with leading zero
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
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
            Count Every Moment
          </div>
          <h1 className="text-3xl md:text-4xl font-script mb-6 text-gray-800">
            Romantic Countdown Timer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light tracking-wide">
            Create beautiful countdowns for your special moments and anniversaries.
          </p>
        </motion.div>

        {/* Create countdown button */}
        <div className="flex justify-center mb-10">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => playClick()}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Countdown
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create a Romantic Countdown</DialogTitle>
                <DialogDescription>
                  Set up a countdown for your special moments, anniversaries, or upcoming dates.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right text-sm font-medium col-span-1">
                    Title
                  </label>
                  <Input
                    id="title"
                    placeholder="Anniversary, Date Night, etc."
                    value={newCountdown.title}
                    onChange={(e) => setNewCountdown(prev => ({ ...prev, title: e.target.value }))}
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
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newCountdown.date ? (
                            format(newCountdown.date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newCountdown.date}
                          onSelect={(date) => date && setNewCountdown(prev => ({ ...prev, date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="description" className="text-right text-sm font-medium col-span-1">
                    Description
                  </label>
                  <Input
                    id="description"
                    placeholder="Why this day is special... (optional)"
                    value={newCountdown.description}
                    onChange={(e) => setNewCountdown(prev => ({ ...prev, description: e.target.value }))}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateCountdown}>
                  <Save className="w-4 h-4 mr-2" />
                  Create Countdown
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Countdowns list */}
        {countdowns.length === 0 ? (
          <div className="text-center p-12 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No countdowns yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Create your first countdown to start tracking special moments in your relationship.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countdowns.map((countdown) => (
              <motion.div
                key={countdown.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-4 opacity-70 hover:opacity-100"
                      onClick={() => handleDeleteCountdown(countdown.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <CardTitle className="font-heading text-xl">{countdown.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                      {format(countdown.date, "PPP")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {countdown.description && (
                      <p className="text-gray-600 text-sm mb-4">{countdown.description}</p>
                    )}
                    
                    {countdown.timeLeft && (
                      <div className="grid grid-cols-4 gap-2 text-center p-2">
                        <div className="flex flex-col">
                          <div className="text-2xl font-semibold text-gray-800">
                            {formatNumber(countdown.timeLeft.days)}
                          </div>
                          <div className="text-xs text-gray-500">days</div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-2xl font-semibold text-gray-800">
                            {formatNumber(countdown.timeLeft.hours)}
                          </div>
                          <div className="text-xs text-gray-500">hours</div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-2xl font-semibold text-gray-800">
                            {formatNumber(countdown.timeLeft.minutes)}
                          </div>
                          <div className="text-xs text-gray-500">mins</div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-2xl font-semibold text-gray-800">
                            {formatNumber(countdown.timeLeft.seconds)}
                          </div>
                          <div className="text-xs text-gray-500">secs</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-center border-t border-gray-100">
                    <Heart className="text-primary fill-primary h-5 w-5 animate-pulse" />
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}