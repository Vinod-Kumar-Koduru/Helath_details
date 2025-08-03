import pytest
from app.main import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    response = client.get('/')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'
    assert data['service'] == 'URL Shortener API'


def test_shorten_and_redirect(client):
    long_url = 'https://example.com/page1'
    response = client.post('/api/shorten', json={'url': long_url})
    assert response.status_code == 201
    short_code = response.get_json()['short_code']
    assert len(short_code) == 6

    response = client.get(f'/{short_code}', follow_redirects=False)
    assert response.status_code == 302
    assert response.headers['Location'] == long_url

def test_analytics(client):
    long_url = 'https://example.com/analytics'
    response = client.post('/api/shorten', json={'url': long_url})
    short_code = response.get_json()['short_code']
  
    client.get(f'/{short_code}')

    response = client.get(f'/api/stats/{short_code}')
    assert response.status_code == 200
    data = response.get_json()
    assert data['original_url'] == long_url
    assert data['clicks'] == 1
    assert 'created_at' in data

def test_invalid_url(client):
    response = client.post('/api/shorten', json={'url': 'not_a_url'})
    assert response.status_code == 400
    assert 'Invalid URL' in response.get_json()['error']

def test_missing_url_field(client):
    response = client.post('/api/shorten', json={})
    assert response.status_code == 400
    assert 'Missing' in response.get_json()['error']

def test_redirect_404(client):
    response = client.get('/nope123')
    assert response.status_code == 404

def test_stats_404(client):
    response = client.get('/api/stats/unknown')
    assert response.status_code == 404