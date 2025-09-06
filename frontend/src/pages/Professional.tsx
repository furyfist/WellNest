import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, MapPin, Phone, User, ArrowLeft, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const Professional = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedCounselor, setSelectedCounselor] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const counselors = [
    {
      id: "dr-smith",
      name: "Dr. Sarah Smith",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Academic Stress"],
      rating: 4.9,
      reviews: 127,
      image: "/api/placeholder/80/80",
      availability: "Same day",
      location: "Campus Counseling Center",
      bio: "Dr. Smith has 8 years of experience working with college students. She specializes in cognitive-behavioral therapy and mindfulness-based interventions.",
      languages: ["English", "Spanish"]
    },
    {
      id: "dr-johnson",
      name: "Dr. Michael Johnson", 
      title: "Licensed Professional Counselor",
      specialties: ["ADHD", "Social Anxiety", "Relationship Issues"],
      rating: 4.8,
      reviews: 89,
      image: "/api/placeholder/80/80",
      availability: "Tomorrow",
      location: "Student Health Services",
      bio: "Dr. Johnson focuses on helping students develop coping strategies and improve their academic performance while maintaining mental wellness.",
      languages: ["English"]
    },
    {
      id: "dr-martinez",
      name: "Dr. Lisa Martinez",
      title: "Clinical Social Worker",
      specialties: ["Trauma", "Family Issues", "Cultural Adjustment"],
      rating: 4.9,
      reviews: 156,
      image: "/api/placeholder/80/80",
      availability: "Next week",
      location: "Wellness Center",
      bio: "Dr. Martinez brings a multicultural perspective to her practice and has extensive experience with international students and diverse populations.",
      languages: ["English", "Spanish", "Portuguese"]
    }
  ];

  const offCampusTherapists = [
    {
      id: "therapist-1",
      name: "Jennifer Wong, LMFT",
      title: "Marriage & Family Therapist",
      specialties: ["Depression", "Anxiety", "Life Transitions"],
      rating: 4.7,
      location: "Downtown Practice",
      distance: "2.3 miles",
      insurance: ["BlueCross", "Aetna", "United"],
      teletherapy: true
    },
    {
      id: "therapist-2", 
      name: "David Chen, PhD",
      title: "Clinical Psychologist",
      specialties: ["ADHD", "Academic Performance", "Social Skills"],
      rating: 4.8,
      location: "University District",
      distance: "1.8 miles",
      insurance: ["Kaiser", "BlueCross", "Cigna"],
      teletherapy: true
    }
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
  ];

  const crisisResources = [
    {
      name: "Campus Crisis Intervention",
      description: "24/7 campus-based crisis support and emergency mental health services",
      phone: "(555) 123-HELP",
      availability: "24/7",
      type: "Immediate"
    },
    {
      name: "Local Emergency Services", 
      description: "Emergency psychiatric evaluation and crisis stabilization",
      phone: "911",
      availability: "24/7",
      type: "Emergency"
    },
    {
      name: "Crisis Mobile Team",
      description: "Mental health professionals who can come to your location",
      phone: "(555) 456-7890",
      availability: "24/7",
      type: "Mobile Crisis"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/results" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Results
            </Link>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <span className="font-medium">Professional Support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Professional Mental Health Support</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with licensed mental health professionals who understand student life and can provide specialized support.
          </p>
        </div>

        <Tabs defaultValue="campus" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campus">Campus Counselors</TabsTrigger>
            <TabsTrigger value="community">Community Therapists</TabsTrigger>
            <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
          </TabsList>

          {/* Campus Counselors */}
          <TabsContent value="campus" className="mt-6">
            <div className="space-y-6">
              {counselors.map((counselor) => (
                <Card key={counselor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Counselor Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                            <User className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold">{counselor.name}</h3>
                            <p className="text-muted-foreground">{counselor.title}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{counselor.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">({counselor.reviews} reviews)</span>
                              <Badge className="bg-success/10 text-success border-success/20 ml-2">
                                {counselor.availability}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">{counselor.bio}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Specialties</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {counselor.specialties.map((specialty, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Languages</Label>
                            <p className="text-sm mt-1">{counselor.languages.join(", ")}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{counselor.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Booking Section */}
                      <div className="w-full md:w-80">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Book Appointment</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium">Select Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal mt-1",
                                      !selectedDate && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">Select Time</Label>
                              <Select value={selectedTime} onValueChange={setSelectedTime}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Choose time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeSlots.map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <Button 
                              className="w-full bg-primary hover:bg-primary-dark"
                              disabled={!selectedDate || !selectedTime}
                            >
                              Book with {counselor.name.split(' ')[1]}
                            </Button>

                            <div className="text-center">
                              <Button variant="link" size="sm">
                                <Phone className="h-4 w-4 mr-2" />
                                Call directly: {counselor.id === "dr-smith" ? "(555) 123-4567" : "(555) 123-4568"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community Therapists */}
          <TabsContent value="community" className="mt-6">
            <div className="mb-6">
              <Card className="bg-info/5 border-info/20">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> These are licensed therapists in your community. Please verify insurance coverage and scheduling directly with their offices.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {offCampusTherapists.map((therapist) => (
                <Card key={therapist.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{therapist.name}</h3>
                            <p className="text-muted-foreground text-sm">{therapist.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{therapist.rating}</span>
                              {therapist.teletherapy && (
                                <Badge variant="outline" className="text-xs">Teletherapy</Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Specialties</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {therapist.specialties.map((specialty, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Location</Label>
                            <p className="text-sm">{therapist.location} ({therapist.distance})</p>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Insurance</Label>
                            <p className="text-sm">{therapist.insurance.join(", ")}</p>
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        <Button className="bg-primary hover:bg-primary-dark">
                          Contact Therapist
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Find More Therapists</CardTitle>
                <CardDescription>Use these resources to find additional mental health professionals in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full justify-start">
                    Psychology Today Directory
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Your Insurance Provider Directory
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    NAMI Provider Search
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Campus Referral Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crisis Support */}
          <TabsContent value="crisis" className="mt-6">
            <Card className="mb-6 border-destructive/50 bg-destructive/5">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-destructive mb-2">
                    Immediate Crisis Support Available
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    If you're having thoughts of self-harm or are in immediate danger, please reach out for help now.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {crisisResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{resource.name}</h3>
                          <Badge className={
                            resource.type === "Emergency" ? "bg-destructive text-destructive-foreground" :
                            resource.type === "Immediate" ? "bg-warning text-warning-foreground" :
                            "bg-info text-info-foreground"
                          }>
                            {resource.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{resource.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{resource.availability}</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Button className="bg-destructive hover:bg-destructive/90">
                          <Phone className="h-4 w-4 mr-2" />
                          {resource.phone}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Crisis Resources */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Additional Support Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">National Crisis Resources</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        988 Suicide & Crisis Lifeline
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Crisis Text Line: Text HOME to 741741
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Trevor Project: 1-866-488-7386
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Campus Safety</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        Campus Security: (555) 123-SAFE
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Dean of Students Emergency Line
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Residence Life Crisis Support
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Professional;