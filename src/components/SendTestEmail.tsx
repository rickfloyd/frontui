import React, { useState } from "react";
import { Send } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function SendTestEmail() {
  const [sending, setSending] = useState(false);

  const sendTest = async () => {
    setSending(true);
    try {
      // replace URL with your Firebase Function / backend endpoint
      await fetch("/api/sendTestEmail", { method: "POST" });
      toast.success("✅ Test email sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to send test email");
    }
    setSending(false);
  };

  return (
    <div className="text-center space-y-4">
      <Toaster position="bottom-right" />
      <button
        onClick={sendTest}
        disabled={sending}
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-pink-600 text-white font-bold hover:scale-105 transition disabled:opacity-50"
      >
        {sending ? "Sending…" : <><Send className="inline w-5 h-5 mr-2" />Send Test Email</>}
      </button>
    </div>
  );
}
