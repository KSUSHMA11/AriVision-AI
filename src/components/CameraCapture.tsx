import { useEffect, useRef, useState } from "react";
import { Camera, X, RefreshCw } from "lucide-react";

interface CameraCaptureProps {
    onCapture: (imageSrc: string) => void;
    onClose: () => void;
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        let currentStream: MediaStream | null = null;

        async function startCamera() {
            try {
                if (currentStream) {
                    currentStream.getTracks().forEach((track) => track.stop());
                }

                const newStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode }
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = newStream;
                }
                setStream(newStream);
                currentStream = newStream;
                setError("");
            } catch (err: any) {
                setError("Could not access camera. Please check camera permissions in your browser.");
                console.error("Camera access error:", err);
            }
        }

        startCamera();

        return () => {
            if (currentStream) {
                currentStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [facingMode]);

    const handleCapture = () => {
        if (!videoRef.current) return;

        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            if (facingMode === "user") {
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
            }
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
            onCapture(dataUrl);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black">
            {/* Top bar */}
            <div className="flex items-center justify-between p-4 z-10 bg-black/40">
                <button onClick={onClose} className="p-2 text-white/80 hover:text-white bg-black/20 rounded-full backdrop-blur-md transition-colors">
                    <X className="w-6 h-6" />
                </button>
                <button onClick={() => setFacingMode(f => f === "environment" ? "user" : "environment")} className="p-2 text-white/80 hover:text-white bg-black/20 rounded-full backdrop-blur-md transition-colors">
                    <RefreshCw className="w-6 h-6" />
                </button>
            </div>

            {/* Video View */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                {error ? (
                    <div className="text-white text-center p-4">
                        <p className="text-red-400 mb-2 font-medium">{error}</p>
                        <button onClick={onClose} className="border border-white/20 rounded-lg px-6 py-2 hover:bg-white/10 mt-4 transition-colors">
                            Back to App
                        </button>
                    </div>
                ) : (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className={`absolute inset-0 w-full h-full object-cover ${facingMode === "user" ? "scale-x-[-1]" : ""}`}
                        style={{ objectFit: 'cover' }}
                    />
                )}
            </div>

            {/* Bottom Controls */}
            <div className="p-8 pb-12 flex justify-center items-center bg-black/80 z-10">
                <button
                    onClick={handleCapture}
                    disabled={!!error}
                    className="w-20 h-20 rounded-full border-4 border-white/80 flex items-center justify-center transition-transform active:scale-95 disabled:opacity-50"
                >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                        <Camera className="w-8 h-8 text-black" />
                    </div>
                </button>
            </div>
        </div>
    );
}
