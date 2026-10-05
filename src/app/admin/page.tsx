"use client";

import { useState, useEffect } from 'react';
import { loginAdmin, logoutAdmin, checkAdmin, uploadSiteImage, deleteSiteImage, getAllAdminImages } from '@/actions/admin';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Trash2, LogOut, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  
  const [images, setImages] = useState<any>({ utomhus: [], uppe: [], nere: [], annan: [] });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    checkAdmin().then(setIsAuthenticated);
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchImages();
  }, [isAuthenticated]);

  const fetchImages = async () => {
    try {
      const imgs = await getAllAdminImages();
      setImages(imgs);
    } catch (err) {
      console.error(err);
    }
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
    setSuccess('');
    
    try {
      const formData = new FormData(e.currentTarget);
      await uploadSiteImage(formData);
      (e.target as HTMLFormElement).reset();
      setSuccess('Bilden har laddats upp!');
      await fetchImages();
      setTimeout(() => setSuccess(''), 3000);
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

  const renderImageGrid = (categoryImages: any[], title: string, emptyText: string) => (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-serif text-stone-800">{title}</h3>
        <span className="bg-stone-200 text-stone-600 px-3 py-1 rounded-full text-sm font-medium">
          {categoryImages.length}
        </span>
      </div>
      
      {categoryImages.length === 0 ? (
        <div className="bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center text-stone-400">
          <ImageIcon size={48} className="mb-4 opacity-50" />
          <p>{emptyText}</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
        >
          {categoryImages.map(img => (
            <motion.div 
              key={img.id} 
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 }
              }}
              whileHover={{ y: -5 }}
              className="group relative bg-white rounded-2xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100"
            >
              <Image 
                src={img.url} 
                alt={img.altSv || 'Uploaded image'} 
                fill 
                sizes="(max-width: 768px) 50vw, 300px" 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                {img.isDynamic ? (
                  <div className="flex justify-between items-center">
                    <span className="bg-brand-primary text-white text-xs px-2 py-1 rounded shadow">Uppladdad</span>
                    <button 
                      onClick={() => handleDelete(img.id, img.url)} 
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
                      title="Ta bort bild"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="bg-stone-500 text-white text-xs px-2 py-1 rounded shadow">Standardbild</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-stone-100"
        >
          <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <LogOut className="text-brand-primary" size={32} />
          </div>
          <h1 className="text-2xl font-serif mb-6 text-stone-900 text-center">Logga in till Admin</h1>
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm text-center">
              {error}
            </motion.p>
          )}
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Skriv lösenord..."
              className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-xl mb-6 outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all"
            />
            <button type="submit" className="w-full bg-brand-primary text-white py-4 rounded-xl font-medium hover:bg-opacity-90 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Logga in
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-serif text-xl">K</div>
            <h1 className="text-2xl font-serif text-stone-900 hidden sm:block">Kämpabo Admin</h1>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition font-medium bg-stone-100 hover:bg-stone-200 px-4 py-2 rounded-lg"
          >
            <LogOut size={18} />
            Logga ut
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid lg:grid-cols-12 gap-10">
        
        {/* Upload Sidebar */}
        <div className="lg:col-span-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 sticky top-32 border border-stone-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                <Upload size={24} />
              </div>
              <h2 className="text-2xl font-serif text-stone-800">Ladda upp ny</h2>
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-green-50 text-green-600 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
                  <CheckCircle2 size={18} /> {success}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleUpload} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Välj bildfil *</label>
                <input required type="file" name="file" accept="image/*" className="w-full text-sm text-stone-500 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 file:transition cursor-pointer bg-stone-50 border border-stone-200 rounded-xl" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Område / Placering *</label>
                <select name="category" required className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition">
                  <option value="utomhus">Utomhus & Omgivning</option>
                  <option value="nere">Stora Stugan (Nere)</option>
                  <option value="uppe">Lilla Stugan (Uppe)</option>
                  <option value="annan">Övrigt</option>
                </select>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <label className="block text-sm font-semibold text-stone-700 mb-2">Beskrivning (Alt-text) frivilligt</label>
                <div className="space-y-3">
                  <input type="text" name="altSv" placeholder="Svenska" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition text-sm" />
                  <input type="text" name="altEn" placeholder="Engelska" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition text-sm" />
                  <input type="text" name="altDe" placeholder="Tyska" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition text-sm" />
                </div>
              </div>

              <button disabled={isUploading} type="submit" className="w-full bg-brand-primary text-white py-4 rounded-xl font-medium hover:bg-opacity-90 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:shadow-none mt-4 flex justify-center items-center gap-2">
                {isUploading ? (
                  <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Laddar upp...</>
                ) : (
                  <>Ladda upp bild</>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Library Columns */}
        <div className="lg:col-span-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="text-4xl font-serif text-stone-900 mb-10">Alla bilder på sidan</h2>
            
            {renderImageGrid(images.utomhus, "Utomhus & Omgivning", "Inga bilder utomhus ännu.")}
            {renderImageGrid(images.nere, "Stora Stugan (Lillstugan Nere)", "Inga bilder uppladdade här.")}
            {renderImageGrid(images.uppe, "Lilla Stugan (Lillstugan Uppe)", "Inga bilder uppladdade här.")}
            
            {images.annan && images.annan.length > 0 && (
              renderImageGrid(images.annan, "Övriga bilder", "")
            )}
          </motion.div>
        </div>

      </main>
    </div>
  );
}
