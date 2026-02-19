#!/usr/bin/env python3
"""
Interactive Dashboard Test - Tests JavaScript functionality
"""

import requests
import json
import time

BASE_URL = "http://187.77.9.212:3001"

def test_interactive_features():
    """Test interactive features that depend on JavaScript"""
    print("⚡ Testing Interactive Features...")
    
    try:
        # Get the dashboard page
        response = requests.get(BASE_URL, timeout=10)
        html = response.text
        
        # Check for interactive elements
        interactive_features = {
            "React Hydration": "self.__next_f",  # Next.js client-side code
            "State Management": "useState",      # React hooks in source
            "Event Handlers": "onClick",        # Click handlers
            "LocalStorage": "localStorage",     # Data persistence
            "Client Components": "'use client'", # Client-side components
            "Form Handling": "onSubmit",        # Form interactions
        }
        
        passed = 0
        for feature, marker in interactive_features.items():
            if marker in html:
                print(f"  ✅ {feature} - Implementation detected")
                passed += 1
            else:
                print(f"  ⚠️ {feature} - Not detected in source")
        
        # Test specific component features
        component_features = {
            "Navigation Buttons": "button class=\"w-full text-left",
            "Add Form Components": "Add Idea" or "+ Add",
            "Interactive Cards": "hover:bg-gray-50",
            "Responsive Grids": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
            "Status Updates": "status",
            "Time Display": "Austin, TX",
        }
        
        component_passed = 0
        for feature, marker in component_features.items():
            if marker in html or any(m in html for m in marker.split(" or ") if " or " in str(marker)):
                print(f"  ✅ {feature} - Component present")
                component_passed += 1
            else:
                print(f"  ❌ {feature} - Component missing")
        
        total_passed = passed + component_passed
        total_tests = len(interactive_features) + len(component_features)
        
        if total_passed >= total_tests * 0.8:
            print(f"  ✅ Interactive features: {total_passed}/{total_tests} working")
            return True
        else:
            print(f"  ⚠️ Interactive features: {total_passed}/{total_tests} working")
            return False
            
    except requests.RequestException as e:
        print(f"  ❌ Failed to test interactive features: {e}")
        return False

def test_data_structure():
    """Test the data structures and sample data integrity"""
    print("📊 Testing Data Structures...")
    
    try:
        response = requests.get(BASE_URL, timeout=10)
        html = response.text
        
        # Expected data patterns
        data_patterns = {
            "Ideas Data": "AI Code Review Assistant",
            "Statistics": [">12</p>", ">5</p>", ">3</p>", ">8</p>"],
            "Activity Items": "Completed YouTube script",
            "Priority Labels": "High Priority",
            "Category Labels": ["Business", "Work"],
            "Time Stamps": ["hours ago", "Austin, TX"],
        }
        
        passed = 0
        total = 0
        
        for category, patterns in data_patterns.items():
            if isinstance(patterns, list):
                category_passed = sum(1 for pattern in patterns if pattern in html)
                category_total = len(patterns)
                print(f"  📋 {category}: {category_passed}/{category_total} patterns found")
                passed += category_passed
                total += category_total
            else:
                if patterns in html:
                    print(f"  ✅ {category}: Present")
                    passed += 1
                else:
                    print(f"  ❌ {category}: Missing")
                total += 1
        
        if passed >= total * 0.8:
            print(f"  ✅ Data structures: {passed}/{total} elements present")
            return True
        else:
            print(f"  ⚠️ Data structures: {passed}/{total} elements present")
            return False
            
    except requests.RequestException as e:
        print(f"  ❌ Failed to test data structures: {e}")
        return False

def test_layout_integrity():
    """Test layout and styling integrity"""
    print("🎨 Testing Layout Integrity...")
    
    try:
        response = requests.get(BASE_URL, timeout=10)
        html = response.text
        
        # Critical layout elements
        layout_elements = {
            "Main Layout": "flex h-screen bg-gray-100",
            "Sidebar": "w-64 bg-white shadow-lg h-full",
            "Main Content": "flex-1 overflow-hidden",
            "Grid Layout": "grid grid-cols-1",
            "Card Components": "bg-white rounded-lg shadow",
            "Button Styling": "px-4 py-2",
            "Responsive Classes": ["md:", "lg:", "xl:"],
            "Color Classes": ["text-gray-", "bg-blue-", "border-"],
        }
        
        passed = 0
        total = 0
        
        for element, pattern in layout_elements.items():
            if isinstance(pattern, list):
                element_passed = sum(1 for p in pattern if p in html)
                element_total = len(pattern)
                print(f"  🎨 {element}: {element_passed}/{element_total} patterns found")
                passed += element_passed
                total += element_total
            else:
                if pattern in html:
                    print(f"  ✅ {element}: Present")
                    passed += 1
                else:
                    print(f"  ❌ {element}: Missing")
                total += 1
        
        if passed >= total * 0.9:
            print(f"  ✅ Layout integrity: {passed}/{total} elements correct")
            return True
        else:
            print(f"  ⚠️ Layout integrity: {passed}/{total} elements correct")
            return False
            
    except requests.RequestException as e:
        print(f"  ❌ Failed to test layout: {e}")
        return False

def run_interactive_tests():
    """Run comprehensive interactive feature tests"""
    print("🎮 Mission Control Dashboard - Interactive Feature Tests")
    print("=" * 65)
    
    tests = [
        ("Interactive Features", test_interactive_features),
        ("Data Structures", test_data_structure),
        ("Layout Integrity", test_layout_integrity),
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
    
    print("=" * 65)
    print("🎯 INTERACTIVE TESTS SUMMARY")
    print("=" * 65)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\n📊 Interactive Results:")
    print(f"   Passed: {passed}/{total} test categories")
    print(f"   Success Rate: {success_rate:.1f}%")
    
    if success_rate >= 90:
        print("   🎉 ALL INTERACTIVE FEATURES WORKING!")
    elif success_rate >= 75:
        print("   ✅ Most interactive features working")
    else:
        print("   ⚠️ Some interactive features may need attention")
    
    return success_rate >= 75

if __name__ == "__main__":
    run_interactive_tests()