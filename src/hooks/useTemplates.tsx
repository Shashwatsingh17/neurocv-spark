import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ResumeTemplate {
  id: string;
  name: string;
  description?: string;
  preview_description?: string;
  template_data: any;
  is_active: boolean;
}

export const useTemplates = () => {
  const [templates, setTemplates] = useState<ResumeTemplate[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resume_templates')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error('Error loading templates:', error);
        return;
      }

      setTemplates(data || []);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    templates,
    loading,
    loadTemplates,
  };
};