
import React, { useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, CheckCircle } from 'lucide-react';

interface PaymentProofUploaderProps {
  paymentProofFile: File | null;
  setPaymentProofFile: (file: File | null) => void;
}

export const PaymentProofUploader: React.FC<PaymentProofUploaderProps> = ({ 
  paymentProofFile, 
  setPaymentProofFile 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProofFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <Label htmlFor="file-upload" className="block font-medium mb-3 text-imperio-navy">
        Envie o comprovante do PIX
      </Label>
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-imperio-navy transition-colors cursor-pointer ${
          paymentProofFile ? 'border-imperio-navy/50 bg-imperio-extra-light-navy' : 'border-gray-300'
        }`} 
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          id="file-upload"
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        
        {paymentProofFile ? (
          <div className="text-imperio-navy">
            <CheckCircle size={40} className="mx-auto mb-3" />
            <p className="font-medium text-lg">{paymentProofFile.name}</p>
            <p className="text-sm text-gray-600 mt-1">
              {(paymentProofFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <Button 
              className="mt-4 bg-imperio-navy hover:bg-imperio-light-navy"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setPaymentProofFile(null);
              }}
            >
              Escolher outro arquivo
            </Button>
          </div>
        ) : (
          <div className="text-gray-500">
            <Upload size={40} className="mx-auto mb-3" />
            <p className="font-medium">Clique para anexar comprovante</p>
            <p className="text-sm mt-1">PNG, JPG ou PDF (max 10MB)</p>
          </div>
        )}
      </div>
    </div>
  );
};
