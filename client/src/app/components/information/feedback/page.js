"use client"
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  MessageSquareHeart,
  Send,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import { sendFeedback } from "@/app/services/api";


export default function FeedbackPage() {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [pending, setPending] = useState(false)
  const [feedbackData, setFeedbackData] = useState({
    liked: "",
    improve: "",
    feature: "",
  })

  const labels = [
    "",
    "😞 Poor",
    "😐 Fair",
    "🙂 Good",
    "😍 Great",
    "🤩 Excellent",
  ];

  const handleFeedbackSubmit = async (e) => {

    e.preventDefault();

    const data = {
      ...feedbackData,
      rating
    }

    console.log(data)
    setPending(true)

    const res = await sendFeedback(data)

    if (res.success) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Thanks for your feedback! 🌱",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Unable to Submit",
        text: res.user_warning ? res.msg : "Something went wrong. Please try again.",
        showConfirmButton: false,
        timer: 1000
      });
    }

    setPending(false)
    setFeedbackData({ liked: "", improve: "", feature: "" })
    setRating(0)
    setHover(0)
  }


  return (



    <main className="min-h-screen bg-[#FAFAF7]">


      {/* Hero */}

      <section className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white">

        <div className="max-w-6xl mx-auto px-6 py-20">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-green-100 hover:text-white mb-8"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>


          <div className="flex items-center gap-4">


            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">

              <MessageSquareHeart size={30} />

            </div>

            <div>

              <h1 className="text-4xl md:text-5xl font-bold">
                Send Feedback
              </h1>

              <p className="mt-3 text-green-100 max-w-xl">
                Your feedback helps us build a smarter and more useful farming
                assistant for everyone.
              </p>

            </div>

          </div>
        </div>

      </section>


      {/* Feedback Form */}

      <section className="max-w-5xl mx-auto px-6 py-20">


        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">


          <h2 className="text-3xl font-bold text-gray-900">
            Share Your Experience
          </h2>

          <p className="mt-3 text-gray-600">
            Tell us what you like and what we can improve.
          </p>


          <form
            onSubmit={handleFeedbackSubmit}
            className="mt-10 space-y-8">

            {/* Rating */}

            <div>


              <label className="text-sm font-semibold text-gray-700">
                How was your experience?
              </label>


              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((id) => (
                  <button
                    key={id}
                    type="button"
                    onMouseEnter={() => setHover(id)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(id)}
                    className="transition-transform hover:scale-125 active:scale-95"
                  >
                    <Star
                      size={34}
                      fill={id <= (hover || rating) ? "#FFD43B" : "none"}
                      className={`transition-all duration-300 ${id <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                        }`}
                    />
                  </button>
                ))}
              </div>

              <p className="mt-3 font-medium text-green-700">
                {labels[hover || rating]}
              </p>

            </div>


            {/* What liked */}

            <div>


              <label className="text-sm font-semibold text-gray-700">
                What did you like?
              </label>


              <textarea
                onChange={(e) => setFeedbackData(prev => ({ ...prev, liked: e.target.value }))}
                rows="4"
                placeholder="Tell us what worked well..."
                className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-3 resize-none outline-none focus:border-green-600"
              />

            </div>

            {/* Improvements */}

            <div>


              <label className="text-sm font-semibold text-gray-700">
                What should we improve?
              </label>


              <textarea
                onChange={(e) => setFeedbackData(prev => ({ ...prev, improve: e.target.value }))}
                rows="4"
                placeholder="Share your suggestions..."
                className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-3 resize-none outline-none focus:border-green-600"
              />

            </div>

            {/* Feature Request */}

            <div>


              <label className="text-sm font-semibold text-gray-700">
                Any new feature ideas?
              </label>


              <textarea
                onChange={(e) => setFeedbackData(prev => ({ ...prev, feature: e.target.value }))}
                rows="3"
                placeholder="Example: Add voice assistant, new crops, new languages..."
                className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-3 resize-none outline-none focus:border-green-600"
              />

            </div>

            <button
              disabled={pending}
              className="w-full bg-green-700 text-white py-3 rounded-xl 
              cursor-pointer
              font-semibold flex items-center justify-center gap-2 hover:bg-green-800 transition"
            >

              {pending ? <Loader2 className="size-5 animate-spin" /> : "Submit Feedback"}

              {pending ? null : <Send size={18} />}

            </button>
          </form>


        </div>
      </section>

      {/* Bottom Message */}

      <section className="bg-green-50 py-16">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-gray-900">
            Every Suggestion Matters 🌱
          </h2>

          <p className="mt-5 text-gray-600 leading-8">

            Farmers are at the center of our mission. Your feedback helps us
            create technology that solves real agricultural problems.

          </p>

        </div>

      </section>

    </main>

  );
}