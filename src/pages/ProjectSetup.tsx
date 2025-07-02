import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ArrowRight, BookOpen, Target, Settings } from 'lucide-react'
import { useResearchStore } from '../store/researchStore'

interface ProjectFormData {
  title: string
  academicLevel: 'undergraduate' | 'masters' | 'phd'
  fieldOfStudy: string
  topic: string
  citationStyle: 'apa' | 'mla' | 'chicago' | 'harvard'
  methodologyPreference: 'qualitative' | 'quantitative' | 'mixed-methods'
  context?: string
}

const ProjectSetup: React.FC = () => {
  const navigate = useNavigate()
  const { createProject } = useResearchStore()
  const [step, setStep] = useState(1)
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProjectFormData>()

  const onSubmit = (data: ProjectFormData) => {
    try {
      createProject(data)
      toast.success('Project created successfully!')
      navigate('/phases')
    } catch (error) {
      toast.error('Failed to create project')
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const watchedValues = watch()

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Setup</h1>
        <p className="text-gray-600">
          Configure your research project parameters to begin the AI-assisted research process
        </p>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`phase-indicator ${
                  step >= stepNumber ? 'active' : 'pending'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`h-1 w-24 mx-4 ${
                    step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Basic Info</span>
          <span>Academic Details</span>
          <span>Research Focus</span>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="card"
        >
          {step === 1 && (
            <div>
              <div className="flex items-center mb-6">
                <BookOpen className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Basic Information</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title
                  </label>
                  <input
                    {...register('title', { required: 'Project title is required' })}
                    className="input-field"
                    placeholder="Enter your research project title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Level
                  </label>
                  <select
                    {...register('academicLevel', { required: 'Academic level is required' })}
                    className="input-field"
                  >
                    <option value="">Select academic level</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="masters">Master's</option>
                    <option value="phd">PhD</option>
                  </select>
                  {errors.academicLevel && (
                    <p className="text-red-500 text-sm mt-1">{errors.academicLevel.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field of Study
                  </label>
                  <input
                    {...register('fieldOfStudy', { required: 'Field of study is required' })}
                    className="input-field"
                    placeholder="e.g., International Development, Computer Science, Psychology"
                  />
                  {errors.fieldOfStudy && (
                    <p className="text-red-500 text-sm mt-1">{errors.fieldOfStudy.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <Settings className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Academic Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Citation Style
                  </label>
                  <select
                    {...register('citationStyle', { required: 'Citation style is required' })}
                    className="input-field"
                  >
                    <option value="">Select citation style</option>
                    <option value="apa">APA 7th Edition</option>
                    <option value="mla">MLA 9th Edition</option>
                    <option value="chicago">Chicago Manual of Style</option>
                    <option value="harvard">Harvard Referencing</option>
                  </select>
                  {errors.citationStyle && (
                    <p className="text-red-500 text-sm mt-1">{errors.citationStyle.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Methodology Preference
                  </label>
                  <select
                    {...register('methodologyPreference', { required: 'Methodology preference is required' })}
                    className="input-field"
                  >
                    <option value="">Select methodology</option>
                    <option value="qualitative">Qualitative</option>
                    <option value="quantitative">Quantitative</option>
                    <option value="mixed-methods">Mixed Methods</option>
                  </select>
                  {errors.methodologyPreference && (
                    <p className="text-red-500 text-sm mt-1">{errors.methodologyPreference.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Context/Region (Optional)
                  </label>
                  <input
                    {...register('context')}
                    className="input-field"
                    placeholder="e.g., Nigeria, Sub-Saharan Africa, Urban areas"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Specify geographical or contextual focus if applicable
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <Target className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Research Focus</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Research Topic
                  </label>
                  <textarea
                    {...register('topic', { required: 'Research topic is required' })}
                    className="textarea-field"
                    rows={4}
                    placeholder="Describe your research topic or type 'Suggest topics' for AI-generated suggestions"
                  />
                  {errors.topic && (
                    <p className="text-red-500 text-sm mt-1">{errors.topic.message}</p>
                  )}
                </div>

                {/* Project Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Project Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Title:</span>
                      <span className="font-medium">{watchedValues.title || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level:</span>
                      <span className="font-medium">{watchedValues.academicLevel || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Field:</span>
                      <span className="font-medium">{watchedValues.fieldOfStudy || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Citation:</span>
                      <span className="font-medium">{watchedValues.citationStyle?.toUpperCase() || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Methodology:</span>
                      <span className="font-medium">{watchedValues.methodologyPreference || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary"
              >
                Previous
              </button>
            )}
            
            <div className="ml-auto">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Create Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  )
}

export default ProjectSetup