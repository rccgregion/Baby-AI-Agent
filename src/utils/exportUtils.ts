import jsPDF from 'jspdf'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'
import { ResearchProject } from '../store/researchStore'

export const exportToPDF = async (content: string, project: ResearchProject) => {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20
  const lineHeight = 7
  let yPosition = margin

  // Helper function to add text with word wrapping
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    pdf.setFontSize(fontSize)
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal')
    
    const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin)
    
    for (const line of lines) {
      if (yPosition > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
      }
      pdf.text(line, margin, yPosition)
      yPosition += lineHeight
    }
    yPosition += lineHeight * 0.5 // Extra spacing
  }

  // Title page
  pdf.setFontSize(20)
  pdf.setFont('helvetica', 'bold')
  const titleLines = pdf.splitTextToSize(project.title, pageWidth - 2 * margin)
  const titleStartY = pageHeight / 3
  
  titleLines.forEach((line: string, index: number) => {
    pdf.text(line, pageWidth / 2, titleStartY + (index * 10), { align: 'center' })
  })

  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'normal')
  pdf.text(`${project.fieldOfStudy}`, pageWidth / 2, titleStartY + 40, { align: 'center' })
  pdf.text(`${project.academicLevel.charAt(0).toUpperCase() + project.academicLevel.slice(1)} Level Research`, pageWidth / 2, titleStartY + 50, { align: 'center' })
  pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, titleStartY + 70, { align: 'center' })

  // Add new page for content
  pdf.addPage()
  yPosition = margin

  // Parse markdown content and add to PDF
  const lines = content.split('\n')
  
  for (const line of lines) {
    if (line.trim() === '') {
      yPosition += lineHeight * 0.5
      continue
    }
    
    if (line.startsWith('# ')) {
      addText(line.substring(2), 18, true)
    } else if (line.startsWith('## ')) {
      addText(line.substring(3), 16, true)
    } else if (line.startsWith('### ')) {
      addText(line.substring(4), 14, true)
    } else if (line.startsWith('#### ')) {
      addText(line.substring(5), 12, true)
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      addText(`• ${line.substring(2)}`, 12, false)
    } else if (line.match(/^\d+\. /)) {
      addText(line, 12, false)
    } else if (line.startsWith('**') && line.endsWith('**')) {
      addText(line.substring(2, line.length - 2), 12, true)
    } else if (line.trim() !== '---') {
      addText(line, 12, false)
    }
  }

  // Save the PDF
  pdf.save(`${project.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_research_paper.pdf`)
}

export const exportToDocx = async (content: string, project: ResearchProject) => {
  const children: any[] = []

  // Title page
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: project.title,
          bold: true,
          size: 32,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: project.fieldOfStudy,
          size: 24,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `${project.academicLevel.charAt(0).toUpperCase() + project.academicLevel.slice(1)} Level Research`,
          size: 20,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Generated on ${new Date().toLocaleDateString()}`,
          size: 16,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 800 },
    })
  )

  // Parse markdown content
  const lines = content.split('\n')
  
  for (const line of lines) {
    if (line.trim() === '' || line.trim() === '---') {
      children.push(new Paragraph({ text: '' }))
      continue
    }
    
    if (line.startsWith('# ')) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line.substring(2),
              bold: true,
              size: 32,
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      )
    } else if (line.startsWith('## ')) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line.substring(3),
              bold: true,
              size: 28,
            }),
          ],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        })
      )
    } else if (line.startsWith('### ')) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line.substring(4),
              bold: true,
              size: 24,
            }),
          ],
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        })
      )
    } else if (line.startsWith('#### ')) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line.substring(5),
              bold: true,
              size: 22,
            }),
          ],
          heading: HeadingLevel.HEADING_4,
          spacing: { before: 150, after: 75 },
        })
      )
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `• ${line.substring(2)}`,
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        })
      )
    } else if (line.match(/^\d+\. /)) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        })
      )
    } else if (line.startsWith('**') && line.endsWith('**')) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line.substring(2, line.length - 2),
              bold: true,
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        })
      )
    } else {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        })
      )
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, `${project.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_research_paper.docx`)
}