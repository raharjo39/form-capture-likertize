import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import StarRating from '@/components/StarRating';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

const menuOptions = [
  { id: 'pembukaan-rekening', label: 'Pembukaan Rekening' },
  { id: 'maintenance-cif', label: 'Maintenance CIF' },
  { id: 'cross-selling', label: 'Cross Selling' },
  { id: 'fitur-lainnya', label: 'Fitur lainnya' },
  { id: 'semua-fitur', label: 'Semua Fitur' },
];

const Index = () => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [networkPerformance, setNetworkPerformance] = useState('');
  const [slowFeatures, setSlowFeatures] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [showSlowFeaturesSection, setShowSlowFeaturesSection] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Mohon berikan rating terlebih dahulu"
      });
      return;
    }

    if (!branchCode.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Mohon masukkan kode cabang"
      });
      return;
    }

    if (!/^\d{1,6}$/.test(branchCode)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Kode cabang harus berupa angka maksimal 6 digit"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Testing Supabase connection...');

      console.log('Submitting data:', {
        network_performance: networkPerformance || null,
        slow_features: slowFeatures.length > 0 ? slowFeatures : null,
        rating: rating,
        feedback: feedback.trim() || null,
        branch_code: branchCode
      });

      // Test basic connectivity first
      const testQuery = await supabase.from('feedback_responses').select('count');
      console.log('Test query result:', testQuery);

      const { data, error } = await supabase
        .from('feedback_responses')
        .insert({
          network_performance: networkPerformance || null,
          slow_features: slowFeatures.length > 0 ? slowFeatures : null,
          rating: rating,
          feedback: feedback.trim() || null,
          branch_code: branchCode
        })
        .select();

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Error saving feedback:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: `Terjadi kesalahan saat menyimpan feedback: ${error.message}`
        });
        return;
      }

      toast({
        title: "Berhasil",
        description: "Terima kasih atas feedback Anda"
      });

      // Reset form
      setRating(0);
      setNetworkPerformance('');
      setSlowFeatures([]);
      setFeedback('');
      setBranchCode('');
      setShowSlowFeaturesSection(false);

    } catch (error) {
      console.error('Unexpected error:', error);
      console.error('Error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      });
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan yang tidak terduga. Silakan coba lagi."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNetworkPerformanceChange = (value: string) => {
    setNetworkPerformance(value);
    
    // Show slow features section if "Lambat" or "Parah/Time Out" is selected
    if (value === 'slow' || value === 'timeout') {
      setShowSlowFeaturesSection(true);
    } else {
      setShowSlowFeaturesSection(false);
      setSlowFeatures([]);
    }
  };

  const handleFeatureToggle = (id: string) => {
    setSlowFeatures(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header />
      <div className="py-8 flex-grow">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Network Performance */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Bagaimana Response time (kecepatan) aplikasi NDS?</h3>
              <RadioGroup
                value={networkPerformance}
                onValueChange={handleNetworkPerformanceChange}
                className="flex flex-col space-y-3"
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

            {/* Section 2: Slow Features (Only shown if Lambat or Parah/Time Out is selected) */}
            {showSlowFeaturesSection && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Fitur di NDS apa yang dirasa lambat?</h3>
                <div className="space-y-3">
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
                </div>
              </div>
            )}

            {/* Section 3: Rating */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Seberapa puaskah Anda dengan layanan IT?</h2>
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>

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

            {/* Section 5: Branch Code */}
            <div className="space-y-2">
              <Label className="text-lg font-medium">Kode Cabang <span className="text-red-500">*</span></Label>
              <Input
                type="text"
                value={branchCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setBranchCode(value);
                }}
                placeholder="Masukkan kode cabang (6 digit angka)"
                maxLength={6}
                className="w-full"
              />
              <p className="text-sm text-gray-500">Maksimal 6 digit angka</p>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setRating(0);
                  setNetworkPerformance('');
                  setSlowFeatures([]);
                  setFeedback('');
                  setBranchCode('');
                  setShowSlowFeaturesSection(false);
                }}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Mengirim...' : 'Kirim'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
