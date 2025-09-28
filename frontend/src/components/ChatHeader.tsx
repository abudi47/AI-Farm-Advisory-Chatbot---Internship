import { Sprout, Home, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { useTranslations } from "@/hooks/useTranslations";

interface ChatHeaderProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

export function ChatHeader({ language, onLanguageChange }: ChatHeaderProps) {
  const navigate = useNavigate();
  const { t, availableLanguages } = useTranslations();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-gradient-agricultural text-primary-foreground shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleHomeClick}>
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
            <Select value={language} onValueChange={onLanguageChange}>
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
    // <header className="bg-gradient-agricultural text-primary-foreground shadow-soft">
    //   <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
    //     <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">
    //       <button 
    //         onClick={handleHomeClick}
    //         className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity cursor-pointer group"
    //       >
    //         <div className="p-1.5 sm:p-2 bg-white/20 rounded-full flex items-center justify-center shadow-md border border-white/30 group-hover:bg-white/30 transition-colors">
    //           <img
    //             src="https://media.licdn.com/dms/image/v2/D4D22AQGj5t6Y0g1b0A/feedshare-shrink_800/B4DZjBQEZCH0Ak-/0/1755588873204?e=2147483647&v=beta&t=iXO-x02SRlPPdrUE6waOyOIvApyAKMorgawcmEuj0CY"
    //             className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-full bg-white"
    //             alt="Nile Care Logo"
    //             style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
    //           />
    //         </div>
    //         <div className="text-left">
    //           <h1 className="text-lg sm:text-2xl font-bold group-hover:text-white/90 transition-colors">
    //             {t.title}
    //           </h1>
    //           <p className="text-xs sm:text-sm opacity-90 group-hover:opacity-75 transition-opacity">
    //             {t.subtitle}
    //           </p>
    //         </div>
    //       </button>

    //       <div className="flex items-center gap-2 sm:gap-4">
    //         <Button
    //           variant="ghost"
    //           size="sm"
    //           onClick={handleHomeClick}
    //           className="bg-white/10 hover:bg-white/20 text-primary-foreground border-white/20 hover:border-white/30 transition-all sm:block hidden"
    //         >
    //           <Home className="h-4 w-4 sm:mr-2" />
    //           <span className="hidden sm:inline">{t.home}</span>
    //         </Button>
    //         <Select value={language} onValueChange={onLanguageChange}>
    //           <SelectTrigger className="w-[50px] sm:w-[180px] bg-white/10 border-white/20 text-white">
    //               <div className="flex items-center space-x-2">
    //                 <Languages className="h-4 w-4" />
    //                 <div className="hidden sm:block">
    //                   <SelectValue />
    //                 </div>
    //               </div>
    //             </SelectTrigger>
    //           <SelectContent>
    //             {availableLanguages.map((lang) => (
    //               <SelectItem key={lang.code} value={lang.code}>
    //                 {lang.name}
    //               </SelectItem>
    //             ))}
    //           </SelectContent>
    //         </Select>
    //       </div>
    //     </div>
    //   </div>
    // </header>
  );
}
