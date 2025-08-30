import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  ArrowLeft, 
  Plus, 
  Eye, 
  Download, 
  Save, 
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText
} from 'lucide-react';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  duration: string;
  description: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    summary: ''
  });
  
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: ''
    }]);
  };

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now().toString(),
      degree: '',
      school: '',
      duration: '',
      description: ''
    }]);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const templates = [
    { id: 1, name: 'Modern Professional', preview: 'Template with clean lines and modern typography' },
    { id: 2, name: 'Creative Designer', preview: 'Bold design perfect for creative roles' },
    { id: 3, name: 'Executive Classic', preview: 'Traditional layout for senior positions' },
    { id: 4, name: 'Tech Minimal', preview: 'Minimalist design for tech professionals' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/20 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold gradient-text">NeuroCV</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold mb-2">
                Build Your <span className="gradient-text">Perfect Resume</span>
              </h1>
              <p className="text-muted-foreground">
                Fill in your details and watch your professional resume come to life
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden sm:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4" />
                  <span className="hidden sm:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span className="hidden sm:inline">Skills</span>
                </TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card className="p-6 card-shadow">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <User className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-semibold">Personal Information</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={personalInfo.fullName}
                          onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={personalInfo.location}
                          onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="linkedin">LinkedIn Profile</Label>
                        <Input
                          id="linkedin"
                          value={personalInfo.linkedin}
                          onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={personalInfo.summary}
                        onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
                        placeholder="Write a brief summary of your professional background and career objectives..."
                        rows={4}
                      />
                      <Button variant="outline" size="sm" className="mt-2">
                        <Sparkles className="w-4 h-4 mr-2" />
                        AI Enhance
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Experience */}
              <TabsContent value="experience">
                <Card className="p-6 card-shadow">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-semibold">Work Experience</h2>
                      </div>
                      <Button onClick={addExperience} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                    
                    {experiences.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No work experience added yet.</p>
                        <p className="text-sm">Click "Add Experience" to get started.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {experiences.map((exp) => (
                          <div key={exp.id} className="p-4 border border-border rounded-lg">
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <Input placeholder="Job Title" />
                              <Input placeholder="Company" />
                              <Input placeholder="Duration (e.g., Jan 2020 - Present)" className="md:col-span-2" />
                            </div>
                            <Textarea placeholder="Describe your responsibilities and achievements..." rows={3} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>

              {/* Education */}
              <TabsContent value="education">
                <Card className="p-6 card-shadow">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-semibold">Education</h2>
                      </div>
                      <Button onClick={addEducation} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                    
                    {education.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No education added yet.</p>
                        <p className="text-sm">Click "Add Education" to get started.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {education.map((edu) => (
                          <div key={edu.id} className="p-4 border border-border rounded-lg">
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <Input placeholder="Degree" />
                              <Input placeholder="School/University" />
                              <Input placeholder="Duration" className="md:col-span-2" />
                            </div>
                            <Textarea placeholder="Additional details (optional)..." rows={2} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>

              {/* Skills */}
              <TabsContent value="skills">
                <Card className="p-6 card-shadow">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-semibold">Skills</h2>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill}>Add</Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => removeSkill(skill)}
                        >
                          {skill} ×
                        </Badge>
                      ))}
                    </div>
                    
                    {skills.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No skills added yet.</p>
                        <p className="text-sm">Add your professional skills above.</p>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Preview & Templates */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card className="p-6 card-shadow">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Choose Template</h3>
                </div>
                
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div key={template.id} className="p-3 border border-border rounded-lg hover:border-primary/50 cursor-pointer transition-colors">
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.preview}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Live Preview */}
            <Card className="p-6 card-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Full Preview
                  </Button>
                </div>
                
                <div className="bg-white min-h-[400px] rounded-lg border p-4 shadow-inner">
                  <div className="space-y-4 text-gray-800">
                    <div className="border-b pb-4">
                      <h2 className="text-xl font-bold">
                        {personalInfo.fullName || 'Your Name'}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {personalInfo.email || 'your-email@example.com'} | {personalInfo.phone || 'Phone Number'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {personalInfo.location || 'Your Location'}
                      </p>
                    </div>
                    
                    {personalInfo.summary && (
                      <div>
                        <h3 className="font-semibold text-blue-600 mb-2">SUMMARY</h3>
                        <p className="text-sm">{personalInfo.summary}</p>
                      </div>
                    )}
                    
                    {skills.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-blue-600 mb-2">SKILLS</h3>
                        <p className="text-sm">{skills.join(', ')}</p>
                      </div>
                    )}
                    
                    <div className="text-center text-gray-400 text-sm mt-8">
                      Continue filling out your information to see more preview
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}