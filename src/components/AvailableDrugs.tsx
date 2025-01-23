import React from "react";
import { Card } from "./ui/card";
import { DrugProduct } from "@/utils/availableDrugsDatabase";

interface AvailableDrugsProps {
  drugName: string;
  products: DrugProduct[];
  onProductSelect: (product: DrugProduct) => void;
  selectedProduct?: DrugProduct;
  externalSelectedProduct?: DrugProduct;
}

export const AvailableDrugs: React.FC<AvailableDrugsProps> = ({
  drugName,
  products,
  onProductSelect,
  selectedProduct,
  externalSelectedProduct
}) => {
  const handleProductSelect = (product: DrugProduct) => {
    onProductSelect(product);
  };

  const displayProducts = products.length > 0 
    ? products 
    : [{ name: "No products available", manufacturer: "N/A", forms: [] }];

  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl
      border border-gray-200 dark:border-gray-800">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Available {drugName} Products
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select a product to view detailed information
          </p>
        </div>

        <div className="space-y-4">
          {displayProducts.map((product, index) => (
            <Card 
              key={index} 
              className={`p-3 border transition-all duration-300 cursor-pointer ${
                (selectedProduct?.name === product.name || externalSelectedProduct?.name === product.name)
                  ? 'border-medical-primary bg-medical-primary/10 ring-4 ring-medical-primary/50 shadow-xl transform scale-[1.02]' 
                  : 'border-medical-accent/20 bg-white hover:border-medical-primary/40 hover:shadow-lg hover:scale-[1.01]'
              }`}
              onClick={() => handleProductSelect(product)}
            >
              <h4 className="font-semibold text-gray-900 dark:text-white">{product.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{product.manufacturer}</p>
              <div className="space-y-2">
                {product.forms.map((form, formIndex) => (
                  <div key={formIndex} className="text-sm pl-4 border-l-2 border-medical-primary/30">
                    <p className="font-medium">{form.type}</p>
                    <p className="text-gray-600">{form.strength}</p>
                    <p className="text-gray-500 text-xs">{form.packaging}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};