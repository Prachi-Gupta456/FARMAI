"use client"
import Link from "next/link";
import {
  ArrowLeft,
  Bug,
  Upload,
  Send,
  Loader2,
  X,
} from "lucide-react";
import { useState } from "react";
import { reportIssue } from "@/app/services/api";
import Swal from "sweetalert2";



export default function ReportIssuePage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [issueType, setIssueType] = useState("")
  const [desc, setDesc] = useState("")
  const [device, setDevice] = useState("")
  const [browser, setBrowser] = useState("")
  const [pending, setPending] = useState(false)
  const [image, setImage] = useState(null)

  const handleReportIssue = async (e) => {

    e.preventDefault();
    setPending(true)

    const form = new FormData()

    form.append("name", name)
    form.append("email", email)
    form.append("issueType", issueType)
    form.append("description", desc)
    if (image) form.append("image", image)
    form.append("device", device)
    form.append("browser", browser)

    const res = await reportIssue(form)

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
    setBrowser("")
    setDesc("")
    setDevice("")
    setIssueType("")
    setImage(null)
  }


  return (

    <main className="min-h-screen bg-[#FAFAF7]">


      {/* Hero Section*/}

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
              <Bug size={30} />
            </div>


            <div>

              <h1 className="text-4xl md:text-5xl font-bold">
                Report an Issue
              </h1>


              <p className="mt-3 text-green-100 max-w-xl">
                Found a problem? Help us improve the application by reporting
                bugs and technical issues.
              </p>

            </div>


          </div>


        </div>

      </section>



      {/* Form */}


      <section className="max-w-5xl mx-auto px-6 py-20">


        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">


          <h2 className="text-3xl font-bold text-gray-900">
            Tell Us What Happened
          </h2>


          <p className="mt-3 text-gray-600">
            Provide details about the issue so our team can investigate it.
          </p>



          <form
            onSubmit={handleReportIssue}
            className="mt-10 space-y-6">

            {/* Name */}

            <div>

              <label className="text-sm font-semibold text-gray-700">
                Name
              </label>

              <input
                required
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your name"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>


            {/* Email */}

            <div>

              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>


              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your email"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>


            {/* Issue Type */}

            <div>

              <label className="text-sm font-semibold text-gray-700">
                Issue Type
              </label>


              <select
                required
                onChange={(e) => setIssueType(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              >

                <option>
                  Select issue type
                </option>

                <option>
                  Disease Detection
                </option>

                <option>
                  Weather Advisory
                </option>

                <option>
                  Crop Recommendation
                </option>

                <option>
                  AI Response Problem
                </option>

                <option>
                  Translation Issue
                </option>

                <option>
                  Login / Account
                </option>

                <option>
                  Performance Issue
                </option>

                <option>
                  Other
                </option>

              </select>


            </div>


            {/* Description */}

            <div>

              <label className="text-sm font-semibold text-gray-700">
                Describe the Problem
              </label>


              <textarea
                required
                onChange={(e) => setDesc(e.target.value)}
                rows="5"
                placeholder="Explain what happened..."
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 resize-none outline-none focus:border-green-600"
              />

            </div>


            {/* Screenshot */}

            {/* <div>


              <label className="text-sm font-semibold text-gray-700">
                Upload Screenshot (Optional)
              </label>



              <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 cursor-pointer hover:border-green-600 transition">


                <Upload
                  className="text-green-700"
                  size={30}
                />


                <p className="mt-3 text-sm text-gray-600">
                  Click to upload screenshot
                </p>


                <input
                 onChange={(e)=>setImage(e.target.files[0])}
                 type="file"
                 accept="image/*"
                  className="hidden"
                />
              </label>

            </div> */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Upload Screenshot (Optional)
              </label>

              <label className="mt-2 relative flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-4 cursor-pointer hover:border-green-600 transition min-h-[220px]">

                {image ? (
                  <>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded-image"
                      className="max-h-52 w-auto rounded-lg object-contain"
                    />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setImage(null);
                      }}
                      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <Upload
                      className="text-green-700"
                      size={30}
                    />

                    <p className="mt-3 text-sm text-gray-600">
                      Click to upload screenshot
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>

            {/* Device Info */}

            <div className="grid md:grid-cols-2 gap-5">


              <input
                onChange={(e) => setDevice(e.target.value)}
                type="text"
                required
                placeholder="Device (Example: Android Phone)"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />


              <input
                onChange={(e) => setBrowser(e.target.value)}
                type="text"
                placeholder="Browser (Chrome, Safari...)"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />


            </div>

            <button
            disabled={pending}
              className="w-full bg-green-700 text-white py-3 rounded-xl 
              cursor-pointer active:scale-99
              font-semibold flex items-center justify-center gap-2 hover:bg-green-800 transition"
            >

              {pending ? <Loader2 className="size-5 animate-spin" /> : "Submit Report"}

              {pending ? null : <Send size={18} />}

            </button>

          </form>

        </div>


      </section>

      {/* Bottom */}

      <section className="bg-green-50 py-16">


        <div className="max-w-4xl mx-auto px-6 text-center">


          <h2 className="text-3xl font-bold">
            Thank You For Helping Us Improve
          </h2>


          <p className="mt-5 text-gray-600 leading-8">

            Every issue report helps us make AI Smart Farming Assistant
            faster, more reliable, and easier for farmers to use.

          </p>


        </div>


      </section>



    </main>

  );

}