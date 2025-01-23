import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import jsPDF from "jspdf";
import { DrugProduct } from "@/utils/availableDrugsDatabase";

interface PrescriptionModalProps {
  open: boolean;
  onClose: () => void;
  recommendationData: {
    primaryRecommendation: {
      name: string;
      dose: string;
      route: string;
      duration: string;
    };
  };
  selectedProduct?: DrugProduct;
}

export const PrescriptionModal = ({ open, onClose, recommendationData, selectedProduct }: PrescriptionModalProps) => {
  const { toast } = useToast();
  const [patientName, setPatientName] = React.useState("");
  const [patientSurname, setPatientSurname] = React.useState("");
  const [doctorName, setDoctorName] = React.useState("");
  const [doctorSurname, setDoctorSurname] = React.useState("");

  const generatePrescription = () => {
    if (!patientName || !patientSurname || !doctorName || !doctorSurname) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const doc = new jsPDF();
    
    // Add logo
    const logoPath = "/lovable-uploads/cd9530dc-7974-4ff9-af77-057326fea5a9.png";
    doc.addImage(logoPath, "PNG", 20, 10, 40, 20);
    
    // Add modern header with gradient-like effect
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, 210, 40, "F");
    doc.setFillColor(241, 245, 249);
    doc.rect(0, 35, 210, 5, "F");
    
    // Add title
    doc.setFontSize(24);
    doc.setTextColor(30, 41, 59);
    doc.text("Medical Prescription", 70, 25);
    
    // Add patient information section
    doc.setFillColor(249, 250, 251);
    doc.rect(20, 50, 170, 40, "F");
    doc.setFontSize(12);
    doc.setTextColor(71, 85, 105);
    doc.text("Patient Information", 25, 60);
    doc.setTextColor(51, 65, 85);
    doc.text(`Name: ${patientName} ${patientSurname}`, 25, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 25, 80);
    
    // Add medication details section
    doc.setFillColor(249, 250, 251);
    doc.rect(20, 100, 170, 60, "F");
    doc.setTextColor(71, 85, 105);
    doc.text("Prescribed Medication", 25, 110);
    doc.setTextColor(51, 65, 85);
    doc.text(`Medication: ${recommendationData.primaryRecommendation.name}`, 25, 120);
    doc.text(`Dose: ${recommendationData.primaryRecommendation.dose}`, 25, 130);
    doc.text(`Route: ${recommendationData.primaryRecommendation.route}`, 25, 140);
    doc.text(`Duration: ${recommendationData.primaryRecommendation.duration}`, 25, 150);
    
    if (selectedProduct) {
      doc.setFillColor(249, 250, 251);
      doc.rect(20, 170, 170, 40, "F");
      doc.setTextColor(71, 85, 105);
      doc.text("Selected Product", 25, 180);
      doc.setTextColor(51, 65, 85);
      doc.text(`Name: ${selectedProduct.name}`, 25, 190);
      doc.text(`Manufacturer: ${selectedProduct.manufacturer}`, 25, 200);
    }
    
    // Add doctor's signature section
    doc.setFillColor(249, 250, 251);
    doc.rect(20, 220, 170, 50, "F");
    doc.setTextColor(71, 85, 105);
    doc.text("Prescribed by:", 25, 230);
    doc.setTextColor(51, 65, 85);
    doc.text(`Dr. ${doctorName} ${doctorSurname}`, 25, 240);
    
    // Add signature line
    doc.setDrawColor(203, 213, 225);
    doc.line(25, 255, 95, 255);
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text("(Signature)", 50, 265);

    // Save the PDF
    doc.save(`prescription_${patientSurname}_${patientName}.pdf`);
    
    toast({
      title: "Prescription Generated",
      description: "The prescription has been generated successfully",
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Prescription</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="First name"
              />
            </div>
            <div>
              <Label htmlFor="patientSurname">Patient Surname</Label>
              <Input
                id="patientSurname"
                value={patientSurname}
                onChange={(e) => setPatientSurname(e.target.value)}
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doctorName">Doctor Name</Label>
              <Input
                id="doctorName"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="First name"
              />
            </div>
            <div>
              <Label htmlFor="doctorSurname">Doctor Surname</Label>
              <Input
                id="doctorSurname"
                value={doctorSurname}
                onChange={(e) => setDoctorSurname(e.target.value)}
                placeholder="Last name"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={generatePrescription}>Generate PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};