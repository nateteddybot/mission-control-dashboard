#!/bin/bash

# Mission Control Dashboard Launch Script

echo "🚀 Launching Mission Control Dashboard (Production)..."
echo "📍 Location: $(pwd)"

# Check if production build exists
if [ ! -d "out" ]; then
    echo "🏗️ No production build found. Building..."
    npm run build
fi

echo "🌐 Starting production server..."
echo "📊 Dashboard will be available at:"
echo "   - http://localhost:3001"
echo "   - http://187.77.9.212:3001"
echo ""
echo "🧸 Teddy's Mission Control - Nate's Command Center"
echo ""
echo "✨ Features:"
echo "  💡 Ideas Backlog - Business & content idea management"
echo "  📝 Content Pipeline - YouTube-first workflow"
echo "  ✅ Approvals Queue - AI proposal reviews"
echo "  📊 Project Tracker - Multi-category project management"
echo "  📈 Personal Metrics - Consistency & growth tracking"
echo "  ⚙️ Settings - Complete system configuration"
echo ""
echo "🔒 Security: Headers enabled, optimized assets, production-ready"
echo "📱 Mobile: Fully responsive design"
echo "💾 Data: Browser localStorage (privacy-first)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the production server
python3 serve-production.py