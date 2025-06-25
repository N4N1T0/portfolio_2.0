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

export interface Certification {
  title: string
  issuer: string
  issuerLogoURL: string
  issueDate: string
  credentialURL: string
}
