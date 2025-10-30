import React, { useState } from "react";
import { Mail } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function EmailSignIn() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending magic link…");

    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      console.error(error);
      setStatus("❌ Error sending link");
    } else {
      setStatus("✅ Magic link sent! Check your email");
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="bg-gradient-to-br from-gray-900/60 to-cyan-900/40 border border-cyan-700/40 rounded-xl p-6 max-w-md mx-auto text-gray-100"
    >
      <div className="flex items-center gap-2 mb-3 text-cyan-400">
        <Mail className="w-5 h-5" />
        <h2 className="text-lg font-bold">Sign In via Email</h2>
      </div>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="w-full px-3 py-2 rounded-lg bg-black/50 border border-cyan-700 focus:outline-none focus:border-cyan-400 text-gray-200 mb-4"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-600 to-cyan-600 text-white font-bold py-2 rounded-lg hover:from-pink-500 hover:to-cyan-500 transition"
      >
        Send Magic Link
      </button>

      {status && <p className="mt-3 text-center text-sm text-cyan-400">{status}</p>}
    </form>
  );
}
