import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Stethoscope,
  CloudSun,
  Sprout,
  Droplets,
  Bug,
  TrendingUp,
  Landmark,
  User,
  ChevronDown,
  Mail,
} from "lucide-react";

export const metadata = {
  title: "Help Center | AI Smart Farming Assistant",
  description: "Find answers, tutorials and support.",
};

const helpCards = [
  {
    icon: <Stethoscope size={28} />,
    title: "Disease Detection",
    desc: "Upload crop images and identify plant diseases."
  },
  {
    icon: <CloudSun size={28} />,
    title: "Weather Advisory",
    desc: "Understand weather-based farming recommendations."
  },
  {
    icon: <Sprout size={28} />,
    title: "Crop Recommendation",
    desc: "Find suitable crops for your farm."
  },
  {
    icon: <Droplets size={28} />,
    title: "Irrigation",
    desc: "Know when and how much to irrigate."
  },
  {
    icon: <Bug size={28} />,
    title: "Pest Management",
    desc: "Protect crops from insects and pests."
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Market Intelligence",
    desc: "Understand market trends and prices."
  },
  {
    icon: <Landmark size={28} />,
    title: "Government Schemes",
    desc: "Discover schemes you may be eligible for."
  },
  {
    icon: <User size={28} />,
    title: "Account",
    desc: "Authentication, languages and profile."
  }
];

const faqs = [
  {
    q: "How do I detect a crop disease?",
    a: "Upload a clear image of the affected leaf, fruit or stem. The AI will identify the most likely disease and provide treatment recommendations."
  },
  {
    q: "Why is my location required?",
    a: "Location is used only for weather-based recommendations and local farming guidance."
  },
  {
    q: "Can I use the app without logging in?",
    a: "Some features may work without signing in, but logging in allows you to save history and personalize your experience."
  },
  {
    q: "Which languages are supported?",
    a: "English, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati and Kannada."
  },
  {
    q: "Is the AI always correct?",
    a: "The AI provides the best recommendation based on available information, but important farming decisions should also consider local conditions and expert advice."
  },
  {
    q: "What image gives the best disease prediction?",
    a: "Capture a clear, well-lit photo of the affected plant part and avoid blurry or distant images."
  }
];

export default function HelpCenterPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">

      {/* Hero */}

      <section className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-green-100 hover:text-white mb-8"
          >
            <ArrowLeft size={18}/>
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-6xl font-bold">
            Help Center
          </h1>

          <p className="mt-6 text-lg max-w-2xl text-green-100 leading-8">
            Find answers, tutorials and guidance to make the most of AI Smart Farming Assistant.
          </p>

          <div className="relative mt-10 max-w-2xl border border-[#D9E6DE] rounded-2xl">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2"
              size={20}
            />

            <input
              placeholder="Search for help..."
              className="w-full rounded-2xl py-4 pl-14 pr-5 placeholder:text-[#929392] outline-none"
            />
          </div>

        </div>

      </section>

      {/* Help Categories */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-3xl font-bold text-center mb-12">
          Browse Help Topics
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {helpCards.map((item) => (

            <div
              key={item.title}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6"
            >

              <div className="w-14 h-14 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                {item.icon}
              </div>

              <h3 className="font-bold text-lg mt-5">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-3 text-sm leading-7">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* FAQ */}

      <section className="bg-green-50 py-20">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5">

            {faqs.map((faq) => (

              <details
                key={faq.q}
                className="bg-white rounded-2xl shadow group"
              >

                <summary className="cursor-pointer list-none flex items-center justify-between p-6 font-semibold">

                  {faq.q}

                  <ChevronDown className="group-open:rotate-180 transition"/>

                </summary>

                <p className="px-6 pb-6 text-gray-600 leading-8">
                  {faq.a}
                </p>

              </details>

            ))}

          </div>

        </div>

      </section>

      {/* Still Need Help */}

      <section className="py-20">

        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

            <Mail
              className="mx-auto text-green-700"
              size={50}
            />

            <h2 className="text-3xl font-bold mt-6">
              Still Need Help?
            </h2>

            <p className="mt-5 text-gray-600 leading-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is always ready to help you.
            </p>

            <Link
              href="/components/information/contact-us"
              className="inline-flex mt-8 bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800 transition"
            >
              Contact Support
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}