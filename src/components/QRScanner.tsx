
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, X, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface QRScannerProps {
  open: boolean;
  onClose: () => void;
  eventId: string;
}

interface ScanResult {
  valid: boolean;
  message: string;
  ticketData?: {
    id: string;
    customerName: string;
    quantity: number;
    used: boolean;
  };
}

const QRScanner: React.FC<QRScannerProps> = ({ open, onClose, eventId }) => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [camera, setCamera] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open && !scanning) {
      startScanning();
    }
    return () => {
      stopScanning();
    };
  }, [open]);

  const startScanning = async () => {
    try {
      // Reset the scan result
      setScanResult(null);
      
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCamera(stream);
        setScanning(true);
        scanQRCode();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        variant: "destructive",
        title: "Camera access denied",
        description: "Please allow camera access to scan QR codes."
      });
    }
  };

  const stopScanning = () => {
    if (camera) {
      camera.getTracks().forEach((track: MediaStreamTrack) => {
        track.stop();
      });
      setCamera(null);
    }
    setScanning(false);
  };

  const scanQRCode = () => {
    if (!scanning || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (video.readyState === video.HAVE_ENOUGH_DATA && context) {
      const width = video.videoWidth;
      const height = video.videoHeight;
      
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      
      const imageData = context.getImageData(0, 0, width, height);
      
      // In a real app, you would use a QR code scanning library here
      // For this example, we'll simulate finding a QR code
      simulateQRCodeScan();
    }
    
    if (scanning) {
      requestAnimationFrame(scanQRCode);
    }
  };

  // Simulated QR code scan for demonstration purposes
  const simulateQRCodeScan = () => {
    if (Math.random() < 0.002) { // Low probability to simulate finding a code
      const mockQRValue = `ticket_${Math.random().toString(36).substring(2, 9)}`;
      validateQRCode(mockQRValue);
    }
  };

  const validateQRCode = async (qrValue: string) => {
    stopScanning();
    
    try {
      // In a real app, you would query the database with the QR value
      // For this demo, we'll simulate API call with random results
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const valid = Math.random() > 0.3;
      const used = !valid && Math.random() > 0.5;
      
      if (valid) {
        setScanResult({
          valid: true,
          message: "Valid ticket! Entrance approved.",
          ticketData: {
            id: `ticket_${Math.random().toString(36).substring(2, 9)}`,
            customerName: "John Doe",
            quantity: Math.floor(Math.random() * 4) + 1,
            used: false
          }
        });
      } else {
        setScanResult({
          valid: false,
          message: used ? "Ticket already used" : "Invalid ticket",
        });
      }
    } catch (error) {
      console.error('Error validating QR code:', error);
      setScanResult({
        valid: false,
        message: "Error validating ticket",
      });
    }
  };

  const markTicketAsUsed = async (ticketId: string) => {
    try {
      // In a real app, update the ticket status in the database
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the scan result to show ticket as used
      setScanResult(prev => prev ? {
        ...prev,
        ticketData: prev.ticketData ? {
          ...prev.ticketData,
          used: true
        } : undefined
      } : null);
      
      toast({
        title: "Ticket marked as used",
        description: "The attendee has been checked in."
      });
    } catch (error) {
      console.error('Error marking ticket as used:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark ticket as used."
      });
    }
  };

  const undoMarkAsUsed = async (ticketId: string) => {
    try {
      // In a real app, revert the ticket status in the database
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the scan result to show ticket as not used
      setScanResult(prev => prev ? {
        ...prev,
        ticketData: prev.ticketData ? {
          ...prev.ticketData,
          used: false
        } : undefined
      } : null);
      
      toast({
        title: "Check-in undone",
        description: "The ticket status has been reset."
      });
    } catch (error) {
      console.error('Error undoing ticket status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to undo check-in."
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Scan Ticket QR Code</DialogTitle>
          <DialogDescription>
            Point your camera at the attendee's QR code to validate their ticket.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center">
          {scanning && !scanResult ? (
            <div className="relative w-full aspect-square max-w-sm mx-auto rounded-lg overflow-hidden bg-black">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-2 border-white/30 rounded-lg">
                <div className="absolute inset-0 border-2 border-white/60 m-12 rounded"></div>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          ) : scanResult ? (
            <div className="w-full p-4">
              <div className={`p-4 rounded-lg ${scanResult.valid ? 'bg-green-50' : 'bg-amber-50'} mb-4`}>
                <div className="flex items-center">
                  {scanResult.valid ? (
                    <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-amber-600 mr-3" />
                  )}
                  <div>
                    <h3 className={`font-medium ${scanResult.valid ? 'text-green-700' : 'text-amber-700'}`}>
                      {scanResult.valid ? 'Valid Ticket' : 'Invalid Ticket'}
                    </h3>
                    <p className="text-sm">{scanResult.message}</p>
                  </div>
                </div>
              </div>

              {scanResult.valid && scanResult.ticketData && (
                <div className="border rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-2">Ticket Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{scanResult.ticketData.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span>{scanResult.ticketData.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={scanResult.ticketData.used ? 'text-amber-600' : 'text-green-600'}>
                        {scanResult.ticketData.used ? 'Used' : 'Valid'}
                      </span>
                    </div>
                  </div>

                  {scanResult.ticketData.used ? (
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => undoMarkAsUsed(scanResult.ticketData!.id)}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Undo Check-in
                    </Button>
                  ) : (
                    <Button 
                      className="w-full mt-4 bg-green-600 hover:bg-green-700"
                      onClick={() => markTicketAsUsed(scanResult.ticketData!.id)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Used
                    </Button>
                  )}
                </div>
              )}

              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setScanResult(null);
                    startScanning();
                  }}
                >
                  Scan Again
                </Button>
                <Button 
                  variant="secondary"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="mb-4">Camera initializing or access denied.</p>
              <Button onClick={startScanning}>
                Start Scanning
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
