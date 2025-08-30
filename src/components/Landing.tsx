import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Scene3D from './3DScene';
import { useNavigate } from 'react-router-dom';
import { Brain, Zap, Download, Eye, Shield, Sparkles } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Smart suggestions to optimize your resume content and structure"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional resumes in seconds, not hours"
    },
    {
      icon: Eye,
      title: "Live Preview",
      description: "See changes in real-time as you build your perfect resume"
    },
    {
      icon: Download,
      title: "Export Ready",
      description: "Download in PDF format optimized for ATS systems"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is secure and never shared with third parties"
    },
    {
      icon: Sparkles,
      title: "Multiple Templates",
      description: "Choose from professionally designed resume templates"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">NeuroCV</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>Sign In</Button>
            <Button variant="default" size="sm" onClick={() => navigate('/auth')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-4">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Powered by AI
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="gradient-text">Smarter</span> Resumes,
                  <br />
                  <span className="text-foreground">Faster</span> Results
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Create professional, ATS-optimized resumes in minutes with our AI-powered platform. 
                  Stand out from the competition and land your dream job.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground glow-box animate-pulse-glow"
                  onClick={() => navigate('/auth')}
                >
                  Build My Resume Now
                  <Zap className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="border-primary/50 hover:border-primary">
                  Watch Demo
                  <Eye className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            
            <div className="h-[600px] relative">
              <Scene3D />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to create the <span className="gradient-text">perfect resume</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides all the tools and intelligence you need to craft 
              a resume that gets results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 card-shadow hover:glow-box transition-all duration-300 bg-gradient-to-br from-card to-card/50">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Process</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Create your resume in <span className="gradient-text">3 simple steps</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Input Your Details",
                description: "Fill in your professional information using our smart form"
              },
              {
                step: "02", 
                title: "Choose Template",
                description: "Select from our collection of ATS-optimized templates"
              },
              {
                step: "03",
                title: "Download & Apply",
                description: "Get your polished resume and start applying to jobs"
              }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to create your <span className="gradient-text">perfect resume</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of professionals who have already landed their dream jobs with NeuroCV.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground glow-box animate-pulse-glow"
              onClick={() => navigate('/auth')}
            >
              Start Building Now - It's Free
              <Zap className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">NeuroCV</span>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              © 2024 NeuroCV. All rights reserved. Smarter Resumes, Faster Results.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}