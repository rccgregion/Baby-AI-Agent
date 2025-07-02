import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  Sparkles,
  Target,
  Zap
} from 'lucide-react'
import { useResearchStore } from '../store/researchStore'

const Dashboard: React.FC = () => {
  const { currentProject, projects, sources, simulatedData } = useResearchStore()

  const stats = [
    {
      name: 'Active Projects',
      value: projects.length,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Research Sources',
      value: sources.length,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Simulated Datasets',
      value: simulatedData.length,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      name: 'Completion Rate',
      value: currentProject ? `${Math.round((currentProject.phases.filter(p => p.status === 'approved').length / currentProject.phases.length) * 100)}%` : '0%',
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const features = [
    {
      title: 'Structured Research Process',
      description: 'Follow a proven 6-phase methodology from foundation to final assembly',
      icon: Target,
      color: 'text-blue-600'
    },
    {
      title: 'AI-Powered Content Generation',
      description: 'Generate high-quality academic content with advanced AI assistance',
      icon: Sparkles,
      color: 'text-purple-600'
    },
    {
      title: 'Data Simulation & Analysis',
      description: 'Create realistic datasets and perform sophisticated statistical analysis',
      icon: Zap,
      color: 'text-green-600'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome to <span className="text-gradient">Baby AI Agent</span>
        </h1>
        <p className="text-xl text-gray-600">
          Your advanced research co-pilot for creating world-class academic papers
        </p>
      </motion.div>

      {/* Current Project Status */}
      {currentProject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card mb-8 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Current Project: {currentProject.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {currentProject.fieldOfStudy} • {currentProject.academicLevel.charAt(0).toUpperCase() + currentProject.academicLevel.slice(1)}
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Phase {currentProject.currentPhase} of 6
                </span>
                <div className="flex space-x-1">
                  {currentProject.phases.map((phase) => (
                    <div
                      key={phase.id}
                      className={`w-3 h-3 rounded-full ${
                        phase.status === 'approved' 
                          ? 'bg-green-500' 
                          : phase.id === currentProject.currentPhase
                          ? 'bg-primary-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <Link
              to="/phases"
              className="btn-primary flex items-center space-x-2"
            >
              <span>Continue Research</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor} mr-4`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
      >
        {/* Get Started */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {currentProject ? 'Project Overview' : 'Get Started'}
          </h3>
          {currentProject ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Research Question:</span>
                <span className="text-sm text-gray-800 font-medium">
                  {currentProject.researchQuestion ? 'Defined' : 'Pending'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Literature Review:</span>
                <span className="text-sm text-gray-800 font-medium">
                  {currentProject.phases[1].status === 'approved' ? 'Complete' : 'In Progress'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Methodology:</span>
                <span className="text-sm text-gray-800 font-medium">
                  {currentProject.phases[2].status === 'approved' ? 'Complete' : 'Pending'}
                </span>
              </div>
              <Link
                to="/phases"
                className="btn-primary w-full mt-4 flex items-center justify-center space-x-2"
              >
                <span>Continue Research</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                Begin your research journey by setting up a new project with our guided process.
              </p>
              <Link
                to="/setup"
                className="btn-primary flex items-center space-x-2"
              >
                <span>Start New Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {projects.length > 0 ? (
              projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{project.title}</p>
                    <p className="text-sm text-gray-500">
                      {project.fieldOfStudy} • Phase {project.currentPhase}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No recent activity. Start your first project!
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={feature.title} className="card hover:shadow-lg transition-shadow duration-200">
              <div className={`p-3 rounded-lg bg-gray-50 w-fit mb-4`}>
                <Icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default Dashboard