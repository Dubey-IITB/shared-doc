"use client"

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function DocumentEditPage() {
  const [title, setTitle] = useState("Untitled Document");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [fontSize, setFontSize] = useState("16");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const editorRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams();
  const documentId = params.id as string;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchDocument();
  }, [documentId, router]);

  const fetchDocument = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8000/documents/${documentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }
      if (!response.ok) throw new Error("Failed to fetch document");
      const data = await response.json();
      setTitle(data.title || "Untitled Document");
      setContent(data.content || "");
    } catch (error) {
      console.error("Error fetching document:", error);
      alert("Failed to load document");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8000/documents/${documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) throw new Error("Failed to save document");
      alert("Document saved!");
    } catch (error) {
      alert("Failed to save document.");
    } finally {
      setSaving(false);
    }
  };

  const handleTitleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8000/documents/${documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) throw new Error("Failed to save title");
      setIsEditingTitle(false);
    } catch (error) {
      alert("Failed to save title.");
    } finally {
      setSaving(false);
    }
  };

  // Rich text editor functions
  const execCommand = (command: string, value: string | boolean = false) => {
    document.execCommand(command, false, value.toString());
    editorRef.current?.focus();
  };

  const formatText = (command: string) => {
    execCommand(command);
  };

  const undo = () => {
    execCommand("undo");
  };

  const redo = () => {
    execCommand("redo");
  };

  const changeFontSize = (size: string) => {
    setFontSize(size);
    execCommand("fontSize", size);
  };

  const changeFontFamily = (font: string) => {
    setFontFamily(font);
    execCommand("fontName", font);
  };

  const changeTextColor = (color: string) => {
    setTextColor(color);
    execCommand("foreColor", color);
  };

  const changeBackgroundColor = (color: string) => {
    setBackgroundColor(color);
    execCommand("hiliteColor", color);
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      execCommand("insertImage", url);
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  // Initialize editor content when content changes from API
  useEffect(() => {
    if (editorRef.current && content && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <span className="text-lg text-gray-600">Loading document...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">D</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SharedDoc</h1>
            </div>
            <Link
              href="/documents"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Documents
            </Link>
          </div>
          
          {/* Document Title */}
          <div className="flex items-center space-x-2">
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
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4 flex-wrap gap-2">
            {/* Font Family */}
            <select
              value={fontFamily}
              onChange={(e) => changeFontFamily(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black font-medium min-w-[120px]"
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
              <option value="Helvetica">Helvetica</option>
            </select>

            {/* Font Size */}
            <select
              value={fontSize}
              onChange={(e) => changeFontSize(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black font-medium min-w-[80px]"
            >
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
              <option value="24">24</option>
              <option value="28">28</option>
              <option value="32">32</option>
              <option value="36">36</option>
              <option value="48">48</option>
              <option value="72">72</option>
            </select>

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Text Formatting */}
            <button
              onClick={() => formatText("bold")}
              className="p-2 hover:bg-gray-200 rounded text-sm font-bold text-black border border-gray-300 bg-white"
              title="Bold"
            >
              B
            </button>
            <button
              onClick={() => formatText("italic")}
              className="p-2 hover:bg-gray-200 rounded text-sm italic text-black border border-gray-300 bg-white"
              title="Italic"
            >
              I
            </button>
            <button
              onClick={() => formatText("underline")}
              className="p-2 hover:bg-gray-200 rounded text-sm underline text-black border border-gray-300 bg-white"
              title="Underline"
            >
              U
            </button>
            <button
              onClick={() => formatText("strikeThrough")}
              className="p-2 hover:bg-gray-200 rounded text-sm line-through text-black border border-gray-300 bg-white"
              title="Strikethrough"
            >
              S
            </button>

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Text Alignment */}
            <button
              onClick={() => formatText("justifyLeft")}
              className="p-2 hover:bg-gray-200 rounded border border-gray-300 bg-white text-black"
              title="Align Left"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </button>
            <button
              onClick={() => formatText("justifyCenter")}
              className="p-2 hover:bg-gray-200 rounded border border-gray-300 bg-white text-black"
              title="Align Center"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </button>
            <button
              onClick={() => formatText("justifyRight")}
              className="p-2 hover:bg-gray-200 rounded border border-gray-300 bg-white text-black"
              title="Align Right"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </button>
            <button
              onClick={() => formatText("justifyFull")}
              className="p-2 hover:bg-gray-200 rounded border border-gray-300 bg-white text-black"
              title="Justify"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </button>

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Text Color */}
            <div className="flex items-center space-x-1">
              <span className="text-sm text-black font-medium">Color:</span>
              <input
                type="color"
                value={textColor}
                onChange={(e) => changeTextColor(e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                title="Text Color"
              />
            </div>

            {/* Background Color */}
            <div className="flex items-center space-x-1">
              <span className="text-sm text-black font-medium">Highlight:</span>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => changeBackgroundColor(e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                title="Background Color"
              />
            </div>

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Lists */}
            <button
              onClick={() => formatText("insertUnorderedList")}
              className="p-2 hover:bg-gray-200 rounded border border-gray-300 bg-white text-black"
              title="Bullet List"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </button>
            <button
              onClick={() => formatText("insertOrderedList")}
              className="p-2 hover:bg-gray-200 rounded border border-gray-300 bg-white text-black"
              title="Numbered List"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </button>

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Links and Images */}
            <button
              onClick={insertLink}
              className="p-2 hover:bg-gray-200 rounded text-sm font-medium text-black border border-gray-300 bg-white"
              title="Insert Link"
            >
              🔗
            </button>
            <button
              onClick={insertImage}
              className="p-2 hover:bg-gray-200 rounded text-sm text-black border border-gray-300 bg-white"
              title="Insert Image"
            >
              🖼️
            </button>

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Undo/Redo */}
            <button
              onClick={undo}
              className="p-2 hover:bg-gray-200 rounded text-sm font-medium text-black border border-gray-300 bg-white"
              title="Undo"
            >
              ↩️
            </button>
            <button
              onClick={redo}
              className="p-2 hover:bg-gray-200 rounded text-sm font-medium text-black border border-gray-300 bg-white"
              title="Redo"
            >
              ↪️
            </button>

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Clear Formatting */}
            <button
              onClick={() => formatText("removeFormat")}
              className="px-3 py-1 text-sm text-black hover:bg-gray-200 rounded border border-gray-300 bg-white font-medium"
              title="Clear Formatting"
            >
              Clear Format
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 p-6">
          <div
            ref={editorRef}
            contentEditable
            className="w-full min-h-[500px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg resize-y outline-none"
            onInput={handleEditorChange}
            onBlur={handleEditorChange}
            style={{
              fontFamily: fontFamily,
              fontSize: `${fontSize}px`,
              color: textColor,
              backgroundColor: backgroundColor
            }}
          />
        </div>

        {/* Save Button */}
        <div className="p-6 border-t border-gray-200">
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
    </div>
  );
} 