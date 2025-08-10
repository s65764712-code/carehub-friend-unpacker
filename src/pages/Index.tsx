import { FileExtractor } from '@/components/FileExtractor';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Zap, Users } from 'lucide-react';
import heroImage from '@/assets/hero-extraction.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="relative">
            <img 
              src={heroImage} 
              alt="CareHub Friend File Extraction"
              className="w-full max-w-2xl mx-auto rounded-xl shadow-glow mb-8 animate-float"
            />
            <div className="absolute inset-0 bg-gradient-hero/20 rounded-xl"></div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            CareHub Friend Unpacker
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Safely extract and manage files with our care-focused utility. 
            Built for healthcare professionals and caregivers who need reliable file processing.
          </p>
          
          <div className="flex justify-center gap-4 mb-16">
            <Button variant="extract" size="lg">
              Start Extracting
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose CareHub Friend?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-soft transition-smooth">
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Processing</h3>
              <p className="text-muted-foreground">
                Your files are processed locally with enterprise-grade security standards
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-soft transition-smooth">
              <div className="p-4 bg-accent/10 rounded-full w-fit mx-auto mb-4">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Extract multiple files simultaneously with optimized processing
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-soft transition-smooth">
              <div className="p-4 bg-primary-glow/10 rounded-full w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-glow" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Care-Focused</h3>
              <p className="text-muted-foreground">
                Designed specifically for healthcare and care management workflows
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* File Extractor */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Extract Your Files</h2>
            <p className="text-lg text-muted-foreground">
              Upload your files and let CareHub Friend handle the extraction process
            </p>
          </div>
          <FileExtractor />
        </div>
      </section>
    </div>
  );
};

export default Index;
