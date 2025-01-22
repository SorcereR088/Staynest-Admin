import { useState } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import {
  useAllPropertiesQuery,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} from "../state/api";

// Import all images
import image1 from "../assets/Properties/image1.jpg";
import image2 from "../assets/Properties/image2.jpg";
import image3 from "../assets/Properties/image3.jpg";
import image4 from "../assets/Properties/image4.jpg";
import image5 from "../assets/Properties/image5.jpg";
import image6 from "../assets/Properties/image6.jpg";

// Create an image map
const imageMap = {
  "image1.jpg": image1,
  "image2.jpg": image2,
  "image3.jpg": image3,
  "image4.jpg": image4,
  "image5.jpg": image5,
  "image6.jpg": image6,
};

const AllProperties = () => {
  const { data, isLoading } = useAllPropertiesQuery();
  const [updateProperty] = useUpdatePropertyMutation();
  const [deleteProperty] = useDeletePropertyMutation();
  const [editingProperty, setEditingProperty] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetPropertyId, setTargetPropertyId] = useState(null);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
    setTimeout(
      () => setNotification({ ...notification, visible: false }),
      3000
    ); // Hide after 3 seconds
  };

  const handleEditClick = (property) => {
    setEditingProperty({
      property_id: property.property_id,
      title: property.title,
      price: property.price,
      property_type: property.property_type,
      guests: property.guests,
      bedrooms: property.bedrooms,
    });
  };

  const handleDeleteClick = (propertyId) => {
    setTargetPropertyId(propertyId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!targetPropertyId) return;

    try {
      await deleteProperty(targetPropertyId).unwrap();
      showNotification("Property deleted successfully!", "success");
    } catch (error) {
      console.error("Delete error:", error);
      showNotification("Error deleting property", "error");
    } finally {
      setDeleteModalOpen(false);
      setTargetPropertyId(null);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingProperty?.property_id) return;

    try {
      const updateData = {
        id: editingProperty.property_id,
        title: editingProperty.title,
        price: editingProperty.price,
        property_type: editingProperty.property_type,
        approximate_location: editingProperty.approximate_location,
        guests: editingProperty.guests,
        bedrooms: editingProperty.bedrooms,
      };

      await updateProperty(updateData).unwrap();
      setEditingProperty(null);
      showNotification("Property updated successfully!", "success");
    } catch (error) {
      console.error("Update error:", error);
      showNotification("Error updating property", "error");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative">
      {/* Notification Banner */}
      {notification.visible && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-md ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="relative w-full sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 table-fixed rtl:text-right">
          <thead className="text-xs text-black uppercase bg-gray-50">
            <tr>
              <th scope="col" className="w-20 px-4 py-3">
                P_ID
              </th>
              <th scope="col" className="w-40 px-4 py-3">
                Image
              </th>
              <th scope="col" className="w-40 px-6 py-3">
                Property Name
              </th>
              <th scope="col" className="w-32 px-6 py-3">
                Price
              </th>
              <th scope="col" className="w-40 px-6 py-3">
                Location
              </th>
              <th scope="col" className="w-32 px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((property) => (
              <tr
                key={property.property_id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-semibold text-black truncate">
                  {property.property_id}
                </td>

                <td className="px-2 py-2 truncate">
                  <img
                    className="object-cover h-[80px] w-[80px] rounded-lg"
                    src={
                      property.image_urls && property.image_urls.length > 0
                        ? imageMap[property.image_urls[0]]
                        : image1
                    }
                    alt={property.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = image1;
                    }}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-black truncate">
                  {property.title}
                </td>
                <td className="px-6 py-4 font-semibold text-black truncate">
                  {parseFloat(property.price).toLocaleString()}/night
                </td>
                <td className="px-6 py-4 font-semibold text-black truncate">
                  {property.property_region}
                </td>
                <td className="px-4 py-2 text-sm font-medium whitespace-nowrap">
                  <button
                    className="mr-3 text-indigo-600 hover:text-indigo-900"
                    onClick={() => handleEditClick(property)}
                  >
                    <FaEdit className="inline-block text-lg" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteClick(property.property_id)}
                  >
                    <FaTrash className="inline-block text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Edit Property</h3>
              <button
                onClick={() => setEditingProperty(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={editingProperty.title || ""}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Price per Night
                </label>
                <input
                  type="number"
                  value={editingProperty.price || ""}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      price: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Location
                </label>
                <input
                  type="text"
                  value={editingProperty.approximate_location || ""}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      approximate_location: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end pt-4 space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-75">
          <div className="relative w-full max-w-sm mx-4 bg-white rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4 text-red-600">
                <AiOutlineWarning className="text-4xl" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-center text-gray-900">
                Delete Property
              </h3>
              <p className="text-sm text-center text-gray-500">
                Are you sure you want to delete this property? This action
                cannot be undone.
              </p>
              <div className="flex justify-center mt-6 space-x-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProperties;
