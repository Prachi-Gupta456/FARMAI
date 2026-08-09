import { SignIn } from "@clerk/nextjs";
import { Leaf } from "lucide-react";

export default function Signin() {
  return (
    <main className="min-h-screen w-screen bg-gradient-to-b from-green-50 via-white to-white
                    flex flex-col items-center justify-center px-4 py-8 gap-6">

      {/* Logo */}
      <div className="flex flex-col items-center text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl
                        bg-gradient-to-br from-[#00C950] to-[#00963E]
                        shadow-md shadow-green-200">
          <Leaf className="size-7 text-white" />
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900">
          Farm<span className="text-[#00c950]">AI</span>
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          AI Powered Smart Farming Assistant
        </p>
      </div>

      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/components/dashboard"
        appearance={{
          variables: {
            colorPrimary: "#00c950",
            colorText: "#18181b",
            colorTextSecondary: "#71717a",
            colorBackground: "#ffffff",
            colorInputBackground: "#fafafa",
            colorInputText: "#18181b",
            borderRadius: "1rem",
            fontFamily: "inherit",
          },
          elements: {
            rootBox: "w-full",
            card: "rounded-3xl border border-zinc-100 shadow-lg shadow-zinc-200/50 p-6 sm:p-7",

            headerTitle: "text-xl font-bold text-zinc-900",
            headerSubtitle: "text-sm text-zinc-500",


            dividerLine: "bg-zinc-200",
            dividerText: "text-zinc-400 text-xs font-medium uppercase tracking-wide",

            formFieldLabel:
              "text-sm font-semibold text-zinc-700 mb-1.5",
            formFieldInput:
              "h-12 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-700 transition-all focus:border-[#00c950] focus:bg-white focus:ring-2 focus:ring-[#00c950]/20",
            formFieldInputShowPasswordButton: "text-zinc-400 hover:text-zinc-600",
            formFieldAction: "text-[#00c950] font-semibold text-xs hover:text-green-700",
            formFieldHintText: "text-zinc-400 text-xs",
            formFieldErrorText: "text-red-500 text-xs font-medium mt-1",

            formButtonPrimary:
              "h-12 rounded-2xl bg-gradient-to-r from-[#00c950] to-[#00963e] hover:opacity-90 text-white font-semibold text-sm shadow-md shadow-green-200/50 transition-all active:scale-[0.98] normal-case",

            identityPreview:
              "rounded-2xl border border-zinc-200 bg-zinc-50 py-2 px-3",
            identityPreviewText: "text-sm text-zinc-700",
            identityPreviewEditButton: "text-[#00c950] hover:text-green-700",

            otpCodeFieldInput:
              "rounded-xl border border-zinc-200 focus:border-[#00c950] focus:ring-2 focus:ring-[#00c950]/20 font-semibold text-lg",

            footerAction: "text-center",
            footerActionText: "text-sm text-zinc-500",
            footerActionLink:
              "text-[#00c950] font-semibold hover:text-green-700 ml-1",

            badge: "hidden",

            alert: "rounded-2xl border border-red-100 bg-red-50 text-red-600 text-sm",
            alertText: "text-sm",
          },
        }}
      />

      {/* Bottom */}
      <p className="text-center text-xs text-zinc-400">
        🌱 Helping Farmers Grow Smarter with AI
      </p>
    </main>
  );
}