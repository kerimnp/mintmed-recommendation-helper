import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface PatientDemographicsSectionProps {
  formData: {
    age: string;
    gender: string;
    weight: string;
    height: string;
    pregnancy: string;
  };
  onInputChange: (field: string, value: any) => void;
}

export const PatientDemographicsSection: React.FC<PatientDemographicsSectionProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <Card className="glass-card p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Patient Demographics</h2>
        <p className="text-sm text-gray-500">Enter the patient's basic information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age" className="form-label">Age</Label>
          <Input 
            id="age" 
            type="number" 
            placeholder="Enter age" 
            className="input-field"
            value={formData.age}
            onChange={(e) => onInputChange("age", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="form-label">Gender</Label>
          <Select value={formData.gender} onValueChange={(value) => onInputChange("gender", value)}>
            <SelectTrigger className="input-field">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight" className="form-label">Weight (kg)</Label>
          <Input 
            id="weight" 
            type="number" 
            placeholder="Enter weight" 
            className="input-field"
            value={formData.weight}
            onChange={(e) => onInputChange("weight", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height" className="form-label">Height (cm)</Label>
          <Input 
            id="height" 
            type="number" 
            placeholder="Enter height" 
            className="input-field"
            value={formData.height}
            onChange={(e) => onInputChange("height", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pregnancy" className="form-label">Pregnancy Status</Label>
          <Select value={formData.pregnancy} onValueChange={(value) => onInputChange("pregnancy", value)}>
            <SelectTrigger className="input-field">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-pregnant">Not Pregnant</SelectItem>
              <SelectItem value="pregnant">Pregnant</SelectItem>
              <SelectItem value="breastfeeding">Breastfeeding</SelectItem>
              <SelectItem value="not-applicable">Not Applicable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};