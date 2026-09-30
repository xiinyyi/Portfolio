import React, { useEffect, useRef, useState } from 'react';
import { X, ZoomIn, Upload, Link as LinkIcon, Check, Trash2, Edit2, AlertCircle } from 'lucide-react';
import { CreativeDesignItem } from '../types/portfolio';

interface DesignLightboxModalProps {
  item: CreativeDesignItem | null;
  onClose: () => void;
  onUpdatePosterImage: (posterId: string, newImageUrl: string, newTitle?: string, newDescription?: string) => void;
}

export const DesignLightboxModal: React.FC<DesignLightboxModalProps> = ({
  item,
  onClose,
  onUpdatePosterImage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadMode, setUploadMode] = useState<'upload' | 'url'>('upload');
  const [inputUrl, setInputUrl] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      setEditedTitle(item.title);
      setEditedDescription(item.description);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      onUpdatePosterImage(item.id, blobUrl, editedTitle || item.title, editedDescription || item.description);
      setNotice(`Loaded "${file.name}" successfully!`);
      setIsEditing(false);
      setTimeout(() => setNotice(null), 3500);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    onUpdatePosterImage(item.id, inputUrl.trim(), editedTitle || item.title, editedDescription || item.description);
    setNotice('Poster image updated successfully!');
    setIsEditing(false);
    setInputUrl('');
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex justify-center items-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#12091c] border border-[#2c1748] rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#12091c] border-b border-[#25153a]">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="text-purple-400 font-semibold">{item.type}</span>
            <span aria-hidden="true">·</span>
            <span className="text-white">{item.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all cursor-pointer shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Insert / Replace Poster</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white bg-[#170c28] hover:bg-[#25123f] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notice Banner */}
        {notice && (
          <div className="px-6 py-2.5 bg-emerald-950/60 border-b border-emerald-800 text-emerald-300 text-xs flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              {notice}
            </span>
            <button onClick={() => setNotice(null)} className="text-emerald-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Poster Edit & Uploader Drawer */}
        {isEditing && (
          <div className="p-5 bg-[#160b24] border-b border-[#291744] space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-purple-400" />
                  Insert Your Poster Image for {item.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Upload an image from your device or paste a public image link.
                </p>
              </div>

              <div className="flex items-center gap-1 p-1 bg-[#12091c] border border-[#2c1748] rounded-lg">
                <button
                  type="button"
                  onClick={() => setUploadMode('upload')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    uploadMode === 'upload' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    uploadMode === 'url' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>Paste Image Link</span>
                </button>
              </div>
            </div>

            {uploadMode === 'upload' ? (
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png,image/jpeg,image/webp,image/svg+xml,image/*"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#2f194c] hover:border-purple-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-[#140a20] hover:bg-[#180d28]"
                >
                  <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-xs font-semibold text-white">
                    Click to select and upload your poster file
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    Supports PNG, JPG, JPEG, WEBP files
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUrlSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://.../my-poster.jpg"
                    className="flex-grow px-3 py-2 text-xs bg-[#12091c] border border-[#2c1748] rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg whitespace-nowrap cursor-pointer shadow-sm"
                  >
                    Update Image
                  </button>
                </div>
              </form>
            )}

            {/* Optional Title & Description Update */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#291744]">
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Poster Title</label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#12091c] border border-[#2c1748] rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Description / Rationale</label>
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#12091c] border border-[#2c1748] rounded-lg text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Main Visual Display */}
          <div className="relative w-full bg-black/60 rounded-xl overflow-hidden border border-[#291744] flex items-center justify-center p-3">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="max-h-[58vh] w-auto object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="md:col-span-2 space-y-2">
              <h3 className="text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="p-4 bg-[#160b24] border border-[#25153a] rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Dimensions:</span>
                <span className="text-white font-mono-code font-medium">{item.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Category:</span>
                <span className="text-purple-400 font-medium">{item.purpose}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Format:</span>
                <span className="text-neutral-200">Graphic Poster</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
