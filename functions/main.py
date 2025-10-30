# main.py

import os
import requests
from firebase_functions import https_fn
from firebase_admin import initialize_app

initialize_app()

# Get the base URL of your FastAPI backend from an environment variable
# You will need to set this environment variable in your Firebase project settings
FASTAPI_BACKEND_URL = os.environ.get("FASTAPI_BACKEND_URL", "https://your-fastapi-backend.com")

@https_fn.on_request()
def api_proxy(req: https_fn.Request) -> https_fn.Response:
    """Proxy requests to the FastAPI backend."""
    
    # Construct the full URL for the FastAPI backend
    path = req.path
    if path.startswith("/api/"):
        path = path[5:] # Remove the "/api/" prefix
        
    url = f"{FASTAPI_BACKEND_URL}/{path}"
    
    # Forward the request to the FastAPI backend
    try:
        response = requests.request(
            method=req.method,
            url=url,
            headers=dict(req.headers),
            data=req.get_data(),
            params=req.args,
            stream=True # Use stream to handle large responses
        )
        
        # Create a Flask response to stream the content back to the client
        return https_fn.Response(
            response.iter_content(),
            status=response.status_code,
            headers=response.headers.items()
        )
    except requests.exceptions.RequestException as e:
        return https_fn.Response(f"Error proxying request: {e}", status=502)

