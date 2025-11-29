#!/usr/bin/env python3
"""
Convert markdown to PDF with professional styling
"""
import subprocess
import sys
import os

def convert_markdown_to_pdf(md_file, pdf_file):
    """Convert markdown to PDF using pandoc with weasyprint or HTML intermediate"""
    
    # Try weasyprint first (if available)
    try:
        result = subprocess.run(
            ['pandoc', md_file, '-o', pdf_file, 
             '--pdf-engine=weasyprint',
             '-V', 'geometry:margin=1in',
             '-V', 'fontsize=11pt',
             '--standalone'],
            capture_output=True,
            text=True,
            check=True
        )
        print(f"✓ Successfully created PDF using weasyprint: {pdf_file}")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass
    
    # Fallback: Create HTML first, then try to convert
    html_file = md_file.replace('.md', '.html')
    try:
        # Convert markdown to HTML with styling
        subprocess.run(
            ['pandoc', md_file, '-o', html_file, 
             '--standalone',
             '--css=style.css'],
            check=True
        )
        print(f"✓ Created HTML: {html_file}")
        
        # Try to convert HTML to PDF using weasyprint
        try:
            subprocess.run(
                ['weasyprint', html_file, pdf_file],
                check=True
            )
            print(f"✓ Successfully created PDF: {pdf_file}")
            os.remove(html_file)  # Clean up HTML
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("⚠ Could not convert HTML to PDF. HTML file created instead.")
            return False
    except subprocess.CalledProcessError as e:
        print(f"✗ Error: {e}")
        return False

if __name__ == '__main__':
    md_file = 'Koba42-Idea-Checklist.md'
    pdf_file = 'Koba42-Idea-Checklist.pdf'
    
    if not os.path.exists(md_file):
        print(f"Error: {md_file} not found")
        sys.exit(1)
    
    convert_markdown_to_pdf(md_file, pdf_file)

