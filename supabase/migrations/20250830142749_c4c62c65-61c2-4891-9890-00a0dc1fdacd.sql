-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  linkedin TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create resume templates table
CREATE TABLE public.resume_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  preview_description TEXT,
  template_data JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create resumes table
CREATE TABLE public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'My Resume',
  template_id UUID REFERENCES public.resume_templates(id),
  personal_info JSONB,
  experiences JSONB DEFAULT '[]'::jsonb,
  education JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Resume templates policies (public read)
CREATE POLICY "Anyone can view active templates"
ON public.resume_templates FOR SELECT
USING (is_active = true);

-- Resumes policies
CREATE POLICY "Users can view their own resumes"
ON public.resumes FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own resumes"
ON public.resumes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resumes"
ON public.resumes FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes"
ON public.resumes FOR DELETE
USING (auth.uid() = user_id);

-- Create function to handle profile creation on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  RETURN NEW;
END;
$$;

-- Trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default resume templates
INSERT INTO public.resume_templates (name, description, preview_description, template_data) VALUES
('Modern Professional', 'Clean and contemporary design perfect for most industries', 'Template with clean lines and modern typography', '{"layout": "modern", "colors": {"primary": "#2563eb", "secondary": "#64748b"}, "fonts": {"heading": "Inter", "body": "Inter"}}'),
('Creative Designer', 'Bold and artistic layout for creative professionals', 'Bold design perfect for creative roles', '{"layout": "creative", "colors": {"primary": "#7c3aed", "secondary": "#f59e0b"}, "fonts": {"heading": "Poppins", "body": "Open Sans"}}'),
('Executive Classic', 'Traditional and elegant format for senior positions', 'Traditional layout for senior positions', '{"layout": "classic", "colors": {"primary": "#1f2937", "secondary": "#6b7280"}, "fonts": {"heading": "Georgia", "body": "Arial"}}'),
('Tech Minimal', 'Clean minimalist approach ideal for tech roles', 'Minimalist design for tech professionals', '{"layout": "minimal", "colors": {"primary": "#059669", "secondary": "#374151"}, "fonts": {"heading": "JetBrains Mono", "body": "System UI"}}');

-- Create storage bucket for resume PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('resume-pdfs', 'resume-pdfs', false);

-- Storage policies for resume PDFs
CREATE POLICY "Users can view their own resume PDFs"
ON storage.objects FOR SELECT
USING (bucket_id = 'resume-pdfs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own resume PDFs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resume-pdfs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own resume PDFs"
ON storage.objects FOR UPDATE
USING (bucket_id = 'resume-pdfs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own resume PDFs"
ON storage.objects FOR DELETE
USING (bucket_id = 'resume-pdfs' AND auth.uid()::text = (storage.foldername(name))[1]);