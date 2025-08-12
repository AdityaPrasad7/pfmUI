import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import chickenImg from "../../../assets/items/chicken leg piece.png";
import eggImg from "../../../assets/items/egg new.png";
import fishImg from "../../../assets/items/fish black.png";
import muttonImg from "../../../assets/items/mutton blacmu.png";
import prawnsImg from "../../../assets/items/prawns black.png";
import { IconButton, Menu, MenuItem, Card, CardContent, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavigateBtn from '../../../components/button/NavigateBtn';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';

interface CategoryItem {
  id: number;
  name: string;
  image: string;
  // Add any additional fields your category might have
  description?: string;
}

const DisplayCategories: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);
  const navigate = useNavigate();

  const categories: CategoryItem[] = [
    { id: 1, name: 'Chicken', image: chickenImg },
    { id: 2, name: 'Eggs', image: eggImg },
    { id: 3, name: 'Fish', image: fishImg },
    { id: 4, name: 'Mutton', image: muttonImg },
    { id: 5, name: 'Prawns', image: prawnsImg },
  ];

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, item: CategoryItem) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleEdit = () => {
    if (selectedItem) {
      navigate(`/categories/edit/${selectedItem.id}`, {
        state: { category: selectedItem }
      });
    }
    handleClose();
  };

const handleDelete = () => {
  if (!selectedItem) return;

  const confirmDelete = window.confirm(
    `Are you sure you want to delete "${selectedItem.name}"?`
  );

  if (!confirmDelete) return;

  console.log('Deleting item:', selectedItem);

  // Show delete success toast
  toast.success('Product category deleted successfully!', {
    toastId: 'delete-category-success',
  });

  // TODO: Add actual delete logic (state update or API call)
  // Example:
  // setData((prev) => prev.filter((item) => item.id !== selectedItem.id));

  handleClose();
};



  return (
    <>
     <ToastContainer />
    <div className="py-6">
      <div className="mb-8">
        {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5"> */}
         <div className="flex flex-col sm:flex-row md:items-center items-end sm:justify-between gap-5">
          <div className='w-full'>
            <h1 className="text-2xl font-bold text-gray-800">Product Categories</h1>
          </div>
          <NavigateBtn
            to="/categories/add"
            label={
              <span className="flex items-center gap-1 w-[12rem]">
                <AddIcon fontSize="small" />
                <span>Add New Category</span>
              </span>
            }
            // className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.map((item) => (
          <Card key={item.id} className="relative hover:shadow-lg transition-shadow">
            <div className="absolute top-2 right-2">
              <IconButton
                aria-label="more"
                aria-controls={`menu-${item.id}`}
                aria-haspopup="true"
                onClick={(e) => handleMenuClick(e, item)}
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </div>

            <CardContent className="flex flex-col items-center p-4">
              <div className="w-32 h-32 mb-4 flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <Typography variant="h6" className="text-center font-medium">
                {item.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '120px',
          },
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete} className="text-red-500">
          Delete
        </MenuItem>
      </Menu>
    </div>
     </>
  );
};

export default DisplayCategories;