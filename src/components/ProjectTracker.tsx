'use client'

import { useState } from 'react'

interface Project {
  id: string
  name: string
  description: string
  category: 'work' | 'personal' | 'business' | 'content'
  status: 'planning' | 'active' | 'paused' | 'completed' | 'cancelled'
  progress: number
  startDate: string
  dueDate?: string
  priority: 'high' | 'medium' | 'low'
  tags: string[]
  milestones: Milestone[]
}

interface Milestone {
  id: string
  title: string
  completed: boolean
  dueDate?: string
}

export default function ProjectTracker() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'AI Code Review Assistant',
      description: 'SaaS tool for automated code quality analysis and improvement suggestions',
      category: 'business',
      status: 'active',
      progress: 35,
      startDate: '2026-02-01',
      dueDate: '2026-04-15',
      priority: 'high',
      tags: ['saas', 'ai', 'mvp'],
      milestones: [
        { id: 'm1', title: 'Market research & validation', completed: true },
        { id: 'm2', title: 'MVP feature specification', completed: true },
        { id: 'm3', title: 'Backend API development', completed: false, dueDate: '2026-02-28' },
        { id: 'm4', title: 'Frontend prototype', completed: false, dueDate: '2026-03-15' },
        { id: 'm5', title: 'Beta user testing', completed: false, dueDate: '2026-04-01' },
      ]
    },
    {
      id: '2',
      name: 'YouTube AI Content Series',
      description: 'Weekly video series covering practical AI tools and workflows for software engineers',
      category: 'content',
      status: 'active',
      progress: 60,
      startDate: '2026-02-10',
      priority: 'high',
      tags: ['youtube', 'content', 'ai', 'series'],
      milestones: [
        { id: 'm6', title: 'Series outline & content calendar', completed: true },
        { id: 'm7', title: 'First 3 video scripts', completed: true },
        { id: 'm8', title: 'Video production setup', completed: false, dueDate: '2026-02-20' },
        { id: 'm9', title: 'Publish first 5 videos', completed: false, dueDate: '2026-03-10' },
      ]
    },
    {
      id: '3',
      name: 'Flowcent API Integration',
      description: 'Learning and implementing advanced API architecture patterns at Flowcent Technologies',
      category: 'work',
      status: 'active',
      progress: 75,
      startDate: '2026-02-05',
      dueDate: '2026-03-01',
      priority: 'medium',
      tags: ['learning', 'api', 'architecture'],
      milestones: [
        { id: 'm10', title: 'Shadow senior engineers', completed: true },
        { id: 'm11', title: 'Document architecture patterns', completed: true },
        { id: 'm12', title: 'Implement feature module', completed: false, dueDate: '2026-02-25' },
        { id: 'm13', title: 'Code review and refinement', completed: false, dueDate: '2026-03-01' },
      ]
    },
    {
      id: '4',
      name: 'Mission Control Dashboard',
      description: 'Personal productivity dashboard built with Next.js for managing ideas, content, and projects',
      category: 'personal',
      status: 'active',
      progress: 85,
      startDate: '2026-02-17',
      priority: 'medium',
      tags: ['nextjs', 'productivity', 'dashboard'],
      milestones: [
        { id: 'm14', title: 'Core dashboard structure', completed: true },
        { id: 'm15', title: 'Ideas & content management', completed: true },
        { id: 'm16', title: 'Project tracking & metrics', completed: false },
        { id: 'm17', title: 'Integration with OpenClaw', completed: false },
      ]
    }
  ])

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const toggleMilestone = (projectId: string, milestoneId: string) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? {
              ...project,
              milestones: project.milestones.map(milestone =>
                milestone.id === milestoneId 
                  ? { ...milestone, completed: !milestone.completed }
                  : milestone
              )
            }
          : project
      )
    )
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-purple-100 text-purple-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: Project['category']) => {
    switch (category) {
      case 'work': return '💼'
      case 'personal': return '🏠'
      case 'business': return '🚀'
      case 'content': return '📝'
      default: return '📋'
    }
  }

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50'
      case 'medium': return 'border-l-yellow-500 bg-yellow-50'
      case 'low': return 'border-l-green-500 bg-green-50'
      default: return 'border-l-gray-500 bg-gray-50'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    if (progress >= 25) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const activeProjects = projects.filter(p => p.status === 'active')
  const upcomingDeadlines = projects
    .filter(p => p.dueDate && p.status === 'active')
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5)

  return (
    <div className="p-8 h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">📊 Project Tracker</h1>
          <p className="text-gray-600">Monitor progress across work, business, and personal projects</p>
        </header>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-semibold text-gray-900">{activeProjects.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">📈</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Math.round(activeProjects.reduce((sum, p) => sum + p.progress, 0) / activeProjects.length)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <span className="text-2xl">⏰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Due Soon</p>
                <p className="text-2xl font-semibold text-gray-900">{upcomingDeadlines.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {projects.filter(p => p.priority === 'high' && p.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Projects Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">⚡ Active Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeProjects.map(project => (
              <div key={project.id} className={`bg-white rounded-lg shadow border-l-4 p-6 ${getPriorityColor(project.priority)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCategoryIcon(project.category)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{project.category} • {project.priority} priority</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-700 text-sm mb-4">{project.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${getProgressColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Milestones */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Milestones</h4>
                  <div className="space-y-2">
                    {project.milestones.slice(0, 3).map(milestone => (
                      <div key={milestone.id} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={milestone.completed}
                          onChange={() => toggleMilestone(project.id, milestone.id)}
                          className="h-4 w-4 text-blue-600 rounded cursor-pointer"
                        />
                        <span className={`text-sm flex-1 ${milestone.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                          {milestone.title}
                        </span>
                        {milestone.dueDate && (
                          <span className="text-xs text-gray-500">{milestone.dueDate}</span>
                        )}
                      </div>
                    ))}
                    {project.milestones.length > 3 && (
                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        +{project.milestones.length - 3} more milestones - View all
                      </button>
                    )}
                  </div>
                </div>

                {/* Tags & Dates */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.dueDate && (
                    <span className="text-xs text-gray-500">Due: {project.dueDate}</span>
                  )}
                </div>
                
                {/* View Details Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Full Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">⏰ Upcoming Deadlines</h2>
          <div className="bg-white rounded-lg shadow">
            {upcomingDeadlines.length === 0 ? (
              <div className="p-8 text-center">
                <span className="text-4xl mb-4 block">🎉</span>
                <p className="text-gray-600">No upcoming deadlines</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {upcomingDeadlines.map(project => (
                  <div 
                    key={project.id} 
                    className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getCategoryIcon(project.category)}</span>
                      <div>
                        <p className="font-medium text-gray-900">{project.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                          <span className="text-sm text-gray-600">{project.progress}% complete</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{project.dueDate}</p>
                      <p className="text-sm text-gray-600">
                        {Math.ceil((new Date(project.dueDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                      </p>
                      <p className="text-xs text-blue-600">Click for details</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{getCategoryIcon(selectedProject.category)}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                          {selectedProject.status}
                        </span>
                        <span className="text-sm text-gray-600 capitalize">
                          {selectedProject.category} • {selectedProject.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                      <p className="text-gray-700">{selectedProject.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Progress Overview</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                          <span className="text-sm text-gray-600">{selectedProject.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all ${getProgressColor(selectedProject.progress)}`}
                            style={{ width: `${selectedProject.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {selectedProject.milestones.filter(m => m.completed).length} of {selectedProject.milestones.length} milestones completed
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Project Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Start Date:</span>
                          <span className="text-sm text-gray-900">{selectedProject.startDate}</span>
                        </div>
                        {selectedProject.dueDate && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Due Date:</span>
                            <span className="text-sm text-gray-900">{selectedProject.dueDate}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Priority:</span>
                          <span className={`text-sm font-medium ${
                            selectedProject.priority === 'high' ? 'text-red-600' :
                            selectedProject.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {selectedProject.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Milestones */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">All Milestones</h4>
                    <div className="space-y-3">
                      {selectedProject.milestones.map(milestone => (
                        <div 
                          key={milestone.id} 
                          className={`p-3 rounded-lg border-l-4 ${
                            milestone.completed ? 'bg-green-50 border-green-400' : 'bg-gray-50 border-gray-300'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <input 
                              type="checkbox" 
                              checked={milestone.completed}
                              onChange={() => toggleMilestone(selectedProject.id, milestone.id)}
                              className="h-5 w-5 text-blue-600 rounded cursor-pointer mt-0.5"
                            />
                            <div className="flex-1">
                              <span className={`text-sm font-medium ${
                                milestone.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                              }`}>
                                {milestone.title}
                              </span>
                              {milestone.dueDate && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Due: {milestone.dueDate}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6 pt-6 border-t">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}