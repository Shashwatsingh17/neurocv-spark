import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  duration: string;
  description: string;
}

export interface Resume {
  id?: string;
  title: string;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  templateId?: string;
  isPublished?: boolean;
}

export const useResume = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [resume, setResume] = useState<Resume>({
    title: 'My Resume',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      summary: ''
    },
    experiences: [],
    education: [],
    skills: [],
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load existing resume on mount
  useEffect(() => {
    if (user) {
      loadResume();
    }
  }, [user]);

  const loadResume = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error loading resume:', error);
        return;
      }

      if (data) {
        setResume({
          id: data.id,
          title: data.title,
          personalInfo: (data.personal_info as any || {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            linkedin: '',
            summary: ''
          }) as PersonalInfo,
          experiences: (data.experiences as any || []) as Experience[],
          education: (data.education as any || []) as Education[],
          skills: (data.skills as any || []) as string[],
          templateId: data.template_id,
          isPublished: data.is_published,
        });
      }
    } catch (error) {
      console.error('Error loading resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveResume = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to save your resume.",
      });
      return;
    }

    setSaving(true);
    try {
      const resumeData = {
        user_id: user.id,
        title: resume.title,
        personal_info: resume.personalInfo as any,
        experiences: resume.experiences as any,
        education: resume.education as any,
        skills: resume.skills as any,
        template_id: resume.templateId,
        is_published: resume.isPublished || false,
      };

      if (resume.id) {
        // Update existing resume
        const { error } = await supabase
          .from('resumes')
          .update(resumeData)
          .eq('id', resume.id);

        if (error) throw error;
      } else {
        // Create new resume
        const { data, error } = await supabase
          .from('resumes')
          .insert([resumeData])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setResume(prev => ({ ...prev, id: data.id }));
        }
      }

      toast({
        title: "Success!",
        description: "Your resume has been saved.",
      });
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Failed to save your resume. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const updateExperiences = (experiences: Experience[]) => {
    setResume(prev => ({ ...prev, experiences }));
  };

  const updateEducation = (education: Education[]) => {
    setResume(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: string[]) => {
    setResume(prev => ({ ...prev, skills }));
  };

  const updateTemplate = (templateId: string) => {
    setResume(prev => ({ ...prev, templateId }));
  };

  return {
    resume,
    loading,
    saving,
    saveResume,
    updatePersonalInfo,
    updateExperiences,
    updateEducation,
    updateSkills,
    updateTemplate,
    loadResume,
  };
};