import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | AI Smart Farming Assistant",
  description:
    "Privacy Policy for AI Smart Farming Assistant.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-green-100 hover:text-white mb-8"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                Privacy Policy
              </h1>
              <p className="text-green-100 mt-2">
                Last Updated: July 2026
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Content */}

      <section className="max-w-5xl mx-auto px-6 py-16">

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 space-y-10">

          <PolicySection
            title="1. Introduction"
            text="AI Smart Farming Assistant respects your privacy. This Privacy Policy explains what information we collect, how we use it, and how we protect it while providing AI-powered agricultural assistance."
          />

          <PolicySection
            title="2. Information We Collect"
            text="Depending on the features you use, we may collect information such as your account details, crop images uploaded for disease detection, approximate location (only when required for weather-based recommendations), preferred language, and the questions you ask our AI assistant."
          />

          <PolicySection
            title="3. How We Use Your Information"
            text="Your information is used only to provide services such as disease detection, weather-based advice, crop recommendations, irrigation guidance, pest management, market information, and government scheme suggestions."
          />

          <PolicySection
            title="4. Crop Images"
            text="Crop images uploaded by you are processed only to identify plant diseases and generate recommendations. These images are not used for purposes unrelated to improving the requested service."
          />

          <PolicySection
            title="5. Location Information"
            text="If you allow location access, it is used only to retrieve local weather information and generate location-specific farming advice."
          />

          <PolicySection
            title="6. AI Recommendations"
            text="Our recommendations are generated using Artificial Intelligence together with agricultural information. While we strive for accuracy, AI-generated advice should be considered as guidance and may not always be correct for every farming situation."
          />

          <PolicySection
            title="7. Data Security"
            text="We take reasonable technical and organizational measures to protect your information from unauthorized access, misuse, or disclosure."
          />

          <PolicySection
            title="8. Third-Party Services"
            text="Some features rely on trusted third-party services such as weather providers, authentication services, or AI models. These services may process limited information necessary to provide their functionality."
          />

          <PolicySection
            title="9. Your Choices"
            text="You may choose not to provide optional information such as location, although some features may become unavailable or provide less personalized recommendations."
          />

          <PolicySection
            title="10. Contact Us"
            text="If you have questions regarding this Privacy Policy or your data, please contact us through the Contact page available within the application."
          />

        </div>

      </section>

    </main>
  );
}

function PolicySection({ title, text }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        {title}
      </h2>

      <p className="text-gray-600 leading-8">
        {text}
      </p>
    </section>
  );
}