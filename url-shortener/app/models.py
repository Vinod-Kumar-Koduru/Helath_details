import threading
import time
import random
import string


url_store = {}
store_lock = threading.Lock()

def _generate_code(length=6):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choices(chars, k=length))

def create_short_code(long_url):

    with store_lock:
        for code, data in url_store.items():
            if data['original_url'] == long_url:
                return code
        while True:
            code = _generate_code()
            if code not in url_store:
                url_store[code] = {
                    'original_url': long_url,
                    'created_at': time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime()),
                    'clicks': 0
                }
                return code

def get_url_data(short_code):
    with store_lock:
        return url_store.get(short_code)

def increment_click_count(short_code):
    with store_lock:
        if short_code in url_store:
            url_store[short_code]['clicks'] += 1
        