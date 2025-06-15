
import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

interface QRCodeDisplayProps {
  data: string;
  size?: number;
  primaryColor?: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  data,
  size = 200,
  primaryColor = '#6D28D9'
}) => {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrRef.current) return;

    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: 'svg',
      data: data,
      dotsOptions: {
        color: '#000000',
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      cornersSquareOptions: {
        color: primaryColor,
        type: 'extra-rounded',
      },
      cornersDotOptions: {
        color: primaryColor,
        type: 'dot',
      },
    });

    // Clear previous QR code
    qrRef.current.innerHTML = '';
    
    // Append new QR code
    qrCode.append(qrRef.current);
  }, [data, size, primaryColor]);

  return (
    <div 
      ref={qrRef} 
      className="flex items-center justify-center border rounded-lg p-4 bg-white"
    />
  );
};

export default QRCodeDisplay;
