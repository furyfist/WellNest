import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [severity, setSeverity] = useState<Record<string, number>>({});
  const [demographics, setDemographics] = useState({
    yearOfStudy: "",
    collegeType: "",
    previousSupport: ""
  });

  const navigate = useNavigate();

  const issues = [
    { id: "academic", label: "Academic Stress", description: "Pressure from coursework, exams, or grades" },
    { id: "social", label: "Social Isolation", description: "Feeling lonely or disconnected from others" },
    { id: "anxiety", label: "Anxiety", description: "Excessive worry, panic attacks, or nervousness" },
    { id: "depression", label: "Depression", description: "Persistent sadness, hopelessness, or loss of interest" },
    { id: "sleep", label: "Sleep Issues", description: "Trouble falling asleep, staying asleep, or feeling rested" },
    { id: "financial", label: "Financial Stress", description: "Money worries affecting your wellbeing" },
    { id: "family", label: "Family Problems", description: "Difficult relationships or situations at home" },
    { id: "relationship", label: "Relationship Issues", description: "Problems with romantic or personal relationships" }
  ];

  const phq9Questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you are a failure",
    "Trouble concentrating on things",
    "Moving or speaking slowly, or being fidgety/restless",
    "Thoughts that you would be better off dead or hurting yourself"
  ];

  const handleIssueToggle = (issueId: string) => {
    setSelectedIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleSeverityChange = (issueId: string, value: number[]) => {
    setSeverity(prev => ({ ...prev, [issueId]: value[0] }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete assessment and navigate to results
      navigate("/results", { 
        state: { 
          selectedIssues, 
          severity, 
          demographics 
        } 
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Shield className="h-3 w-3 mr-1" />
              Anonymous Assessment
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Step {currentStep} of 4</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Issue Selection */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>What are you experiencing?</CardTitle>
              <CardDescription>
                Select all areas where you're currently facing challenges. Remember, this is completely anonymous.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {issues.map((issue) => (
                <div key={issue.id} className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id={issue.id}
                    checked={selectedIssues.includes(issue.id)}
                    onCheckedChange={() => handleIssueToggle(issue.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={issue.id} className="text-sm font-medium cursor-pointer">
                      {issue.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {issue.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Severity Rating */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>How would you rate the severity?</CardTitle>
              <CardDescription>
                For each area you selected, please rate how much it's affecting your daily life (1 = minimal, 10 = severe).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedIssues.map((issueId) => {
                const issue = issues.find(i => i.id === issueId);
                return (
                  <div key={issueId} className="space-y-3">
                    <Label className="text-sm font-medium">{issue?.label}</Label>
                    <div className="px-2">
                      <Slider
                        value={[severity[issueId] || 5]}
                        onValueChange={(value) => handleSeverityChange(issueId, value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Minimal (1)</span>
                        <span className="font-medium">Current: {severity[issueId] || 5}</span>
                        <span>Severe (10)</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Quick Mental Health Screening */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Brief Mental Health Check</CardTitle>
              <CardDescription>
                Over the last 2 weeks, how often have you been bothered by any of the following problems?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {phq9Questions.slice(0, 5).map((question, index) => (
                <div key={index} className="space-y-3">
                  <Label className="text-sm font-medium">{question}</Label>
                  <RadioGroup defaultValue="0">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id={`q${index}-0`} />
                      <Label htmlFor={`q${index}-0`} className="text-sm">Not at all</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id={`q${index}-1`} />
                      <Label htmlFor={`q${index}-1`} className="text-sm">Several days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id={`q${index}-2`} />
                      <Label htmlFor={`q${index}-2`} className="text-sm">More than half the days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id={`q${index}-3`} />
                      <Label htmlFor={`q${index}-3`} className="text-sm">Nearly every day</Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 4: Anonymous Demographics */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Almost Done</CardTitle>
              <CardDescription>
                Just a few anonymous details to help us provide better support recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Year of Study</Label>
                <RadioGroup value={demographics.yearOfStudy} onValueChange={(value) => 
                  setDemographics(prev => ({ ...prev, yearOfStudy: value }))
                }>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="first" id="first" />
                    <Label htmlFor="first" className="text-sm">First Year</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="second" id="second" />
                    <Label htmlFor="second" className="text-sm">Second Year</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="third" id="third" />
                    <Label htmlFor="third" className="text-sm">Third Year</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fourth" id="fourth" />
                    <Label htmlFor="fourth" className="text-sm">Fourth Year+</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="graduate" id="graduate" />
                    <Label htmlFor="graduate" className="text-sm">Graduate Student</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Institution Type</Label>
                <RadioGroup value={demographics.collegeType} onValueChange={(value) => 
                  setDemographics(prev => ({ ...prev, collegeType: value }))
                }>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="university" id="university" />
                    <Label htmlFor="university" className="text-sm">University</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="community" id="community" />
                    <Label htmlFor="community" className="text-sm">Community College</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="trade" id="trade" />
                    <Label htmlFor="trade" className="text-sm">Trade School</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Have you sought mental health support before?</Label>
                <RadioGroup value={demographics.previousSupport} onValueChange={(value) => 
                  setDemographics(prev => ({ ...prev, previousSupport: value }))
                }>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="never" id="never" />
                    <Label htmlFor="never" className="text-sm">Never</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="past" id="past" />
                    <Label htmlFor="past" className="text-sm">Yes, in the past</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="current" id="current" />
                    <Label htmlFor="current" className="text-sm">Yes, currently</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={currentStep === 1 && selectedIssues.length === 0}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark"
          >
            {currentStep === 4 ? "Complete Assessment" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;