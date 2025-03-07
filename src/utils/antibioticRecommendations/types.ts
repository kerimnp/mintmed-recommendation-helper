export interface PatientData {
  age: string;
  gender: string;
  weight: string;
  height: string;
  nationality: string;
  pregnancy: string;
  infectionSites: string[];
  symptoms: string;
  duration: string;
  severity: string;
  creatinine: string;
  recentAntibiotics: boolean;
  allergies: {
    penicillin: boolean;
    cephalosporin: boolean;
    sulfa: boolean;
    macrolide: boolean;
    fluoroquinolone: boolean;
  };
  kidneyDisease: boolean;
  liverDisease: boolean;
  diabetes: boolean;
  immunosuppressed: boolean;
  resistances: {
    mrsa: boolean;
    vre: boolean;
    esbl: boolean;
    cre: boolean;
    pseudomonas: boolean;
  };
}

export interface RegionalResistanceData {
  Respiratory: {
    macrolideResistance: number;
    penicillinResistance: number;
    fluoroquinoloneResistance: number;
  };
  UTI: {
    ESBL_prevalence: number;
    FQ_resistance: number;
    nitrofurantoinResistance: number;
  };
  MRSA_prevalence: number;
  Pseudomonas_prevalence: number;
}

export interface AntibioticRecommendation {
  primaryRecommendation: {
    name: string;
    dose: string;
    route: string;
    duration: string;
  };
  reasoning: string;
  alternatives: Array<{
    name: string;
    dose: string;
    route: string;
    duration: string;
    reason: string;
  }>;
  precautions: string[];
  calculations?: {
    weightBased?: string;
    renalAdjustment?: string;
    pediatricFactors?: string;
    bmiAdjustment?: string;
  };
}
