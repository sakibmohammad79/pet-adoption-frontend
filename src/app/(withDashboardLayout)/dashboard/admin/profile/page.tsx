'use client';

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import { deepPurple } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import AdminUpdateModal from './components/AdminUpdateModal';
import { useUpdateAdminMutation } from '@/redux/api/adminApi';
import Swal from 'sweetalert2';
import { FormProvider, useForm } from 'react-hook-form';
import PetFile from '@/components/Forms/AutoFileUploader';
import AutoFileUploader from '@/components/Forms/AutoFileUploader';
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { toast } from 'sonner';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const AdminProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: adminData, isLoading, refetch } = useGetMyProfileQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [updateAdmin, { isLoading: isUploading }] = useUpdateAdminMutation();
  const profile = adminData?.profile;


  const fileUploadHandler = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    const imageUrl = result?.data?.url;

    if (imageUrl) {
      const profilePhotoUpdateData = {
        id: profile?.admin?.id,
        data: {
          profilePhoto: imageUrl,
        },
      };
      await updateAdmin(profilePhotoUpdateData);
      refetch();
      toast.success('Profile picture updated successfully!');
    } else {
      toast.error('Image upload failed.');
    }
  } catch (error) {
    console.error("Error uploading to ImgBB:", error);
    toast.error('Could not upload image.');
  }
};



    

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h4">No profile data found.</Typography>
      </Box>
    );
  }

  const fullName = `${profile?.admin?.firstName} ${profile?.admin?.lastName}`;
  const birthDate = formatDate(profile?.admin?.birthDate);
  const createdAt = formatDate(profile?.admin?.createdAt);
  const updatedAt = formatDate(profile?.admin?.updatedAt);

  return (
    <Box sx={{ width: '100%', minHeight: '90vh', py: 8, px: { xs: 3, md: 12 } }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 4,
          boxShadow: 4,
          p: { xs: 4, md: 6 },
          maxWidth: '1300px',
          mx: 'auto',
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} md={4} textAlign="center">
            {profile?.admin?.profilePhoto ? (
              <Avatar
                alt={fullName}
                src={profile?.admin?.profilePhoto}
                sx={{ width: 150, height: 150, mx: 'auto' }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  bgcolor: deepPurple[500],
                  fontSize: 48,
                  mx: 'auto',
                }}
              >
                {profile?.admin?.firstName?.charAt(0).toUpperCase()}
              </Avatar>
            )}

      {isUploading ? (
            <Box
              sx={{
                mt: 2,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <AutoFileUploader
                name="file"
                label="choose your profile photo"
                icon={<CloudUploadIcon />}
                onFileUpload={fileUploadHandler}
                variant="text"
              ></AutoFileUploader>
            </Box>
          )}

            <Typography variant="h4" fontWeight={700} mt={3}>
              {fullName}
            </Typography>
            <Typography variant="h6" color="textSecondary" mt={1}>
              Role: <span style={{ color: '#FF6B00' }}>{profile?.role}</span>
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {[ 
                { label: 'Email', value: profile?.email },
                { label: 'Contact Number', value: profile?.admin?.contactNumber },
                { label: 'Gender', value: profile?.admin?.gender },
                { label: 'Birth Date', value: birthDate },
                { label: 'Address', value: profile?.admin?.address },
                {
                  label: 'Account Status',
                  value: profile?.status,
                  color: profile?.status === 'ACTIVE' ? 'green' : 'red',
                },
                { label: 'Created At', value: createdAt },
                { label: 'Last Updated', value: updatedAt },
              ].map((item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Box
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      p: 2,
                      transition: '0.3s',
                      '&:hover': {
                        boxShadow: 3,
                        borderColor: '#FF6B00',
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      fontWeight={600}
                      gutterBottom
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color={item.color || '#1e293b'}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={6}>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="contained"
            size="large"
            startIcon={<EditIcon />}
            sx={{
              backgroundColor: '#FF6B00',
              fontWeight: 600,
              fontSize: 16,
              px: 3,
              py: 1.4,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)',
              '&:hover': {
                backgroundColor: '#e45f00',
              },
            }}
          >
            Update Profile
          </Button>
          <AdminUpdateModal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            id={profile?.admin?.id}
            data={profile?.admin}
            refetch={refetch}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminProfile;
