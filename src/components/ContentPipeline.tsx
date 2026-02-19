'use client'

import { useState, useEffect } from 'react'

interface ContentItem {
  id: string
  title: string
  description: string
  type: 'youtube-main' | 'youtube-short' | 'linkedin' | 'twitter' | 'blog'
  stage: 'research' | 'outline' | 'script' | 'approval' | 'production' | 'published'
  priority: 'high' | 'medium' | 'low'
  dueDate?: string
  assignedTo: 'nate' | 'teddy'
  tags: string[]
  createdAt: string
  notes?: string
}

export default function ContentPipeline() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedStage, setSelectedStage] = useState<ContentItem['stage'] | 'all'>('all')
  const [preselectedType, setPreselectedType] = useState<ContentItem['type'] | null>(null)
  
  const stages: ContentItem['stage'][] = ['research', 'outline', 'script', 'approval', 'production', 'published']
  
  useEffect(() => {
    const savedContent = localStorage.getItem('mission-control-content')
    if (savedContent) {
      setContentItems(JSON.parse(savedContent))
    } else {
      // Sample data
      const sampleContent: ContentItem[] = [
        {
          id: '1',
          title: 'AI Tools Every Software Engineer Should Know',
          description: 'Comprehensive overview of the top 5 AI tools that can boost developer productivity',
          type: 'youtube-main',
          stage: 'script',
          priority: 'high',
          dueDate: '2026-02-20',
          assignedTo: 'teddy',
          tags: ['ai-tools', 'productivity', 'engineering'],
          createdAt: '2026-02-15',
          notes: 'Focus on practical implementation, not just features'
        },
        {
          id: '2',
          title: 'Meeting Notes → Action Items with AI',
          description: 'Quick tip showing AI workflow for converting meeting recordings to structured tasks',
          type: 'youtube-short',
          stage: 'outline',
          priority: 'medium',
          assignedTo: 'teddy',
          tags: ['ai-workflow', 'meetings', 'productivity'],
          createdAt: '2026-02-16'
        },
        {
          id: '3',
          title: 'Building My First AI-Powered SaaS',
          description: 'Project update series documenting the build process of an AI code review tool',
          type: 'youtube-main',
          stage: 'approval',
          priority: 'high',
          assignedTo: 'nate',
          tags: ['saas', 'building-in-public', 'ai'],
          createdAt: '2026-02-14',
          notes: 'Needs final review before production'
        }
      ]
      setContentItems(sampleContent)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mission-control-content', JSON.stringify(contentItems))
  }, [contentItems])

  const filteredContent = contentItems.filter(item => {
    if (selectedStage === 'all') return true
    return item.stage === selectedStage
  })

  const updateContentStage = (id: string, stage: ContentItem['stage']) => {
    setContentItems(items => items.map(item =>
      item.id === id ? { ...item, stage } : item
    ))
  }

  const openAddFormWithType = (type: ContentItem['type']) => {
    setPreselectedType(type)
    setShowAddForm(true)
  }

  const getStageIcon = (stage: ContentItem['stage']) => {
    switch (stage) {
      case 'research': return '🔍'
      case 'outline': return '📋'
      case 'script': return '📝'
      case 'approval': return '✅'
      case 'production': return '🎬'
      case 'published': return '🚀'
      default: return '📄'
    }
  }

  const getStageColor = (stage: ContentItem['stage']) => {
    switch (stage) {
      case 'research': return 'bg-blue-100 text-blue-800'
      case 'outline': return 'bg-yellow-100 text-yellow-800'
      case 'script': return 'bg-orange-100 text-orange-800'
      case 'approval': return 'bg-purple-100 text-purple-800'
      case 'production': return 'bg-pink-100 text-pink-800'
      case 'published': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'youtube-main': return '📹'
      case 'youtube-short': return '🎬'
      case 'linkedin': return '💼'
      case 'twitter': return '🐦'
      case 'blog': return '📖'
      default: return '📄'
    }
  }

  const getPriorityColor = (priority: ContentItem['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="p-8 h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">📝 Content Pipeline</h1>
          <p className="text-gray-600">Manage your content from research to publication</p>
        </header>

        {/* Pipeline Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          {stages.map(stage => {
            const count = contentItems.filter(item => item.stage === stage).length
            return (
              <div key={stage} className="bg-white rounded-lg shadow p-4 text-center">
                <div className="text-2xl mb-1">{getStageIcon(stage)}</div>
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-xs text-gray-600 capitalize">{stage}</div>
              </div>
            )
          })}
        </div>

        {/* Stage Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedStage('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedStage === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Stages
          </button>
          {stages.map(stage => (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStage === stage
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {getStageIcon(stage)} {stage}
            </button>
          ))}
        </div>

        {/* Add Content Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Add New Content</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              // Add form handling logic here
              console.log('Form submitted')
              setShowAddForm(false)
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter content title..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select 
                    defaultValue={preselectedType || 'youtube-main'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  >
                    <option value="youtube-main" className="text-gray-900 bg-white">📹 YouTube Video</option>
                    <option value="youtube-short" className="text-gray-900 bg-white">🎬 YouTube Short</option>
                    <option value="linkedin" className="text-gray-900 bg-white">💼 LinkedIn Post</option>
                    <option value="twitter" className="text-gray-900 bg-white">🐦 Twitter Thread</option>
                    <option value="blog" className="text-gray-900 bg-white">📖 Blog Post</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the content..."
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                    <option value="medium" className="text-gray-900 bg-white">Medium</option>
                    <option value="high" className="text-gray-900 bg-white">High</option>
                    <option value="low" className="text-gray-900 bg-white">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                    <option value="teddy" className="text-gray-900 bg-white">Teddy AI</option>
                    <option value="nate" className="text-gray-900 bg-white">Nate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ai-tools, productivity, engineering..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Content
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Content Pipeline Board */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {selectedStage === 'all' ? 'All Content' : `${getStageIcon(selectedStage)} ${selectedStage}`}
              </h2>
              <button 
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Add Content
              </button>
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContent.map(item => (
                <div key={item.id} className={`border-2 rounded-lg p-4 hover:shadow-md transition-shadow ${getPriorityColor(item.priority)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{getTypeIcon(item.type)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(item.stage)}`}>
                        {getStageIcon(item.stage)} {item.stage}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority).replace('border-', '')}`}>
                      {item.priority}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                  {item.notes && (
                    <div className="bg-gray-50 rounded p-2 mb-3">
                      <p className="text-xs text-gray-600">📝 {item.notes}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>👤 {item.assignedTo}</span>
                    {item.dueDate && <span>📅 {item.dueDate}</span>}
                  </div>

                  <div className="flex justify-between items-center">
                    <select
                      value={item.stage}
                      onChange={(e) => updateContentStage(item.id, e.target.value as ContentItem['stage'])}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {stages.map(stage => (
                        <option key={stage} value={stage}>
                          {getStageIcon(stage)} {stage}
                        </option>
                      ))}
                    </select>
                    <button 
                      onClick={() => console.log('View details for:', item.title)}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredContent.length === 0 && (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📝</span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {selectedStage === 'all' ? 'No content yet' : `No content in ${selectedStage} stage`}
                </h3>
                <p className="text-gray-600 mb-4">Start creating your content pipeline</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Content
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">⚡ Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => openAddFormWithType('youtube-main')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mb-2">📹</span>
              <span className="text-sm font-medium text-gray-700">New YouTube Video</span>
            </button>
            <button 
              onClick={() => openAddFormWithType('youtube-short')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mb-2">🎬</span>
              <span className="text-sm font-medium text-gray-700">YouTube Short</span>
            </button>
            <button 
              onClick={() => openAddFormWithType('linkedin')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mb-2">💼</span>
              <span className="text-sm font-medium text-gray-700">LinkedIn Post</span>
            </button>
            <button 
              onClick={() => openAddFormWithType('twitter')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mb-2">🐦</span>
              <span className="text-sm font-medium text-gray-700">Twitter Thread</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}