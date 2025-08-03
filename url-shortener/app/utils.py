import re

def is_valid_url(url):
    regex = re.compile(
        r'^(https?://)'  
        r'([\w.-]+)'   
        r'(:\d+)?'    
        r'(/[\w./?%&=\-]*)?$', re.IGNORECASE)
    return re.match(regex, url) is not None