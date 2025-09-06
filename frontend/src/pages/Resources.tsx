import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Phone, Globe, Heart, Book, Headphones, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const resourceCategories = {
    guides: [
      {
        title: "Understanding Anxiety in College",
        description: "Comprehensive guide to recognizing and managing anxiety symptoms during your academic journey",
        format: "PDF Guide",
        language: "English",
        downloadUrl: "#"
      },
      {
        title: "Sleep Hygiene for Students", 
        description: "Evidence-based strategies for improving sleep quality and establishing healthy sleep habits",
        format: "PDF Guide",
        language: "English, Spanish",
        downloadUrl: "#"
      },
      {
        title: "Managing Academic Stress",
        description: "Practical techniques for handling coursework pressure, exam anxiety, and time management",
        format: "Interactive Guide",
        language: "English",
        downloadUrl: "#"
      },
      {
        title: "Building Social Connections",
        description: "Strategies for overcoming social isolation and building meaningful relationships in college",
        format: "PDF Guide", 
        language: "English, Mandarin",
        downloadUrl: "#"
      }
    ],
    audio: [
      {
        title: "Progressive Muscle Relaxation",
        description: "15-minute guided exercise to release physical tension and promote relaxation",
        duration: "15 min",
        category: "Relaxation",
        audioUrl: "#"
      },
      {
        title: "Mindful Breathing for Anxiety",
        description: "Quick breathing techniques you can use anywhere to manage anxiety symptoms",
        duration: "8 min",
        category: "Anxiety Management", 
        audioUrl: "#"
      },
      {
        title: "Sleep Meditation",
        description: "Calming meditation to help quiet your mind and prepare for restful sleep",
        duration: "20 min",
        category: "Sleep Support",
        audioUrl: "#"
      },
      {
        title: "Study Break Meditation",
        description: "Short meditation designed to refresh your mind during intense study sessions",
        duration: "5 min",
        category: "Academic Support",
        audioUrl: "#"
      }
    ],
    helplines: [
      {
        name: "988 Suicide & Crisis Lifeline",
        description: "24/7 free and confidential support for people in distress and crisis prevention",
        phone: "988",
        text: "Text 'HELLO' to 741741",
        available: "24/7",
        speciality: "Crisis Support"
      },
      {
        name: "Crisis Text Line",
        description: "Free, 24/7 crisis support via text message with trained crisis counselors",
        phone: "",
        text: "Text 'HOME' to 741741",
        available: "24/7",
        speciality: "Text Support"
      },
      {
        name: "NAMI Helpline",
        description: "Information, resource referrals and support for mental health questions",
        phone: "1-800-950-6264",
        text: "",
        available: "Mon-Fri 10am-10pm ET",
        speciality: "Information & Support"
      },
      {
        name: "LGBT National Hotline",
        description: "Peer-support, local resources and safe space for LGBTQ+ community",
        phone: "1-888-843-4564",
        text: "",
        available: "Mon-Fri 4pm-12am ET, Sat 12pm-5pm ET",
        speciality: "LGBTQ+ Support"
      }
    ],
    campus: [
      {
        name: "Campus Counseling Center",
        description: "Free confidential counseling services for all enrolled students",
        location: "Student Health Building, 2nd Floor",
        hours: "Mon-Fri 8am-5pm",
        phone: "(555) 123-4567",
        services: ["Individual Counseling", "Group Therapy", "Crisis Intervention"]
      },
      {
        name: "Wellness Center",
        description: "Programs focused on stress management, mindfulness, and overall wellbeing",
        location: "Recreation Center, Room 240",
        hours: "Mon-Thu 9am-7pm, Fri 9am-4pm", 
        phone: "(555) 123-4568",
        services: ["Stress Management", "Mindfulness Classes", "Peer Education"]
      },
      {
        name: "Academic Success Center",
        description: "Support for academic challenges, study skills, and time management",
        location: "Library, 3rd Floor",
        hours: "Mon-Thu 8am-8pm, Fri 8am-5pm",
        phone: "(555) 123-4569",
        services: ["Tutoring", "Study Skills", "Time Management"]
      }
    ]
  };

  const filteredResources = (resources: any[]) => {
    if (!searchTerm) return resources;
    return resources.filter(resource => 
      resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <span className="font-medium">Resource Hub</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Mental Health Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Access evidence-based guides, relaxation exercises, and support resources to help you on your mental health journey.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Resource Tabs */}
        <Tabs defaultValue="guides" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="helplines" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Helplines
            </TabsTrigger>
            <TabsTrigger value="campus" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Campus
            </TabsTrigger>
          </TabsList>

          {/* Downloadable Guides */}
          <TabsContent value="guides" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredResources(resourceCategories.guides).map((guide, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                      <Badge variant="outline">{guide.format}</Badge>
                    </div>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <span>{guide.language}</span>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary-dark">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Audio Exercises */}
          <TabsContent value="audio" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredResources(resourceCategories.audio).map((audio, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{audio.title}</CardTitle>
                      <Badge variant="outline">{audio.duration}</Badge>
                    </div>
                    <CardDescription>{audio.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                        {audio.category}
                      </Badge>
                      <Button size="sm" className="bg-primary hover:bg-primary-dark">
                        <Headphones className="h-4 w-4 mr-2" />
                        Listen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Crisis Helplines */}
          <TabsContent value="helplines" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredResources(resourceCategories.helplines).map((helpline, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{helpline.name}</CardTitle>
                      <Badge className="bg-success/10 text-success border-success/20">
                        {helpline.available}
                      </Badge>
                    </div>
                    <CardDescription>{helpline.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Badge variant="outline">{helpline.speciality}</Badge>
                      <div className="space-y-2">
                        {helpline.phone && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Phone:</span>
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-2" />
                              {helpline.phone}
                            </Button>
                          </div>
                        )}
                        {helpline.text && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Text:</span>
                            <span className="text-sm font-medium">{helpline.text}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Campus Resources */}
          <TabsContent value="campus" className="mt-6">
            <div className="space-y-6">
              {filteredResources(resourceCategories.campus).map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{resource.name}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Location</h4>
                        <p className="text-sm">{resource.location}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Hours</h4>
                        <p className="text-sm">{resource.hours}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Contact</h4>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          {resource.phone}
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {resource.services.map((service, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Emergency Banner */}
        <Card className="mt-8 border-destructive/50 bg-destructive/5">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-destructive mb-2">In Crisis? Get Immediate Help</h3>
              <p className="text-muted-foreground mb-4">
                If you're having thoughts of self-harm or suicide, please reach out for immediate support.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-destructive hover:bg-destructive/90">
                  Call 988 - Crisis Lifeline
                </Button>
                <Button variant="outline" className="border-destructive text-destructive">
                  Text 741741
                </Button>
                <Button variant="outline">
                  Campus Emergency: 911
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resources;