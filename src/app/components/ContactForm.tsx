"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  MapPin,
  Calendar,
  CheckCircle,
  Loader,
  Upload,
  Clock,
  Copy,
  Star,
  Save,
  X,
  Paperclip,
  MessageSquareCode,
  Wifi,
  WifiOff,
  Send,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Ably from "ably";
import axios from "axios";

// TypeScript interfaces
interface FormValues {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact: "email" | "phone" | "whatsapp";
  hearAbout: string;
  subscribe?: boolean;
  saveInfo?: boolean;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
}

// Form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  preferredContact: z.enum(["email", "phone", "whatsapp"], {
    message: "Please select a preferred contact method.",
  }),
  hearAbout: z.string().min(1, {
    message: "Please let us know how you heard about us.",
  }),
  subscribe: z.boolean().optional(),
  saveInfo: z.boolean().optional(),
});

// Memoized options to prevent unnecessary re-renders
const useContactOptions = () =>
  useMemo(
    () => [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "whatsapp", label: "WhatsApp" },
    ],
    []
  );

const useHearAboutOptions = () =>
  useMemo(
    () => [
      { value: "", label: "Select an option" },
      { value: "social-media", label: "Social Media" },
      { value: "google", label: "Google Search" },
      { value: "referral", label: "Friend/Colleague Referral" },
      { value: "other", label: "Other" },
    ],
    []
  );

const useTimeOptions = () =>
  useMemo(
    () => [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
    ],
    []
  );

const useMeetingTypeOptions = () =>
  useMemo(() => ["Video Call", "Phone Call", "In-Person"], []);

// Main Contact Form Component
export const ContactForm = memo(() => {
  // State declarations
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [draftSaved, setDraftSaved] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newChatMessage, setNewChatMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "sending" | "error" | "fast" | "stable" | "connected"
  >("connected");
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<
    "granted" | "denied" | "pending"
  >("pending");

  // Ably state
  const [ablyClient, setAblyClient] = useState<Ably.Realtime | null>(null);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const draftTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const locationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Form initialization
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      preferredContact: "email",
      hearAbout: "",
      subscribe: false,
      saveInfo: false,
    },
  });

  // Get memoized options
  const contactOptions = useContactOptions();
  const hearAboutOptions = useHearAboutOptions();
  const timeOptions = useTimeOptions();
  const meetingTypeOptions = useMeetingTypeOptions();

  // Fetch chat messages
  const fetchChatMessages = useCallback(async () => {
    try {
      const response = await axios.get("/api/chat");
      const data = response.data;
      if (data.success) {
        setChatMessages(
          data.data.map(
            (msg: {
              id: string;
              text: string;
              sender: string;
              timestamp: string;
            }) => ({
              id: msg.id.toString(),
              text: msg.text,
              sender: msg.sender,
              timestamp: new Date(msg.timestamp),
            })
          )
        );
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  }, []);

  // Load saved information from localStorage
  useEffect(() => {
    const loadSavedInfo = () => {
      try {
        const savedInfo = localStorage.getItem("contactFormInfo");
        if (savedInfo) {
          const parsedInfo = JSON.parse(savedInfo);
          form.setValue("name", parsedInfo.name || "");
          form.setValue("email", parsedInfo.email || "");
          form.setValue("phone", parsedInfo.phone || "");
        }
        const savedDraft = localStorage.getItem("contactFormDraft");
        if (savedDraft) {
          const draft = JSON.parse(savedDraft);
          form.setValue("name", draft.name || "");
          form.setValue("email", draft.email || "");
          form.setValue("phone", draft.phone || "");
          form.setValue("subject", draft.subject || "");
          form.setValue("message", draft.message || "");
          form.setValue("preferredContact", draft.preferredContact || "email");
          form.setValue("hearAbout", draft.hearAbout || "");
          form.setValue("subscribe", draft.subscribe || false);
          form.setValue("saveInfo", draft.saveInfo || false);
          setMessageLength(draft.message?.length || 0);
        }
      } catch (error) {
        console.error("Error loading saved info:", error);
      }
    };
    loadSavedInfo();
  }, [form]);

  // Auto-save draft with debouncing
  useEffect(() => {
    const subscription = form.watch((value, { type }) => {
      if (type === "change") {
        if (draftTimeoutRef.current) {
          clearTimeout(draftTimeoutRef.current);
        }
        draftTimeoutRef.current = setTimeout(() => {
          setDraftSaved(true);
          localStorage.setItem("contactFormDraft", JSON.stringify(value));
          const timer = setTimeout(() => {
            setDraftSaved(false);
          }, 2000);
          return () => clearTimeout(timer);
        }, 500);
      }
    });
    return () => {
      subscription.unsubscribe();
      if (draftTimeoutRef.current) {
        clearTimeout(draftTimeoutRef.current);
      }
    };
  }, [form]);

  // Get user location
  useEffect(() => {
    const fetchLocation = async () => {
      setLocationLoading(true);
      setLocationError(null);
      setLocationPermission("pending");
      try {
        if (navigator.geolocation) {
          const permissionStatus = await navigator.permissions.query({
            name: "geolocation",
          });
          setLocationPermission(
            permissionStatus.state as "granted" | "denied" | "pending"
          );
          if (
            permissionStatus.state === "granted" ||
            permissionStatus.state === "prompt"
          ) {
            const position = await new Promise<GeolocationPosition>(
              (resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                  enableHighAccuracy: true,
                  timeout: 10000,
                  maximumAge: 300000,
                });
              }
            );
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const data = response.data;
              const { locality, city, countryName } = data;
              const location = locality || city;
              setUserLocation(`${location}, ${countryName}`);
            } catch (error) {
              console.error("Error reverse geocoding:", error);
              await fetchIPLocation();
            }
          } else {
            await fetchIPLocation();
          }
        } else {
          await fetchIPLocation();
        }
      } catch (error) {
        console.error("Error getting location:", error);
        setLocationError("Unable to get your location");
        await fetchIPLocation();
      } finally {
        setLocationLoading(false);
      }
    };

    const fetchIPLocation = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        const data = response.data;
        const { city, country_name } = data;
        setUserLocation(`${city}, ${country_name}`);
      } catch (error) {
        console.error("Error fetching IP location:", error);
        setUserLocation("Unknown location");
      }
    };

    fetchLocation();
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Initialize Ably when chat is opened
  useEffect(() => {
    if (showChat) {
      const client = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_API_KEY!);
      setAblyClient(client);
      client.connection.on("connected", () => {
        console.log("Connected to Ably");
        const channel = client.channels.get("contact-chat");
        channel.subscribe("message", (message: Ably.Message) => {
          const { id, text, sender, timestamp } = message.data;
          if (sender === "support") {
            setChatMessages((prev) => [
              ...prev,
              {
                id,
                text,
                sender,
                timestamp: new Date(timestamp),
              },
            ]);
          }
        });
      });
    } else {
      if (ablyClient) {
        ablyClient.close();
        setAblyClient(null);
      }
    }
    return () => {
      if (ablyClient) {
        ablyClient.close();
      }
    };
  }, [showChat, ablyClient]);

  // Fetch chat messages when chat is opened
  useEffect(() => {
    if (showChat) {
      fetchChatMessages();
    }
  }, [showChat, fetchChatMessages]);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    const currentLocationTimeout = locationTimeoutRef.current;
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (draftTimeoutRef.current) {
        clearTimeout(draftTimeoutRef.current);
      }
      if (currentLocationTimeout) {
        clearTimeout(currentLocationTimeout);
      }
    };
  }, []);

  // Memoized handlers
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
      }
    },
    []
  );

  const removeFile = useCallback(
    (index: number) => {
      setFiles(files.filter((_, i) => i !== index));
    },
    [files]
  );

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem("contactFormDraft");
    form.reset();
    setMessageLength(0);
    toast.success("Draft cleared!");
  }, [form]);

  const handleChatInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewChatMessage(e.target.value);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      setIsTyping(true);
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    },
    []
  );

  const sendChatMessage = useCallback(async () => {
    if (newChatMessage.trim() === "") return;
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: newChatMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setNewChatMessage("");
    setIsTyping(false);
    try {
      const response = await axios.post("/api/chat", {
        message: newChatMessage,
        sender: "user",
        channelId: "contact-chat",
      });
      const data = response.data;
      if (data.success) {
        console.log("Message sent to API and Ably");
      }
    } catch (error) {
      console.error("Error sending chat message:", error);
      toast.error("Failed to send message");
    }
  }, [newChatMessage]);

  const handleSchedulerOpen = useCallback(() => {
    setShowScheduler(true);
  }, []);

  const handleChatOpen = useCallback(() => {
    setShowChat(true);
  }, []);

  const handleSchedulerClose = useCallback(() => {
    setShowScheduler(false);
  }, []);

  const handleChatClose = useCallback(() => {
    setShowChat(false);
  }, []);

  const handleScheduleMeeting = useCallback(async () => {
    try {
      const response = await axios.post("/api/meeting", {
        date: "2023-12-15",
        time: "10:00 AM",
        type: "Video Call",
        email: "user@example.com",
        name: "User Name",
      });
      const data = response.data;
      if (data.success) {
        toast.success("Meeting scheduled successfully!");
        setShowScheduler(false);
      } else {
        toast.error(data.message || "Failed to schedule meeting");
      }
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast.error("Failed to schedule meeting");
    }
  }, []);

  // Memoized status functions
  const getStatusColor = useCallback(() => {
    switch (connectionStatus) {
      case "sending":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      case "fast":
        return "text-green-500";
      case "stable":
        return "text-blue-500";
      default:
        return "text-green-500";
    }
  }, [connectionStatus]);

  const getStatusText = useCallback(() => {
    switch (connectionStatus) {
      case "sending":
        return "Sending...";
      case "error":
        return "Connection error";
      case "fast":
        return "Fast connection";
      case "stable":
        return "Stable connection";
      default:
        return "Connected";
    }
  }, [connectionStatus]);

  const getStatusIcon = useCallback(() => {
    switch (connectionStatus) {
      case "sending":
        return <Loader className="w-4 h-4 animate-spin" />;
      case "error":
        return <AlertCircle className="w-4 h-4" />;
      case "fast":
        return <Wifi className="w-4 h-4" />;
      case "stable":
        return <Wifi className="w-4 h-4" />;
      default:
        return <Wifi className="w-4 h-4" />;
    }
  }, [connectionStatus]);

  const getLocationStatusText = useCallback(() => {
    if (locationLoading) return "Detecting your location...";
    if (locationError) return locationError;
    if (locationPermission === "denied") return "Location access denied";
    return userLocation || "Dhaka, Bangladesh";
  }, [locationLoading, locationError, locationPermission, userLocation]);

  const getLocationStatusColor = useCallback(() => {
    if (locationLoading) return "text-blue-500";
    if (locationError) return "text-red-500";
    if (locationPermission === "denied") return "text-amber-500";
    return "text-slate-600 dark:text-slate-300";
  }, [locationLoading, locationError, locationPermission]);

  // Form submission handler
  const onSubmit = useCallback(
    async (values: FormValues) => {
      if (!isOnline) {
        toast.error("You're offline. Please check your internet connection.");
        return;
      }
      setIsSubmitting(true);
      setConnectionStatus("sending");
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        if (values.phone) {
          formData.append("phone", values.phone);
        }
        formData.append("subject", values.subject);
        formData.append("preferredContact", values.preferredContact);
        if (values.hearAbout) {
          formData.append("hearAbout", values.hearAbout);
        }
        formData.append("message", values.message);
        formData.append("subscribe", (values.subscribe ?? false).toString());
        formData.append("saveInfo", (values.saveInfo ?? false).toString());
        files.forEach((file) => {
          formData.append("files", file);
        });
        formData.append("location", userLocation || "Unknown");
        const response = await axios.post("/api/contact", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const data = response.data;
        if (data.success) {
          toast.success("Message sent successfully!");
          if (values.saveInfo) {
            localStorage.setItem(
              "contactFormInfo",
              JSON.stringify({
                name: values.name,
                email: values.email,
                phone: values.phone,
              })
            );
          } else {
            localStorage.removeItem("contactFormInfo");
          }
          localStorage.removeItem("contactFormDraft");
          form.reset();
          setFiles([]);
          setMessageLength(0);
          setIsSubmitted(true);
          setConnectionStatus("connected");
          setTimeout(() => setIsSubmitted(false), 5000);
        } else {
          toast.error(
            data.message || "Failed to send message. Please try again."
          );
          setConnectionStatus("error");
        }
      } catch (error: unknown) {
        console.error("Error submitting form:", error);
        toast.error("An unexpected error occurred. Please try again.");
        setConnectionStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, files, isOnline, userLocation]
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
                Have a question or want to work together? Send me a message and
                I&apos;ll get back to you as soon as possible.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isOnline ? (
                <div className="flex items-center gap-1 text-green-500">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm">Online</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-500">
                  <WifiOff className="w-4 h-4" />
                  <span className="text-sm">Offline</span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Email
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard("codeswithrakib@gmail.com")}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-500" />
                    )}
                  </Button>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  codeswithrakib@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Phone
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard("+880 176 747 6724")}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-500" />
                    )}
                  </Button>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  +880 176 747 6724
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Location
                  </h3>
                  {locationLoading && (
                    <Loader className="w-4 h-4 animate-spin text-blue-500" />
                  )}
                </div>
                <p className={getLocationStatusColor()}>
                  {getLocationStatusText()}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Response Time
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Within 24-48 hours
                </p>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSchedulerOpen}
                className={cn(
                  "flex items-center gap-2",
                  "border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                )}
              >
                <Calendar className="w-4 h-4" />
                Schedule Meeting
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleChatOpen}
                className={cn(
                  "flex items-center gap-2",
                  "border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                )}
              >
                <MessageSquareCode className="w-4 h-4" />
                Live Chat
              </Button>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-200 dark:border-slate-700/80">
            <h3 className="font-medium text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Connect with me
            </h3>
            <div className="flex gap-3">
              {[
                {
                  name: "GitHub",
                  icon: <Github className="w-4 h-4" />,
                  className:
                    "bg-gray-800 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 text-white dark:text-gray-800",
                  url: "https://github.com/codeswithrakib",
                },
                {
                  name: "LinkedIn",
                  icon: <Linkedin className="w-4 h-4" />,
                  className:
                    "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white",
                  url: "https://linkedin.com/in/codeswithrakib",
                },
                {
                  name: "Twitter",
                  icon: <Twitter className="w-4 h-4" />,
                  className:
                    "bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black",
                  url: "https://twitter.com/codeswithrakib",
                },
                {
                  name: "Email",
                  icon: <Mail className="w-4 h-4" />,
                  className:
                    "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 text-white",
                  url: "mailto:codeswithrakib@gmail.com",
                },
              ].map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2.5 rounded-full transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800",
                    platform.className
                  )}
                  aria-label={`Connect on ${platform.name}`}
                >
                  {platform.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              Client Reviews
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                &quot;Rakib is an exceptional developer who delivers
                high-quality work on time. Highly recommended!&quot;
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                - Sarah Johnson, CEO at TechCorp
              </p>
            </div>
          </div>
        </div>
        {/* Contact Form */}
        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 dark:border-blue-900/30 p-8">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Thank you for reaching out. I&apos;ll get back to you soon.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="mt-4 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Send a Message
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex items-center gap-1 text-sm",
                        getStatusColor()
                      )}
                    >
                      {getStatusIcon()}
                      {getStatusText()}
                    </span>
                    {draftSaved && (
                      <span className="flex items-center gap-1 text-sm text-green-500">
                        <Save className="w-3 h-3" />
                        Draft saved
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-slate-900 dark:text-white">
                          <User className="w-4 h-4 text-blue-500" />
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className="bg-white dark:bg-slate-800/50 border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-slate-900 dark:text-white">
                          <Mail className="w-4 h-4 text-blue-500" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            {...field}
                            className="bg-white dark:bg-slate-800/50 border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-slate-900 dark:text-white">
                          <Phone className="w-4 h-4 text-blue-500" />
                          Phone (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+880 176 747 6724"
                            {...field}
                            className="bg-white dark:bg-slate-800/50 border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-slate-900 dark:text-white">
                          <FileText className="w-4 h-4 text-blue-500" />
                          Subject
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What's this about?"
                            {...field}
                            className="bg-white dark:bg-slate-800/50 border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="preferredContact"
                  render={({}) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-slate-900 dark:text-white">
                        <Clock className="w-4 h-4 text-blue-500" />
                        Preferred Contact Method
                      </FormLabel>
                      <FormControl>
                        <Controller
                          name="preferredContact"
                          control={form.control}
                          render={({ field }) => (
                            <div className="grid grid-cols-3 gap-3">
                              {contactOptions.map((option) => (
                                <Button
                                  key={option.value}
                                  type="button"
                                  variant={
                                    field.value === option.value
                                      ? "default"
                                      : "outline"
                                  }
                                  className={cn(
                                    "w-full",
                                    field.value === option.value
                                      ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-md"
                                      : "border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                  )}
                                  onClick={() => field.onChange(option.value)}
                                >
                                  {option.label}
                                </Button>
                              ))}
                            </div>
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hearAbout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-900 dark:text-white">
                        How did you hear about me?
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full p-3 bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-800 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-500"
                        >
                          {hearAboutOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-slate-900 dark:text-white">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message here..."
                          className="min-h-[150px] bg-white dark:bg-slate-800/50 border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500 resize-none"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setMessageLength(e.target.value.length);
                          }}
                        />
                      </FormControl>
                      <div className="flex justify-between items-center">
                        <FormMessage />
                        <span
                          className={cn(
                            "text-xs",
                            messageLength > 5000
                              ? "text-red-500"
                              : messageLength > 4000
                                ? "text-amber-500"
                                : "text-slate-500 dark:text-slate-400"
                          )}
                        >
                          {messageLength}/5000
                        </span>
                      </div>
                    </FormItem>
                  )}
                />
                {/* File Upload */}
                <div>
                  <FormLabel className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <Paperclip className="w-4 h-4 text-blue-500" />
                    Attachments (Optional)
                  </FormLabel>
                  <div className="mt-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      multiple
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className={cn(
                        "w-full flex items-center gap-2",
                        "border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      )}
                    >
                      <Upload className="w-4 h-4" />
                      Choose Files
                    </Button>
                    {files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md border border-blue-100 dark:border-blue-900/30"
                          >
                            <span className="text-sm truncate max-w-[200px] text-slate-700 dark:text-slate-300">
                              {file.name}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-slate-500 hover:text-red-500 dark:hover:text-red-400"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Max file size: 5MB each. Total attachments: 10MB. Allowed
                      formats: PDF, DOC, DOCX, JPG, PNG.
                    </p>
                  </div>
                </div>
                {/* Checkboxes */}
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="subscribe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value ?? false}
                            onChange={field.onChange}
                            className="mt-1 accent-blue-600 dark:accent-blue-500"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-slate-900 dark:text-white">
                            Subscribe to my newsletter for updates
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="saveInfo"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value ?? false}
                            onChange={field.onChange}
                            className="mt-1 accent-blue-600 dark:accent-blue-500"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-2 text-slate-900 dark:text-white">
                            <Save className="w-4 h-4 text-blue-500" />
                            Save my information for next time
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isOnline}
                    className={cn(
                      "flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearDraft}
                    className="border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    Clear Draft
                  </Button>
                </div>
                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                  By submitting this form, you agree to our privacy policy.
                  We&apos;ll never share your information with third parties.
                </p>
              </form>
            </Form>
          )}
        </div>
      </div>
      {/* Meeting Scheduler Modal */}
      <AnimatePresence>
        {showScheduler && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleSchedulerClose}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-blue-100 dark:border-blue-900/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Schedule a Meeting
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSchedulerClose}
                  className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Select a time that works for you. I&apos;ll send you a calendar
                invitation.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-800 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-500"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Time
                  </label>
                  <select className="w-full p-3 bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-800 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-500">
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Meeting Type
                  </label>
                  <select className="w-full p-3 bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-800 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-500">
                    {meetingTypeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white"
                  onClick={handleScheduleMeeting}
                >
                  Schedule Meeting
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Live Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-2xl border border-blue-100 dark:border-blue-900/30 w-80 h-96 flex flex-col">
              <div className="p-4 border-b border-blue-100 dark:border-blue-900/30 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="absolute inset-0 rounded-full bg-green-500 animate-ping"></div>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    Live Chat
                  </h3>
                  <div className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-green-600 dark:text-green-400">
                      Online
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleChatClose}
                  className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div
                ref={chatContainerRef}
                className="flex-1 p-4 overflow-y-auto"
              >
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] p-3 rounded-lg",
                          message.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-blue-100 dark:bg-blue-900/30 text-slate-700 dark:text-slate-300"
                        )}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg max-w-[80%]">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                          <div
                            className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 border-t border-blue-100 dark:border-blue-900/30">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newChatMessage}
                    onChange={handleChatInputChange}
                    placeholder="Type a message..."
                    className="flex-1 p-2 bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-800 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-500 text-sm"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendChatMessage();
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={sendChatMessage}
                    disabled={!newChatMessage.trim()}
                    className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

ContactForm.displayName = "ContactForm";
