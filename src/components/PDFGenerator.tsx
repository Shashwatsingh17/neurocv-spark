import { Resume } from '@/hooks/useResume';

export const generatePDF = async (resume: Resume): Promise<void> => {
  // Simple PDF generation using window.print for now
  // In a real app, you'd use a library like jsPDF or react-pdf
  
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${resume.personalInfo.fullName || 'Resume'}</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                margin: 40px; 
                line-height: 1.6; 
                color: #333;
            }
            .header { 
                text-align: center; 
                margin-bottom: 30px; 
                border-bottom: 2px solid #0066cc;
                padding-bottom: 20px;
            }
            .name { 
                font-size: 28px; 
                font-weight: bold; 
                margin-bottom: 10px;
                color: #0066cc;
            }
            .contact { 
                font-size: 14px; 
                color: #666;
            }
            .section { 
                margin: 25px 0; 
            }
            .section-title { 
                font-size: 18px; 
                font-weight: bold; 
                color: #0066cc;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
                margin-bottom: 15px;
            }
            .experience-item, .education-item { 
                margin-bottom: 20px; 
            }
            .job-title { 
                font-weight: bold; 
                font-size: 16px;
            }
            .company { 
                font-style: italic; 
                color: #666;
            }
            .duration { 
                font-size: 14px; 
                color: #888;
            }
            .skills { 
                display: flex; 
                flex-wrap: wrap; 
                gap: 10px;
            }
            .skill { 
                background: #f0f0f0; 
                padding: 4px 8px; 
                border-radius: 4px; 
                font-size: 14px;
            }
            @media print {
                body { margin: 0; }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="name">${resume.personalInfo.fullName || 'Your Name'}</div>
            <div class="contact">
                ${resume.personalInfo.email || ''} | 
                ${resume.personalInfo.phone || ''} | 
                ${resume.personalInfo.location || ''} | 
                ${resume.personalInfo.linkedin || ''}
            </div>
        </div>

        ${resume.personalInfo.summary ? `
        <div class="section">
            <div class="section-title">PROFESSIONAL SUMMARY</div>
            <p>${resume.personalInfo.summary}</p>
        </div>
        ` : ''}

        ${resume.experiences.length > 0 ? `
        <div class="section">
            <div class="section-title">EXPERIENCE</div>
            ${resume.experiences.map(exp => `
                <div class="experience-item">
                    <div class="job-title">${exp.title}</div>
                    <div class="company">${exp.company}</div>
                    <div class="duration">${exp.duration}</div>
                    <p>${exp.description}</p>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resume.education.length > 0 ? `
        <div class="section">
            <div class="section-title">EDUCATION</div>
            ${resume.education.map(edu => `
                <div class="education-item">
                    <div class="job-title">${edu.degree}</div>
                    <div class="company">${edu.school}</div>
                    <div class="duration">${edu.duration}</div>
                    ${edu.description ? `<p>${edu.description}</p>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resume.skills.length > 0 ? `
        <div class="section">
            <div class="section-title">SKILLS</div>
            <div class="skills">
                ${resume.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
        </div>
        ` : ''}
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};