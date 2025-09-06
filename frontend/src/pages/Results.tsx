import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, Calendar, Clock, ArrowRight, Shield, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const assessmentData = location.state || {};
  
  // Mock severity calculation based on assessment
  const calculateSeverity = () => {
    const severityValues = Object.values(assessmentData.severity || {}) as number[];
    const avgSeverity = severityValues.length > 0 
      ? severityValues.reduce((a, b) => a + b, 0) / severityValues.length 
      : 5;
    
    if (avgSeverity >= 8) return "high";
    if (avgSeverity >= 6) return "moderate";
    return "mild";
  };

  const severity = calculateSeverity();

  const supportOptions = [
    {
      id: "ai-chat",
      title: "AI Chat Support",
      description: "Start an immediate conversation with our trained AI mental health assistant",
      icon: MessageCircle,
      availability: "Available Now",
      waitTime: "< 1 minute",
      suitable: severity === "mild" || severity === "moderate",
      features: [
        "24/7 availability",
        "Evidence-based responses",
        "Crisis detection & escalation",
        "Completely anonymous"
      ],
      ctaText: "Start Chat Now",
      ctaLink: "/chat"
    },
    {
      id: "peer-support",
      title: "Peer Support Connection",
      description: "Connect with trained student peer supporters who understand your experience",
      icon: Users,
      availability: "Available Today",
      waitTime: "5-15 minutes",
      suitable: severity === "mild" || severity === "moderate",
      features: [
        "Student-to-student support",
        "Shared experiences",
        "Anonymous matching",
        "Flexible scheduling"
      ],
      ctaText: "Find Peer Support",
      ctaLink: "/peer-support"
    },
    {
      id: "professional",
      title: "Professional Support",
      description: "Book a session with licensed campus counselors or mental health professionals",
      icon: Calendar,
      availability: severity === "high" ? "Priority Booking" : "Next Available: Tomorrow",
      waitTime: severity === "high" ? "Same day" : "1-3 days",
      suitable: true,
      features: [
        "Licensed professionals",
        "Specialized treatment",
        "Insurance accepted",
        "Crisis intervention available"
      ],
      ctaText: "Book Appointment",
      ctaLink: "/professional"
    }
  ];

  const crisisDetected = severity === "high";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-medium">Your Assessment Results</span>
            </div>
            <Badge className="bg-success/10 text-success border-success/20">
              Assessment Complete
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Crisis Alert */}
        {crisisDetected && (
          <Card className="mb-6 border-destructive/50 bg-destructive/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <CardTitle className="text-destructive">Immediate Support Available</CardTitle>
              </div>
              <CardDescription>
                Based on your responses, we want to ensure you get the support you need right away.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-destructive hover:bg-destructive/90">
                  Call Crisis Helpline: 988
                </Button>
                <Button variant="outline" className="border-destructive text-destructive">
                  Emergency Services: 911
                </Button>
                <Button variant="outline">
                  Campus Crisis Support
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Personalized Support Options</CardTitle>
            <CardDescription>
              Based on your assessment, we've identified the best support options for your current situation. 
              All options maintain your complete anonymity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex-shrink-0">
                <div className={`w-3 h-3 rounded-full ${
                  severity === "high" ? "bg-destructive" : 
                  severity === "moderate" ? "bg-warning" : "bg-success"
                }`}></div>
              </div>
              <div>
                <p className="font-medium">
                  Assessment Level: {severity.charAt(0).toUpperCase() + severity.slice(1)} Support Needed
                </p>
                <p className="text-sm text-muted-foreground">
                  {assessmentData.selectedIssues?.length || 0} areas identified for support
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Options */}
        <div className="grid gap-6 mb-8">
          {supportOptions.map((option) => (
            <Card 
              key={option.id} 
              className={`transition-all hover:shadow-lg ${
                option.suitable 
                  ? "border-primary/30 hover:border-primary/50" 
                  : "opacity-75"
              } ${
                option.id === "professional" && crisisDetected 
                  ? "ring-2 ring-primary/30" 
                  : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <option.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{option.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {option.description}
                      </CardDescription>
                    </div>
                  </div>
                  {option.id === "professional" && crisisDetected && (
                    <Badge className="bg-primary text-primary-foreground">
                      Recommended
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {option.waitTime}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {option.availability}
                    </Badge>
                  </div>
                  
                  <Link to={option.ctaLink}>
                    <Button 
                      className={`${
                        option.id === "professional" && crisisDetected
                          ? "bg-primary hover:bg-primary-dark"
                          : ""
                      }`}
                    >
                      {option.ctaText}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Resources</CardTitle>
            <CardDescription>
              Helpful resources you can access anytime
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/resources">
                <Button variant="outline" className="w-full justify-start">
                  Resource Hub & Guides
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                Crisis Helplines
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Self-Help Exercises
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Campus Support Services
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Note */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <Shield className="h-4 w-4 inline mr-2" />
          This assessment and all recommendations are completely anonymous. 
          No personal information has been stored.
        </div>
      </div>
    </div>
  );
};

export default Results;