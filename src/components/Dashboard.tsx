'use client'

import { useState, useEffect } from 'react'
import DashboardOverview from './DashboardOverview'
import IdeasBacklog from './IdeasBacklog'
import ContentPipeline from './ContentPipeline'
import ApprovalsQueue from './ApprovalsQueue'
import ProjectTracker from './ProjectTracker'
import PersonalMetrics from './PersonalMetrics'
import Settings from './Settings'

interface DashboardProps {
  activeView: string
  onViewChange: (view: string) => void
}

export default function Dashboard({ activeView, onViewChange }: DashboardProps) {
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview onViewChange={onViewChange} />
      case 'ideas':
        return <IdeasBacklog />
      case 'content':
        return <ContentPipeline />
      case 'approvals':
        return <ApprovalsQueue />
      case 'projects':
        return <ProjectTracker />
      case 'metrics':
        return <PersonalMetrics />
      case 'settings':
        return <Settings />
      default:
        return <DashboardOverview onViewChange={onViewChange} />
    }
  }

  return (
    <div className="h-full">
      {renderView()}
    </div>
  )
}