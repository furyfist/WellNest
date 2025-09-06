import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, MessageCircle, Heart, ArrowLeft, Star, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const PeerSupport = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const peerSupporters = [
    {
      id: "peer-1",
      name: "Alex M.",
      year: "Senior",
      major: "Psychology",
      interests: ["Academic Stress", "Anxiety", "Time Management"],
      experience: "2 years as peer supporter",
      rating: 4.9,
      sessions: 45,
      bio: "I've been through the academic pressure and anxiety that comes with college. I'm here to listen and share strategies that have worked for me.",
      availability: "Weekday evenings, Weekend mornings",
      responseTime: "< 2 hours",
      languages: ["English", "Spanish"]
    },
    {
      id: "peer-2",
      name: "Jordan K.",
      year: "Graduate Student", 
      major: "Social Work",
      interests: ["Depression", "Social Isolation", "LGBTQ+ Support"],
      experience: "3 years peer support + training",
      rating: 4.8,
      sessions: 72,
      bio: "As someone who struggled with depression and finding community, I understand how isolating college can feel. Let's talk through it together.",
      availability: "Flexible schedule",
      responseTime: "< 1 hour",
      languages: ["English"]
    },
    {
      id: "peer-3",
      name: "Sam P.",
      year: "Junior",
      major: "Business",
      interests: ["Financial Stress", "Family Issues", "Work-Life Balance"],
      experience: "1.5 years peer supporter",
      rating: 4.7,
      sessions: 28,
      bio: "Working through school while managing family expectations and financial pressure taught me resilience. Happy to share what I've learned.",
      availability: "Weekend afternoons, Late evenings",
      responseTime: "< 3 hours", 
      languages: ["English", "Mandarin"]
    }
  ];

  const supportGroups = [
    {
      name: "Academic Success Circle",
      description: "Weekly group for students dealing with academic pressure and perfectionism",
      schedule: "Tuesdays 6:00 PM",
      participants: 8,
      facilitator: "Peer-led with professional oversight",
      focus: "Academic Stress"
    },
    {
      name: "Anxiety Support Network",
      description: "Safe space to discuss anxiety management techniques and share experiences",
      schedule: "Thursdays 7:00 PM", 
      participants: 12,
      facilitator: "Trained peer facilitators",
      focus: "Anxiety & Panic"
    },
    {
      name: "First-Gen Student Support",
      description: "Support group specifically for first-generation college students",
      schedule: "Sundays 4:00 PM",
      participants: 6,
      facilitator: "First-gen peer mentors",
      focus: "Navigation & Identity"
    },
    {
      name: "International Student Circle",
      description: "Community for international students adjusting to life and academics",
      schedule: "Saturdays 3:00 PM",
      participants: 10,
      facilitator: "Multilingual peer supporters",
      focus: "Cultural Adjustment"
    }
  ];

  const supportAreas = [
    "Academic Stress", "Anxiety", "Depression", "Social Isolation", 
    "Sleep Issues", "Financial Stress", "Family Problems", "Relationship Issues",
    "LGBTQ+ Support", "Cultural Adjustment", "Time Management", "Work-Life Balance"
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

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
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Peer Support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Connect with Peer Support</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sometimes the best support comes from someone who truly understands your experience. 
            Connect with trained student peer supporters or join supportive group communities.
          </p>
        </div>

        <Tabs defaultValue="connect" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="connect">Find Peer Support</TabsTrigger>
            <TabsTrigger value="groups">Support Groups</TabsTrigger>
            <TabsTrigger value="volunteer">Become a Supporter</TabsTrigger>
          </TabsList>

          {/* Find Peer Support */}
          <TabsContent value="connect" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Filter Sidebar */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Find Your Match</CardTitle>
                  <CardDescription>Filter peer supporters by your needs and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Support Areas (Select all that apply)</Label>
                    <div className="grid grid-cols-1 gap-2 mt-2 max-h-48 overflow-y-auto">
                      {supportAreas.map((area) => (
                        <div key={area} className="flex items-center space-x-2">
                          <Checkbox
                            id={area}
                            checked={selectedInterests.includes(area)}
                            onCheckedChange={() => handleInterestToggle(area)}
                          />
                          <Label htmlFor={area} className="text-sm cursor-pointer">
                            {area}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Preferred Language</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Any language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any language</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="mandarin">Mandarin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Availability</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any time</SelectItem>
                        <SelectItem value="weekday-morning">Weekday mornings</SelectItem>
                        <SelectItem value="weekday-evening">Weekday evenings</SelectItem>
                        <SelectItem value="weekend">Weekends</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary-dark">
                    Update Results
                  </Button>
                </CardContent>
              </Card>

              {/* Peer Supporters List */}
              <div className="lg:col-span-2 space-y-4">
                {peerSupporters.map((peer) => (
                  <Card key={peer.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{peer.name}</h3>
                            <p className="text-muted-foreground text-sm">{peer.year} • {peer.major}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{peer.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">({peer.sessions} sessions)</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-success/10 text-success border-success/20">
                          <Clock className="h-3 w-3 mr-1" />
                          {peer.responseTime}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{peer.bio}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Support Areas</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {peer.interests.map((interest, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Languages</Label>
                          <p className="text-sm mt-1">{peer.languages.join(", ")}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Available:</span> {peer.availability}
                        </div>
                        <Button className="bg-primary hover:bg-primary-dark">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Request Connection
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6 text-center">
                    <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Don't see the right fit?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We're constantly adding new peer supporters. Let us know what you're looking for and we'll notify you when a good match joins our community.
                    </p>
                    <Button variant="outline" className="border-primary text-primary">
                      Join Waiting List
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Support Groups */}
          <TabsContent value="groups" className="mt-6">
            <div className="mb-6">
              <Card className="bg-info/5 border-info/20">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 inline mr-2" />
                    All support groups are facilitated by trained peer supporters with professional oversight. 
                    Participation is completely voluntary and anonymous.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {supportGroups.map((group, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge variant="outline">{group.focus}</Badge>
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs font-medium text-muted-foreground">Schedule</Label>
                          <p>{group.schedule}</p>
                        </div>
                        <div>
                          <Label className="text-xs font-medium text-muted-foreground">Participants</Label>
                          <p>{group.participants} active members</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Facilitator</Label>
                        <p className="text-sm">{group.facilitator}</p>
                      </div>
                      <Button className="w-full mt-4 bg-primary hover:bg-primary-dark">
                        Join Group
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Want to Start Your Own Group?</CardTitle>
                <CardDescription>
                  If you have an idea for a support group that doesn't exist yet, we can help you get it started.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Propose New Support Group
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Become a Supporter */}
          <TabsContent value="volunteer" className="mt-6">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Become a Peer Supporter</CardTitle>
                  <CardDescription>
                    Help fellow students by sharing your experience and providing support. 
                    All volunteers receive comprehensive training and ongoing supervision.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                      <Input id="firstName" placeholder="Your first name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                      <Input id="lastName" placeholder="Your last name" className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@university.edu" className="mt-1" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year" className="text-sm font-medium">Year of Study</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sophomore">Sophomore</SelectItem>
                          <SelectItem value="junior">Junior</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                          <SelectItem value="graduate">Graduate Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="major" className="text-sm font-medium">Major/Field of Study</Label>
                      <Input id="major" placeholder="Your major" className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Areas you'd like to support (select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2 max-h-32 overflow-y-auto">
                      {supportAreas.map((area) => (
                        <div key={area} className="flex items-center space-x-2">
                          <Checkbox id={`support-${area}`} />
                          <Label htmlFor={`support-${area}`} className="text-sm cursor-pointer">
                            {area}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-sm font-medium">
                      Share your experience (What challenges have you overcome? Why do you want to help others?)
                    </Label>
                    <Textarea 
                      id="experience" 
                      placeholder="Tell us about your journey and what motivates you to support others..."
                      className="mt-1 min-h-24"
                    />
                  </div>

                  <div>
                    <Label htmlFor="availability" className="text-sm font-medium">Availability</Label>
                    <Textarea 
                      id="availability"
                      placeholder="When are you typically available to provide support? (e.g., weekday evenings, weekend afternoons)"
                      className="mt-1"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="training" />
                      <Label htmlFor="training" className="text-sm">
                        I commit to completing the required 20-hour peer support training program
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="supervision" />
                      <Label htmlFor="supervision" className="text-sm">
                        I understand this role includes regular supervision and ongoing training requirements
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="confidentiality" />
                      <Label htmlFor="confidentiality" className="text-sm">
                        I agree to maintain strict confidentiality and follow all peer support guidelines
                      </Label>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary-dark">
                    Submit Application
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Applications are reviewed within 5 business days. Training sessions begin monthly.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PeerSupport;