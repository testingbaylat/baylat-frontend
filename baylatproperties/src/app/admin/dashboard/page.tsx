'use client';
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Home, Video, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import API, { createListing, getAllListings, getAllListingsAdmin, getAllVideos, updateListing, uploadMediaFile, uploadVideo, deleteListing, signOut, getMe} from '@/app/services/api/api';
import { useEffect } from 'react';
import router from 'next/router';
import AdminNavbar from '../AdminNavbar';


export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'listings' | 'videos'>('listings');

  // Dashboard Data Storage
  const [listings, setListings] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // 1. Immediately verify authorization by fetching the active user profile
        const userData = await getMe();
        
        // Safety check: If the token is cleared or invalid, userData will be blank
         if (!userData || !userData.username || !userData.isAdmin) {
          toast.error("Access Denied: Administrative credentials required.");
          router.replace('/admin/login'); // Force browser replacement back to login
          return;
        }

        
        // 2. If user is authenticated and verified as admin, load the rest of the datasets
        setAdminUser(userData);

        const listingRes = await getAllListingsAdmin();
        setListings(listingRes.listings || []);

        const videoRes = await getAllVideos();
        setVideos(videoRes.data.videos || videoRes.data || []);

      setLoading(false); // Only disable loading screen here once everything is completely safe!
     
      } catch (error) {
        console.error('Authorization routing block error:', error);
        toast.error("Unauthorized: Please sign in to access the dashboard.");
        
        window.location.href = '/admin/login'
      } 
    };

    fetchDashboardData();
  }, []);

  const [isEditListingModalOpen, setIsEditListingModalOpen] = useState(false);
  const [isDeleteListingModalOpen, setIsDeleteListingModalOpen] = useState(false);
  const [isEditVideoModalOpen, setIsEditVideoModalOpen] = useState(false);
  const [isDeleteVideoModalOpen, setIsDeleteVideoModalOpen] = useState(false);

  // Raw Selected Media States for File Uploading
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);

  // Listing Form State (Kept images array to match your preference change)
  const [listingData, setListingData] = useState({
    _id: '',
    name: '',
    description: '',
    address: '',
    state: '',
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    bathrooms: 0,
    bedrooms: 0,
    furnished: false,
    sqft: 0,
    parking: false,
    type: 'sale',
    status: 'active',
    featured: true,
    images: [] as string[], // Holds final URLs after pipeline execution
    userRef: 'admin123',
  });

  const [videoData, setVideoData] = useState({ title: '', url: '' });

  // 1. Fetch All Existing Database Content on Mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Correct path mapping matching deduplicated api.js rules
        const listingRes = await getAllListingsAdmin();
        setListings(listingRes.listings || []);

        const videoRes = await getAllVideos();
        setVideos(videoRes.data.videos || videoRes.data || []);
      } catch (error) {
        console.error('Error fetching dashboard datasets:', error);
        toast.error('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 2. Input Change Mappers
  const handleListingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setListingData(prev => ({ ...prev, [name]: checked }));
    } else {
      setListingData(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
    }
  };

  // 3. Local Media Input Array Handlers (Captures file buffers instead of mock strings)
  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImageFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeSelectedImageFile = (index: number) => {
    setSelectedImageFiles(prev => prev.filter((_, i) => i !== index));
  };
// Call this function when an admin clicks the "Edit" button next to any property row
const handleOpenEditModal = (selectedProperty: any) => {
  setListingData({
    _id: selectedProperty._id || selectedProperty.id || '',
    name: selectedProperty.name || '',
    description: selectedProperty.description || '',
    address: selectedProperty.address || '',
    state: selectedProperty.state || '',
    regularPrice: selectedProperty.regularPrice || 0,
    discountPrice: selectedProperty.discountPrice || 0,
    offer: selectedProperty.offer || false,
    bathrooms: selectedProperty.bathrooms || 0,
    bedrooms: selectedProperty.bedrooms || 0,
    furnished: selectedProperty.furnished || false,
    sqft: selectedProperty.sqft || 0,
    parking: selectedProperty.parking || false,
    type: selectedProperty.type || 'sale',
    status: selectedProperty.status || 'active',
    featured: selectedProperty.featured || false,
    images: selectedProperty.images || [], // Populates existing cloud images correctly
    userRef: selectedProperty.userRef || 'admin123',
  });
  
  // Clear any leftover staged image files from previous operations
  setSelectedImageFiles([]); 
  setIsEditListingModalOpen(true);
};

   // 1. Submit Handler (Create New Listing)
  const handleSubmitListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let finalUrls: string[] = [];

      // Upload all queued images at once using your unified bulk handler
      if (selectedImageFiles.length > 0) {
        const resImages = await uploadMediaFile(selectedImageFiles as any);
        // Ensure the response is treated as a flat array of clean URL strings
        finalUrls = Array.isArray(resImages) ? resImages.flat() : [resImages];
      }

      // Explicitly construct and type-cast the payload to protect Mongoose types
      const completePayload = {
        ...listingData,
        regularPrice: Number(listingData.regularPrice),
        discountPrice: Number(listingData.discountPrice) || 0,
        bathrooms: Number(listingData.bathrooms),
        bedrooms: Number(listingData.bedrooms),
        sqft: Number(listingData.sqft),
        images: finalUrls.map((url) => String(url).trim()), // Injects clean URLs array
      };

      const res = await createListing(completePayload);

      if (res.data?.success) {
        toast.success('Listing created and published successfully!');
        const savedListing = res.data?.listing || completePayload;
        setListings((prev) => [savedListing, ...prev]);
        setIsListingModalOpen(false);
        setSelectedImageFiles([]); // Clear upload staging queue
      }
    } catch (error: any) {
      console.error('Create error:', error);
      toast.error(error.response?.data?.message || 'Failed to publish new listing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Edit Handler (Update Existing Listing)
      const handleEditListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Resolve target database identifier from our pre-populated state
    const targetId = listingData._id;

    if (!targetId) {
      toast.error("Could not resolve valid Listing ID parameter identifier.");
      setIsSubmitting(false);
      return;
    }

    try {
      let newUploadedUrls: string[] = [];

      // 1. Bulk upload brand new staged images if files are queued
      if (selectedImageFiles.length > 0) {
        const resImages = await uploadMediaFile(selectedImageFiles as any);
        newUploadedUrls = Array.isArray(resImages) ? resImages.flat() : [resImages];
      }

      // 2. Safely merge your existing database images with your new Cloudinary URLs
      const existingImages = listingData.images || [];
      const combinedImages = [...existingImages, ...newUploadedUrls].map((url) => String(url).trim());

      // 3. Assemble complete payload enforcing Mongoose number typing rules
      const completePayload = {
        name: listingData.name,
        description: listingData.description,
        address: listingData.address,
        state: listingData.state,
        regularPrice: Number(listingData.regularPrice),
        discountPrice: Number(listingData.discountPrice) || 0,
        bathrooms: Number(listingData.bathrooms),
        bedrooms: Number(listingData.bedrooms),
        furnished: Boolean(listingData.furnished),
        parking: Boolean(listingData.parking),
        sqft: Number(listingData.sqft),
        type: listingData.type,
        status: listingData.status,
        featured: Boolean(listingData.featured),
        images: combinedImages, 
        userRef: listingData.userRef
      };

      // 4. Send PUT update execution request to your backend cluster
      const res = await updateListing(targetId, completePayload);

      if (res.data?.success || res.data.success) {
        toast.success('Listing updated successfully!');
        
        const updatedListing = res.data?.listing || res.data.listing || { ...completePayload, _id: targetId };
        
        // 5. In-place state array swap out to keep user context synchronized
        setListings((prev) =>
          prev.map((item) => ((item._id || item.id) === targetId ? updatedListing : item))
        );
        
        setIsEditListingModalOpen(false); 
        setSelectedImageFiles([]); 
      }
    } catch (error: any) {
      console.error('Edit update error profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update listing modifications.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCloudinaryPublicId = (url: string): string | null => {
  try {
    // Splits the URL to isolate everything after the '/upload/' segment
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;
    
    // Removes the version number (e.g., 'v1785604593/') if present, and drops the extension (.jpg)
    const pathWithoutVersion = parts[1].replace(/^v\d+\//, '');
    return pathWithoutVersion.substring(0, pathWithoutVersion.lastIndexOf('.'));
  } catch (error) {
    console.error('Failed to parse public ID:', error);
    return null;
  }
};

    const handleDeleteListing = async (property: any) => {
    // 1. Trigger native confirmation prompt to prevent accidental deletions
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete "${property.name}"?`);
    if (!confirmDelete) return;

    const targetId = property._id || property.id;
    if (!targetId) {
      toast.error("Could not resolve listing ID identification parameter.");
      return;
    }

    try {
      // 2. Clear out associated assets from Cloudinary storage bucket
      const imageUrlsArray = property.images || property.imageUrls || [];
      
      for (const url of imageUrlsArray) {
        const publicId = getCloudinaryPublicId(url);
        if (publicId) {
          // Hits your backend router.post('/delete') endpoint inside your image route file
          await API.post('/image/delete', { publicId });
        }
      }

      // 3. Purge the metadata entry from your MongoDB cluster
      const res = await deleteListing(targetId);

      if (res.data?.success || res.data.success) {
        toast.success('Property listing and cloud assets successfully removed!');
        
        // 4. Instantly filter the deleted item out of your local view table list state
        setListings((prev) => prev.filter((item) => (item._id || item.id) !== targetId));
      }
    } catch (error: any) {
      console.error('Deletion failure trace:', error);
      toast.error(error.response?.data?.message || 'Failed to complete full asset destruction pipeline.');
    }
  };

      // Calculate analytics from the existing listings state array in real time
      const totalProperties = listings.length;
      const totalSold = listings.filter(item => item.status === 'sold').length;
      const totalRented = listings.filter(item => item.status === 'rented').length;

    // Calculate today's sales volume accurately using ISO date strings
      const todaysSalesVolume = listings.reduce((total, item) => {
        // Only calculate items that are explicitly marked as closed/sold
        if (item.status === 'sold' && item.createdAt) {
          const createdDate = new Date(item.createdAt).toISOString().split('T')[0];
          const todayDate = new Date().toISOString().split('T')[0];

          // If the year, month, and day match up exactly
          if (createdDate === todayDate) {
            const price = Number(item.discountPrice) || Number(item.regularPrice) || 0;
            return total + price;
          }
        }
        return total;
      }, 0);







    

  // 5. Video Upload Form Handler
  const handleSubmitVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let absoluteVideoUrl = videoData.url;

      // Handle raw files if provided, fallback to raw input strings
      if (selectedVideoFile) {
        absoluteVideoUrl = await uploadMediaFile(selectedVideoFile);
      }

      const res = await uploadVideo({
        title: videoData.title,
        url: absoluteVideoUrl,
      });

      if (res.data.success || res.data?.success) {
        toast.success('Video added successfully!');
        setIsVideoModalOpen(false);
        setSelectedVideoFile(null);
      }
    } catch (error) {
      toast.error('Failed to register targeted video data.');
    } finally {
      setIsSubmitting(false);
    }
  };

 



  let count = 1;

   if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Verifying security clearance level...
        </p>
      </div>
    );
  }
    if (!adminUser) {
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Redirecting to login gateway...</p>
          </div>
        );
      }

  return (
    <main className="min-h-screen bg-background pt-24 pb-12">
       <AdminNavbar adminUser={adminUser } />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-poppins font-bold text-foreground">Admin Dashboard</h1>
        
          <div className="flex bg-card p-1 rounded-lg border border-border shadow-sm">
            
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === 'listings' ? 'bg-primary text-white' : 'text-foreground hover:bg-secondary'}`}
            >
              <Home size={18} />
              Listings
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === 'videos' ? 'bg-primary text-white' : 'text-foreground hover:bg-secondary'}`}
            >
              <Video size={18} />
              Videos
            </button>
          </div>
        </div>
        {/* Admin Analytics Panel */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-4">
  
  {/* Card 1: Total Properties */}
  <div className="bg-card border border-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-primary/40 transition-all duration-200">
    <div>
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
        Total Properties
      </span>
      <h3 className="text-3xl font-poppins font-bold text-foreground">
        {totalProperties}
      </h3>
    </div>
    <div className="text-[11px] text-primary mt-2 font-medium">
      Total inventory listed in cluster
    </div>
  </div>

  {/* Card 2: Total Sold */}
  <div className="bg-card border border-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-blue-500/40 transition-all duration-200">
    <div>
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
        Total Sold
      </span>
      <h3 className="text-3xl font-poppins font-bold text-blue-500">
        {totalSold}
      </h3>
    </div>
    <div className="text-[11px] text-muted-foreground mt-2 font-medium">
      Properties closed successfully
    </div>
  </div>

  {/* Card 3: Total Rented */}
  <div className="bg-card border border-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-purple-500/40 transition-all duration-200">
    <div>
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
        Total Rented
      </span>
      <h3 className="text-3xl font-poppins font-bold text-purple-500">
        {totalRented}
      </h3>
    </div>
    <div className="text-[11px] text-muted-foreground mt-2 font-medium">
      Active leases and shortlet returns
    </div>
  </div>

  {/* Card 4: Today's Sales Volume */}
  <div className="bg-card border border-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-green-500/40 transition-all duration-200 bg-gradient-to-br from-card to-green-500/5">
    <div>
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
        Today's Revenue Volume
      </span>
      <h3 className="text-2xl font-poppins font-bold text-green-500 truncate">
        {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(todaysSalesVolume)}
      </h3>
    </div>
    <div className="text-[11px] text-green-600 dark:text-green-400 mt-2 font-medium">
      Real-time closed deals volume today
    </div>
  </div>

</div>


        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Manage Listings</h2>
              <button
                onClick={() => setIsListingModalOpen(true)}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors text-sm shadow-green">
                <Plus size={16} />
                Add Listing
              </button>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead className="bg-secondary/50 border-b border-border">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">No.</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">Image</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">Title</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">Address</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">Type</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">Price</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {listings?.map(item => (
                      <tr key={item._id} className="hover:bg-secondary/20 transition-colors">
                        <td className="p-4 text-sm text-muted-foreground">{count++}</td>
                        <td className="p-4">
                          <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded object-cover border border-border" />
                        </td>
                        <td className="p-4 text-sm font-medium text-foreground">{item.name}</td>
                        <td className="p-4 text-sm text-muted-foreground">{item.address}</td>
                        <td className="p-4 text-sm text-foreground capitalize">{item.type}</td>
                        <td className="p-4 text-sm text-muted-foreground">₦{item.regularPrice.toLocaleString()}</td>
                        <td className="p-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                            onClick={() => handleOpenEditModal(item)} 
                            ><Edit2 size={16} /></button>
                            <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                            onClick={() =>  handleDeleteListing(item)}
                            ><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Manage Videos</h2>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors text-sm shadow-green">
                <Plus size={16} />
                Add Video
              </button>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead className="bg-secondary/50 border-b border-border">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">ID</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">Title</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground">URL</th>
                      <th className="p-4 text-sm font-semibold text-muted-foreground text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {videos.map(item => (
                      <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="p-4 text-sm text-foreground">#{item.id}</td>
                        <td className="p-4 text-sm font-medium text-foreground">{item.title}</td>
                        <td className="p-4 text-sm text-blue-500 hover:underline"><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"><Edit2 size={16} /></button>
                            <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Listing Modal */}
      {isListingModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-start justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-card w-full max-w-3xl rounded-2xl shadow-xl mb-12">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Add New Listing</h3>
              <button onClick={() => setIsListingModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitListing} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Name / Title *</label>
                  <input required name="name" value={listingData.name} onChange={handleListingChange} type="text" className="w-full px-3 py-2 border rounded-lg bg-background text-foreground" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Type *</label>
                  <select required name="type" value={listingData.type} onChange={handleListingChange} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground">
                    <option value="sale">Sale</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Description *</label>
                  <textarea required name="description" value={listingData.description} onChange={handleListingChange} rows={3} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Address *</label>
                  <input required name="address" value={listingData.address} onChange={handleListingChange} type="text" className="w-full px-3 py-2 border rounded-lg bg-background text-foreground" />
                </div>

                 <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">State *</label>
                  <input required name="state" value={listingData.state} onChange={handleListingChange} type="text" className="w-full px-3 py-2 border rounded-lg bg-background text-foreground" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Regular Price *</label>
                  <input required name="regularPrice" value={listingData.regularPrice} onChange={handleListingChange} type="number" min="0" className="w-full px-3 py-2 border rounded-lg bg-background text-foreground" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Discount Price</label>
                  <input required name="discountPrice" value={listingData.discountPrice} onChange={handleListingChange} type="number" min="0" className="w-full px-3 py-2 border rounded-lg bg-background text-foreground" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Bedrooms</label>
                  <input required name="bedrooms" value={listingData.bedrooms} onChange={handleListingChange} type="number" min="0" className="w-full px-3 py-2 border rounded-lg bg-background text-foreground" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Bathrooms</label>
                  <input required name="bathrooms" value={listingData.bathrooms} onChange={handleListingChange} type="number" min="0" className="w-full px-3 py-2 border rounded-lg bg-background text-foreground" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Status</label>
                  <select name="status" value={listingData.status} onChange={handleListingChange} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground">
                    <option value="active">Active</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Area(sqrt)</label>
                  <input required name="sqft" value={listingData.sqft} onChange={handleListingChange} type="number" min="0" className="w-full px-3 py-2 border rounded-lg bg-background text-foreground" />
                </div>
              </div>



              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" name="furnished" checked={listingData.furnished} onChange={handleListingChange} className="w-4 h-4 text-primary" />
                  Furnished
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" name="parking" checked={listingData.parking} onChange={handleListingChange} className="w-4 h-4 text-primary" />
                  Parking Spot
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" name="offer" checked={listingData.offer} onChange={handleListingChange} className="w-4 h-4 text-primary" />
                  Special Offer
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" name="featured" checked={listingData.featured} onChange={handleListingChange} className="w-4 h-4 text-primary" />
                  <b>Featured</b>(to be displayed on home screen)
                </label>
              </div>

              <div className="space-y-4 pt-2">
  <label className="text-sm font-medium text-foreground block">
    Upload Property Images (Select one or multiple)
  </label>
  
  {/* Native Drag/Drop and Multi-file Selector */}
  <div className="border-2 border-dashed border-border rounded-xl p-4 text-center bg-secondary/10 hover:bg-secondary/20 transition-all relative">
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={handleImageFileSelect}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
    <p className="text-sm text-muted-foreground">
      Click or drag images here to add them to this listing
    </p>
  </div>

  {/* Display files currently staged for upload */}
  {selectedImageFiles.length > 0 && (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Selected Files ({selectedImageFiles.length})
      </p>
      
      <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
        {selectedImageFiles.map((file, i) => (
          <div 
            key={`file-select-${i + 1}`} 
            className="flex items-center justify-between bg-card border border-border p-2 rounded-lg gap-3"
          >
            <div className="flex items-center gap-2 truncate">
              {/* Optional: Simple inline client-side thumbnail preview */}
              <img 
                src={URL.createObjectURL(file)} 
                alt="preview" 
                className="w-10 h-10 rounded object-cover flex-shrink-0"
                onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
              />
              <span className="text-sm text-foreground truncate max-w-xs md:max-w-md">
                {file.name}
              </span>
            </div>
            
            <button 
              type="button" 
              onClick={() => removeSelectedImageFile(i)} 
              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-950 transition-colors flex-shrink-0"
              aria-label="Remove image"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )}
</div>


              <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
                <button type="button" onClick={() => setIsListingModalOpen(false)} className="px-5 py-2.5 rounded-lg font-medium text-foreground hover:bg-secondary transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 rounded-lg font-medium bg-primary text-white hover:bg-primary-dark transition-colors disabled:opacity-70">
                  {isSubmitting ? 'Saving...' : 'Save Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditListingModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
  <div className="bg-card w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
    {/* Sticky Header */}
    <div className="flex justify-between items-center p-4 border-b border-border flex-shrink-0">
      <h3 className="text-lg font-bold text-foreground">Edit Listing</h3>
      <button onClick={() => setIsEditListingModalOpen(false)} className="text-muted-foreground hover:text-foreground">
        <X size={20} />
      </button>
    </div>

    {/* Scrollable Form Area */}
    <form onSubmit={handleEditListing} className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
      
      {/* Dense 3-Column Input Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="space-y-1 col-span-2">
          <label className="font-medium text-muted-foreground">Name / Title *</label>
          <input required name="name" value={listingData.name} onChange={handleListingChange} type="text" className="w-full px-2.5 py-1.5 border rounded-lg bg-background text-foreground text-sm" />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-muted-foreground">Type *</label>
          <select required name="type" value={listingData.type} onChange={handleListingChange} className="w-full px-2.5 py-1.5 border rounded-lg bg-background text-foreground text-sm">
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="space-y-1 col-span-2 md:col-span-3">
          <label className="font-medium text-muted-foreground">Description *</label>
          <textarea required name="description" value={listingData.description} onChange={handleListingChange} rows={2} className="w-full px-2.5 py-1.5 border rounded-lg bg-background text-foreground text-sm" />
        </div>

        <div className="space-y-1 col-span-2">
          <label className="font-medium text-muted-foreground">Address *</label>
          <input required name="address" value={listingData.address} onChange={handleListingChange} type="text" className="w-full px-2.5 py-1.5 border rounded-lg bg-background text-foreground text-sm" />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-muted-foreground">State *</label>
          <input required name="state" value={listingData.state} onChange={handleListingChange} type="text" className="w-full px-2.5 py-1.5 border rounded-lg bg-background text-foreground text-sm" />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-muted-foreground">Regular Price *</label>
          <input required name="regularPrice" value={listingData.regularPrice} onChange={handleListingChange} type="number" min="0" className="w-full px-2.5 py-1.5 border rounded-lg bg-background text-foreground text-sm" />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-muted-foreground">Discount Price</label>
          <input required name="discountPrice" value={listingData.discountPrice} onChange={handleListingChange} type="number" min="0" className="w-full px-2.5 py-1.5 border rounded-lg bg-background text-foreground text-sm" />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-muted-foreground">Area (sqft)</label>
          <input required name="sqft" value={listingData.sqft} onChange={handleListingChange} type="number" min="0" className="w-full px-2.5 py-1.5 border rounded-lg bg-background text-foreground text-sm" />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-muted-foreground">Bedrooms</label>
          <input required name="bedrooms" value={listingData.bedrooms} onChange={handleListingChange} type="number" min="0" className="w-full px-2.5 py-1.5 border rounded-lg bg-background text-foreground text-sm" />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-muted-foreground">Bathrooms</label>
          <input required name="bathrooms" value={listingData.bathrooms} onChange={handleListingChange} type="number" min="0" className="w-full px-2.5 py-1.5 border rounded-lg bg-background text-foreground text-sm" />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-muted-foreground">Status</label>
          <select name="status" value={listingData.status} onChange={handleListingChange} className="w-full px-2.5 py-1.5 border rounded-lg bg-background text-foreground text-sm">
            <option value="active">Active</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
          </select>
        </div>
      </div>

      {/* Grid of Minimal Inline Checkboxes */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/60">
        <label className="flex items-center gap-2 text-foreground cursor-pointer select-none">
          <input type="checkbox" name="furnished" checked={listingData.furnished} onChange={handleListingChange} className="w-3.5 h-3.5 rounded text-primary" />
          Furnished
        </label>
        <label className="flex items-center gap-2 text-foreground cursor-pointer select-none">
          <input type="checkbox" name="parking" checked={listingData.parking} onChange={handleListingChange} className="w-3.5 h-3.5 rounded text-primary" />
          Parking Spot
        </label>
        <label className="flex items-center gap-2 text-foreground cursor-pointer select-none">
          <input type="checkbox" name="offer" checked={listingData.offer} onChange={handleListingChange} className="w-3.5 h-3.5 rounded text-primary" />
          Special Offer
        </label>
        <label className="flex items-center gap-2 text-foreground cursor-pointer select-none">
          <input type="checkbox" name="featured" checked={listingData.featured} onChange={handleListingChange} className="w-3.5 h-3.5 rounded text-primary" />
          <span><b>Featured</b> (Display on Home)</span>
        </label>
      </div>

      {/* 1. Live Image Management Row (Deletes asset strings already inside MongoDB) */}
      {listingData.images && listingData.images.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-border/60">
          <label className="font-medium text-muted-foreground block">Active Live Images ({listingData.images.length})</label>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-1 bg-secondary/5 rounded-xl border border-border/40">
            {listingData.images.map((url, i) => (
              <div key={`live-img-${i + 1}`} className="relative w-12 h-12 rounded-lg overflow-hidden group border border-border/60 shadow-sm flex-shrink-0">
                <img src={url} alt="listing" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setListingData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                  className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  title="Delete image reference"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. File Upload Dropzone (For queuing brand new media) */}
      <div className="space-y-2 pt-1 border-t border-border/60">
        <label className="font-medium text-muted-foreground block">Queue New Images</label>
        <div className="border border-dashed border-border rounded-xl p-3 text-center bg-secondary/10 hover:bg-secondary/20 transition-all relative">
          <input type="file" multiple accept="image/*" onChange={handleImageFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <p className="text-muted-foreground text-[11px]">Click or drop replacement images here</p>
        </div>

        {selectedImageFiles.length > 0 && (
          <div className="max-h-28 overflow-y-auto space-y-1 bg-secondary/5 p-1.5 rounded-xl border">
            {selectedImageFiles.map((file, i) => (
              <div key={`file-select-${i + 1}`} className="flex items-center justify-between bg-card border border-border/60 p-1.5 rounded-lg gap-2">
                <div className="flex items-center gap-2 truncate">
                  <img src={URL.createObjectURL(file)} alt="preview" className="w-6 h-6 rounded object-cover flex-shrink-0" onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)} />
                  <span className="truncate max-w-[240px] text-[11px] text-foreground">{file.name}</span>
                </div>
                <button type="button" onClick={() => removeSelectedImageFile(i)} className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors flex-shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex justify-end gap-2 pt-2 border-t border-border flex-shrink-0">
        <button type="button" onClick={() => setIsEditListingModalOpen(false)} className="px-4 py-2 border rounded-xl text-foreground font-medium hover:bg-secondary/20 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark disabled:opacity-50 transition-colors shadow-green">
          {isSubmitting ? 'Saving...' : 'Save Updates'}
        </button>
      </div>
    </form>
  </div>
</div>

   
  )}

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card w-full max-w-md rounded-2xl shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Add New Video</h3>
              <button onClick={() => setIsVideoModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitVideo} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Video Title</label>
                <input required type="text" value={videoData.title} onChange={e => setVideoData(prev => ({ ...prev, title: e.target.value }))} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground" placeholder="e.g. Lagos Land Tour" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">YouTube / Video URL</label>
                <input required type="url" value={videoData.url} onChange={e => setVideoData(prev => ({ ...prev, url: e.target.value }))} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground" placeholder="https://..." />
              </div>

              <div className="flex justify-end gap-3 pt-4 mt-6">
                <button type="button" onClick={() => setIsVideoModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-foreground hover:bg-secondary transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg font-medium bg-primary text-white hover:bg-primary-dark transition-colors disabled:opacity-70">
                  {isSubmitting ? 'Saving...' : 'Save Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
  