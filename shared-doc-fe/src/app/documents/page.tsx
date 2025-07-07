"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Document {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchDocuments();
  }, [router]);

  const fetchDocuments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/documents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch documents:", response.status, errorText);
        throw new Error(`Failed to fetch documents: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched documents:", data);
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      alert("Failed to load documents. Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  };

  const createDocument = async () => {
    if (!newDocTitle.trim()) return;
    
    setCreating(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newDocTitle }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to create document:", response.status, errorText);
        throw new Error("Failed to create document");
      }
      const newDoc = await response.json();
      console.log("Created new document:", newDoc);
      setDocuments([newDoc, ...documents]);
      setNewDocTitle("");
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating document:", error);
      alert("Failed to create document");
    } finally {
      setCreating(false);
    }
  };

  const deleteDocument = async (documentId: number) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8000/documents/${documentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete document");
      setDocuments(documents.filter(doc => doc.id !== documentId));
    } catch (error) {
      alert("Failed to delete document");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <span className="text-lg text-gray-600">Loading your documents...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">D</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
          </div>
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Create New Document */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Create New Document</h2>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showCreateForm ? "Cancel" : "New Document"}
            </button>
          </div>
          
          {showCreateForm && (
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={newDocTitle}
                onChange={(e) => setNewDocTitle(e.target.value)}
                placeholder="Enter document title..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && createDocument()}
              />
              <button
                onClick={createDocument}
                disabled={creating || !newDocTitle.trim()}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          )}
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Documents</h2>
            <button
              onClick={fetchDocuments}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              🔄 Refresh
            </button>
          </div>
          
          {documents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You don't have any documents yet.</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Document
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Created: {formatDate(doc.created_at)} | 
                      Updated: {formatDate(doc.updated_at)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/documents/${doc.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 