"use client";

import { useState, useEffect } from 'react';
import { loginAdmin, logoutAdmin, checkAdmin, uploadSiteImage, getSiteImages, deleteSiteImage } from '@/actions/admin';
import Image from 'next/image';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAdmin().then(setIsAuthenticated);
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchImages();
  }, [isAuthenticated]);

  const fetchImages = async () => {
    const imgs = await getSiteImages();
    setImages(imgs);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginAdmin(password);
    if (res.success) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError(res.error || 'Login failed');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    setError('');
    
    try {
      const formData = new FormData(e.currentTarget);
      await uploadSiteImage(formData);
      (e.target as HTMLFormElement).reset();
      await fetchImages();
    } catch (err: any) {
      setError(err.message || 'Ett fel uppstod vid uppladdningen.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    if (!confirm('Är du säker på att du vill ta bort bilden?')) return;
    try {
      await deleteSiteImage(id, url);
      await fetchImages();
    } catch (err: any) {
      setError(err.message || 'Kunde inte ta bort bilden.');
    }
  };

  if (isAuthenticated === null) return <div className="p-8">Laddar...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
          <h1 className="text-2xl font-serif mb-6 text-stone-900">Admin Login</h1>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Lösenord"
            className="w-full px-4 py-3 border border-stone-200 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <button type="submit" className="w-full bg-brand-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition">
            Logga in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-100">
          <h1 className="text-3xl font-serif text-stone-900">Bildhantering</h1>
          <button onClick={handleLogout} className="text-stone-500 hover:text-stone-800 transition">Logga ut</button>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">{error}</div>}

        <div className="grid md:grid-cols-3 gap-12">
          {/* Ladda upp */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-serif mb-4 text-stone-800">Ladda upp ny bild</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Bildfil *</label>
                <input required type="file" name="file" accept="image/*" className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Kategori / Placering *</label>
                <select name="category" required className="w-full px-4 py-2 border border-stone-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary">
                  <option value="utomhus">Utomhus (Galleri)</option>
                  <option value="nere">Lillstugan Nere / Stora</option>
                  <option value="uppe">Lillstugan Uppe / Lilla</option>
                  <option value="annan">Annan placering</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Alt-text (Svenska)</label>
                <input type="text" name="altSv" className="w-full px-4 py-2 border border-stone-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Alt-text (Engelska)</label>
                <input type="text" name="altEn" className="w-full px-4 py-2 border border-stone-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary" />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Alt-text (Tyska)</label>
                <input type="text" name="altDe" className="w-full px-4 py-2 border border-stone-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary" />
              </div>

              <button disabled={isUploading} type="submit" className="w-full bg-brand-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition disabled:opacity-50">
                {isUploading ? 'Laddar upp...' : 'Ladda upp bild'}
              </button>
            </form>
            <p className="text-xs text-stone-500 mt-4">
              Obs: För att uppladdningen ska fungera i produktion måste Vercel Blob vara aktiverat och <code>BLOB_READ_WRITE_TOKEN</code> vara tillagd i Vercel.
            </p>
          </div>

          {/* Bibliotek */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-serif mb-4 text-stone-800">Uppladdade bilder</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.length === 0 && <p className="text-stone-500 col-span-full">Inga uppladdade bilder än.</p>}
              {images.map(img => (
                <div key={img.id} className="relative group bg-stone-100 rounded-xl overflow-hidden aspect-square border border-stone-200">
                  <Image src={img.url} alt={img.altSv || 'Uploaded image'} fill sizes="200px" className="object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-white text-xs font-medium bg-brand-primary px-2 py-1 rounded mb-2">{img.category}</span>
                    <button onClick={() => handleDelete(img.id, img.url)} className="text-red-400 text-xs font-medium hover:text-red-300 transition underline">Ta bort</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
