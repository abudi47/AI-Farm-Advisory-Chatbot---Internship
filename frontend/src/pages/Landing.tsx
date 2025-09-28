import { Button } from "@/components/ui/button";
import { Sprout, MessageCircle, Globe, BookOpen, Users, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { useTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Landing = () => {
  const navigate = useNavigate();
  const { t, currentLanguage, changeLanguage, availableLanguages } = useTranslations();

  const handleGetStarted = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      {/* Header */}
      <header className="bg-gradient-agricultural text-primary-foreground shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="p-2 bg-white/20 rounded-full flex items-center justify-center shadow-md border border-white/30">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D22AQGj5t6Y0g1b0A/feedshare-shrink_800/B4DZjBQEZCH0Ak-/0/1755588873204?e=2147483647&v=beta&t=iXO-x02SRlPPdrUE6waOyOIvApyAKMorgawcmEuj0CY"
                  className="h-10 w-10 object-contain rounded-full bg-white"
                  alt="Nile Care Logo"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                />
              </div>
              <div className="max-w-[180px] sm:max-w-none overflow-hidden">
                <h1 className="text-2xl font-bold text-nowrap">{t.title}</h1>
                <p className="text-sm opacity-90 text-nowrap">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={currentLanguage} onValueChange={changeLanguage}>
                <SelectTrigger className="w-[50px] sm:w-[180px] bg-white/10 border-white/20 text-white">
                  <div className="flex items-center space-x-2">
                    <Languages className="h-4 w-4" />
                    <div className="hidden sm:block">
                      <SelectValue />
                    </div>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="mb-8">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                {t.heroTitle}
                <span className="text-primary block mt-2">{t.heroHighlight}</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t.heroDescription}
              </p>
            </div>
            
            <div className="mb-12">
              <Button 
                onClick={handleGetStarted} 
                size="lg" 
                className="text-lg px-8 py-6 h-auto shadow-elegant hover:shadow-glow transition-all duration-300"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t.getStarted}
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-primary/10 rounded-full inline-block mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t.multiLanguageTitle}</h3>
                <p className="text-muted-foreground">
                  {t.multiLanguageDescription}
                </p>
              </div>

              <div className="p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-primary/10 rounded-full inline-block mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t.expertKnowledgeTitle}</h3>
                <p className="text-muted-foreground">
                  {t.expertKnowledgeDescription}
                </p>
              </div>

              <div className="p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-primary/10 rounded-full inline-block mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t.assistanceTitle}</h3>
                <p className="text-muted-foreground">
                  {t.assistanceDescription}
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20 p-8 bg-primary/5 rounded-lg border">
              <h3 className="text-2xl font-bold mb-4 text-foreground">{t.ctaTitle}</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t.ctaDescription}
              </p>
              <Button 
                onClick={handleGetStarted} 
                size="lg"
                className="shadow-elegant hover:shadow-glow transition-all duration-300"
              >
                {t.startChatting}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;