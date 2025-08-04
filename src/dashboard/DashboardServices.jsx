

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css';

const DashboardServices = () => {
  // State variables for form inputs and management
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // State variables for UI feedback
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch services from the API
  const fetchServices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Token is missing. Please log in.');
        setLoading(false);
        return;
      }
      const response = await axios.get('https://theway4business.27lashabab.com/api/services', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(response.data);
      setLoading(false);
    } catch (err) {
      setErrorMessage('❌ An error occurred while fetching services.');
      console.error('Error fetching services:', err.response?.data || err);
      setLoading(false);
    }
  };

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Handle form submission for both creation and editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Form validation
    if (!title.trim() || !description.trim() || !price.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (!editingId && !mainImage) {
      setErrorMessage('Please select a main image for the new service.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    if (mainImage) {
      formData.append('main_image', mainImage);
      // Based on previous API behavior, the same image might be used for a different field
      formData.append('inner_image', mainImage);
      // إضافة الصورة إلى حقل 'images' المطلوب من قبل الـ API
      formData.append('images[]', mainImage);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('Token is missing. Please log in.');
      return;
    }

    try {
      if (editingId) {
        // Update an existing service using PUT method
        formData.append('_method', 'POST');
        await axios.post(
          `https://theway4business.27lashabab.com/api/services/update/${editingId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage('✔ Service updated successfully!');
      } else {
        // Create a new service using POST method
        // تم تعديل نقطة النهاية من 'api/services' إلى 'api/services/create'
        await axios.post(
          'https://theway4business.27lashabab.com/api/services/create',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage('✔ Service created successfully!');
      }

      // Reset form and states
      setTitle('');
      setDescription('');
      setPrice('');
      setMainImage(null);
      setEditingId(null);
      e.target.reset();
      fetchServices(); // Refresh the list of services
    } catch (err) {
      let errorMsg = 'An unknown error occurred.';
      if (err.response) {
        const serverErrors = err.response.data.errors;
        if (serverErrors) {
          errorMsg = Object.values(serverErrors).flat().join(' ');
        } else if (err.response.data.message) {
          errorMsg = err.response.data.message;
        } else {
          errorMsg = `Server responded with status: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMsg = 'No response received from the server. Check your network connection.';
      } else {
        errorMsg = err.message;
      }
      
      setErrorMessage(`❌ An error occurred: ${errorMsg}`);
      console.error(`Error ${editingId ? 'updating' : 'creating'} service:`, err.response?.data || err);
    }
  };

  // Handle setting a service for editing
  const handleEdit = (service) => {
    setEditingId(service.id);
    setTitle(service.title);
    setDescription(service.description);
    setPrice(service.price);
    setMainImage(null); // The user will need to re-select an image to change it
    setSuccessMessage('');
    setErrorMessage('');
  };

  // Handle deleting a service
  const handleDelete = async (id) => {
    // Note: window.confirm() is used here for simplicity. 
    // For a production app, a custom modal is recommended.
    if (!confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Token is missing. Please log in.');
        return;
      }
      await axios.delete(`https://theway4business.27lashabab.com/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage('✔ Service deleted successfully!');
      fetchServices();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      setErrorMessage(`❌ An error occurred while deleting the service: ${errorMsg}`);
      console.error('Error deleting service:', err.response?.data || err);
    }
  };

  // Cancel the edit mode and reset the form
  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setPrice('');
    setMainImage(null);
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Create/Edit Service Form */}
      <div className="bg-gray-700 text-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? 'Update Service' : 'Create New Service'}
        </h2>

        {successMessage && <p className="text-green-500 mb-3">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mb-3">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              className="w-full border border-gray-600 p-2 rounded text-black focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              className="w-full border border-gray-600 p-2 rounded text-black focus:outline-none resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              step="0.01"
              className="w-full border border-gray-600 p-2 rounded text-black focus:outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Main Image</label>
            <input
              type="file"
              className="w-full text-white"
              accept="image/*"
              onChange={(e) => setMainImage(e.target.files[0])}
              required={!editingId}
            />
          </div>

          <div className="flex space-x-4 justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition-colors"
            >
              {editingId ? 'Update Service' : 'Create New Service'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Services List */}
      <div className="bg-gray-700 text-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">All Services</h2>
        
        {loading ? (
          <div className="text-center text-lg">
            <i className="fas fa-spinner fa-spin mr-2"></i>
            <span>Loading...</span>
          </div>
        ) : errorMessage && !successMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow border border-gray-600 overflow-hidden relative">
                <img
                  src={service.main_image_url}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 text-black">{service.title}</h3>
                  <p className="text-black text-sm mb-2">{service.description}</p>
                  <p className="text-black font-bold">{service.price} EGP</p>
                </div>
                <div className="absolute top-2 right-2 space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-white p-2 rounded-full transition-colors bg-blue-600 hover:underline hover:bg-blue-700"
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center">لا توجد خدمات متاحة حالياً.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardServices;
