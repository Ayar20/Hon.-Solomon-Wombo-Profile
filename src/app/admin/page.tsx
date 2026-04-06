"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.getSession()
      .then((data) => {
        if (!data || !data.data) {
          router.push("/login");
        } else {
          setSession(data.data.session);
          setLoading(false);
        }
      })
      .catch(() => router.push("/login"));
  }, [router]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-[#0d8f47]">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <p className="mb-4">Welcome back to your dashboard. From here you can manage achievements, timeline events, and uploaded media.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="p-4 border rounded-lg hover:border-[#0d8f47] cursor-pointer">
            <h2 className="font-semibold text-lg">Manage Content</h2>
            <p className="text-sm text-gray-500">Edit priorities, achievements, and timeline</p>
          </div>
          <div className="p-4 border rounded-lg hover:border-[#0d8f47] cursor-pointer">
            <h2 className="font-semibold text-lg">Manage Media (Vercel Blob)</h2>
            <p className="text-sm text-gray-500">Upload new photos and gallery images</p>
          </div>
        </div>

        <button 
          onClick={() => {
            authClient.signOut().then(() => router.push("/login"));
          }}
          className="mt-8 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
