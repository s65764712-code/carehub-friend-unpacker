import { Heart, FileText } from 'lucide-react';

export const Header = () => {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CareHub Friend</h1>
              <p className="text-sm text-muted-foreground">File Extraction Utility</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary animate-pulse-glow" />
            <span className="text-sm font-medium text-primary">v2.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};