#!/usr/bin/env python3
"""
Production-ready server for Mission Control Dashboard
"""

import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse, unquote
import mimetypes

class ProductionHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="/home/teddy/.openclaw/workspace/mission-control/out", **kwargs)
    
    def end_headers(self):
        # Add security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Cache-Control', 'public, max-age=3600')
        super().end_headers()
    
    def do_GET(self):
        # Handle SPA routing - serve index.html for routes that don't exist
        parsed_path = urlparse(self.path)
        path = unquote(parsed_path.path)
        
        # Remove leading slash and convert to file path
        file_path = path.lstrip('/')
        full_path = os.path.join(self.directory, file_path)
        
        # If path doesn't exist and doesn't have an extension, serve index.html
        if not os.path.exists(full_path) and '.' not in os.path.basename(path):
            self.path = '/'
        
        super().do_GET()

if __name__ == "__main__":
    PORT = 3001
    HOST = "0.0.0.0"  # Bind to all interfaces
    
    print(f"🚀 Starting Mission Control Dashboard (Production)")
    print(f"📍 Serving from: /home/teddy/.openclaw/workspace/mission-control/out")
    print(f"🌐 Available at:")
    print(f"   - http://localhost:{PORT}")
    print(f"   - http://187.77.9.212:{PORT}")
    print(f"📊 Dashboard features: Ideas, Content Pipeline, Projects, Metrics")
    print(f"🔒 Security headers enabled")
    print(f"⏹️  Press Ctrl+C to stop")
    print("")
    
    try:
        with socketserver.TCPServer((HOST, PORT), ProductionHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)