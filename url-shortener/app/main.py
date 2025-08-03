from flask import Flask, jsonify, request, redirect, abort
from .models import url_store, create_short_code, get_url_data, increment_click_count
from .utils import is_valid_url

app = Flask(__name__)

@app.route('/')
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "URL Shortener API"
    })

@app.route('/api/shorten', methods=['POST'])
def shorten_url():
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({"error": "Missing 'url' in request body"}), 400
    long_url = data['url']
    if not is_valid_url(long_url):
        return jsonify({"error": "Invalid URL"}), 400
    short_code = create_short_code(long_url)
    return jsonify({"short_code": short_code}), 201


@app.route('/<short_code>')
def redirect_short_url(short_code):
    url_data = get_url_data(short_code)
    if not url_data:
        abort(404, description="Short code not found")
    increment_click_count(short_code)
    return redirect(url_data['original_url'])


@app.route('/api/stats/<short_code>')
def stats(short_code):
    url_data = get_url_data(short_code)
    if not url_data:
        return jsonify({"error": "Short code not found"}), 404
    return jsonify({
        "short_code": short_code,
        "original_url": url_data['original_url'],
        "created_at": url_data['created_at'],
        "clicks": url_data['clicks']
    })

@app.route('/api/health')
def api_health():
    return jsonify({
        "status": "ok",
        "message": "URL Shortener API is running"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)