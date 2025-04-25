
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface MenuOption {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  title: string;
  options: MenuOption[];
  selectedOptions: string[];
  onOptionChange: (optionId: string) => void;
  otherValue: string;
  onOtherChange: (value: string) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  title,
  options,
  selectedOptions,
  onOptionChange,
  otherValue,
  onOtherChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={selectedOptions.includes(option.id)}
              onCheckedChange={() => onOptionChange(option.id)}
            />
            <Label htmlFor={option.id}>{option.label}</Label>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`${title}-other`}
            checked={selectedOptions.includes('other')}
            onCheckedChange={() => onOptionChange('other')}
          />
          <Input
            placeholder="Lainnya"
            value={otherValue}
            onChange={(e) => onOtherChange(e.target.value)}
            className="w-48"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckboxGroup;
