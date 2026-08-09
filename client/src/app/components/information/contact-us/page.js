"use client"
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Clock,
  MessageCircle,
  Send,
  MapPin,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { sendQuery } from "@/app/services/api";
import Swal from "sweetalert2";

export default function ContactPage() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [msg, setMsg] = useState("")
  const[pending,setPending]=useState(false)
 
  const handleContactSubmit = async () => {

    setPending(true)
    const res = await sendQuery({ name, email, subject, msg })

    if (res.success) {
      Swal.fire({
        text: res.msg,
        icon: "success"
      })
    }
    else {
      Swal.fire({
        text: res.user_warning ? res.msg : "Something went wrong..",
        icon: "error"
      })
    }
    setPending(false)
    setName("")
    setEmail("")
    setSubject("")
    setMsg("")
 
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7]">

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-green-100 hover:text-white mb-8"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>


          <h1 className="text-4xl md:text-6xl font-bold">
            Contact Us
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-green-100 leading-8">
            Have a question, suggestion, or need help using AI Smart Farming
            Assistant? Our team is here to support you.
          </p>

        </div>

      </section>


      {/* Contact Section */}

      <section className="max-w-7xl mx-auto px-6 py-20">


        <div className="grid lg:grid-cols-2 gap-12">


          {/* Left Side */}

          <div>


            <h2 className="text-3xl font-bold text-gray-900">
              Get In Touch
            </h2>


            <p className="mt-4 text-gray-600 leading-8">
              We value your questions, feedback, and suggestions. Your inputs
              help us improve the platform and make it more useful for farmers.
            </p>



            <div className="mt-10 space-y-5">


              <ContactCard
                icon={<Mail size={24} />}
                title="Email Support"
                text="support@aismartfarming.com"
              />


              <ContactCard
                icon={<Clock size={24} />}
                title="Support Hours"
                text="Monday - Saturday | 9:00 AM - 6:00 PM IST"
              />


              <ContactCard
                icon={<MessageCircle size={24} />}
                title="Response Time"
                text="We usually respond within 24 hours."
              />


              <ContactCard
                icon={<MapPin size={24} />}
                title="Our Focus"
                text="Building AI solutions to support farmers across India."
              />


            </div>


          </div>



          {/* Form */}

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">


            <h2 className="text-2xl font-bold text-gray-900">
              Send Us A Message
            </h2>


            <p className="mt-3 text-gray-600">
              Fill the form and our team will get back to you.
            </p>



            <form
            onSubmit={(e)=>{e.preventDefault();handleContactSubmit();}}
             className="mt-8 space-y-5">


              <div>

                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>

                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                  placeholder="Enter your name"
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                />

              </div>

              <div>

                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  required
                  placeholder="Enter your email"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                />

              </div>


              <div>

                <label className="text-sm font-medium text-gray-700">
                  Subject
                </label>


                <input
                  onChange={(e) => setSubject(e.target.value)}
                  type="text"
                  value={subject}
                  placeholder="How can we help?"
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                />

              </div>


              <div>

                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>


                <textarea
                  onChange={(e) => setMsg(e.target.value)}
                  rows="5"
                  value={msg}
                  placeholder="Write your message..."
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600 resize-none"
                />

              </div>

              <button
               disabled={pending}
                className="w-full flex items-center justify-center gap-2
                 bg-green-700 text-white py-3 rounded-xl font-semibold
                  hover:bg-green-800 transition cursor-pointer active:scale-98"
              >

               {pending ? <Loader2 className="size-5 animate-spin"/>: "Send Message"}

                {pending ? null : <Send size={18} />}

              </button>

            </form>

          </div>

        </div>
      </section>


      {/* Bottom Section */}


      <section className="bg-green-50 py-16">


        <div className="max-w-5xl mx-auto px-6 text-center">


          <h2 className="text-3xl font-bold text-gray-900">
            Building Better Farming Together
          </h2>


          <p className="mt-5 text-gray-600 leading-8">
            Every question, suggestion, and feedback helps us improve AI Smart
            Farming Assistant and create better solutions for farmers.
          </p>


        </div>


      </section>


    </main>
  );
}


function ContactCard({ icon, title, text }) {

  return (

    <div className="flex gap-5 bg-white rounded-2xl p-5 shadow-sm">


      <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">

        {icon}

      </div>



      <div>

        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>


        <p className="mt-1 text-gray-600 text-sm">
          {text}
        </p>


      </div>


    </div>

  );

}