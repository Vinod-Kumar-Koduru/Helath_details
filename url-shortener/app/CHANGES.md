# URL Shortener Service

## Overview
This project is a simple URL shortener API built with Flask. It allows you to shorten long URLs, redirect using a short code, and view analytics (click count, creation time, original URL) for each short code. All data is stored in memory (no external database).

## Features
- **Shorten URL**: POST `/api/shorten` with a JSON body `{ "url": "https://example.com" }` to receive a 6-character alphanumeric short code.
- **Redirect**: GET `/<short_code>` to be redirected to the original URL.
- **Analytics**: GET `/api/stats/<short_code>` to view click count, creation timestamp, and original URL.
- **Health Checks**: Endpoints for service and API health.
- **Error Handling**: Handles invalid URLs, missing fields, and unknown short codes.
- **Thread-Safe**: Uses locks to handle concurrent requests safely.

## How to Run
1. **Install dependencies**:
   ```sh
   pip install flask pytest
   ```
2. **Start the server** (from the project root):
   ```sh
   $env:PYTHONPATH = "."
   python -m app.main
   ```
   The server will run at http://localhost:5000

3. **Run tests**:
   ```sh
   python -m pytest
   ```
   All tests should pass.

## API Endpoints
### Shorten URL
- **POST** `/api/shorten`
- Body: `{ "url": "https://example.com" }`
- Response: `{ "short_code": "abc123" }`

### Redirect
- **GET** `/<short_code>`
- Redirects to the original URL.

### Analytics
- **GET** `/api/stats/<short_code>`
- Response: `{ "short_code": ..., "original_url": ..., "created_at": ..., "clicks": ... }`

### Health
- **GET** `/` and `/api/health`

## Notes on Implementation
- All data is stored in memory using a dictionary and protected by a threading lock for concurrency.
- URL validation uses a regular expression for basic checks.
- No user authentication, custom short codes, rate limiting, or external databases are implemented, as per requirements.
- The code is organized for clarity and separation of concerns (API, models, utilities, tests).

## AI Usage
Some code and test scaffolding were generated with the help of GitHub Copilot and reviewed/modified for clarity and correctness. All logic and structure were designed to meet the  requirements.

If you have any questions or need to extend the project, feel free to reach out!
