import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ResearchProject {
  id: string
  title: string
  academicLevel: 'undergraduate' | 'masters' | 'phd'
  fieldOfStudy: string
  topic: string
  citationStyle: 'apa' | 'mla' | 'chicago' | 'harvard'
  methodologyPreference: 'qualitative' | 'quantitative' | 'mixed-methods'
  context?: string
  researchQuestion?: string
  outline?: string
  currentPhase: number
  phases: ResearchPhase[]
  createdAt: Date
  updatedAt: Date
}

export interface ResearchPhase {
  id: number
  name: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'approved'
  content?: string
  feedback?: string
  completedAt?: Date
}

export interface Source {
  id: string
  title: string
  authors: string[]
  year: number
  type: 'journal' | 'book' | 'conference' | 'thesis' | 'report' | 'website'
  journal?: string
  publisher?: string
  doi?: string
  url?: string
  pages?: string
  volume?: string
  issue?: string
  citation: string
  summary?: string
  tags: string[]
  addedAt: Date
}

export interface SimulatedData {
  id: string
  name: string
  type: 'survey' | 'interview' | 'experiment' | 'observation'
  description: string
  sampleSize: number
  methodology: string
  data: any[]
  analysis?: string
  visualizations?: string[]
  createdAt: Date
}

interface ResearchStore {
  currentProject: ResearchProject | null
  projects: ResearchProject[]
  sources: Source[]
  simulatedData: SimulatedData[]
  
  // Project management
  createProject: (project: Omit<ResearchProject, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateProject: (id: string, updates: Partial<ResearchProject>) => void
  setCurrentProject: (project: ResearchProject | null) => void
  
  // Phase management
  updatePhase: (phaseId: number, updates: Partial<ResearchPhase>) => void
  approvePhase: (phaseId: number) => void
  
  // Source management
  addSource: (source: Omit<Source, 'id' | 'addedAt'>) => void
  updateSource: (id: string, updates: Partial<Source>) => void
  deleteSource: (id: string) => void
  
  // Data simulation
  addSimulatedData: (data: Omit<SimulatedData, 'id' | 'createdAt'>) => void
  updateSimulatedData: (id: string, updates: Partial<SimulatedData>) => void
  deleteSimulatedData: (id: string) => void
}

const defaultPhases: ResearchPhase[] = [
  {
    id: 1,
    name: 'foundation',
    title: 'Foundation & Scoping',
    description: 'Define research question, develop outline, and establish theoretical framework',
    status: 'pending'
  },
  {
    id: 2,
    name: 'literature',
    title: 'Literature Review & Theoretical Framework',
    description: 'Comprehensive literature review and theoretical foundation',
    status: 'pending'
  },
  {
    id: 3,
    name: 'methodology',
    title: 'Methodology',
    description: 'Research design, methods, and ethical considerations',
    status: 'pending'
  },
  {
    id: 4,
    name: 'results',
    title: 'Data Simulation & Results',
    description: 'Generate simulated data and analyze results',
    status: 'pending'
  },
  {
    id: 5,
    name: 'discussion',
    title: 'Discussion & Conclusion',
    description: 'Interpret results, discuss implications, and conclude',
    status: 'pending'
  },
  {
    id: 6,
    name: 'assembly',
    title: 'Final Assembly',
    description: 'Complete document assembly and final review',
    status: 'pending'
  }
]

export const useResearchStore = create<ResearchStore>()(
  persist(
    (set, get) => ({
      currentProject: null,
      projects: [],
      sources: [],
      simulatedData: [],

      createProject: (projectData) => {
        const project: ResearchProject = {
          ...projectData,
          id: crypto.randomUUID(),
          currentPhase: 1,
          phases: [...defaultPhases],
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        set((state) => ({
          projects: [...state.projects, project],
          currentProject: project
        }))
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map(p => 
            p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
          ),
          currentProject: state.currentProject?.id === id 
            ? { ...state.currentProject, ...updates, updatedAt: new Date() }
            : state.currentProject
        }))
      },

      setCurrentProject: (project) => {
        set({ currentProject: project })
      },

      updatePhase: (phaseId, updates) => {
        const { currentProject } = get()
        if (!currentProject) return

        const updatedPhases = currentProject.phases.map(phase =>
          phase.id === phaseId ? { ...phase, ...updates } : phase
        )

        const updatedProject = {
          ...currentProject,
          phases: updatedPhases,
          updatedAt: new Date()
        }

        set((state) => ({
          currentProject: updatedProject,
          projects: state.projects.map(p => 
            p.id === currentProject.id ? updatedProject : p
          )
        }))
      },

      approvePhase: (phaseId) => {
        const { currentProject } = get()
        if (!currentProject) return

        const updatedPhases = currentProject.phases.map(phase =>
          phase.id === phaseId 
            ? { ...phase, status: 'approved' as const, completedAt: new Date() }
            : phase
        )

        const nextPhase = Math.min(phaseId + 1, 6)
        
        const updatedProject = {
          ...currentProject,
          phases: updatedPhases,
          currentPhase: nextPhase,
          updatedAt: new Date()
        }

        set((state) => ({
          currentProject: updatedProject,
          projects: state.projects.map(p => 
            p.id === currentProject.id ? updatedProject : p
          )
        }))
      },

      addSource: (sourceData) => {
        const source: Source = {
          ...sourceData,
          id: crypto.randomUUID(),
          addedAt: new Date()
        }
        
        set((state) => ({
          sources: [...state.sources, source]
        }))
      },

      updateSource: (id, updates) => {
        set((state) => ({
          sources: state.sources.map(s => 
            s.id === id ? { ...s, ...updates } : s
          )
        }))
      },

      deleteSource: (id) => {
        set((state) => ({
          sources: state.sources.filter(s => s.id !== id)
        }))
      },

      addSimulatedData: (dataInfo) => {
        const data: SimulatedData = {
          ...dataInfo,
          id: crypto.randomUUID(),
          createdAt: new Date()
        }
        
        set((state) => ({
          simulatedData: [...state.simulatedData, data]
        }))
      },

      updateSimulatedData: (id, updates) => {
        set((state) => ({
          simulatedData: state.simulatedData.map(d => 
            d.id === id ? { ...d, ...updates } : d
          )
        }))
      },

      deleteSimulatedData: (id) => {
        set((state) => ({
          simulatedData: state.simulatedData.filter(d => d.id !== id)
        }))
      }
    }),
    {
      name: 'research-store'
    }
  )
)