import Link from "next/link";
import {
  Target,
  Users,
  Sprout,
  Globe,
  HeartHandshake,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "Our Mission | AI Smart Farming Assistant",
  description:
    "Our mission is to empower farmers with AI-driven agricultural guidance.",
};

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-green-100 hover:text-white mb-8"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">
            Our Mission
          </h1>

          <p className="mt-6 text-lg text-green-100 max-w-2xl leading-8">
            To make reliable agricultural knowledge accessible to every farmer
            through simple, multilingual, and AI-powered technology.
          </p>

        </div>

      </section>

      {/* Mission Statement */}

      <section className="max-w-5xl mx-auto px-6 py-20 text-center">

        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Why We Exist
        </h2>

        <p className="text-lg text-gray-600 leading-9">
          Farming involves countless decisions every day. Our mission is to help
          farmers make these decisions with confidence by providing practical,
          easy-to-understand, and personalized AI guidance. Whether it is
          identifying crop diseases, understanding weather conditions, selecting
          suitable crops, or accessing government schemes, we strive to simplify
          technology so that every farmer can benefit from it.
        </p>

      </section>

      {/* Goals */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold text-center mb-12">
          Our Goals
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <GoalCard
            icon={<Target size={28} />}
            title="Better Decisions"
            text="Help farmers make informed decisions using AI-powered recommendations."
          />

          <GoalCard
            icon={<Sprout size={28} />}
            title="Higher Productivity"
            text="Reduce crop losses and improve farm productivity through timely guidance."
          />

          <GoalCard
            icon={<Users size={28} />}
            title="Accessible to Everyone"
            text="Build an application that even first-time smartphone users can operate."
          />

          <GoalCard
            icon={<Globe size={28} />}
            title="Regional Languages"
            text="Provide support in multiple Indian languages for wider accessibility."
          />

          <GoalCard
            icon={<HeartHandshake size={28} />}
            title="Farmer-Centric Design"
            text="Every feature is built around real farming challenges and everyday needs."
          />

          <GoalCard
            icon={<Target size={28} />}
            title="Sustainable Agriculture"
            text="Encourage smarter farming practices that improve long-term agricultural sustainability."
          />

        </div>

      </section>

      {/* Vision */}

      <section className="bg-green-50 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="bg-white rounded-3xl shadow-lg p-10">

            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Our Vision
            </h2>

            <p className="text-gray-600 leading-8">
              We envision a future where every farmer has instant access to
              intelligent agricultural assistance directly from their mobile
              phone. By combining artificial intelligence, weather information,
              crop knowledge, and local language support, we aim to bridge the
              gap between modern technology and traditional farming.
            </p>

          </div>

        </div>

      </section>

      {/* Closing */}

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">

        <h2 className="text-4xl font-bold text-gray-900">
          Growing Together
        </h2>

        <p className="mt-6 text-gray-600 leading-8">
          Our mission goes beyond building software. We aspire to become a
          trusted digital companion that helps farmers make smarter decisions,
          improve their livelihoods, and contribute to a stronger and more
          sustainable agricultural future.
        </p>

      </section>

    </main>
  );
}

function GoalCard({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl shadow p-8 hover:shadow-xl transition">

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