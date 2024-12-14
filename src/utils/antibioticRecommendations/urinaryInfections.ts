import { PatientData, AntibioticRecommendation } from './types';
import { calculateAdjustedDose, getDurationAdjustment, isSafeAntibiotic } from './antibioticSafety';

export const generateUrinaryRecommendation = (data: PatientData): AntibioticRecommendation => {
  const recommendation: AntibioticRecommendation = {
    primaryRecommendation: {
      name: "",
      dose: "",
      route: "",
      duration: ""
    },
    reasoning: "",
    alternatives: [],
    precautions: []
  };

  if (data.severity === "mild" && !data.kidneyDisease) {
    if (!data.allergies.sulfa) {
      const adjustedDose = calculateAdjustedDose(
        "160/800mg",
        data.weight,
        data.age,
        data.kidneyDisease,
        data.liverDisease
      );
      const adjustedDuration = getDurationAdjustment(
        "3-5 days",
        data.severity,
        data.immunosuppressed
      );

      recommendation.primaryRecommendation = {
        name: "Trimethoprim-Sulfamethoxazole",
        dose: adjustedDose,
        route: "oral",
        duration: adjustedDuration
      };
      recommendation.reasoning = "First-line treatment for uncomplicated UTI";
    } else {
      const adjustedDose = calculateAdjustedDose(
        "100mg",
        data.weight,
        data.age,
        data.kidneyDisease,
        data.liverDisease
      );
      const adjustedDuration = getDurationAdjustment(
        "5 days",
        data.severity,
        data.immunosuppressed
      );

      recommendation.primaryRecommendation = {
        name: "Nitrofurantoin",
        dose: adjustedDose,
        route: "oral",
        duration: adjustedDuration
      };
      recommendation.reasoning = "Alternative first-line agent due to sulfa allergy";
    }
  } else {
    if (!data.allergies.cephalosporin) {
      const adjustedDose = calculateAdjustedDose(
        "1g",
        data.weight,
        data.age,
        data.kidneyDisease,
        data.liverDisease
      );
      const adjustedDuration = getDurationAdjustment(
        "7-14 days",
        data.severity,
        data.immunosuppressed
      );

      recommendation.primaryRecommendation = {
        name: "Ceftriaxone",
        dose: adjustedDose,
        route: "IV",
        duration: adjustedDuration
      };
      recommendation.reasoning = "Selected for complicated UTI requiring parenteral therapy";
    } else {
      const adjustedDose = calculateAdjustedDose(
        "5mg/kg",
        data.weight,
        data.age,
        data.kidneyDisease,
        data.liverDisease
      );
      const adjustedDuration = getDurationAdjustment(
        "7-14 days",
        data.severity,
        data.immunosuppressed
      );

      recommendation.primaryRecommendation = {
        name: "Gentamicin",
        dose: adjustedDose,
        route: "IV",
        duration: adjustedDuration
      };
      recommendation.reasoning = "Alternative for complicated UTI with cephalosporin allergy";
    }
  }

  // Add relevant precautions
  if (data.kidneyDisease) {
    recommendation.precautions.push("Dose adjusted for renal impairment - monitor kidney function");
  }
  if (data.liverDisease) {
    recommendation.precautions.push("Monitor liver function during treatment");
  }
  if (data.immunosuppressed) {
    recommendation.precautions.push("Extended duration due to immunosuppression");
  }

  return recommendation;
};