'use client'

import { useState, useEffect } from 'react'

interface ApprovalItem {
  id: string
  title: string
  type: 'content' | 'business-idea' | 'feature' | 'investment'
  description: string
  requestedBy: string
  requestedAt: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'approved' | 'rejected' | 'needs-revision'
  details?: string
  attachments?: string[]
}

export default function ApprovalsQueue() {
  const [approvals, setApprovals] = useState<ApprovalItem[]>([])
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null)

  useEffect(() => {
    // Sample data
    const sampleApprovals: ApprovalItem[] = [
      {
        id: '1',
        title: 'YouTube Script: "AI Tools Every Engineer Should Know"',
        type: 'content',
        description: 'Comprehensive 7-minute video script covering top 5 AI productivity tools for software engineers',
        requestedBy: 'Teddy AI',
        requestedAt: '2026-02-17',
        priority: 'high',
        status: 'pending',
        details: 'Script includes tool demonstrations, practical examples, and clear CTAs. Ready for review and approval.',
      },
      {
        id: '2', 
        title: 'Business Idea: AI Code Review SaaS',
        type: 'business-idea',
        description: 'Validation plan for AI-powered code review assistant targeting enterprise development teams',
        requestedBy: 'Teddy AI',
        requestedAt: '2026-02-16',
        priority: 'medium',
        status: 'pending',
        details: 'Includes market research, competitive analysis, MVP feature set, and go-to-market strategy.',
      },
      {
        id: '3',
        title: 'Investment: OpenAI API Credits ($200/month)',
        type: 'investment',
        description: 'Monthly budget increase for AI tooling to support content creation automation',
        requestedBy: 'Teddy AI',
        requestedAt: '2026-02-15',
        priority: 'low',
        status: 'approved',
        details: 'Approved for Q1 2026. Will enable automated content research and script generation.',
      }
    ]
    setApprovals(sampleApprovals)
  }, [])

  const updateApprovalStatus = (id: string, status: ApprovalItem['status']) => {
    setApprovals(items => items.map(item =>
      item.id === id ? { ...item, status } : item
    ))
  }

  const getStatusColor = (status: ApprovalItem['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      case 'needs-revision': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: ApprovalItem['type']) => {
    switch (type) {
      case 'content': return '📝'
      case 'business-idea': return '💡'
      case 'feature': return '⚡'
      case 'investment': return '💰'
      default: return '📄'
    }
  }

  const getPriorityColor = (priority: ApprovalItem['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200'
      case 'medium': return 'bg-yellow-50 border-yellow-200'
      case 'low': return 'bg-green-50 border-green-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const pendingApprovals = approvals.filter(item => item.status === 'pending')
  const recentDecisions = approvals.filter(item => item.status !== 'pending').slice(0, 5)

  return (
    <div className="p-8 h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">✅ Approvals Queue</h1>
          <p className="text-gray-600">Review and approve pending requests from your AI assistant</p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{pendingApprovals.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved Today</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {approvals.filter(a => a.status === 'approved' && a.requestedAt === '2026-02-17').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {pendingApprovals.filter(a => a.priority === 'high').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-semibold text-gray-900">{approvals.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">⏳ Pending Approvals</h2>
          
          {pendingApprovals.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <span className="text-6xl mb-4 block">🎉</span>
              <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-600">No pending approvals at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingApprovals.map(item => (
                <div key={item.id} className={`bg-white rounded-lg shadow border-2 p-6 ${getPriorityColor(item.priority)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{getTypeIcon(item.type)}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">Requested by {item.requestedBy} on {item.requestedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.priority === 'high' ? 'bg-red-100 text-red-800' :
                        item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.priority} priority
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{item.description}</p>
                  
                  {item.details && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Details:</h4>
                      <p className="text-sm text-gray-700">{item.details}</p>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Full Details
                    </button>
                    <div className="space-x-3">
                      <button
                        onClick={() => updateApprovalStatus(item.id, 'needs-revision')}
                        className="px-4 py-2 text-orange-700 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors"
                      >
                        Needs Revision
                      </button>
                      <button
                        onClick={() => updateApprovalStatus(item.id, 'rejected')}
                        className="px-4 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => updateApprovalStatus(item.id, 'approved')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Decisions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Recent Decisions</h2>
          <div className="bg-white rounded-lg shadow">
            {recentDecisions.length === 0 ? (
              <div className="p-8 text-center">
                <span className="text-4xl mb-4 block">📋</span>
                <p className="text-gray-600">No recent decisions</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentDecisions.map(item => (
                  <div key={item.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getTypeIcon(item.type)}</span>
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.requestedAt}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(selectedItem.type)}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedItem.title}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedItem.type.replace('-', ' ')} • {selectedItem.priority} priority
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-xl">×</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-700">{selectedItem.description}</p>
                  </div>
                  
                  {selectedItem.details && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Full Details</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700">{selectedItem.details}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Requested By</h4>
                      <p className="text-gray-700">{selectedItem.requestedBy}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Request Date</h4>
                      <p className="text-gray-700">{selectedItem.requestedAt}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Current Status</h4>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedItem.status)}`}>
                      {selectedItem.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                  <button
                    onClick={() => {
                      updateApprovalStatus(selectedItem.id, 'needs-revision')
                      setSelectedItem(null)
                    }}
                    className="px-4 py-2 text-orange-700 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors"
                  >
                    Needs Revision
                  </button>
                  <button
                    onClick={() => {
                      updateApprovalStatus(selectedItem.id, 'rejected')
                      setSelectedItem(null)
                    }}
                    className="px-4 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      updateApprovalStatus(selectedItem.id, 'approved')
                      setSelectedItem(null)
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
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