'use client'

import { useState } from 'react'

export default function PersonalMetrics() {
  const [selectedMetric, setSelectedMetric] = useState<{category: string, key: string, data: any} | null>(null)
  
  const metrics = {
    consistency: {
      contentPublished: { current: 12, target: 15, period: 'this month' },
      dailyProductivity: { current: 85, target: 80, period: 'average %' },
      learningStreak: { current: 23, target: 30, period: 'days' },
    },
    shipping: {
      projectsCompleted: { current: 3, target: 2, period: 'this quarter' },
      featuresDelivered: { current: 8, target: 10, period: 'this month' },
      avgTimeToShip: { current: 4.2, target: 5.0, period: 'days' },
    },
    growth: {
      skillsLearned: { current: 5, target: 4, period: 'this quarter' },
      contentViews: { current: 1250, target: 1000, period: 'total views' },
      networkGrowth: { current: 120, target: 100, period: 'new connections' },
    },
    financial: {
      monthlyRevenue: { current: 0, target: 500, period: 'from products' },
      savingsRate: { current: 15, target: 20, period: 'percentage' },
      investmentGrowth: { current: 8.5, target: 10, period: 'annual %' },
    }
  }

  const getMetricColor = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 100) return 'text-green-600 bg-green-50'
    if (percentage >= 80) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 100) return 'bg-green-500'
    if (percentage >= 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  return (
    <div className="p-8 h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">📈 Personal Metrics</h1>
          <p className="text-gray-600">Track your consistency, shipping velocity, and growth over time</p>
        </header>

        {/* Consistency Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 Consistency Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(metrics.consistency).map(([key, metric]) => (
              <div 
                key={key} 
                className="bg-white rounded-lg shadow p-6 hover:shadow-md cursor-pointer transition-shadow"
                onClick={() => setSelectedMetric({category: 'Consistency', key, data: metric})}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getMetricColor(metric.current, metric.target)}`}>
                    {metric.current >= metric.target ? '✅' : '⚠️'}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{metric.current}</span>
                  <span className="text-sm text-gray-600">/ {metric.target}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{metric.period}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${getProgressColor(metric.current, metric.target)}`}
                    style={{ width: `${calculateProgress(metric.current, metric.target)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Velocity */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🚀 Shipping Velocity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(metrics.shipping).map(([key, metric]) => (
              <div 
                key={key} 
                className="bg-white rounded-lg shadow p-6 hover:shadow-md cursor-pointer transition-shadow"
                onClick={() => setSelectedMetric({category: 'Shipping Velocity', key, data: metric})}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getMetricColor(metric.current, metric.target)}`}>
                    {metric.current >= metric.target || (key === 'avgTimeToShip' && metric.current <= metric.target) ? '✅' : '⚠️'}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{metric.current}</span>
                  <span className="text-sm text-gray-600">
                    {key === 'avgTimeToShip' ? `target: <${metric.target}` : `/ ${metric.target}`}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{metric.period}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      key === 'avgTimeToShip' 
                        ? getProgressColor(metric.target, metric.current)
                        : getProgressColor(metric.current, metric.target)
                    }`}
                    style={{ 
                      width: key === 'avgTimeToShip' 
                        ? `${calculateProgress(metric.target, metric.current)}%`
                        : `${calculateProgress(metric.current, metric.target)}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📈 Growth Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(metrics.growth).map(([key, metric]) => (
              <div 
                key={key} 
                className="bg-white rounded-lg shadow p-6 hover:shadow-md cursor-pointer transition-shadow"
                onClick={() => setSelectedMetric({category: 'Growth', key, data: metric})}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getMetricColor(metric.current, metric.target)}`}>
                    {metric.current >= metric.target ? '✅' : '⚠️'}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {key === 'contentViews' ? metric.current.toLocaleString() : metric.current}
                  </span>
                  <span className="text-sm text-gray-600">/ {metric.target}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{metric.period}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${getProgressColor(metric.current, metric.target)}`}
                    style={{ width: `${calculateProgress(metric.current, metric.target)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">💰 Financial Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(metrics.financial).map(([key, metric]) => (
              <div 
                key={key} 
                className="bg-white rounded-lg shadow p-6 hover:shadow-md cursor-pointer transition-shadow"
                onClick={() => setSelectedMetric({category: 'Financial', key, data: metric})}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getMetricColor(metric.current, metric.target)}`}>
                    {metric.current >= metric.target ? '✅' : '⚠️'}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {key.includes('Revenue') ? `$${metric.current}` : 
                     key.includes('Rate') || key.includes('Growth') ? `${metric.current}%` : 
                     metric.current}
                  </span>
                  <span className="text-sm text-gray-600">
                    / {key.includes('Revenue') ? `$${metric.target}` : 
                        key.includes('Rate') || key.includes('Growth') ? `${metric.target}%` : 
                        metric.target}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{metric.period}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${getProgressColor(metric.current, metric.target)}`}
                    style={{ width: `${calculateProgress(metric.current, metric.target)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Weekly Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">🎯 Goals On Track</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✅</span>
                  <span className="text-sm">Daily productivity average above target</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✅</span>
                  <span className="text-sm">Projects completed ahead of schedule</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✅</span>
                  <span className="text-sm">Content views exceeding target</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">⚠️ Areas for Improvement</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="text-yellow-500">⚠️</span>
                  <span className="text-sm">Content publishing slightly behind target</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-sm">Monthly revenue still at zero</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-yellow-500">⚠️</span>
                  <span className="text-sm">Savings rate below target</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Metric Detail Modal */}
        {selectedMetric && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedMetric.key.replace(/([A-Z])/g, ' $1')}
                    </h3>
                    <p className="text-sm text-gray-600">{selectedMetric.category} Metric</p>
                  </div>
                  <button
                    onClick={() => setSelectedMetric(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Current Performance */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Current Performance</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMetricColor(selectedMetric.data.current, selectedMetric.data.target)}`}>
                        {selectedMetric.data.current >= selectedMetric.data.target ? '✅ On Track' : '⚠️ Behind Target'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {selectedMetric.key.includes('Revenue') ? `$${selectedMetric.data.current}` :
                           selectedMetric.key.includes('Rate') || selectedMetric.key.includes('Growth') ? `${selectedMetric.data.current}%` :
                           selectedMetric.key === 'contentViews' ? selectedMetric.data.current.toLocaleString() :
                           selectedMetric.data.current}
                        </div>
                        <div className="text-xs text-gray-600">Current</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedMetric.key.includes('Revenue') ? `$${selectedMetric.data.target}` :
                           selectedMetric.key.includes('Rate') || selectedMetric.key.includes('Growth') ? `${selectedMetric.data.target}%` :
                           selectedMetric.data.target}
                        </div>
                        <div className="text-xs text-gray-600">Target</div>
                      </div>
                      <div>
                        <div className={`text-2xl font-bold ${
                          calculateProgress(selectedMetric.data.current, selectedMetric.data.target) >= 100 ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {Math.round(calculateProgress(selectedMetric.data.current, selectedMetric.data.target))}%
                        </div>
                        <div className="text-xs text-gray-600">Progress</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all ${getProgressColor(selectedMetric.data.current, selectedMetric.data.target)}`}
                          style={{ width: `${calculateProgress(selectedMetric.data.current, selectedMetric.data.target)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                        Period: {selectedMetric.data.period}
                      </div>
                    </div>
                  </div>
                  
                  {/* Insights and Actions */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Insights & Recommendations</h4>
                    <div className="space-y-3">
                      {selectedMetric.data.current >= selectedMetric.data.target ? (
                        <>
                          <div className="flex items-start space-x-3 text-sm">
                            <span className="text-green-500 mt-0.5">✅</span>
                            <div>
                              <p className="font-medium text-gray-900">Target Achieved!</p>
                              <p className="text-gray-600">You're exceeding your goal for this metric. Consider raising the target or maintaining this momentum.</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 text-sm">
                            <span className="text-blue-500 mt-0.5">💡</span>
                            <div>
                              <p className="font-medium text-gray-900">Next Steps</p>
                              <p className="text-gray-600">Analyze what's working and apply those strategies to other areas that need improvement.</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start space-x-3 text-sm">
                            <span className="text-orange-500 mt-0.5">⚠️</span>
                            <div>
                              <p className="font-medium text-gray-900">Behind Target</p>
                              <p className="text-gray-600">
                                You need {selectedMetric.key.includes('Revenue') ? `$${selectedMetric.data.target - selectedMetric.data.current}` :
                                          selectedMetric.data.target - selectedMetric.data.current} more to reach your goal.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 text-sm">
                            <span className="text-blue-500 mt-0.5">🎯</span>
                            <div>
                              <p className="font-medium text-gray-900">Action Items</p>
                              <p className="text-gray-600">Consider increasing daily effort, reviewing your strategy, or adjusting the timeline.</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6 pt-6 border-t">
                  <button
                    onClick={() => setSelectedMetric(null)}
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