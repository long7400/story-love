import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useSound } from "@/lib/SoundContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Quiz data
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What makes you feel most appreciated in your relationship?",
    options: [
      { id: "a", text: "When your partner gives you a thoughtful gift", type: "gifts" },
      { id: "b", text: "When your partner tells you they love you", type: "words" },
      { id: "c", text: "When your partner helps you with tasks", type: "acts" },
      { id: "d", text: "When your partner gives you their undivided attention", type: "time" },
      { id: "e", text: "When your partner shows physical affection", type: "touch" }
    ]
  },
  {
    id: 2,
    question: "How do you prefer to show love to your partner?",
    options: [
      { id: "a", text: "By buying or making them gifts", type: "gifts" },
      { id: "b", text: "By telling them how much they mean to you", type: "words" },
      { id: "c", text: "By doing things to make their life easier", type: "acts" },
      { id: "d", text: "By spending quality time together", type: "time" },
      { id: "e", text: "Through physical touch and affection", type: "touch" }
    ]
  },
  {
    id: 3,
    question: "What hurts you most in your relationship?",
    options: [
      { id: "a", text: "When your partner forgets special occasions", type: "gifts" },
      { id: "b", text: "When your partner rarely compliments you", type: "words" },
      { id: "c", text: "When your partner doesn't help with responsibilities", type: "acts" },
      { id: "d", text: "When your partner is often distracted when you're together", type: "time" },
      { id: "e", text: "When your partner shows little physical affection", type: "touch" }
    ]
  },
  {
    id: 4,
    question: "Which of these gestures would mean the most to you?",
    options: [
      { id: "a", text: "Receiving a surprise gift", type: "gifts" },
      { id: "b", text: "Hearing why you're special to them", type: "words" },
      { id: "c", text: "Having them take care of a task you dislike", type: "acts" },
      { id: "d", text: "Going on a special date together", type: "time" },
      { id: "e", text: "Holding hands or cuddling", type: "touch" }
    ]
  },
  {
    id: 5,
    question: "What do you wish your partner would do more often?",
    options: [
      { id: "a", text: "Give you small tokens of appreciation", type: "gifts" },
      { id: "b", text: "Express their feelings and appreciation verbally", type: "words" },
      { id: "c", text: "Help around the house without being asked", type: "acts" },
      { id: "d", text: "Set aside uninterrupted time for just the two of you", type: "time" },
      { id: "e", text: "Be more physically affectionate", type: "touch" }
    ]
  },
  {
    id: 6,
    question: "Which of these actions would make you feel most loved?",
    options: [
      { id: "a", text: "Your partner remembering something you wanted and getting it for you", type: "gifts" },
      { id: "b", text: "Your partner leaving you a loving note", type: "words" },
      { id: "c", text: "Your partner making breakfast for you", type: "acts" },
      { id: "d", text: "Your partner planning a special outing with just the two of you", type: "time" },
      { id: "e", text: "Your partner giving you a massage after a long day", type: "touch" }
    ]
  },
  {
    id: 7,
    question: "What makes you feel most connected to your partner?",
    options: [
      { id: "a", text: "Exchanging meaningful gifts", type: "gifts" },
      { id: "b", text: "Deep conversations where you share your feelings", type: "words" },
      { id: "c", text: "Working together on tasks or projects", type: "acts" },
      { id: "d", text: "Having experiences and creating memories together", type: "time" },
      { id: "e", text: "Physical closeness and intimacy", type: "touch" }
    ]
  }
];

// Results descriptions
const LOVE_LANGUAGES = {
  gifts: {
    title: "Receiving Gifts",
    description: "You value thoughtful gifts as symbols of love and appreciation. It's not about materialism but rather the thought, effort, and symbolic meaning behind the gifts.",
    tips: [
      "Keep a wish list of items your partner might like",
      "Remember that gifts don't need to be expensive to be meaningful",
      "Pay attention to mentions of things they might like",
      "Mark special occasions with thoughtful presents"
    ]
  },
  words: {
    title: "Words of Affirmation",
    description: "You value verbal expressions of love and appreciation. Hearing 'I love you' and receiving compliments and encouragement are deeply meaningful to you.",
    tips: [
      "Express your feelings verbally often",
      "Leave notes or send messages of appreciation",
      "Give specific, genuine compliments",
      "Acknowledge their efforts and achievements"
    ]
  },
  acts: {
    title: "Acts of Service",
    description: "You feel loved when your partner does things to help you. Actions speak louder than words for you, and you value when someone puts effort into making your life easier.",
    tips: [
      "Look for ways to lighten your partner's load",
      "Complete tasks they dislike without being asked",
      "Follow through on promises to do things",
      "Ask what would be most helpful to them"
    ]
  },
  time: {
    title: "Quality Time",
    description: "You cherish focused, uninterrupted time together. Having your partner's full attention and sharing experiences creates the deepest connection for you.",
    tips: [
      "Schedule regular date nights",
      "Put away phones and distractions during time together",
      "Plan activities you both enjoy",
      "Create meaningful rituals of connection"
    ]
  },
  touch: {
    title: "Physical Touch",
    description: "You feel most connected through physical affection. Hugs, kisses, holding hands, and other forms of touch communicate love and security to you.",
    tips: [
      "Incorporate casual touches throughout the day",
      "Hold hands when walking together",
      "Offer hugs, kisses, or back rubs",
      "Sit close to each other during activities"
    ]
  }
};

export default function LoveLanguageQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const [primaryLanguage, setPrimaryLanguage] = useState<string | null>(null);
  const { toast } = useToast();
  const { playClick } = useSound();

  const totalQuestions = QUIZ_QUESTIONS.length;
  const progress = ((currentQuestion) / totalQuestions) * 100;
  
  const handleSelectOption = (questionId: number, optionType: string) => {
    playClick();
    
    // Save answer
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionType
    }));
    
    // Move to next question or calculate results
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };
  
  const calculateResults = () => {
    const tally: Record<string, number> = {
      gifts: 0,
      words: 0,
      acts: 0,
      time: 0,
      touch: 0
    };
    
    // Count up answers by type
    Object.values(answers).forEach(type => {
      tally[type] = (tally[type] || 0) + 1;
    });
    
    // Find primary love language
    let max = 0;
    let primary: string | null = null;
    
    Object.entries(tally).forEach(([type, count]) => {
      if (count > max) {
        max = count;
        primary = type;
      }
    });
    
    setResults(tally);
    setPrimaryLanguage(primary);
  };
  
  const resetQuiz = () => {
    playClick();
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
    setPrimaryLanguage(null);
  };
  
  const handleShare = () => {
    playClick();
    toast({
      title: "Share Your Results",
      description: "This feature would allow sharing your love language results."
    });
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
            Understand Your Connection
          </div>
          <h1 className="text-3xl md:text-4xl font-script mb-6 text-gray-800">
            Love Language Quiz
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light tracking-wide">
            Discover how you prefer to give and receive love to deepen your connection.
          </p>
        </motion.div>

        {/* Quiz content */}
        <div className="max-w-3xl mx-auto">
          {!results ? (
            <Card className="border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Question {currentQuestion + 1} of {totalQuestions}</span>
                  <span className="text-sm font-normal text-gray-500">{Math.round(progress)}%</span>
                </CardTitle>
                <Progress value={progress} className="h-2" />
                <CardDescription className="text-xl font-heading mt-4">
                  {QUIZ_QUESTIONS[currentQuestion].question}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {QUIZ_QUESTIONS[currentQuestion].options.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="w-full justify-start text-left py-6 h-auto border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentQuestion].id, option.type)}
                  >
                    <div className="flex items-start">
                      <span className="mr-2 text-gray-400">{option.id.toUpperCase()}.</span>
                      <span>{option.text}</span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-center">Your Love Language Results</CardTitle>
                  <CardDescription className="text-center">
                    Based on your answers, here's how your love languages rank:
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(results)
                    .sort(([, a], [, b]) => b - a)
                    .map(([type, score], index) => (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{LOVE_LANGUAGES[type as keyof typeof LOVE_LANGUAGES].title}</span>
                          <span className="text-sm text-gray-500">{Math.round((score / totalQuestions) * 100)}%</span>
                        </div>
                        <Progress value={(score / totalQuestions) * 100} className="h-2" />
                      </div>
                    ))}

                  {primaryLanguage && (
                    <div className="mt-8 p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <h3 className="text-xl font-heading mb-2">Your Primary Love Language</h3>
                      <p className="font-medium text-lg mb-2">{LOVE_LANGUAGES[primaryLanguage as keyof typeof LOVE_LANGUAGES].title}</p>
                      <p className="text-gray-700 mb-4">{LOVE_LANGUAGES[primaryLanguage as keyof typeof LOVE_LANGUAGES].description}</p>
                      
                      <h4 className="font-medium mb-2">Tips for Your Relationship:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {LOVE_LANGUAGES[primaryLanguage as keyof typeof LOVE_LANGUAGES].tips.map((tip, index) => (
                          <li key={index} className="text-gray-700">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={resetQuiz}>Retake Quiz</Button>
                  <Button onClick={handleShare}>Share Results</Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}