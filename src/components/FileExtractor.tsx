import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Archive, Download, Check, AlertCircle } from 'lucide-react';

interface ExtractedFile {
  name: string;
  size: number;
  type: string;
  content: string | ArrayBuffer;
}

export const FileExtractor = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
    setExtractedFiles([]);
    setProgress(0);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
    setExtractedFiles([]);
    setProgress(0);
  };

  const extractFiles = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to extract",
        variant: "destructive",
      });
      return;
    }

    setIsExtracting(true);
    setProgress(0);

    try {
      const extracted: ExtractedFile[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Simulate extraction process
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const reader = new FileReader();
        const content = await new Promise<string | ArrayBuffer>((resolve) => {
          reader.onload = () => resolve(reader.result || '');
          if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.json')) {
            reader.readAsText(file);
          } else {
            reader.readAsArrayBuffer(file);
          }
        });

        extracted.push({
          name: file.name,
          size: file.size,
          type: file.type || 'unknown',
          content
        });

        setProgress(((i + 1) / files.length) * 100);
      }

      setExtractedFiles(extracted);
      
      toast({
        title: "Extraction Complete!",
        description: `Successfully extracted ${extracted.length} files`,
      });
    } catch (error) {
      toast({
        title: "Extraction Failed",
        description: "An error occurred during file extraction",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const downloadFile = (file: ExtractedFile) => {
    const blob = new Blob([file.content], { type: file.type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Area */}
      <Card className="p-8 transition-smooth hover:shadow-soft">
        <div
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center transition-smooth hover:border-primary/50 hover:bg-primary/5"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Drop files here or click to browse</h3>
              <p className="text-muted-foreground">
                Select files to extract and manage through CareHub Friend
              </p>
            </div>
            <Button 
              variant="hero" 
              onClick={() => fileInputRef.current?.click()}
              className="mt-4"
            >
              Choose Files
            </Button>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          accept="*/*"
        />
      </Card>

      {/* Selected Files */}
      {files.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Archive className="h-5 w-5 text-primary" />
              Selected Files ({files.length})
            </h3>
            <Button 
              variant="extract" 
              onClick={extractFiles}
              disabled={isExtracting}
              className="min-w-32"
            >
              {isExtracting ? 'Extracting...' : 'Extract Files'}
            </Button>
          </div>
          
          {isExtracting && (
            <div className="mb-4">
              <Progress value={progress} className="mb-2" />
              <p className="text-sm text-muted-foreground text-center">
                Extracting files... {Math.round(progress)}% complete
              </p>
            </div>
          )}

          <div className="space-y-2">
            {files.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Archive className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                {extractedFiles.find(f => f.name === file.name) && (
                  <Check className="h-4 w-4 text-accent" />
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Extracted Files */}
      {extractedFiles.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Check className="h-5 w-5 text-accent" />
            Extracted Files ({extractedFiles.length})
          </h3>
          <div className="space-y-2">
            {extractedFiles.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-accent/10 rounded-lg hover:bg-accent/20 transition-smooth"
              >
                <div className="flex items-center gap-3">
                  <Download className="h-4 w-4 text-accent" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="care" 
                  size="sm"
                  onClick={() => downloadFile(file)}
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};