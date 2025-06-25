export interface Experience {
  id: string
  companyName: string
  companyLogo: string
  isCurrentEmployer: boolean
  positions: Position[]
}

export interface Position {
  id: string
  title: string
  employmentPeriod: {
    start: string
    end?: string
  }
  employmentType: string
  icon: string
  description: string[]
  skills: string[]
  isExpanded: boolean
}
;[]
