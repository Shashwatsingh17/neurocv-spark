import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useResume, PersonalInfo, Experience, Education } from '@/hooks/useResume';
import { useTemplates } from '@/hooks/useTemplates';
import { generatePDF } from './PDFGenerator';
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
  FileText,
  LogOut,
  Loader2,
  X
} from 'lucide-react';

export default function EnhancedDashboard() {
  const { user, signOut } = useAuth();
  const { resume, saving, saveResume, updatePersonalInfo, updateExperiences, updateEducation, updateSkills, updateTemplate } = useResume();
  const { templates, loading: templatesLoading } = useTemplates();
  const [activeTab, setActiveTab] = useState('personal');
  const [newSkill, setNewSkill] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: ''
    };
    updateExperiences([...resume.experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    updateExperiences(resume.experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    const updatedExperiences = resume.experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateExperiences(updatedExperiences);
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      duration: '',
      description: ''
    };
    updateEducation([...resume.education, newEdu]);
  };

  const removeEducation = (id: string) => {
    updateEducation(resume.education.filter(edu => edu.id !== id));
  };

  const updateEducationItem = (id: string, field: keyof Education, value: string) => {
    const updatedEducation = resume.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateEducation(updatedEducation);
  };

  const addSkill = () => {
    if (newSkill.trim() && !resume.skills.includes(newSkill.trim())) {
      updateSkills([...resume.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateSkills(resume.skills.filter(skill => skill !== skillToRemove));
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    updateTemplate(templateId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/20 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold gradient-text">NeuroCV</span>
              </div>
              {user && (
                <div className="text-sm text-muted-foreground">
                  Welcome back, {user.email}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={saveResume}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </>
                )}
              </Button>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                onClick={() => generatePDF(resume)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4" />
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
                          value={resume.personalInfo.fullName}
                          onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resume.personalInfo.email}
                          onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resume.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resume.personalInfo.location}
                          onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="linkedin">LinkedIn Profile</Label>
                        <Input
                          id="linkedin"
                          value={resume.personalInfo.linkedin}
                          onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={resume.personalInfo.summary}
                        onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                        placeholder="Write a brief summary of your professional background and career objectives..."
                        rows={4}
                      />
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
                    
                    {resume.experiences.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No work experience added yet.</p>
                        <p className="text-sm">Click "Add Experience" to get started.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {resume.experiences.map((exp) => (
                          <div key={exp.id} className="p-4 border border-border rounded-lg relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExperience(exp.id)}
                              className="absolute top-2 right-2"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <Input 
                                placeholder="Job Title" 
                                value={exp.title}
                                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                              />
                              <Input 
                                placeholder="Company" 
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              />
                              <Input 
                                placeholder="Duration (e.g., Jan 2020 - Present)" 
                                className="md:col-span-2" 
                                value={exp.duration}
                                onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                              />
                            </div>
                            <Textarea 
                              placeholder="Describe your responsibilities and achievements..." 
                              rows={3} 
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            />
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
                    
                    {resume.education.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No education added yet.</p>
                        <p className="text-sm">Click "Add Education" to get started.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {resume.education.map((edu) => (
                          <div key={edu.id} className="p-4 border border-border rounded-lg relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEducation(edu.id)}
                              className="absolute top-2 right-2"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <Input 
                                placeholder="Degree" 
                                value={edu.degree}
                                onChange={(e) => updateEducationItem(edu.id, 'degree', e.target.value)}
                              />
                              <Input 
                                placeholder="School/University" 
                                value={edu.school}
                                onChange={(e) => updateEducationItem(edu.id, 'school', e.target.value)}
                              />
                              <Input 
                                placeholder="Duration" 
                                className="md:col-span-2" 
                                value={edu.duration}
                                onChange={(e) => updateEducationItem(edu.id, 'duration', e.target.value)}
                              />
                            </div>
                            <Textarea 
                              placeholder="Additional details (optional)..." 
                              rows={2} 
                              value={edu.description}
                              onChange={(e) => updateEducationItem(edu.id, 'description', e.target.value)}
                            />
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
                      {resume.skills.map((skill, index) => (
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
                    
                    {resume.skills.length === 0 && (
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
                
                {templatesLoading ? (
                  <div className="text-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Loading templates...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {templates.map((template) => (
                      <div 
                        key={template.id} 
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedTemplate === template.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {template.preview_description || template.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
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
                        {resume.personalInfo.fullName || 'Your Name'}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {resume.personalInfo.email || 'your-email@example.com'} | {resume.personalInfo.phone || 'Phone Number'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {resume.personalInfo.location || 'Location'} | {resume.personalInfo.linkedin || 'LinkedIn'}
                      </p>
                    </div>
                    
                    {resume.personalInfo.summary && (
                      <div>
                        <h3 className="font-semibold mb-2">Professional Summary</h3>
                        <p className="text-sm">{resume.personalInfo.summary}</p>
                      </div>
                    )}

                    {resume.experiences.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Experience</h3>
                        {resume.experiences.map((exp) => (
                          <div key={exp.id} className="mb-3">
                            <h4 className="font-medium">{exp.title} - {exp.company}</h4>
                            <p className="text-xs text-gray-600 mb-1">{exp.duration}</p>
                            <p className="text-sm">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {resume.education.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Education</h3>
                        {resume.education.map((edu) => (
                          <div key={edu.id} className="mb-3">
                            <h4 className="font-medium">{edu.degree} - {edu.school}</h4>
                            <p className="text-xs text-gray-600 mb-1">{edu.duration}</p>
                            {edu.description && <p className="text-sm">{edu.description}</p>}
                          </div>
                        ))}
                      </div>
                    )}

                    {resume.skills.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-1">
                          {resume.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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