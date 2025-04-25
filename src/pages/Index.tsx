import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import StarRating from '@/components/StarRating';
import CheckboxGroup from '@/components/CheckboxGroup';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const menuOptions = [
  { id: 'pembukaan-rekening', label: 'Pembukaan Rekening' },
  { id: 'maintenance-cif', label: 'Maintenance CIF' },
  { id: 'cross-selling', label: 'Cross Selling' },
];

const Index = () => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [optimalOptions, setOptimalOptions] = useState<string[]>([]);
  const [optimalOther, setOptimalOther] = useState('');
  const [nonOptimalOptions, setNonOptimalOptions] = useState<string[]>([]);
  const [nonOptimalOther, setNonOptimalOther] = useState('');
  const [feedback, setFeedback] = useState('');

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
    setOptimalOptions([]);
    setOptimalOther('');
    setNonOptimalOptions([]);
    setNonOptimalOther('');
    setFeedback('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header />
      <div className="py-8 flex-grow">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Seberapa puaskah Anda dengan aplikasi NDS?</h2>
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <CheckboxGroup
                title="Menu NDS yang Paling Optimal"
                options={menuOptions}
                selectedOptions={optimalOptions}
                onOptionChange={(id) => {
                  if (optimalOptions.includes(id)) {
                    setOptimalOptions(optimalOptions.filter(item => item !== id));
                  } else {
                    setOptimalOptions([...optimalOptions, id]);
                  }
                }}
                otherValue={optimalOther}
                onOtherChange={setOptimalOther}
              />

              <CheckboxGroup
                title="Menu NDS yang Kurang Optimal"
                options={menuOptions}
                selectedOptions={nonOptimalOptions}
                onOptionChange={(id) => {
                  if (nonOptimalOptions.includes(id)) {
                    setNonOptimalOptions(nonOptimalOptions.filter(item => item !== id));
                  } else {
                    setNonOptimalOptions([...nonOptimalOptions, id]);
                  }
                }}
                otherValue={nonOptimalOther}
                onOtherChange={setNonOptimalOther}
              />
            </div>

            <div className="space-y-2">
              <label className="text-lg font-medium">Saran (optional)</label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Berikan saran Anda"
                className="h-32"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setRating(0);
                  setOptimalOptions([]);
                  setOptimalOther('');
                  setNonOptimalOptions([]);
                  setNonOptimalOther('');
                  setFeedback('');
                }}
              >
                Batal
              </Button>
              <Button onClick={handleSubmit}>Kirim</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
