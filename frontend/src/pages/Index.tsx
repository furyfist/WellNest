import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Users, MessageCircle, Calendar, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const stats = [
    { label: "Students Helped", value: "12,847" },
    { label: "Anonymous Conversations", value: "24,653" },
    { label: "Campus Counselors", value: "1,247" },
    { label: "Peer Supporters", value: "3,891" }
  ];

  const features = [
    {
      icon: MessageCircle,
      title: "AI Chat Support",
      description: "24/7 anonymous mental health conversations with trained AI support",
      available: true
    },
    {
      icon: Users,
      title: "Peer Connections",
      description: "Connect with fellow students who understand your experiences",
      available: true
    },
    {
      icon: Calendar,
      title: "Professional Support",
      description: "Book sessions with campus counselors and mental health professionals",
      available: true
    },
    {
      icon: BookOpen,
      title: "Resource Hub",
      description: "Access guides, exercises, and helplines in multiple languages",
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold text-foreground">WellNest</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/resources">
                <Button variant="ghost" size="sm">Resources</Button>
              </Link>
              <Link to="/professional">
                <Button variant="ghost" size="sm">Find Help</Button>
              </Link>
              <Link to="/admin">
                <Button variant="ghost" size="sm">Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Shield className="h-3 w-3 mr-1" />
            100% Anonymous & Confidential
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            You're Not Alone in This
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Anonymous mental health support designed specifically for students. 
            Connect with AI support, peer communities, and professional counselors whenever you need help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessment">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary-dark">
                Get Help Now
              </Button>
            </Link>
            <Link to="/peer-support">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10">
                I Want to Help Others
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Multiple Ways to Get Support
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the type of support that feels right for you, all completely anonymous and confidential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">{feature.description}</CardDescription>
                  <Badge variant={feature.available ? "default" : "secondary"} className="text-xs">
                    {feature.available ? "Available Now" : "Coming Soon"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">
            How WellNest Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Take Assessment</h3>
              <p className="text-muted-foreground">
                Answer a few anonymous questions to help us understand what you're going through
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Get Matched</h3>
              <p className="text-muted-foreground">
                Receive personalized support options based on your needs and preferences
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Connect & Heal</h3>
              <p className="text-muted-foreground">
                Start your journey with AI chat, peer support, or professional counseling
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link to="/assessment">
              <Button size="lg" className="bg-primary hover:bg-primary-dark">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>No Personal Data Stored</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Crisis Support Available 24/7</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;