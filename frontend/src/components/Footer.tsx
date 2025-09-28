import { Sprout, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-agricultural text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-white/20 rounded-full">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D22AQGj5t6Y0g1b0A/feedshare-shrink_800/B4DZjBQEZCH0Ak-/0/1755588873204?e=2147483647&v=beta&t=iXO-x02SRlPPdrUE6waOyOIvApyAKMorgawcmEuj0CY"
                  className="h-8 w-8 object-contain rounded-full bg-white"
                  alt="Nile Care Logo"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Nile Care AI Farm Advisory</h3>
              </div>
            </div>
            <p className="text-sm opacity-90 max-w-md leading-relaxed">
              Empowering farmers with AI-driven agricultural guidance. Get expert advice in multiple languages 
              to optimize your farming practices and increase productivity.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 opacity-80" />
                <span className="text-sm">info@niletech.co</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 opacity-80" />
                <span className="text-sm">
                  +251915137219
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 opacity-80" />
                <span className="text-sm">Harar, Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Languages</h4>
            <div className="space-y-2">
              <div className="text-sm opacity-90">🇺🇸 English</div>
              <div className="text-sm opacity-90">🇪🇹 አማርኛ (Amharic)</div>
              <div className="text-sm opacity-90">🇪🇹 Afaan Oromo</div>
              <div className="text-sm opacity-90">🇪🇹 ትግርኛ (Tigrigna)</div>
              <div className="text-sm opacity-90">🇪🇹 Soomaali (Somali)</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80">
            © 2025 Nile Care AI Farm Advisory. All rights reserved. Powered by AI for sustainable agriculture.
          </p>
        </div>
      </div>
    </footer>
  );
}