"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDocPage() {
  const [title, setTitle] = useState("Untitled Document");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    // Fetch the user's document
    fetch("http://localhost:8000/document", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch document");
        const data = await res.json();
        setTitle(data.title || "Untitled Document");
        setContent(data.content || "");
      })
      .catch(() => {
        setTitle("Untitled Document");
        setContent("");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8000/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error("Failed to save document");
      alert("Document saved!");
    } catch {
      alert("Failed to save document.");
    } finally {
      setSaving(false);
    }
  };

  const handleTitleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8000/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error("Failed to save title");
      setIsEditingTitle(false);
    } catch {
      alert("Failed to save title.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <span className="text-lg text-gray-600">Loading your document...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 flex flex-col">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-2xl font-bold">D</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SharedDoc</h1>
        </div>
        
        {/* Document Title */}
        <div className="mb-4 flex items-center space-x-2">
          {isEditingTitle ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-semibold text-gray-800 bg-transparent border-b-2 border-blue-500 outline-none px-2 py-1"
                autoFocus
              />
              <button
                onClick={handleTitleSave}
                disabled={saving}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsEditingTitle(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={title}
                readOnly
                className="text-2xl font-semibold text-gray-800 bg-transparent border-none outline-none cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                onClick={() => setIsEditingTitle(true)}
              />
              <button
                onClick={() => setIsEditingTitle(true)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ✏️ Edit
              </button>
            </>
          )}
        </div>
        
        <textarea
          className="w-full min-h-[400px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg resize-y mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing your document..."
        />
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Document"}
          </button>
        </div>
      </div>
    </div>
  );
} 