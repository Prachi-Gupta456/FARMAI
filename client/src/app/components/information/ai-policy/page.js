import Link from "next/link";
import { ArrowLeft, Bot } from "lucide-react";

export const metadata = {
    title: "AI Usage Policy | AI Smart Farming Assistant",
    description:
        "Understand how Artificial Intelligence is used within AI Smart Farming Assistant.",
}


function Policy({ title, text }) {
    return (
        <section>
            <h2 className="text-2xl font-bold text-green-700 mb-4">
                {title}
            </h2>

            <p className="text-gray-600 leading-8">
                {text}
            </p>
        </section>
    )
}

export default function AIUsagePolicyPage() {
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
                            <Bot size={28} />
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold">
                                AI Usage Policy
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

                    <Policy
                        title="1. Purpose of AI"
                        text="Artificial Intelligence is used to assist farmers by providing practical recommendations related to crop diseases, weather, irrigation, fertilizers, pests, market information, crop selection, and government schemes."
                    />

                    <Policy
                        title="2. AI is an Assistant"
                        text="The application is designed to support decision-making, not replace a farmer's experience, local agricultural experts, or official government advisories."
                    />

                    <Policy
                        title="3. Disease Detection"
                        text="Disease predictions depend on the quality of uploaded crop images. Clear and well-lit images generally lead to better results. The AI provides the most likely prediction based on the available information."
                    />

                    <Policy
                        title="4. Weather-Based Advice"
                        text="Weather recommendations are generated using current weather information whenever available. If weather data cannot be retrieved, the AI provides general farming guidance instead."
                    />

                    <Policy
                        title="5. Personalized Recommendations"
                        text="Recommendations become more relevant when users provide information such as crop type, season, soil details, previous crop, farm size, or irrigation source. If some information is unavailable, the AI makes reasonable assumptions based on the question."
                    />

                    <Policy
                        title="6. Accuracy"
                        text="While every effort is made to provide useful recommendations, AI-generated responses may occasionally be incomplete or inaccurate. Users should verify important farming decisions before implementation."
                    />

                    <Policy
                        title="7. Continuous Improvement"
                        text="The application is regularly improved to enhance recommendation quality, support additional crops, improve multilingual responses, and expand farming knowledge."
                    />

                    <Policy
                        title="8. Responsible Use"
                        text="Users should use the platform responsibly and avoid relying solely on AI for decisions involving significant financial investment or safety risks."
                    />

                </div>

            </section>

        </main>
    )
}
