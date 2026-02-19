'use client'

import { useState, useEffect } from 'react'

interface Idea {
  id: string
  title: string
  description: string
  category: 'business' | 'content'
  priority: 'high' | 'medium' | 'low'
  status: 'new' | 'researching' | 'validating' | 'ready' | 'archived'
  createdAt: string
  tags: string[]
}

export default function IdeasBacklog() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [filter, setFilter] = useState<'all' | 'business' | 'content'>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newIdea, setNewIdea] = useState({
    title: '',
    description: '',
    category: 'business' as 'business' | 'content',
    priority: 'medium' as 'high' | 'medium' | 'low',
    tags: ''
  })

  // Load ideas from localStorage on component mount
  useEffect(() => {
    const savedIdeas = localStorage.getItem('mission-control-ideas')
    if (savedIdeas) {
      setIdeas(JSON.parse(savedIdeas))
    } else {
      // Sample data
      const sampleIdeas: Idea[] = [
        {
          id: '1',
          title: 'AI Code Review Assistant',
          description: 'SaaS tool that analyzes code quality and provides AI-powered suggestions for improvements',
          category: 'business',
          priority: 'high',
          status: 'validating',
          createdAt: '2026-02-17',
          tags: ['ai', 'saas', 'developer-tools']
        },
        {
          id: '2',
          title: 'YouTube Series: AI Tools for Engineers',
          description: 'Weekly series showcasing practical AI tools and workflows for software engineers',
          category: 'content',
          priority: 'high',
          status: 'ready',
          createdAt: '2026-02-16',
          tags: ['youtube', 'ai', 'engineering', 'series']
        },
        {
          id: '3',
          title: 'Automated Meeting Notes → Action Items',
          description: 'Content showing how to use AI to convert meeting recordings into structured action items',
          category: 'content',
          priority: 'medium',
          status: 'new',
          createdAt: '2026-02-15',
          tags: ['ai-workflows', 'productivity', 'meetings']
        }
      ]
      setIdeas(sampleIdeas)
    }
  }, [])

  // Save ideas to localStorage whenever ideas change
  useEffect(() => {
    localStorage.setItem('mission-control-ideas', JSON.stringify(ideas))
  }, [ideas])

  const filteredIdeas = ideas.filter(idea => {
    if (filter === 'all') return true
    return idea.category === filter
  })

  const handleAddIdea = () => {
    if (!newIdea.title.trim()) return

    const idea: Idea = {
      id: Date.now().toString(),
      title: newIdea.title,
      description: newIdea.description,
      category: newIdea.category,
      priority: newIdea.priority,
      status: 'new',
      createdAt: new Date().toISOString().split('T')[0],
      tags: newIdea.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    setIdeas([...ideas, idea])
    setNewIdea({ title: '', description: '', category: 'business', priority: 'medium', tags: '' })
    setShowAddForm(false)
  }

  const updateIdeaStatus = (id: string, status: Idea['status']) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, status } : idea
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'researching': return 'bg-purple-100 text-purple-800'
      case 'validating': return 'bg-orange-100 text-orange-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-8 h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">💡 Ideas Backlog</h1>
          <p className="text-gray-600">Capture, prioritize, and track your business and content ideas</p>
        </header>

        {/* Filters and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            {(['all', 'business', 'content'] as const).map(filterOption => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filterOption === 'all' ? 'All Ideas' : 
                 filterOption === 'business' ? '💼 Business' : '📝 Content'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Idea
          </button>
        </div>

        {/* Add Idea Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Add New Idea</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newIdea.title}
                  onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter idea title..."
                />
              </div>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newIdea.category}
                    onChange={(e) => setNewIdea({ ...newIdea, category: e.target.value as 'business' | 'content' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="business">💼 Business</option>
                    <option value="content">📝 Content</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newIdea.priority}
                    onChange={(e) => setNewIdea({ ...newIdea, priority: e.target.value as 'high' | 'medium' | 'low' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="high">🔴 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🟢 Low</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newIdea.description}
                onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your idea..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <input
                type="text"
                value={newIdea.tags}
                onChange={(e) => setNewIdea({ ...newIdea, tags: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter tags separated by commas..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddIdea}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Idea
              </button>
            </div>
          </div>
        )}

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <div key={idea.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">{idea.title}</h3>
                  <span className="text-xl ml-2">
                    {idea.category === 'business' ? '💼' : '📝'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{idea.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {idea.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(idea.priority)}`}>
                    {idea.priority}
                  </span>
                  <span className="text-xs text-gray-500">{idea.createdAt}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(idea.status)}`}>
                    {idea.status}
                  </span>
                  <select
                    value={idea.status}
                    onChange={(e) => updateIdeaStatus(idea.id, e.target.value as Idea['status'])}
                    className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  >
                    <option value="new" className="text-gray-900 bg-white">New</option>
                    <option value="researching" className="text-gray-900 bg-white">Researching</option>
                    <option value="validating" className="text-gray-900 bg-white">Validating</option>
                    <option value="ready" className="text-gray-900 bg-white">Ready</option>
                    <option value="archived" className="text-gray-900 bg-white">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredIdeas.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">💡</span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No ideas yet</h3>
            <p className="text-gray-600 mb-4">Start capturing your business and content ideas</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Idea
            </button>
          </div>
        )}
      </div>
    </div>
  )
}