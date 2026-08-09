import Link from "next/link";
import {
  Leaf,
  Brain,
  CloudSun,
  ShieldCheck,
  Sprout,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "About Us | AI Smart Farming Assistant",
  description:
    "Learn about AI Smart Farming Assistant and our mission to empower farmers with Artificial Intelligence.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">

      {/* Hero */}
    
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <span className="inline-block bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            🌱 About Our Platform
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            Helping Farmers Grow Smarter with Artificial Intelligence
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-green-100 leading-8">
            AI Smart Farming Assistant is designed to make advanced agricultural
            knowledge available to every farmer through simple, practical and
            multilingual AI guidance.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
          >
            Back to Home
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>
      

      {/* Story */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why We Built This
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              Farmers make dozens of important decisions every season. Choosing
              the right crop, identifying diseases early, planning irrigation,
              checking weather conditions and finding fair market prices can
              directly affect their income.
            </p>

            <p className="text-gray-600 leading-8">
              Our goal is to simplify these decisions using Artificial
              Intelligence so that farmers receive clear, practical and reliable
              guidance in their own language.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h3 className="text-2xl font-bold text-green-700 mb-6">
              Our Vision
            </h3>

            <p className="text-gray-600 leading-8">
              We believe every farmer should have access to modern agricultural
              knowledge regardless of experience, location or language. By
              combining AI with real-world farming information, we aim to make
              agriculture more productive, sustainable and accessible.
            </p>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Platform Offers
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <FeatureCard
            icon={<Leaf size={28} />}
            title="Disease Detection"
            text="Upload a crop image and receive AI-assisted disease identification with treatment suggestions."
          />

          <FeatureCard
            icon={<CloudSun size={28} />}
            title="Weather Advisory"
            text="Receive farming advice based on live weather conditions and your crop."
          />

          <FeatureCard
            icon={<Brain size={28} />}
            title="Smart AI Assistant"
            text="Ask farming questions naturally and receive easy-to-understand guidance."
          />

          <FeatureCard
            icon={<Sprout size={28} />}
            title="Crop Recommendation"
            text="Discover suitable crops using weather, soil and seasonal information."
          />

          <FeatureCard
            icon={<ShieldCheck size={28} />}
            title="Government Schemes"
            text="Find useful agricultural schemes and farmer support programs."
          />

          <FeatureCard
            icon={<Leaf size={28} />}
            title="Market Intelligence"
            text="Understand current crop prices and make better selling decisions."
          />

        </div>

      </section>

      {/* Values */}

      <section className="bg-green-50 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-14">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <ValueCard
              title="Farmer First"
              text="Every feature is designed to solve real farming problems."
            />

            <ValueCard
              title="Simple"
              text="Easy to understand even for first-time smartphone users."
            />

            <ValueCard
              title="Accessible"
              text="Support for multiple Indian languages and voice interaction."
            />

            <ValueCard
              title="Reliable"
              text="AI-powered recommendations backed by practical agricultural knowledge."
            />

          </div>

        </div>

      </section>

      {/* Closing */}

      <section className="max-w-5xl mx-auto text-center px-6 py-20">

        <h2 className="text-4xl font-bold text-gray-900">
          Empowering Farmers Through Technology
        </h2>

        <p className="mt-6 text-gray-600 leading-8">
          Our mission is simple: make modern farming knowledge accessible,
          practical and useful for every farmer. We continue improving our AI
          system to support better farming decisions and stronger agricultural
          communities.
        </p>

      </section>

    </main>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow hover:shadow-xl transition">

      <div className="w-14 h-14 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="text-xl font-semibold mt-6">
        {title}
      </h3>

      <p className="text-gray-600 mt-4 leading-7">
        {text}
      </p>

    </div>
  );
}

function ValueCard({ title, text }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow">

      <h3 className="text-xl font-bold text-green-700">
        {title}
      </h3>

      <p className="text-gray-600 mt-4 leading-7">
        {text}
      </p>

    </div>
  );
}