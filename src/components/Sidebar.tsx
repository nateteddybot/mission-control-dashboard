'use client'

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', name: '🏠 Dashboard', icon: '🏠' },
    { id: 'ideas', name: '💡 Ideas', icon: '💡' },
    { id: 'content', name: '📝 Content Pipeline', icon: '📝' },
    { id: 'approvals', name: '✅ Approvals Queue', icon: '✅' },
    { id: 'projects', name: '📊 Project Tracker', icon: '📊' },
    { id: 'metrics', name: '📈 Personal Metrics', icon: '📈' },
    { id: 'settings', name: '⚙️ Settings', icon: '⚙️' },
  ]

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">🧸 Mission Control</h1>
        <p className="text-sm text-gray-600 mt-1">Nate's Command Center</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full text-left px-6 py-3 hover:bg-blue-50 transition-colors ${
              activeView === item.id
                ? 'bg-blue-100 border-r-2 border-blue-500 text-blue-700'
                : 'text-gray-700'
            }`}
          >
            <span className="flex items-center">
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name.replace(/^[🏠💡📝✅📊📈⚙️]\s*/, '')}
            </span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 text-xs text-gray-500">
        <p>🤖 Teddy AI Assistant</p>
        <p>Status: Active</p>
      </div>
    </div>
  )
}