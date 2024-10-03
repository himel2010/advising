import re
import pypdf


class Parse:
    
    def parsePDF(self, path):
        
        pdf = pypdf.PdfReader(path)



        page = pdf.get_page(0)
        page_text = page.extract_text()

        course_re = r"[A-Z]{3}[0-9]{3}"


        courses = []


        for text in page_text.split("\n"):
            
            course = re.match(course_re, text)

            if course:
                
                courses.append(course.group())
            

            
        self.courses = courses

Parse()

# for text in page_text:
    