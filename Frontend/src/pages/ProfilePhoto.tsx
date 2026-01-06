import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, Trash2, User } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function ProfilePhoto() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image under 5MB.",
          variant: "destructive",
        });
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          setPhotoUrl(reader.result as string);
          setIsUploading(false);
          toast({
            title: "Photo Uploaded",
            description: "Your profile photo has been updated.",
          });
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setPhotoUrl(null);
    toast({
      title: "Photo Removed",
      description: "Your profile photo has been deleted.",
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="page-container">
      <PageHeader title="Profile Photo" showBack />

      <div className="content-container">
        <div className="flex flex-col items-center py-8">
          {/* Photo Preview */}
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 bg-muted flex items-center justify-center">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-muted-foreground" />
              )}
            </div>
            <button
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-lg"
            >
              <Camera className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-1">Pratham</h3>
          <p className="text-sm text-muted-foreground mb-6">pratham@livigo.com</p>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Action Buttons */}
          <div className="w-full space-y-3 max-w-xs">
            <Button
              variant="gradient"
              size="lg"
              className="w-full"
              onClick={triggerFileInput}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  {photoUrl ? "Change Photo" : "Upload Photo"}
                </>
              )}
            </Button>

            {photoUrl && (
              <Button
                variant="destructive"
                size="lg"
                className="w-full"
                onClick={handleDeletePhoto}
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete Photo
              </Button>
            )}
          </div>

          {/* Guidelines */}
          <div className="mt-8 text-sm text-muted-foreground text-center space-y-1">
            <p>• Supported formats: JPG, PNG, GIF</p>
            <p>• Maximum file size: 5MB</p>
            <p>• Recommended size: 200x200 pixels</p>
          </div>
        </div>
      </div>
    </div>
  );
}
