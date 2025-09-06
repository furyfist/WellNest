import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, MessageCircle, Calendar, TrendingUp, AlertTriangle, 
  ArrowLeft, Shield, Activity, Clock, MapPin 
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");

  // Mock data for analytics
  const usageData = [
    { date: '2024-01-01', assessments: 45, aiChats: 89, peerConnections: 23, professional: 12 },
    { date: '2024-01-02', assessments: 52, aiChats: 94, peerConnections: 31, professional: 15 },
    { date: '2024-01-03', assessments: 38, aiChats: 76, peerConnections: 19, professional: 8 },
    { date: '2024-01-04', assessments: 67, aiChats: 112, peerConnections: 42, professional: 18 },
    { date: '2024-01-05', assessments: 43, aiChats: 87, peerConnections: 28, professional: 11 },
    { date: '2024-01-06', assessments: 59, aiChats: 103, peerConnections: 36, professional: 16 },
    { date: '2024-01-07', assessments: 71, aiChats: 128, peerConnections: 48, professional: 22 }
  ];

  const issueDistribution = [
    { name: 'Academic Stress', value: 35, color: '#8b5cf6' },
    { name: 'Anxiety', value: 28, color: '#06b6d4' },
    { name: 'Depression', value: 18, color: '#10b981' },
    { name: 'Social Isolation', value: 12, color: '#f59e0b' },
    { name: 'Sleep Issues', value: 7, color: '#ef4444' }
  ];

  const campusData = [
    { campus: 'Main Campus', users: 1247, trend: '+12%' },
    { campus: 'North Campus', users: 823, trend: '+8%' },
    { campus: 'Graduate Center', users: 456, trend: '+15%' },
    { campus: 'Online Students', users: 634, trend: '+22%' }
  ];

  const crisisAlerts = [
    {
      id: 1,
      timestamp: '2024-01-07 14:32',
      type: 'High Risk Keywords',
      location: 'AI Chat Session',
      status: 'Escalated',
      followUp: 'Campus counselor contacted'
    },
    {
      id: 2,
      timestamp: '2024-01-07 11:18',
      type: 'Assessment Score',
      location: 'Mental Health Assessment',
      status: 'Resolved',
      followUp: 'Resources provided, user connected to crisis line'
    },
    {
      id: 3,
      timestamp: '2024-01-06 19:45',
      type: 'Repeated Crisis Keywords',
      location: 'Peer Support Chat',
      status: 'Monitoring',
      followUp: 'Peer supporter notified, professional backup available'
    }
  ];

  const resourceUtilization = [
    { resource: 'Crisis Helplines', clicks: 234, trend: '+18%' },
    { resource: 'Campus Counseling', bookings: 89, trend: '+25%' },
    { resource: 'Self-Help Guides', downloads: 567, trend: '+12%' },
    { resource: 'Audio Exercises', plays: 342, trend: '+8%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Shield className="h-3 w-3 mr-1" />
                Admin Dashboard
              </Badge>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Crisis Alerts */}
        <Alert className="mb-6 border-destructive/50 bg-destructive/5">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>2 active crisis alerts</strong> require immediate attention. 
            <Button variant="link" className="p-0 h-auto ml-2 text-destructive">
              Review Crisis Dashboard
            </Button>
          </AlertDescription>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,160</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">+12.5%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Chat Sessions</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">689</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">+8.2%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Professional Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">102</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">+15.3%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crisis Interventions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-warning">+2</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="usage" className="space-y-6">
          <TabsList>
            <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
            <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
            <TabsTrigger value="crisis">Crisis Monitoring</TabsTrigger>
            <TabsTrigger value="resources">Resource Utilization</TabsTrigger>
          </TabsList>

          {/* Usage Analytics */}
          <TabsContent value="usage" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Platform Usage</CardTitle>
                  <CardDescription>User interactions across different support types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                      <YAxis />
                      <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                      <Bar dataKey="assessments" fill="#8b5cf6" name="Assessments" />
                      <Bar dataKey="aiChats" fill="#06b6d4" name="AI Chats" />
                      <Bar dataKey="peerConnections" fill="#10b981" name="Peer Connections" />
                      <Bar dataKey="professional" fill="#f59e0b" name="Professional Bookings" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Issue Distribution</CardTitle>
                  <CardDescription>Most common mental health concerns reported</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={issueDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}%`}
                      >
                        {issueDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Campus-wise Usage</CardTitle>
                <CardDescription>Platform adoption across different campuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campusData.map((campus, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{campus.campus}</p>
                          <p className="text-sm text-muted-foreground">{campus.users} active users</p>
                        </div>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {campus.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trend Analysis */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
                <CardDescription>Platform adoption and user engagement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <Line type="monotone" dataKey="assessments" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="aiChats" stroke="#06b6d4" strokeWidth={2} />
                    <Line type="monotone" dataKey="peerConnections" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Peak Usage Times</CardTitle>
                  <CardDescription>When students are most likely to seek support</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sunday Evening (6-9 PM)</span>
                      <Badge>Highest</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Monday Morning (8-11 AM)</span>
                      <Badge variant="outline">High</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Wednesday Late Night (10 PM-1 AM)</span>
                      <Badge variant="outline">High</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Friday Afternoon (3-6 PM)</span>
                      <Badge variant="secondary">Moderate</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Patterns</CardTitle>
                  <CardDescription>Mental health support needs throughout the academic year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Finals Week (Dec/May)</span>
                      <Badge className="bg-destructive/10 text-destructive">Peak Crisis</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Midterms (Oct/Mar)</span>
                      <Badge className="bg-warning/10 text-warning">High Stress</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Beginning of Semester</span>
                      <Badge variant="outline">Moderate</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Summer Break</span>
                      <Badge variant="secondary">Low</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Crisis Monitoring */}
          <TabsContent value="crisis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Crisis Alert System
                </CardTitle>
                <CardDescription>
                  Real-time monitoring of high-risk situations and crisis interventions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {crisisAlerts.map((alert) => (
                    <div key={alert.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={
                              alert.status === 'Escalated' ? 'bg-destructive text-destructive-foreground' :
                              alert.status === 'Monitoring' ? 'bg-warning text-warning-foreground' :
                              'bg-success text-success-foreground'
                            }>
                              {alert.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                          </div>
                          <p className="font-medium">{alert.type}</p>
                          <p className="text-sm text-muted-foreground">Location: {alert.location}</p>
                          <p className="text-sm mt-2">Follow-up: {alert.followUp}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crisis Response Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Response Time</span>
                      <span className="font-medium">2.3 minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Successful Interventions</span>
                      <span className="font-medium">98.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Professional Escalations</span>
                      <span className="font-medium">15 this week</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Emergency Services Called</span>
                      <span className="font-medium">2 this month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Crisis Triggers</CardTitle>
                  <CardDescription>Most common factors leading to crisis situations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Academic Pressure</span>
                      <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Social Isolation</span>
                      <span className="text-sm text-muted-foreground">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Financial Stress</span>
                      <span className="text-sm text-muted-foreground">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Family Issues</span>
                      <span className="text-sm text-muted-foreground">12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resource Utilization */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Access Patterns</CardTitle>
                <CardDescription>How students are engaging with different support resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceUtilization.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{resource.resource}</p>
                          <p className="text-sm text-muted-foreground">
                            {resource.clicks ? `${resource.clicks} clicks` : `${resource.bookings} bookings` || `${resource.downloads} downloads` || `${resource.plays} plays`}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {resource.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Most Accessed Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Anxiety Management Guide</span>
                      <span className="text-sm text-muted-foreground">1,234 downloads</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sleep Hygiene Tips</span>
                      <span className="text-sm text-muted-foreground">987 downloads</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Academic Stress Toolkit</span>
                      <span className="text-sm text-muted-foreground">876 downloads</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mindfulness Exercises</span>
                      <span className="text-sm text-muted-foreground">765 plays</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Counselor Availability</CardTitle>
                  <CardDescription>Current availability and booking rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dr. Sarah Smith</span>
                      <Badge className="bg-success/10 text-success">Available Today</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dr. Michael Johnson</span>
                      <Badge className="bg-warning/10 text-warning">Booked This Week</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dr. Lisa Martinez</span>
                      <Badge className="bg-success/10 text-success">Available Tomorrow</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overall Capacity</span>
                      <span className="text-sm text-muted-foreground">78% utilized</span>
                    </div>
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

export default AdminDashboard;