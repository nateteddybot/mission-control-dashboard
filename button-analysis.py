#!/usr/bin/env python3
"""
Dashboard Button Responsiveness Analysis
Identifies buttons that may not have proper click handlers
"""

import os
import re

def analyze_component_file(filepath):
    """Analyze a component file for button responsiveness"""
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Find all button elements
        button_pattern = r'<button[^>]*>(.*?)</button>'
        buttons = re.findall(button_pattern, content, re.DOTALL)
        
        results = {
            'file': os.path.basename(filepath),
            'buttons': [],
            'responsive_count': 0,
            'non_responsive_count': 0
        }
        
        # Check each button for click handlers
        button_full_pattern = r'<button[^>]*?(?:onClick|onSubmit)[^>]*?>(.*?)</button>'
        responsive_buttons = re.findall(button_full_pattern, content, re.DOTALL)
        
        # Find all button tags with their attributes
        full_button_pattern = r'<button([^>]*?)>(.*?)</button>'
        full_buttons = re.findall(full_button_pattern, content, re.DOTALL)
        
        for attrs, button_content in full_buttons:
            button_text = re.sub(r'<[^>]*>', '', button_content).strip()
            has_onclick = 'onClick' in attrs or 'onSubmit' in attrs
            
            button_info = {
                'text': button_text[:50] + '...' if len(button_text) > 50 else button_text,
                'has_handler': has_onclick,
                'attributes': attrs.strip()
            }
            
            results['buttons'].append(button_info)
            
            if has_onclick:
                results['responsive_count'] += 1
            else:
                results['non_responsive_count'] += 1
        
        return results
    
    except Exception as e:
        return {'file': os.path.basename(filepath), 'error': str(e)}

def analyze_dashboard_buttons():
    """Analyze all dashboard component files for button responsiveness"""
    components_dir = '/home/teddy/.openclaw/workspace/mission-control/src/components'
    
    if not os.path.exists(components_dir):
        print("❌ Components directory not found")
        return
    
    print("🔍 Dashboard Button Responsiveness Analysis")
    print("=" * 60)
    
    component_files = [
        'DashboardOverview.tsx',
        'Sidebar.tsx', 
        'IdeasBacklog.tsx',
        'ContentPipeline.tsx',
        'ApprovalsQueue.tsx',
        'ProjectTracker.tsx',
        'PersonalMetrics.tsx',
        'Settings.tsx'
    ]
    
    total_buttons = 0
    total_responsive = 0
    total_non_responsive = 0
    non_responsive_details = []
    
    for component_file in component_files:
        filepath = os.path.join(components_dir, component_file)
        if os.path.exists(filepath):
            print(f"\n📁 Analyzing {component_file}...")
            results = analyze_component_file(filepath)
            
            if 'error' in results:
                print(f"  ❌ Error: {results['error']}")
                continue
            
            print(f"  📊 Found {len(results['buttons'])} button(s)")
            print(f"  ✅ Responsive: {results['responsive_count']}")
            print(f"  ❌ Non-responsive: {results['non_responsive_count']}")
            
            total_buttons += len(results['buttons'])
            total_responsive += results['responsive_count']
            total_non_responsive += results['non_responsive_count']
            
            # Show non-responsive buttons
            for button in results['buttons']:
                if not button['has_handler']:
                    non_responsive_details.append({
                        'component': component_file,
                        'text': button['text'],
                        'attributes': button['attributes']
                    })
                    print(f"    ⚠️ Non-responsive: '{button['text']}'")
        else:
            print(f"  ⚠️ Component file not found: {component_file}")
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 BUTTON RESPONSIVENESS SUMMARY")
    print("=" * 60)
    
    print(f"Total Buttons Found: {total_buttons}")
    print(f"Responsive (with handlers): {total_responsive}")
    print(f"Non-responsive (no handlers): {total_non_responsive}")
    
    if total_buttons > 0:
        responsiveness_rate = (total_responsive / total_buttons) * 100
        print(f"Responsiveness Rate: {responsiveness_rate:.1f}%")
    
    if non_responsive_details:
        print(f"\n⚠️ NON-RESPONSIVE BUTTONS FOUND ({len(non_responsive_details)}):")
        for detail in non_responsive_details:
            print(f"  📍 {detail['component']}: '{detail['text']}'")
    else:
        print("\n✅ ALL BUTTONS ARE RESPONSIVE!")
    
    return total_non_responsive == 0

if __name__ == "__main__":
    analyze_dashboard_buttons()