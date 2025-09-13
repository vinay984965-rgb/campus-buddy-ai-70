import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Utensils, 
  BookOpen, 
  FileText,
  Clock,
  Users,
  Send,
  Sparkles
} from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const quickActions = [
  { icon: Calendar, label: "Class Schedule", query: "Show me my class schedule" },
  { icon: MapPin, label: "Campus Map", query: "I need directions on campus" },
  { icon: Utensils, label: "Dining Hours", query: "What are the dining hall hours?" },
  { icon: BookOpen, label: "Library Services", query: "Tell me about library services" },
  { icon: FileText, label: "Admin Services", query: "I need help with administrative procedures" },
  { icon: Users, label: "Student Activities", query: "What student activities are available?" },
];

const campusInfo = [
  {
    title: "Academic Calendar",
    description: "Important dates and deadlines",
    status: "Active",
    icon: Calendar,
  },
  {
    title: "Campus Facilities",
    description: "Buildings, labs, and services",
    status: "Available",
    icon: MapPin,
  },
  {
    title: "Dining Services",
    description: "Meal plans and restaurant hours",
    status: "Open",
    icon: Utensils,
  },
  {
    title: "Library System",
    description: "Resources and study spaces",
    status: "24/7",
    icon: BookOpen,
  },
];

export default function CampusAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Smart Campus Assistant. I can help you with schedules, facilities, dining, library services, and administrative procedures. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(message),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("schedule") || lowerQuery.includes("class")) {
      return "I can help you with your class schedule! Your classes today are: \n\n• Computer Science 101 - 9:00 AM (Room A204)\n• Mathematics 201 - 11:00 AM (Room B105)\n• Physics Lab - 2:00 PM (Lab Building C)\n\nWould you like me to show you directions to any of these locations?";
    }
    
    if (lowerQuery.includes("dining") || lowerQuery.includes("food")) {
      return "Here are today's dining options:\n\n🍽️ **Main Dining Hall**\nBreakfast: 7:00 AM - 10:00 AM\nLunch: 11:30 AM - 2:30 PM\nDinner: 5:00 PM - 8:00 PM\n\n☕ **Campus Café**\nOpen: 7:00 AM - 6:00 PM\nSpecialty coffees and light snacks\n\n🍕 **Student Union Food Court**\nOpen: 10:00 AM - 10:00 PM\nMultiple vendors available";
    }
    
    if (lowerQuery.includes("library") || lowerQuery.includes("book")) {
      return "📚 **Library Services Available:**\n\n• **Main Library**: Open 24/7 during finals week\n• **Research Assistance**: Available 9 AM - 5 PM\n• **Computer Lab**: 50 workstations available\n• **Study Rooms**: Book online or walk-in\n• **Printing Services**: $0.10 per page\n\nCurrent occupancy: 65% - Plenty of study spaces available!";
    }
    
    if (lowerQuery.includes("map") || lowerQuery.includes("direction")) {
      return "🗺️ **Campus Navigation Help:**\n\nI can provide directions to:\n• Academic buildings (A, B, C blocks)\n• Student services (Admin building)\n• Recreation facilities (Gym, Pool)\n• Dining locations\n• Parking areas\n\nWhich specific location do you need directions to?";
    }
    
    if (lowerQuery.includes("admin") || lowerQuery.includes("office")) {
      return "🏢 **Administrative Services:**\n\n• **Registrar's Office**: Transcripts, enrollment\n• **Financial Aid**: Scholarships, loans\n• **Student Accounts**: Billing, payments\n• **Career Services**: Job placement, internships\n• **Health Services**: Medical, counseling\n\nMost offices are open Monday-Friday, 8:00 AM - 5:00 PM. Which service do you need?";
    }

    return "I understand you're looking for campus information. I can help you with:\n\n• Class schedules and academic calendar\n• Campus facilities and directions\n• Dining services and meal plans\n• Library resources and hours\n• Administrative procedures\n• Student activities and events\n\nCould you be more specific about what you'd like to know?";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="h-64 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
          <div className="relative z-10 flex h-full items-center justify-center text-center">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-8 w-8 text-accent animate-pulse" />
                <h1 className="text-4xl font-bold text-primary-foreground">
                  Smart Campus Assistant
                </h1>
              </div>
              <p className="text-xl text-primary-foreground/90 max-w-2xl">
                Your AI-powered guide to campus life. Get instant answers about schedules, facilities, dining, and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-campus-secondary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Get instant help with common campus queries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="campus-ghost"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => sendMessage(action.query)}
                  >
                    <action.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Campus Info Cards */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Campus Services</CardTitle>
                <CardDescription>
                  Current status of key services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {campusInfo.map((info, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <info.icon className="h-4 w-4 text-campus-secondary" />
                      <div>
                        <p className="font-medium text-sm">{info.title}</p>
                        <p className="text-xs text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {info.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant h-[600px] flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Campus Chat Assistant</CardTitle>
                    <CardDescription>
                      Ask me anything about campus services and information
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    Online
                  </Badge>
                </div>
                <Separator />
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.isUser
                            ? "bg-campus-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="whitespace-pre-line text-sm">{message.content}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-campus-secondary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-campus-secondary rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-campus-secondary rounded-full animate-bounce delay-200"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">Assistant is typing...</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Input */}
                <div className="p-6 pt-0">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Ask about schedules, facilities, dining, or anything else..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          sendMessage(inputMessage);
                        }
                      }}
                      className="flex-1"
                    />
                    <Button 
                      variant="campus" 
                      size="icon"
                      onClick={() => sendMessage(inputMessage)}
                      disabled={!inputMessage.trim() || isTyping}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}