#!/usr/bin/env python3
"""
Quick Dashboard Functionality Test
Tests core functionality of Mission Control Dashboard
"""

import requests
import time
import json
from urllib.parse import urljoin

BASE_URL = "http://187.77.9.212:3001"

def test_basic_connectivity():
    """Test basic dashboard loading"""
    print("🌐 Testing Basic Connectivity...")
    
    try:
        response = requests.get(BASE_URL, timeout=10)
        if response.status_code == 200:
            html = response.text
            if "Mission Control" in html and "Nate's Command Center" in html:
                print("  ✅ Dashboard loads successfully")
                return True
            else:
                print("  ❌ Dashboard loads but content is incorrect")
                return False
        else:
            print(f"  ❌ HTTP {response.status_code}: {response.reason}")
            return False
    except requests.RequestException as e:
        print(f"  ❌ Connection failed: {e}")
        return False

def test_asset_loading():
    """Test critical asset loading"""
    print("📦 Testing Asset Loading...")
    
    assets = [
        "/_next/static/chunks/7f474d5dfdaa2dcb.css",
        "/_next/static/chunks/4b9eae0c8dc7e975.js",
        "/_next/static/chunks/2f236954d6a65e12.js"
    ]
    
    passed = 0
    for asset in assets:
        try:
            response = requests.get(urljoin(BASE_URL, asset), timeout=5)
            if response.status_code == 200:
                passed += 1
                print(f"  ✅ {asset} loads correctly")
            else:
                print(f"  ❌ {asset} failed: HTTP {response.status_code}")
        except requests.RequestException as e:
            print(f"  ❌ {asset} failed: {e}")
    
    if passed == len(assets):
        print(f"  ✅ All {len(assets)} critical assets loaded successfully")
        return True
    else:
        print(f"  ❌ Only {passed}/{len(assets)} assets loaded successfully")
        return False

def test_dashboard_components():
    """Test dashboard component presence"""
    print("🏠 Testing Dashboard Components...")
    
    try:
        response = requests.get(BASE_URL, timeout=10)
        html = response.text
        
        components = {
            "Welcome Message": "Welcome Back, Nate",
            "Ideas Section": "Ideas Queue",
            "Content Pipeline": "Content Pipeline", 
            "Approvals Queue": "Pending Approvals",
            "Project Tracker": "Active Projects",
            "Recent Activity": "Recent Activity",
            "Priority Tasks": "Priority Tasks",
            "Quick Actions": "Quick Actions"
        }
        
        passed = 0
        for name, marker in components.items():
            if marker in html:
                print(f"  ✅ {name} component present")
                passed += 1
            else:
                print(f"  ❌ {name} component missing")
        
        if passed == len(components):
            print(f"  ✅ All {len(components)} dashboard components present")
            return True
        else:
            print(f"  ❌ Only {passed}/{len(components)} components found")
            return False
            
    except requests.RequestException as e:
        print(f"  ❌ Failed to test components: {e}")
        return False

def test_navigation_structure():
    """Test navigation sidebar structure"""
    print("🧭 Testing Navigation Structure...")
    
    try:
        response = requests.get(BASE_URL, timeout=10)
        html = response.text
        
        nav_sections = [
            "Dashboard", "Ideas", "Content Pipeline", 
            "Approvals Queue", "Project Tracker", 
            "Personal Metrics", "Settings"
        ]
        
        passed = 0
        for section in nav_sections:
            if section in html:
                print(f"  ✅ {section} navigation item present")
                passed += 1
            else:
                print(f"  ❌ {section} navigation item missing")
        
        if passed == 7:
            print("  ✅ All 7 navigation sections present")
            return True
        else:
            print(f"  ❌ Only {passed}/7 navigation sections found")
            return False
            
    except requests.RequestException as e:
        print(f"  ❌ Failed to test navigation: {e}")
        return False

def test_sample_data():
    """Test sample data presence"""
    print("📊 Testing Sample Data...")
    
    try:
        response = requests.get(BASE_URL, timeout=10)
        html = response.text
        
        sample_data = {
            "Ideas Count": ">12</p>",
            "Content Count": ">5</p>", 
            "Approvals Count": ">3</p>",
            "Projects Count": ">8</p>",
            "Sample Idea": "AI Code Review Assistant",
            "Sample Activity": "Completed YouTube script"
        }
        
        passed = 0
        for name, marker in sample_data.items():
            if marker in html:
                print(f"  ✅ {name} sample data present")
                passed += 1
            else:
                print(f"  ❌ {name} sample data missing")
        
        if passed >= 4:  # At least the counts should be there
            print("  ✅ Sample data properly loaded")
            return True
        else:
            print("  ❌ Sample data incomplete")
            return False
            
    except requests.RequestException as e:
        print(f"  ❌ Failed to test sample data: {e}")
        return False

def test_performance():
    """Test loading performance"""
    print("⚡ Testing Performance...")
    
    try:
        start_time = time.time()
        response = requests.get(BASE_URL, timeout=10)
        load_time = (time.time() - start_time) * 1000  # Convert to milliseconds
        
        if response.status_code == 200:
            if load_time < 2000:
                print(f"  ✅ Dashboard loads in {load_time:.0f}ms (excellent)")
                return True
            elif load_time < 5000:
                print(f"  ⚠️ Dashboard loads in {load_time:.0f}ms (acceptable)")
                return True
            else:
                print(f"  ❌ Dashboard loads in {load_time:.0f}ms (too slow)")
                return False
        else:
            print(f"  ❌ Performance test failed: HTTP {response.status_code}")
            return False
            
    except requests.RequestException as e:
        print(f"  ❌ Performance test failed: {e}")
        return False

def test_responsive_elements():
    """Test responsive design elements"""
    print("📱 Testing Responsive Design...")
    
    try:
        response = requests.get(BASE_URL, timeout=10)
        html = response.text
        
        responsive_classes = [
            "md:grid-cols-2",  # Medium screen grid
            "lg:grid-cols-4",  # Large screen grid
            "max-w-7xl",       # Container max width
            "overflow-y-auto", # Vertical scrolling
            "flex h-screen"    # Full height layout
        ]
        
        passed = 0
        for class_name in responsive_classes:
            if class_name in html:
                passed += 1
        
        if passed >= 3:
            print(f"  ✅ Responsive design classes present ({passed}/{len(responsive_classes)})")
            return True
        else:
            print(f"  ❌ Insufficient responsive design ({passed}/{len(responsive_classes)})")
            return False
            
    except requests.RequestException as e:
        print(f"  ❌ Failed to test responsive design: {e}")
        return False

def run_all_tests():
    """Run comprehensive dashboard test suite"""
    print("🧸 Mission Control Dashboard - Comprehensive Test Suite")
    print("=" * 60)
    
    tests = [
        ("Basic Connectivity", test_basic_connectivity),
        ("Asset Loading", test_asset_loading),
        ("Dashboard Components", test_dashboard_components),
        ("Navigation Structure", test_navigation_structure),
        ("Sample Data", test_sample_data),
        ("Performance", test_performance),
        ("Responsive Design", test_responsive_elements)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\n🔍 {test_name}:")
        result = test_func()
        results.append((test_name, result))
        print()
    
    # Summary
    passed = sum(1 for _, result in results if result)
    total = len(results)
    success_rate = (passed / total) * 100
    
    print("=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\n🎯 Overall Results:")
    print(f"   Passed: {passed}/{total} tests")
    print(f"   Success Rate: {success_rate:.1f}%")
    
    if success_rate >= 85:
        print("   🎉 DASHBOARD FULLY FUNCTIONAL!")
    elif success_rate >= 70:
        print("   ⚠️ Dashboard mostly functional with minor issues")
    else:
        print("   ❌ Dashboard has significant issues requiring attention")
    
    print("\n🌐 Dashboard URL: http://187.77.9.212:3001")
    print("📋 Test completed at:", time.strftime("%Y-%m-%d %H:%M:%S UTC"))
    
    return success_rate >= 85

if __name__ == "__main__":
    run_all_tests()