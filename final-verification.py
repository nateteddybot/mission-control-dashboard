#!/usr/bin/env python3
"""
Final Comprehensive Dashboard Verification
Tests all critical functionality end-to-end
"""

import requests
import time
import json

BASE_URL = "http://187.77.9.212:3001"

def test_dashboard_accessibility():
    """Test basic dashboard access and response"""
    print("🌐 Testing Dashboard Accessibility...")
    
    try:
        start_time = time.time()
        response = requests.get(BASE_URL, timeout=10)
        load_time = (time.time() - start_time) * 1000
        
        if response.status_code == 200:
            print(f"  ✅ Dashboard accessible in {load_time:.0f}ms")
            print(f"  ✅ Response size: {len(response.content)} bytes")
            print(f"  ✅ Content-Type: {response.headers.get('content-type', 'unknown')}")
            return True, response.text
        else:
            print(f"  ❌ HTTP {response.status_code}: {response.reason}")
            return False, None
            
    except Exception as e:
        print(f"  ❌ Connection failed: {e}")
        return False, None

def test_critical_components(html):
    """Test presence of all critical dashboard components"""
    print("🧩 Testing Critical Components...")
    
    components = {
        "Page Title": "Mission Control",
        "Welcome Message": "Welcome Back, Nate",
        "Sidebar Navigation": "Mission Control",
        "Quick Actions": "Quick Actions",
        "Austin Time": "Austin, TX",
        "Ideas Section": "Ideas Queue",
        "Content Pipeline": "Content Pipeline",
        "Recent Activity": "Recent Activity",
        "Priority Tasks": "Priority Tasks"
    }
    
    passed = 0
    for component, marker in components.items():
        if marker in html:
            print(f"  ✅ {component}")
            passed += 1
        else:
            print(f"  ❌ {component} - Missing")
    
    success_rate = (passed / len(components)) * 100
    print(f"  📊 Component Integrity: {passed}/{len(components)} ({success_rate:.1f}%)")
    return passed == len(components)

def test_navigation_structure(html):
    """Test navigation sidebar structure"""
    print("🧭 Testing Navigation Structure...")
    
    nav_items = [
        "Dashboard", "Ideas", "Content Pipeline", 
        "Approvals Queue", "Project Tracker", 
        "Personal Metrics", "Settings"
    ]
    
    passed = 0
    for item in nav_items:
        if item in html:
            print(f"  ✅ {item}")
            passed += 1
        else:
            print(f"  ❌ {item} - Missing")
    
    print(f"  📊 Navigation Completeness: {passed}/{len(nav_items)} sections")
    return passed == len(nav_items)

def test_interactive_elements(html):
    """Test interactive elements presence"""
    print("⚡ Testing Interactive Elements...")
    
    interactive_elements = {
        "Button Elements": "button",
        "Form Inputs": "input",
        "Select Dropdowns": "select", 
        "React Hydration": "_next",
        "Click Handlers": "onClick",
        "CSS Styling": "class=",
        "JavaScript Assets": ".js",
        "CSS Assets": ".css"
    }
    
    passed = 0
    for element, marker in interactive_elements.items():
        if marker in html:
            print(f"  ✅ {element}")
            passed += 1
        else:
            print(f"  ⚠️ {element} - Not detected")
    
    print(f"  📊 Interactive Elements: {passed}/{len(interactive_elements)} detected")
    return passed >= 6  # At least 6 out of 8 should be present

def test_data_integrity(html):
    """Test sample data integrity"""
    print("📊 Testing Sample Data Integrity...")
    
    data_points = {
        "Ideas Count (12)": ">12</p>",
        "Content Count (5)": ">5</p>",
        "Approvals Count (3)": ">3</p>",
        "Projects Count (8)": ">8</p>",
        "AI Assistant Idea": "AI Code Review Assistant",
        "YouTube Content": "YouTube",
        "Recent Activity": "Completed YouTube script",
        "High Priority Tasks": "High Priority"
    }
    
    passed = 0
    for data, marker in data_points.items():
        if marker in html:
            print(f"  ✅ {data}")
            passed += 1
        else:
            print(f"  ❌ {data} - Missing")
    
    print(f"  📊 Data Integrity: {passed}/{len(data_points)} data points")
    return passed >= 6

def test_server_health():
    """Test server health and stability"""
    print("🏥 Testing Server Health...")
    
    try:
        # Test multiple rapid requests
        times = []
        for i in range(3):
            start = time.time()
            response = requests.get(BASE_URL, timeout=5)
            times.append((time.time() - start) * 1000)
            if response.status_code != 200:
                print(f"  ❌ Request {i+1} failed: HTTP {response.status_code}")
                return False
        
        avg_time = sum(times) / len(times)
        print(f"  ✅ Server responding consistently")
        print(f"  ✅ Average response time: {avg_time:.1f}ms")
        print(f"  ✅ All requests successful")
        
        return avg_time < 5000  # Less than 5 seconds is good
        
    except Exception as e:
        print(f"  ❌ Server health check failed: {e}")
        return False

def run_final_verification():
    """Run complete verification suite"""
    print("🔍 Mission Control Dashboard - FINAL VERIFICATION")
    print("=" * 65)
    
    # Test 1: Basic Accessibility
    accessible, html = test_dashboard_accessibility()
    if not accessible:
        print("\n❌ CRITICAL FAILURE: Dashboard not accessible")
        return False
    
    print()
    
    # Test 2: Component Integrity
    components_ok = test_critical_components(html)
    print()
    
    # Test 3: Navigation Structure
    navigation_ok = test_navigation_structure(html)
    print()
    
    # Test 4: Interactive Elements
    interactive_ok = test_interactive_elements(html)
    print()
    
    # Test 5: Data Integrity
    data_ok = test_data_integrity(html)
    print()
    
    # Test 6: Server Health
    server_ok = test_server_health()
    print()
    
    # Overall Results
    tests = [
        ("Dashboard Accessibility", accessible),
        ("Component Integrity", components_ok),
        ("Navigation Structure", navigation_ok), 
        ("Interactive Elements", interactive_ok),
        ("Data Integrity", data_ok),
        ("Server Health", server_ok)
    ]
    
    passed = sum(1 for _, result in tests if result)
    total = len(tests)
    success_rate = (passed / total) * 100
    
    print("=" * 65)
    print("🎯 FINAL VERIFICATION RESULTS")
    print("=" * 65)
    
    for test_name, result in tests:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\n📊 Overall Results:")
    print(f"   Tests Passed: {passed}/{total}")
    print(f"   Success Rate: {success_rate:.1f}%")
    
    if success_rate >= 100:
        print("   🎉 PERFECT SCORE - DASHBOARD FULLY OPERATIONAL!")
    elif success_rate >= 85:
        print("   ✅ EXCELLENT - Dashboard fully functional")
    elif success_rate >= 70:
        print("   ⚠️ GOOD - Dashboard mostly functional")
    else:
        print("   ❌ ISSUES DETECTED - Needs attention")
    
    print(f"\n🌐 Dashboard URL: {BASE_URL}")
    print(f"🕐 Verification completed: {time.strftime('%Y-%m-%d %H:%M:%S UTC')}")
    
    return success_rate >= 85

if __name__ == "__main__":
    run_final_verification()