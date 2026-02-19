'use client'

import { useState } from 'react'

export default function Settings() {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [settings, setSettings] = useState({
    notifications: {
      morningBrief: true,
      deadlineAlerts: true,
      contentReminders: true,
      weeklyReports: false,
    },
    contentSettings: {
      defaultPlatform: 'youtube',
      autoSaveInterval: 5,
      contentApprovalRequired: true,
      publishingSchedule: 'manual',
    },
    dashboardSettings: {
      theme: 'light',
      defaultView: 'dashboard',
      autoRefresh: true,
      compactMode: false,
    },
    integrations: {
      openclawConnected: true,
      googleCalendar: false,
      youtubeAnalytics: false,
      githubIntegration: false,
    },
    aiSettings: {
      morningBriefTime: '09:00',
      contentGenerationModel: 'claude-sonnet',
      autoContentResearch: true,
      aiApprovalThreshold: 'medium',
    }
  })

  const handleToggle = (category: keyof typeof settings, key: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key as keyof typeof prev[typeof category]]
      }
    }))
  }

  const handleSelectChange = (category: keyof typeof settings, key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  const handleSaveSettings = () => {
    setSaveStatus('saving')
    
    // Save to localStorage
    localStorage.setItem('mission-control-settings', JSON.stringify(settings))
    
    // Simulate save delay for better UX
    setTimeout(() => {
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    }, 500)
  }

  return (
    <div className="p-8 h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">⚙️ Settings</h1>
          <p className="text-gray-600">Configure your Mission Control dashboard and AI assistant</p>
        </header>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🔔 Notifications</h2>
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <p className="text-xs text-gray-500">
                    {key === 'morningBrief' && 'Daily AI-generated briefing with weather, news, and recommendations'}
                    {key === 'deadlineAlerts' && 'Alerts for upcoming project and content deadlines'}
                    {key === 'contentReminders' && 'Reminders for content creation and publishing schedule'}
                    {key === 'weeklyReports' && 'Weekly summary of metrics and goal progress'}
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('notifications', key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Content Settings */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📝 Content Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Platform</label>
              <select
                value={settings.contentSettings.defaultPlatform}
                onChange={(e) => handleSelectChange('contentSettings', 'defaultPlatform', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="youtube">📹 YouTube</option>
                <option value="linkedin">💼 LinkedIn</option>
                <option value="twitter">🐦 Twitter</option>
                <option value="blog">📖 Blog</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auto-save Interval (minutes)</label>
              <select
                value={settings.contentSettings.autoSaveInterval}
                onChange={(e) => handleSelectChange('contentSettings', 'autoSaveInterval', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="30">30 minutes</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Content Approval Required</label>
                <p className="text-xs text-gray-500">Require manual approval before publishing</p>
              </div>
              <button
                onClick={() => handleToggle('contentSettings', 'contentApprovalRequired')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.contentSettings.contentApprovalRequired ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.contentSettings.contentApprovalRequired ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Publishing Schedule</label>
              <select
                value={settings.contentSettings.publishingSchedule}
                onChange={(e) => handleSelectChange('contentSettings', 'publishingSchedule', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="manual">Manual</option>
                <option value="scheduled">Scheduled</option>
                <option value="auto">Automatic</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dashboard Settings */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🖥️ Dashboard Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select
                value={settings.dashboardSettings.theme}
                onChange={(e) => handleSelectChange('dashboardSettings', 'theme', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="light">☀️ Light</option>
                <option value="dark">🌙 Dark</option>
                <option value="auto">🔄 Auto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
              <select
                value={settings.dashboardSettings.defaultView}
                onChange={(e) => handleSelectChange('dashboardSettings', 'defaultView', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="dashboard">🏠 Dashboard</option>
                <option value="ideas">💡 Ideas</option>
                <option value="content">📝 Content</option>
                <option value="projects">📊 Projects</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Auto Refresh</label>
                <p className="text-xs text-gray-500">Automatically refresh data every 5 minutes</p>
              </div>
              <button
                onClick={() => handleToggle('dashboardSettings', 'autoRefresh')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.dashboardSettings.autoRefresh ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.dashboardSettings.autoRefresh ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Compact Mode</label>
                <p className="text-xs text-gray-500">Show more content in less space</p>
              </div>
              <button
                onClick={() => handleToggle('dashboardSettings', 'compactMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.dashboardSettings.compactMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.dashboardSettings.compactMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Assistant Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Morning Brief Time</label>
              <select
                value={settings.aiSettings.morningBriefTime}
                onChange={(e) => handleSelectChange('aiSettings', 'morningBriefTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Generation Model</label>
              <select
                value={settings.aiSettings.contentGenerationModel}
                onChange={(e) => handleSelectChange('aiSettings', 'contentGenerationModel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="claude-sonnet">Claude Sonnet (Balanced)</option>
                <option value="claude-haiku">Claude Haiku (Fast)</option>
                <option value="gpt-4">GPT-4 (Creative)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Auto Content Research</label>
                <p className="text-xs text-gray-500">Automatically research trending topics</p>
              </div>
              <button
                onClick={() => handleToggle('aiSettings', 'autoContentResearch')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.aiSettings.autoContentResearch ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.aiSettings.autoContentResearch ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Approval Threshold</label>
              <select
                value={settings.aiSettings.aiApprovalThreshold}
                onChange={(e) => handleSelectChange('aiSettings', 'aiApprovalThreshold', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low - Auto-approve simple tasks</option>
                <option value="medium">Medium - Review important decisions</option>
                <option value="high">High - Approve everything manually</option>
              </select>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🔗 Integrations</h2>
          <div className="space-y-4">
            {Object.entries(settings.integrations).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <p className="text-xs text-gray-500">
                      {key === 'openclawConnected' && 'Core AI assistant integration'}
                      {key === 'googleCalendar' && 'Sync events and deadlines'}
                      {key === 'youtubeAnalytics' && 'Import video performance data'}
                      {key === 'githubIntegration' && 'Track coding projects and commits'}
                    </p>
                  </div>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    value 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                  onClick={() => handleToggle('integrations', key)}
                >
                  {value ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSaveSettings}
            disabled={saveStatus === 'saving'}
            className={`px-6 py-3 rounded-lg transition-colors font-medium ${
              saveStatus === 'saved' 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : saveStatus === 'saving'
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {saveStatus === 'saving' && '⏳ Saving...'}
            {saveStatus === 'saved' && '✅ Settings Saved'}
            {saveStatus === 'idle' && 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  )
}