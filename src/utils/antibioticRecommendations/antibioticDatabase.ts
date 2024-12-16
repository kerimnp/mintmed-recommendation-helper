export interface AntibioticDosing {
  name: string;
  class: string;
  standardDosing: {
    adult: {
      mild: { dose: string; interval: string };
      moderate: { dose: string; interval: string };
      severe: { dose: string; interval: string };
    };
    pediatric: {
      mgPerKg: number;
      maxDose: number;
      interval: string;
    };
  };
  routes: string[];
  renalAdjustment: {
    gfr: number;
    adjustment: string;
  }[];
  weightAdjustment?: {
    threshold: number; // kg
    adjustment: string;
  }[];
  contraindications: string[];
  commonIndications: string[];
}

export const antibioticDatabase: AntibioticDosing[] = [
  {
    name: "Amoxicillin",
    class: "Penicillin",
    standardDosing: {
      adult: {
        mild: { dose: "500mg", interval: "q8h" },
        moderate: { dose: "875mg", interval: "q12h" },
        severe: { dose: "1g", interval: "q8h" }
      },
      pediatric: {
        mgPerKg: 25,
        maxDose: 1000,
        interval: "q8h"
      }
    },
    routes: ["oral"],
    renalAdjustment: [
      { gfr: 30, adjustment: "500mg q12h" },
      { gfr: 10, adjustment: "500mg q24h" }
    ],
    contraindications: ["penicillin allergy"],
    commonIndications: ["respiratory", "skin", "dental"]
  },
  {
    name: "Ceftriaxone",
    class: "Cephalosporin",
    standardDosing: {
      adult: {
        mild: { dose: "1g", interval: "q24h" },
        moderate: { dose: "2g", interval: "q24h" },
        severe: { dose: "2g", interval: "q12h" }
      },
      pediatric: {
        mgPerKg: 50,
        maxDose: 2000,
        interval: "q24h"
      }
    },
    routes: ["IV", "IM"],
    renalAdjustment: [
      { gfr: 10, adjustment: "2g q24h" }
    ],
    weightAdjustment: [
      { threshold: 120, adjustment: "increase dose by 50%" }
    ],
    contraindications: ["cephalosporin allergy"],
    commonIndications: ["respiratory", "meningitis", "sepsis"]
  },
  {
    name: "Azithromycin",
    class: "Macrolide",
    standardDosing: {
      adult: {
        mild: { dose: "500mg day 1, then 250mg", interval: "q24h" },
        moderate: { dose: "500mg", interval: "q24h" },
        severe: { dose: "500mg", interval: "q24h" }
      },
      pediatric: {
        mgPerKg: 10,
        maxDose: 500,
        interval: "q24h"
      }
    },
    routes: ["oral", "IV"],
    renalAdjustment: [],
    contraindications: ["macrolide allergy", "liver disease"],
    commonIndications: ["respiratory", "atypical pneumonia"]
  },
  {
    name: "Vancomycin",
    class: "Glycopeptide",
    standardDosing: {
      adult: {
        mild: { dose: "1g", interval: "q12h" },
        moderate: { dose: "1.5g", interval: "q12h" },
        severe: { dose: "2g", interval: "q12h" }
      },
      pediatric: {
        mgPerKg: 15,
        maxDose: 2000,
        interval: "q6h"
      }
    },
    routes: ["IV"],
    renalAdjustment: [
      { gfr: 50, adjustment: "1g q24h" },
      { gfr: 30, adjustment: "1g q48h" },
      { gfr: 10, adjustment: "1g q72h" }
    ],
    weightAdjustment: [
      { threshold: 100, adjustment: "dose based on actual body weight" }
    ],
    contraindications: ["previous red man syndrome"],
    commonIndications: ["MRSA", "severe infections"]
  },
  {
    name: "Ciprofloxacin",
    class: "Fluoroquinolone",
    standardDosing: {
      adult: {
        mild: { dose: "500mg", interval: "q12h" },
        moderate: { dose: "750mg", interval: "q12h" },
        severe: { dose: "400mg IV", interval: "q8h" }
      },
      pediatric: {
        mgPerKg: 20,
        maxDose: 750,
        interval: "q12h"
      }
    },
    routes: ["oral", "IV"],
    renalAdjustment: [
      { gfr: 30, adjustment: "50% dose reduction" },
      { gfr: 15, adjustment: "75% dose reduction" }
    ],
    contraindications: ["fluoroquinolone allergy", "pregnancy", "children"],
    commonIndications: ["urinary", "respiratory", "gastrointestinal"]
  }
];

export const calculateAdjustedDose = (
  antibiotic: AntibioticDosing,
  patientWeight: number,
  patientAge: number,
  gfr: number,
  severity: "mild" | "moderate" | "severe"
): string => {
  let dose = "";
  
  // Check if pediatric dosing should be used
  if (patientAge < 18) {
    const weightBasedDose = antibiotic.standardDosing.pediatric.mgPerKg * patientWeight;
    dose = `${Math.min(weightBasedDose, antibiotic.standardDosing.pediatric.maxDose)}mg ${antibiotic.standardDosing.pediatric.interval}`;
  } else {
    dose = `${antibiotic.standardDosing.adult[severity].dose} ${antibiotic.standardDosing.adult[severity].interval}`;
  }

  // Apply weight-based adjustments if applicable
  if (antibiotic.weightAdjustment) {
    const weightAdjustment = antibiotic.weightAdjustment.find(adj => patientWeight >= adj.threshold);
    if (weightAdjustment) {
      dose += ` (${weightAdjustment.adjustment})`;
    }
  }

  // Apply renal adjustments if applicable
  if (antibiotic.renalAdjustment.length > 0) {
    const renalAdjustment = antibiotic.renalAdjustment
      .sort((a, b) => b.gfr - a.gfr)
      .find(adj => gfr <= adj.gfr);
    
    if (renalAdjustment) {
      dose = renalAdjustment.adjustment;
    }
  }

  return dose;
};