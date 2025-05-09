
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import StarRating from '@/components/StarRating';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const menuOptions = [
  { id: 'semua-fitur', label: 'Semua Fitur' },
  { id: 'pembukaan-rekening', label: 'Pembukaan Rekening' },
  { id: 'maintenance-cif', label: 'Maintenance CIF' },
  { id: 'cross-selling', label: 'Cross Selling' },
];

const Index = () => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [networkPerformance, setNetworkPerformance] = useState('normal');
  const [slowFeatures, setSlowFeatures] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [customFeature, setCustomFeature] = useState('');
  const [isCustomFeatureChecked, setIsCustomFeatureChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Mohon berikan rating terlebih dahulu"
      });
      return;
    }

    toast({
      title: "Berhasil",
      description: "Terima kasih atas feedback Anda"
    });

    // Reset form
    setRating(0);
    setNetworkPerformance('normal');
    setSlowFeatures([]);
    setFeedback('');
    setCustomFeature('');
    setIsCustomFeatureChecked(false);
  };

  const handleFeatureToggle = (id: string) => {
    // Simple toggle logic - each checkbox is independent
    setSlowFeatures(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  const handleCustomFeatureToggle = (checked: boolean) => {
    setIsCustomFeatureChecked(!!checked);
    
    if (checked && customFeature) {
      setSlowFeatures(current => {
        return current.includes('custom') ? current : [...current, 'custom'];
      });
    } else {
      setSlowFeatures(current => {
        return current.filter(item => item !== 'custom');
      });
    }
  };

  const handleCustomFeatureChange = (value: string) => {
    setCustomFeature(value);
    
    if (isCustomFeatureChecked && value) {
      setSlowFeatures(current => {
        return current.includes('custom') ? current : [...current, 'custom'];
      });
    } else if (isCustomFeatureChecked && !value) {
      setSlowFeatures(current => {
        return current.filter(item => item !== 'custom');
      });
    }
  };

  const showPerformanceSection = rating > 0 && rating <= 3;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header />
      <div className="py-8 flex-grow">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Rating */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Seberapa puaskah Anda dengan aplikasi NDS?</h2>
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>

            {/* Section 2: Network Performance (Only shown if rating <= 3) */}
            {showPerformanceSection && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Bagaimana Performa Jarkom?</h3>
                <RadioGroup
                  value={networkPerformance}
                  onValueChange={setNetworkPerformance}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="slow" id="slow" />
                    <Label htmlFor="slow">Lambat</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="timeout" id="timeout" />
                    <Label htmlFor="timeout">Parah/Time Out</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Section 3: Slow Features (Only shown if rating <= 3) */}
            {showPerformanceSection && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Fitur di NDS apa yang dirasa lambat?</h3>
                <div className="space-y-2">
                  {menuOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={slowFeatures.includes(option.id)}
                        onCheckedChange={() => handleFeatureToggle(option.id)}
                      />
                      <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                  ))}
                  {/* Custom feature input */}
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="custom-feature"
                      checked={isCustomFeatureChecked}
                      onCheckedChange={(checked) => handleCustomFeatureToggle(!!checked)}
                    />
                    <Input
                      placeholder="Fitur lainnya"
                      value={customFeature}
                      onChange={(e) => handleCustomFeatureChange(e.target.value)}
                      className="w-full max-w-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section 4: Comments */}
            <div className="space-y-2">
              <Label className="text-lg font-medium">Komentar (optional)</Label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Berikan komentar Anda"
                className="h-32"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setRating(0);
                  setNetworkPerformance('normal');
                  setSlowFeatures([]);
                  setFeedback('');
                  setCustomFeature('');
                  setIsCustomFeatureChecked(false);
                }}
              >
                Batal
              </Button>
              <Button type="submit">Kirim</Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
