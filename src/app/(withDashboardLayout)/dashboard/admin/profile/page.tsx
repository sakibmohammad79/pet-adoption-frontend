'use client';

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  IconButton,
  Divider,
} from '@mui/material';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import {
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  AccountCircle as AccountIcon,
  Update as UpdateIcon,
  CameraAlt as CameraIcon,
  Badge as BadgeIcon,
  CloudUpload as CloudUploadIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import AdminUpdateModal from './components/AdminUpdateModal';
import AutoFileUploader from '@/components/Forms/AutoFileUploader';
import { useUpdateAdminMutation } from '@/redux/api/adminApi';
import { toast } from 'sonner';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const AdminProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: adminData, isLoading, refetch } = useGetMyProfileQuery({}, { refetchOnMountOrArgChange: true });
  const profile = adminData?.profile;

  const [updateAdmin, { isLoading: isUploading }] = useUpdateAdminMutation();

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #FF6B00 0%, #FF8E53 100%)',
        }}
      >
        <CircularProgress size={60} sx={{ color: 'white' }} />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #FF6B00 0%, #FF8E53 100%)',
        }}
      >
        <Typography variant="h4" color="white">No profile data found.</Typography>
      </Box>
    );
  }

  const fullName = `${profile?.admin?.firstName} ${profile?.admin?.lastName}`;
  const birthDate = formatDate(profile?.admin?.birthDate);
  const createdAt = formatDate(profile?.admin?.createdAt);
  const updatedAt = formatDate(profile?.admin?.updatedAt);

  const profileDetails = [
    { 
      label: 'Email Address', 
      value: profile?.email, 
      icon: <EmailIcon sx={{ color: '#FF6B00' }} />,
      color: '#FF6B00'
    },
    { 
      label: 'Contact Number', 
      value: profile?.admin?.contactNumber, 
      icon: <PhoneIcon sx={{ color: '#FF8E53' }} />,
      color: '#FF8E53'
    },
    { 
      label: 'Gender', 
      value: profile?.admin?.gender, 
      icon: <PersonIcon sx={{ color: '#4CAF50' }} />,
      color: '#4CAF50'
    },
    { 
      label: 'Birth Date', 
      value: birthDate, 
      icon: <CalendarIcon sx={{ color: '#FF9800' }} />,
      color: '#FF9800'
    },
    { 
      label: 'Address', 
      value: profile?.admin?.address, 
      icon: <LocationIcon sx={{ color: '#9C27B0' }} />,
      color: '#9C27B0'
    },
    {
      label: 'Account Status',
      value: profile?.status,
      icon: <AccountIcon sx={{ color: profile?.status === 'ACTIVE' ? '#4CAF50' : '#F44336' }} />,
      color: profile?.status === 'ACTIVE' ? '#4CAF50' : '#F44336',
      isStatus: true
    },
    { 
      label: 'Member Since', 
      value: createdAt, 
      icon: <CalendarIcon sx={{ color: '#2196F3' }} />,
      color: '#2196F3'
    },
    { 
      label: 'Last Updated', 
      value: updatedAt, 
      icon: <UpdateIcon sx={{ color: '#607D8B' }} />,
      color: '#607D8B'
    },
  ];

  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        background: 'linear-gradient(135deg, #FF6B00 0%, #FF8E53 100%)',
        minHeight: '100vh',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            👑 Admin Profile
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.9)" fontWeight={300}>
            Manage your administrative account information
          </Typography>
        </Box>

        <Grid container spacing={4} maxWidth="1200px" mx="auto">
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={8}
              sx={{
                borderRadius: 4,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                height: 'fit-content',
                position: 'sticky',
                top: 20,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack alignItems="center" spacing={3}>
                  <Box sx={{ position: 'relative' }}>
                    {profile?.admin?.profilePhoto ? (
                      <Avatar
                        alt={fullName}
                        src={profile?.admin?.profilePhoto}
                        sx={{ 
                          width: 120, 
                          height: 120,
                          border: '4px solid',
                          borderColor: '#FF6B00',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          background: 'linear-gradient(135deg, #FF6B00, #FF8E53)',
                          fontSize: 48,
                          fontWeight: 'bold',
                          border: '4px solid white',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                        }}
                      >
                        {profile?.admin?.firstName?.charAt(0).toUpperCase()}
                      </Avatar>
                    )}
                    
                    {/* Camera Icon for Photo Upload */}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        bgcolor: '#FF6B00',
                        color: 'white',
                        width: 40,
                        height: 40,
                        '&:hover': {
                          bgcolor: '#e45f00',
                        },
                      }}
                    >
                      <CameraIcon />
                    </IconButton>
                  </Box>

                  {/* Upload Section */}
                  {isUploading ? (
                    <Box sx={{ mt: 2 }}>
                      <CircularProgress size={24} />
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        Uploading...
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <AutoFileUploader
                        name="file"
                        label="Update Profile Photo"
                        icon={<CloudUploadIcon />}
                        onFileUpload={fileUploadHandler}
                        variant="contained"
                        // size="small"
                        sx={{
                          borderColor: '#FF6B00',
                          color: '#FF6B00',
                          '&:hover': {
                            borderColor: '#e45f00',
                            bgcolor: 'rgba(255, 107, 0, 0.04)'
                          }
                        }}
                      />
                    </Box>
                  )}

                  <Box textAlign="center">
                    <Typography variant="h4" fontWeight="bold" color="#2C3E50">
                      {fullName}
                    </Typography>
                    <Chip
                      icon={<AdminIcon />}
                      label={`${profile?.role} Administrator`}
                      sx={{
                        bgcolor: '#FFF3E0',
                        color: '#FF6B00',
                        fontWeight: 600,
                        mt: 1,
                        px: 2
                      }}
                    />
                  </Box>

                  <Divider sx={{ width: '100%' }} />

                  {/* Quick Stats */}
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" fontWeight="bold" color="#2C3E50" mb={2}>
                      Account Overview
                    </Typography>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          Account Status
                        </Typography>
                        <Chip
                          label={profile?.status}
                          size="small"
                          sx={{
                            bgcolor: profile?.status === 'ACTIVE' ? '#E8F5E8' : '#FFEBEE',
                            color: profile?.status === 'ACTIVE' ? '#4CAF50' : '#F44336',
                            fontWeight: 600
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          Admin Since
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {createdAt}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Update Button */}
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="contained"
                    fullWidth
                    startIcon={<EditIcon />}
                    sx={{
                      background: 'linear-gradient(45deg, #FF6B00, #FF8E53)',
                      borderRadius: 3,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: 16,
                      boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 16px rgba(255, 107, 0, 0.4)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Update Profile
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Profile Details */}
          <Grid item xs={12} md={8}>
            <Card
              elevation={8}
              sx={{
                borderRadius: 4,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" color="#2C3E50" mb={4}>
                  Profile Information
                </Typography>
                
                <Grid container spacing={3}>
                  {profileDetails.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card
                        elevation={2}
                        sx={{
                          borderRadius: 3,
                          transition: 'all 0.3s ease',
                          border: '1px solid',
                          borderColor: 'rgba(0,0,0,0.08)',
                          '&:hover': {
                            boxShadow: 4,
                            borderColor: item.color,
                            transform: 'translateY(-2px)'
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                bgcolor: `${item.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {item.icon}
                            </Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              fontWeight={600}
                              sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
                            >
                              {item.label}
                            </Typography>
                          </Stack>
                          
                          {item.isStatus ? (
                            <Chip
                              label={item.value || 'N/A'}
                              sx={{
                                bgcolor: `${item.color}15`,
                                color: item.color,
                                fontWeight: 600,
                                fontSize: '0.875rem'
                              }}
                            />
                          ) : (
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              color="#2C3E50"
                              sx={{
                                wordBreak: 'break-word',
                                minHeight: '1.5em'
                              }}
                            >
                              {item.value || 'Not provided'}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Additional Actions */}
                <Divider sx={{ my: 4 }} />
                
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#2C3E50" mb={3}>
                    Quick Actions
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => setIsModalOpen(true)}
                    sx={{
                      borderColor: '#FF6B00',
                      color: '#FF6B00',
                      borderRadius: 3,
                      py: 1,
                      '&:hover': {
                        borderColor: '#e45f00',
                        bgcolor: 'rgba(255, 107, 0, 0.04)'
                      }
                    }}
                  >
                    Edit Information
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Update Modal */}
        <AdminUpdateModal 
          open={isModalOpen} 
          setOpen={setIsModalOpen} 
          id={profile?.admin?.id}
          data={profile?.admin}  
          refetch={refetch}
        />
      </Box>
    </Box>
  );
};

export default AdminProfile;