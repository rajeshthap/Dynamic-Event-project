// src/components/RegistrationModal.js
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Button, Alert, Dropdown, Row, Col, Image, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/registration.css';

const RegistrationModal = ({ show, handleClose }) => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    user_type: 'individual', // Default to individual
    team_name: '', // Empty string for organization name
    profile_image: null,
    profile_image_preview: '',
    full_name: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    date_of_birth: '',
    country: '',
    state: '',
    city: '',
    phone: '',
    address: '',
    introduction: '',
    talent_scope: [],
    social_media_links: [''],
    additional_links: [''],
    portfolio_links: [''],
    // Certificate fields
    selected_certificates: [], // To track which certificates are selected
    national_level_certificate: null,
    internation_level_certificate_award: null,
    state_level_certificate: null,
    district_level_certificate: null,
    college_level_certificate: null,
    other_certificate: null,
    agreeTerms: false
  });

  // Verification form state
  const [verificationCode, setVerificationCode] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  
  // UI state
  const [currentStep, setCurrentStep] = useState('registration'); // 'registration' or 'verification'
  
  // Validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [apiResponse, setApiResponse] = useState(null); // To store detailed API response for debugging
  const [countdown, setCountdown] = useState(0); // For resend code countdown
  
  // Ref for file inputs
  const fileInputRef = useRef(null);
  const certificateFileRefs = {
    national_level_certificate: useRef(null),
    internation_level_certificate_award: useRef(null),
    state_level_certificate: useRef(null),
    district_level_certificate: useRef(null),
    college_level_certificate: useRef(null),
    other_certificate: useRef(null)
  };

  // Certificate options
  const certificateOptions = [
    { id: 'national_level_certificate', label: 'National Level Certificate' },
    { id: 'internation_level_certificate_award', label: 'International Level Certificate/Award' },
    { id: 'state_level_certificate', label: 'State Level Certificate' },
    { id: 'district_level_certificate', label: 'District Level Certificate' },
    { id: 'college_level_certificate', label: 'College Level Certificate' },
    { id: 'other_certificate', label: 'Other Certificate' }
  ];

  // Talent scope options
  const talentOptions = [
    'Dancing',
    'Acting',
    'Singing',
    'Music',
    'scripting Writing',
    'Photography',
    'Python',
    'Django',
    'React',
    'Node.js'
  ];

  // Form validation for registration
  const validateForm = () => {
    const newErrors = {};

    // Team name validation (only for organization)
    if (formData.user_type === 'organization' && !formData.team_name.trim()) {
      newErrors.team_name = 'Team name is required for organization registration';
    }

    // Profile image validation
    if (!formData.profile_image) {
      newErrors.profile_image = 'Profile image is required';
    }

    // Full name validation
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.full_name)) {
      newErrors.full_name = 'Full name should only contain letters and spaces';
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    // Date of birth validation - no future dates (only for individual)
    if (formData.user_type === 'individual') {
      if (!formData.date_of_birth) {
        newErrors.date_of_birth = 'Date of birth is required';
      } else {
        const dob = new Date(formData.date_of_birth);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to beginning of day for accurate comparison
        
        if (dob > today) {
          newErrors.date_of_birth = 'Date of birth cannot be in the future';
        } else {
          const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
          if (age < 13) {
            newErrors.date_of_birth = 'You must be at least 13 years old to register';
          }
        }
      }
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // Phone validation - exactly 10 digits
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Talent scope validation
    if (formData.talent_scope.length === 0) {
      newErrors.talent_scope = 'Please select at least one talent scope';
    }

    // Social media links validation
    const validSocialMediaLinks = formData.social_media_links.filter(link => link.trim() !== '');
    if (validSocialMediaLinks.length === 0) {
      newErrors.social_media_links = 'Please add at least one social media link';
    } else {
      const linkErrors = [];
      validSocialMediaLinks.forEach((link, index) => {
        if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(link)) {
          linkErrors[index] = 'Please enter a valid URL';
        }
      });
      if (linkErrors.length > 0) {
        newErrors.social_media_links = linkErrors;
      }
    }

    // Additional links validation
    const validAdditionalLinks = formData.additional_links.filter(link => link.trim() !== '');
    if (validAdditionalLinks.length > 0) {
      const linkErrors = [];
      validAdditionalLinks.forEach((link, index) => {
        if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(link)) {
          linkErrors[index] = 'Please enter a valid URL';
        }
      });
      if (linkErrors.length > 0) {
        newErrors.additional_links = linkErrors;
      }
    }

    // Portfolio links validation
    const validPortfolioLinks = formData.portfolio_links.filter(link => link.trim() !== '');
    if (validPortfolioLinks.length > 0) {
      const linkErrors = [];
      validPortfolioLinks.forEach((link, index) => {
        if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(link)) {
          linkErrors[index] = 'Please enter a valid URL';
        }
      });
      if (linkErrors.length > 0) {
        newErrors.portfolio_links = linkErrors;
      }
    }

    // Introduction validation
    if (!formData.introduction.trim()) {
      newErrors.introduction = 'Please introduce yourself';
    } else if (formData.introduction.length < 50) {
      newErrors.introduction = 'Introduction must be at least 50 characters long';
    } else if (formData.introduction.length > 500) {
      newErrors.introduction = 'Introduction must be less than 500 characters';
    }

    // Terms agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Verification form validation
  const validateVerificationForm = () => {
    const newErrors = {};
    
    if (!verificationCode.trim()) {
      newErrors.verificationCode = 'Verification code is required';
    } else if (!/^[0-9]{6}$/.test(verificationCode)) {
      newErrors.verificationCode = 'Verification code must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change for registration form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Special handling for different fields
    let processedValue = value;
    
    if (name === 'phone') {
      // Only allow digits for phone, max 10
      processedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    } else if (name === 'full_name') {
      // Only allow letters and spaces for name
      processedValue = value.replace(/[^a-zA-Z\s]/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle user type change
  const handleUserTypeChange = (userType) => {
    setFormData(prev => ({
      ...prev,
      user_type: userType,
      // Reset form fields that are specific to each user type
      team_name: userType === 'organization' ? prev.team_name : '',
      date_of_birth: userType === 'individual' ? prev.date_of_birth : ''
    }));

    // Clear errors for fields that are specific to each user type
    if (userType === 'organization') {
      setErrors(prev => ({
        ...prev,
        team_name: '',
        date_of_birth: ''
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        team_name: '',
        date_of_birth: ''
      }));
    }
  };

  // Handle verification code change
  const handleVerificationCodeChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setVerificationCode(value);
    
    // Clear error if it exists
    if (errors.verificationCode) {
      setErrors(prev => ({
        ...prev,
        verificationCode: ''
      }));
    }
  };

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          profile_image: 'Please upload a valid image file (JPEG, JPG, PNG, or GIF)'
        }));
        return;
      }
      
      // Validate file size (max 1MB)
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          profile_image: 'Image size should be less than 1MB'
        }));
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profile_image: file,
          profile_image_preview: reader.result
        }));
      };
      reader.readAsDataURL(file);
      
      // Clear error if it exists
      if (errors.profile_image) {
        setErrors(prev => ({
          ...prev,
          profile_image: ''
        }));
      }
    }
  };

  // Remove profile image
  const removeProfileImage = () => {
    setFormData(prev => ({
      ...prev,
      profile_image: null,
      profile_image_preview: ''
    }));
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle certificate file change
  const handleCertificateFileChange = (certificateType, e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [certificateType]: 'Please upload a valid file (JPEG, JPG, PNG, or PDF)'
        }));
        return;
      }
      
      // Validate file size (max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          [certificateType]: 'File size should be less than 2MB'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        [certificateType]: file
      }));
      
      // Clear error if it exists
      if (errors[certificateType]) {
        setErrors(prev => ({
          ...prev,
          [certificateType]: ''
        }));
      }
    }
  };

  // Remove certificate file
  const removeCertificateFile = (certificateType) => {
    setFormData(prev => ({
      ...prev,
      [certificateType]: null
    }));
    
    // Reset file input
    if (certificateFileRefs[certificateType].current) {
      certificateFileRefs[certificateType].current.value = '';
    }
  };

  // Handle certificate selection
  const handleCertificateSelection = (certificateId) => {
    setFormData(prev => {
      const newSelectedCertificates = prev.selected_certificates.includes(certificateId)
        ? prev.selected_certificates.filter(id => id !== certificateId)
        : [...prev.selected_certificates, certificateId];
      
      // If certificate is being deselected, remove the file
      if (!newSelectedCertificates.includes(certificateId)) {
        return { 
          ...prev, 
          selected_certificates: newSelectedCertificates,
          [certificateId]: null
        };
      }
      
      return { ...prev, selected_certificates: newSelectedCertificates };
    });

    // Clear error if it exists
    if (errors[certificateId]) {
      setErrors(prev => ({
        ...prev,
        [certificateId]: ''
      }));
    }
  };

  // Handle talent scope selection
  const handleTalentScopeChange = (talent) => {
    setFormData(prev => {
      const newTalentScope = prev.talent_scope.includes(talent)
        ? prev.talent_scope.filter(t => t !== talent)
        : [...prev.talent_scope, talent];
      
      return { ...prev, talent_scope: newTalentScope };
    });

    // Clear error if it exists
    if (errors.talent_scope) {
      setErrors(prev => ({
        ...prev,
        talent_scope: ''
      }));
    }
  };

  // Handle social media links
  const handleSocialMediaLinkChange = (index, value) => {
    const newSocialMediaLinks = [...formData.social_media_links];
    newSocialMediaLinks[index] = value;
    setFormData(prev => ({ ...prev, social_media_links: newSocialMediaLinks }));

    // Clear error for this specific link if it exists
    if (errors.social_media_links && Array.isArray(errors.social_media_links) && errors.social_media_links[index]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        if (Array.isArray(newErrors.social_media_links)) {
          newErrors.social_media_links = [...newErrors.social_media_links];
          newErrors.social_media_links[index] = '';
        }
        return newErrors;
      });
    } else if (errors.social_media_links && typeof errors.social_media_links === 'string') {
      // Clear the general social_media_links error if it's a string
      setErrors(prev => ({
        ...prev,
        social_media_links: ''
      }));
    }
  };

  const addSocialMediaLink = () => {
    setFormData(prev => ({
      ...prev,
      social_media_links: [...prev.social_media_links, '']
    }));
  };

  const removeSocialMediaLink = (index) => {
    if (formData.social_media_links.length > 1) {
      const newSocialMediaLinks = [...formData.social_media_links];
      newSocialMediaLinks.splice(index, 1);
      setFormData(prev => ({ ...prev, social_media_links: newSocialMediaLinks }));
    }
  };

  // Handle additional links
  const handleAdditionalLinkChange = (index, value) => {
    const newAdditionalLinks = [...formData.additional_links];
    newAdditionalLinks[index] = value;
    setFormData(prev => ({ ...prev, additional_links: newAdditionalLinks }));

    // Clear error for this specific link if it exists
    if (errors.additional_links && Array.isArray(errors.additional_links) && errors.additional_links[index]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        if (Array.isArray(newErrors.additional_links)) {
          newErrors.additional_links = [...newErrors.additional_links];
          newErrors.additional_links[index] = '';
        }
        return newErrors;
      });
    } else if (errors.additional_links && typeof errors.additional_links === 'string') {
      // Clear the general additional_links error if it's a string
      setErrors(prev => ({
        ...prev,
        additional_links: ''
      }));
    }
  };

  const addAdditionalLink = () => {
    setFormData(prev => ({
      ...prev,
      additional_links: [...prev.additional_links, '']
    }));
  };

  const removeAdditionalLink = (index) => {
    if (formData.additional_links.length > 1) {
      const newAdditionalLinks = [...formData.additional_links];
      newAdditionalLinks.splice(index, 1);
      setFormData(prev => ({ ...prev, additional_links: newAdditionalLinks }));
    }
  };

  // Handle portfolio links
  const handlePortfolioLinkChange = (index, value) => {
    const newPortfolioLinks = [...formData.portfolio_links];
    newPortfolioLinks[index] = value;
    setFormData(prev => ({ ...prev, portfolio_links: newPortfolioLinks }));

    // Clear error for this specific link if it exists
    if (errors.portfolio_links && Array.isArray(errors.portfolio_links) && errors.portfolio_links[index]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        if (Array.isArray(newErrors.portfolio_links)) {
          newErrors.portfolio_links = [...newErrors.portfolio_links];
          newErrors.portfolio_links[index] = '';
        }
        return newErrors;
      });
    } else if (errors.portfolio_links && typeof errors.portfolio_links === 'string') {
      // Clear the general portfolio_links error if it's a string
      setErrors(prev => ({
        ...prev,
        portfolio_links: ''
      }));
    }
  };

  const addPortfolioLink = () => {
    setFormData(prev => ({
      ...prev,
      portfolio_links: [...prev.portfolio_links, '']
    }));
  };

  const removePortfolioLink = (index) => {
    if (formData.portfolio_links.length > 1) {
      const newPortfolioLinks = [...formData.portfolio_links];
      newPortfolioLinks.splice(index, 1);
      setFormData(prev => ({ ...prev, portfolio_links: newPortfolioLinks }));
    }
  };

  // Handle registration form submission
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setApiError('');
      setApiResponse(null);
      
      try {
        // Create FormData for file upload
        const apiFormData = new FormData();
        
        // Add user type
        apiFormData.append('user_type', formData.user_type);
        
        // Add team name if organization
        if (formData.user_type === 'organization') {
          apiFormData.append('team_name', formData.team_name);
        }
        
        // Add all form fields
        apiFormData.append('full_name', formData.full_name);
        apiFormData.append('gender', formData.gender);
        
        if (formData.user_type === 'individual') {
          apiFormData.append('date_of_birth', formData.date_of_birth);
        }
        
        apiFormData.append('email', formData.email);
        apiFormData.append('password', formData.password);
        apiFormData.append('country', formData.country);
        apiFormData.append('state', formData.state);
        apiFormData.append('city', formData.city);
        apiFormData.append('phone', formData.phone);
        apiFormData.append('address', formData.address);
        apiFormData.append('introduction', formData.introduction);
        
        // Add profile image
        if (formData.profile_image) {
          apiFormData.append('profile_image', formData.profile_image);
        }
        
        // Add talent scope as JSON string
        apiFormData.append('talent_scope', JSON.stringify(formData.talent_scope));
        
        // Add social media links as JSON string
        const validSocialMediaLinks = formData.social_media_links.filter(link => link.trim() !== '');
        apiFormData.append('social_media_link', JSON.stringify(validSocialMediaLinks));
        
        // Add additional links as JSON string
        const validAdditionalLinks = formData.additional_links.filter(link => link.trim() !== '');
        if (validAdditionalLinks.length > 0) {
          apiFormData.append('additional_link', JSON.stringify(validAdditionalLinks));
        }
        
        // Add portfolio links as JSON string
        const validPortfolioLinks = formData.portfolio_links.filter(link => link.trim() !== '');
        if (validPortfolioLinks.length > 0) {
          apiFormData.append('portfolio_link', JSON.stringify(validPortfolioLinks));
        }
        
        // Add certificate files
        certificateOptions.forEach(option => {
          if (formData[option.id]) {
            apiFormData.append(option.id, formData[option.id]);
          }
        });

        // Log the form data for debugging
        console.log('Submitting registration data:');
        for (let [key, value] of apiFormData.entries()) {
          console.log(`${key}:`, value);
        }

        // API call with timeout and proper error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        const response = await fetch('https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/reg-user/', {
          method: 'POST',
          body: apiFormData,
          headers: {
            'Accept': 'application/json'
          },
          signal: controller.signal,
          mode: 'cors' // Explicitly set CORS mode
        });
        
        clearTimeout(timeoutId);
        
        // Check if response is OK
        if (!response.ok) {
          // Try to get error details from response
          let errorData;
          try {
            errorData = await response.json();
          } catch (e) {
            // If we can't parse JSON, use status text
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
          }
          
          // Handle different error formats
          if (errorData.message) {
            throw new Error(errorData.message);
          } else if (errorData.error) {
            throw new Error(errorData.error);
          } else if (errorData.errors) {
            // If there are field-specific errors, extract them
            const errorMessages = Object.values(errorData.errors).flat();
            throw new Error(errorMessages.join(', '));
          } else if (errorData.detail) {
            throw new Error(errorData.detail);
          } else {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
          }
        }
        
        // Parse successful response
        const data = await response.json();
        console.log('API Response:', data); // Log the response for debugging
        setApiResponse(data); // Store response for debugging
        
        // On success, move to verification step
        setRegisteredEmail(formData.email);
        setSubmitSuccess(true);
        setIsSubmitting(false);
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            user_type: 'individual',
            team_name: '',
            profile_image: null,
            profile_image_preview: '',
            full_name: '',
            gender: '',
            email: '',
            password: '',
            confirmPassword: '',
            date_of_birth: '',
            country: '',
            state: '',
            city: '',
            phone: '',
            address: '',
            introduction: '',
            talent_scope: [],
            social_media_links: [''],
            additional_links: [''],
            portfolio_links: [''],
            selected_certificates: [],
            national_level_certificate: null,
            internation_level_certificate_award: null,
            state_level_certificate: null,
            district_level_certificate: null,
            college_level_certificate: null,
            other_certificate: null,
            agreeTerms: false
          });
          
          // Reset file inputs
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          
          Object.values(certificateFileRefs).forEach(ref => {
            if (ref.current) {
              ref.current.value = '';
            }
          });
          
          setSubmitSuccess(false);
          setCurrentStep('verification');
        }, 2000);
        
      } catch (error) {
        console.error('Registration error:', error);
        
        // Handle different types of errors
        if (error.name === 'AbortError') {
          setApiError('Request timed out. Please check your connection and try again.');
        } else if (error.message.includes('Failed to fetch')) {
          setApiError('Network error: Unable to connect to the server. Please check your internet connection and try again.');
        } else if (error.message.includes('CORS')) {
          setApiError('Network error: CORS policy issue. Please contact support.');
        } else {
          setApiError(`Error: ${error.message}`);
        }
        
        setIsSubmitting(false);
      }
    }
  };

  // Handle verification form submission
  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    
    if (validateVerificationForm()) {
      setIsSubmitting(true);
      setApiError('');
      
      try {
        // API call with timeout and proper error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        // Payload for email verification - using FormData for file upload compatibility
        const formData = new FormData();
        formData.append('email', registeredEmail);
        formData.append('verification_code', verificationCode);
        
        console.log('Verification payload:', {
          email: registeredEmail,
          verification_code: verificationCode
        });
        
        const response = await fetch('https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/verify-email/', {
          method: 'POST',
          body: formData,
          signal: controller.signal,
          mode: 'cors' // Explicitly set CORS mode
        });
        
        clearTimeout(timeoutId);
        
        // Check if response is OK
        if (!response.ok) {
          // Try to get error details from response
          let errorData;
          try {
            errorData = await response.json();
          } catch (e) {
            // If we can't parse JSON, use status text
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
          }
          
          // Handle different error formats
          if (errorData.message) {
            throw new Error(errorData.message);
          } else if (errorData.error) {
            throw new Error(errorData.error);
          } else if (errorData.detail) {
            throw new Error(errorData.detail);
          } else {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
          }
        }
        
        // Parse successful response
        const data = await response.json();
        console.log('Verification API Response:', data); // Log the response for debugging
        
        // On success
        setVerificationSuccess(true);
        setIsSubmitting(false);
        
        // Navigate to login page after successful verification
        setTimeout(() => {
          handleClose();
          navigate('/login');
        }, 2000);
        
      } catch (error) {
        console.error('Verification error:', error);
        
        // Handle different types of errors
        if (error.name === 'AbortError') {
          setApiError('Request timed out. Please check your connection and try again.');
        } else if (error.message.includes('Failed to fetch')) {
          setApiError('Network error: Unable to connect to the server. Please check your internet connection and try again.');
        } else if (error.message.includes('CORS')) {
          setApiError('Network error: CORS policy issue. Please contact support.');
        } else {
          setApiError(`Error: ${error.message}`);
        }
        
        setIsSubmitting(false);
      }
    }
  };

  // Handle resend verification code
  const handleResendCode = async () => {
    if (countdown > 0) return; // Prevent multiple requests during countdown
    
    setIsSubmitting(true);
    setApiError('');
    setResendSuccess(false);
    
    try {
      // API call with timeout and proper error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch('https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/verify-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: registeredEmail
        }),
        signal: controller.signal,
        mode: 'cors' // Explicitly set CORS mode
      });
      
      clearTimeout(timeoutId);
      
      // Check if response is OK
      if (!response.ok) {
        // Try to get error details from response
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          // If we can't parse JSON, use status text
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        
        // Handle different error formats
        if (errorData.message) {
          throw new Error(errorData.message);
        } else if (errorData.error) {
          throw new Error(errorData.error);
        } else if (errorData.detail) {
          throw new Error(errorData.detail);
        } else {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
      }
      
      // Parse successful response
      const data = await response.json();
      console.log('Resend Code API Response:', data); // Log the response for debugging
      
      // On success
      setResendSuccess(true);
      setIsSubmitting(false);
      
      // Start countdown for 60 seconds
      setCountdown(60);
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Resend code error:', error);
      
      // Handle different types of errors
      if (error.name === 'AbortError') {
        setApiError('Request timed out. Please check your connection and try again.');
      } else if (error.message.includes('Failed to fetch')) {
        setApiError('Network error: Unable to connect to the server. Please check your internet connection and try again.');
      } else if (error.message.includes('CORS')) {
        setApiError('Network error: CORS policy issue. Please contact support.');
      } else {
        setApiError(`Error: ${error.message}`);
      }
      
      setIsSubmitting(false);
    }
  };

  // Reset form when modal is closed
  useEffect(() => {
    if (!show) {
      setErrors({});
      setApiError('');
      setSubmitSuccess(false);
      setVerificationSuccess(false);
      setCurrentStep('registration');
      setVerificationCode('');
      setRegisteredEmail('');
      setResendSuccess(false);
      setApiResponse(null);
      setCountdown(0);
    }
  }, [show]);

  // Get today's date in YYYY-MM-DD format for max attribute
  const today = new Date().toISOString().split('T')[0];

  // Check if links error is a string or array
  const getLinkError = (errorType, index) => {
    if (errors[errorType]) {
      if (Array.isArray(errors[errorType])) {
        return errors[errorType][index];
      }
      return errors[errorType];
    }
    return '';
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered className="registration-modal">
      <Modal.Header closeButton className="registration-modal-header">
        <Modal.Title className="registration-modal-title">
          {currentStep === 'registration' ? 'User Registration' : 'Email Verification'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="registration-modal-body">
        {currentStep === 'registration' ? (
          // Registration Form
          submitSuccess ? (
            <div className="text-center py-4">
              <div className="success-icon mb-3">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
              </div>
              <h4 className="text-success">Registration Successful!</h4>
              <p className="text-muted">Please check your email for verification code.</p>
              <ProgressBar animated now={100} className="mt-3" />
            </div>
          ) : (
            <Form onSubmit={handleRegistrationSubmit}>
              {apiError && <Alert variant="danger">{apiError}</Alert>}
              
              {/* Debug information - remove in production */}
              {process.env.NODE_ENV === 'development' && apiResponse && (
                <Alert variant="info">
                  <strong>Debug Info:</strong>
                  <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                </Alert>
              )}
              
              {/* User Type Selection */}
              <Form.Group className="mb-4">
                <Form.Label className="form-label-custom">Registration Type *</Form.Label>
                <div className="d-flex">
                  <Form.Check
                    type="radio"
                    id="individual-type"
                    name="user_type"
                    label="Individual"
                    checked={formData.user_type === 'individual'}
                    onChange={() => handleUserTypeChange('individual')}
                    className="me-4 user-type-option"
                  />
                  <Form.Check
                    type="radio"
                    id="organization-type"
                    name="user_type"
                    label="Organization"
                    checked={formData.user_type === 'organization'}
                    onChange={() => handleUserTypeChange('organization')}
                    className="user-type-option"
                  />
                     <Form.Group className="mb-4 profile-image-upload">
                <div className="d-flex flex-column align-items-center">
                  {formData.profile_image_preview ? (
                    <div className="position-relative">
                      <Image
                        src={formData.profile_image_preview}
                        alt="Profile Preview"
                        roundedCircle
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 end-0"
                        onClick={removeProfileImage}
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="upload-icon-container d-flex align-items-center justify-content-center"
                      onClick={() => fileInputRef.current.click()}
                      style={{
                        cursor: 'pointer',
                        width: '150px',
                        height: '150px',
                        border: '2px dashed #ccc',
                        borderRadius: '50%',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = '#0d6efd'}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = '#ccc'}
                    >
                      <i className="bi bi-cloud-arrow-up" style={{ fontSize: '3rem', color: '#0d6efd' }}></i>
                    </div>
                  )}
                  <Form.Control
                    type="file"
                    ref={fileInputRef}
                    name="profile_image"
                    onChange={handleProfileImageChange}
                    isInvalid={!!errors.profile_image}
                    accept="image/*"
                    className="profile-image-input d-none"
                  />
                  <Form.Text className="text-muted">
                    {formData.profile_image_preview ? 'Click the image to change' : 'Click the icon to upload a profile picture (JPEG, JPG, PNG, or GIF, max 1MB)'}
                  </Form.Text>
                  <Form.Control.Feedback type="invalid" className="val-error">
                    {errors.profile_image}
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
                </div>
              </Form.Group>
              
              {/* Team Name (only for organization) */}
              {formData.user_type === 'organization' && (
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Team Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="team_name"
                    value={formData.team_name}
                    onChange={handleChange}
                    isInvalid={!!errors.team_name}
                    placeholder="Enter your organization/team name"
                    className="form-control-custom"
                  />
                  <Form.Control.Feedback type="invalid" className='val-error'>
                    {errors.team_name}
                  </Form.Control.Feedback>
                </Form.Group>
              )}
              
              {/* Profile Image Upload */}
           
              
              {/* Full Name and Gender */}
              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      isInvalid={!!errors.full_name}
                      placeholder="Enter your full name"
                      className="form-control-custom"
                    />
                    <Form.Control.Feedback type="invalid" className='val-error'>
                      {errors.full_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Gender *</Form.Label>
                    <div className="d-flex">
                      <Form.Check
                        type="radio"
                        id="gender-male"
                        name="gender"
                        label="Male"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleChange}
                        className="me-3 gender-option"
                      />
                      <Form.Check
                        type="radio"
                        id="gender-female"
                        name="gender"
                        label="Female"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleChange}
                        className="me-3 gender-option"
                      />
                      <Form.Check
                        type="radio"
                        id="gender-other"
                        name="gender"
                        label="Other"
                        value="Other"
                        checked={formData.gender === 'Other'}
                        onChange={handleChange}
                        className="gender-option"
                      />
                    </div>
                    {errors.gender && (
                      <div className="val-error mt-1 text-danger">
                        {errors.gender}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  placeholder="Enter your email"
                  className="form-control-custom"
                />
                <Form.Control.Feedback type="invalid" className='val-error'>
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Password *</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      placeholder="Enter your password"
                      className="form-control-custom"
                    />
                    <Form.Control.Feedback type="invalid" className='val-error'>
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Confirm Password *</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                      placeholder="Confirm your password"
                      className="form-control-custom"
                    />
                    <Form.Control.Feedback type="invalid" className='val-error'>
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Talent Scope *</Form.Label>
                <Dropdown autoClose="outside">
                  <Dropdown.Toggle variant="" id="talent-scope-dropdown" className="dropdown-custom">
                    Select Your Talents
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {talentOptions.map((talent, index) => (
                      <Dropdown.Item key={index} as="div">
                        <Form.Check
                          type="checkbox"
                          id={`talent-${index}`}
                          label={talent}
                          checked={formData.talent_scope.includes(talent)}
                          onChange={() => handleTalentScopeChange(talent)}
                        />
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {formData.talent_scope.length > 0 && (
                  <div className="mt-2">
                    <small className="text-muted">Selected: {formData.talent_scope.join(', ')}</small>
                  </div>
                )}
                {errors.talent_scope && (
                  <div className="val-error mt-1 text-danger">
                    {errors.talent_scope}
                  </div>
                )}
              </Form.Group>

              <Row>
                {/* Date of Birth (only for individual) */}
                {formData.user_type === 'individual' && (
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-custom">Date of Birth *</Form.Label>
                      <Form.Control
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        isInvalid={!!errors.date_of_birth}
                        max={today} // Prevent future dates
                        className="form-control-custom"
                      />
                      <Form.Control.Feedback type="invalid" className='val-error'>
                        {errors.date_of_birth}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}
                <Col md={formData.user_type === 'individual' ? 6 : 12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Phone Number *</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                      placeholder="Enter 10-digit phone number"
                      maxLength={10}
                      className="form-control-custom"
                    />
                    <Form.Control.Feedback type="invalid" className='val-error'>
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Social Media Links *</Form.Label>
                {formData.social_media_links.map((link, index) => (
                  <div key={index} className="d-flex mb-2">
                    <Form.Control
                      type="url"
                      value={link}
                      onChange={(e) => handleSocialMediaLinkChange(index, e.target.value)}
                      isInvalid={!!getLinkError('social_media_links', index)}
                      placeholder="https://github.com/username"
                      className="form-control-custom"
                    />
                    {formData.social_media_links.length > 1 && (
                      <Button
                        variant="outline-danger"
                        className="ms-2"
                        onClick={() => removeSocialMediaLink(index)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={addSocialMediaLink}
                  className="mt-2"
                >
                  + Add Another Link
                </Button>
                {errors.social_media_links && typeof errors.social_media_links === 'string' && (
                  <div className="val-error mt-1 text-danger">
                    {errors.social_media_links}
                  </div>
                )}
              </Form.Group>

           

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Portfolio Links</Form.Label>
                {formData.portfolio_links.map((link, index) => (
                  <div key={index} className="d-flex mb-2">
                    <Form.Control
                      type="url"
                      value={link}
                      onChange={(e) => handlePortfolioLinkChange(index, e.target.value)}
                      isInvalid={!!getLinkError('portfolio_links', index)}
                      placeholder="https://example.com/portfolio"
                      className="form-control-custom"
                    />
                    {formData.portfolio_links.length > 1 && (
                      <Button
                        variant="outline-danger"
                        className="ms-2"
                        onClick={() => removePortfolioLink(index)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={addPortfolioLink}
                  className="mt-2"
                >
                  + Add Another Link
                </Button>
                {errors.portfolio_links && typeof errors.portfolio_links === 'string' && (
                  <div className="val-error mt-1 text-danger">
                    {errors.portfolio_links}
                  </div>
                )}
              </Form.Group>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Country *</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      isInvalid={!!errors.country}
                      placeholder="Country"
                      className="form-control-custom"
                    />
                    <Form.Control.Feedback type="invalid" className='val-error'>
                      {errors.country}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">State *</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      isInvalid={!!errors.state}
                      placeholder="State"
                      className="form-control-custom"
                    />
                    <Form.Control.Feedback type="invalid" className='val-error'>
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">City *</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      isInvalid={!!errors.city}
                      placeholder="City"
                      className="form-control-custom"
                    />
                    <Form.Control.Feedback type="invalid" className='val-error'>
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Address *</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                  placeholder="Enter your full address"
                  className="form-control-custom"
                />
                <Form.Control.Feedback type="invalid" className='val-error'>
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Introduction *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleChange}
                  isInvalid={!!errors.introduction}
                  placeholder={formData.user_type === 'individual' 
                    ? "Tell us about yourself, your experience, and what you hope to achieve..."
                    : "Tell us about your organization, its mission, and what you hope to achieve..."
                  }
                  className="form-control-custom"
                />
                <div className="d-flex justify-content-between">
                  <Form.Control.Feedback type="invalid" className='val-error'>
                    {errors.introduction}
                  </Form.Control.Feedback>
                  <small className={`text-muted ${errors.introduction ? 'mt-4' : ''}`}>
                    {formData.introduction.length}/500 characters
                  </small>
                </div>
              </Form.Group>

              {/* Certificate Selection and Upload */}
              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Certificates</Form.Label>
                <Dropdown autoClose="outside">
                  <Dropdown.Toggle variant="" id="certificate-dropdown" className="dropdown-custom">
                    Select Certificates to Upload
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {certificateOptions.map((option, index) => (
                      <Dropdown.Item key={index} as="div">
                        <Form.Check
                          type="checkbox"
                          id={`certificate-${index}`}
                          label={option.label}
                          checked={formData.selected_certificates.includes(option.id)}
                          onChange={() => handleCertificateSelection(option.id)}
                        />
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {formData.selected_certificates.length > 0 && (
                  <div className="mt-2">
                    <small className="text-muted">Selected: {formData.selected_certificates.map(id => 
                      certificateOptions.find(option => option.id === id)?.label
                    ).join(', ')}</small>
                  </div>
                )}
              </Form.Group>

              {/* Certificate File Uploads */}
              {formData.selected_certificates.map(certificateId => {
                const option = certificateOptions.find(opt => opt.id === certificateId);
                return (
                  <Form.Group key={certificateId} className="mb-3">
                    <Form.Label className="form-label-custom">{option.label} *</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="file"
                        ref={certificateFileRefs[certificateId]}
                        onChange={(e) => handleCertificateFileChange(certificateId, e)}
                        isInvalid={!!errors[certificateId]}
                        accept="image/*,application/pdf"
                        className="me-2 form-control-custom"
                      />
                      {formData[certificateId] && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeCertificateFile(certificateId)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <Form.Text className="text-muted">
                      Upload certificate file (JPEG, JPG, PNG, or PDF, max 2MB)
                    </Form.Text>
                    <Form.Control.Feedback type="invalid" className='val-error'>
                      {errors[certificateId]}
                    </Form.Control.Feedback>
                  </Form.Group>
                );
              })}

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="agree-terms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  isInvalid={!!errors.agreeTerms}
                  label={
                    <span>
                      I agree with the{' '}
                      <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-underline">
                        Terms and Conditions
                      </a>
                      {' '}and{' '}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-underline">
                        Privacy Policy
                      </a>
                    </span>
                  }
                  className="terms-checkbox"
                />
                <Form.Control.Feedback type="invalid" className='val-error'>
                  {errors.agreeTerms}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          )
        ) : (
          // Email Verification Form
          verificationSuccess ? (
            <div className="text-center py-4">
              <div className="success-icon mb-3">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
              </div>
              <h4 className="text-success">Email Verified Successfully!</h4>
              <p className="text-muted">Redirecting to login page...</p>
              <ProgressBar animated now={100} className="mt-3" />
            </div>
          ) : (
            <Form onSubmit={handleVerificationSubmit}>
              {apiError && <Alert variant="danger">{apiError}</Alert>}
              {resendSuccess && <Alert variant="success">Verification code sent successfully!</Alert>}
              
              <div className="text-center mb-4">
                <div className="verification-icon mb-3">
                  <i className="bi bi-envelope-check" style={{ fontSize: '4rem', color: '#0d6efd' }}></i>
                </div>
                <h4 className="mb-3">Verify Your Email</h4>
                <p className="text-muted">
                  We've sent a verification code to <strong>{registeredEmail}</strong>
                </p>
              </div>
              
              <Form.Group className="mb-4">
                <Form.Label className="form-label-custom">Verification Code *</Form.Label>
                <Form.Control
                  type="text"
                  value={verificationCode}
                  onChange={handleVerificationCodeChange}
                  isInvalid={!!errors.verificationCode}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="text-center form-control-custom verification-code-input"
                  style={{ fontSize: '1.5rem', letterSpacing: '0.5rem' }}
                />
                <Form.Control.Feedback type="invalid" className='val-error'>
                  {errors.verificationCode}
                </Form.Control.Feedback>
              </Form.Group>
              
              <div className="text-center mb-4">
                <p className="text-muted">
                  Didn't receive the code?{' '}
                  <Button 
                    variant="link" 
                    className="p-0 resend-code-btn" 
                    onClick={handleResendCode}
                    disabled={isSubmitting || countdown > 0}
                  >
                    {countdown > 0 ? `Resend Code (${countdown}s)` : 'Resend Code'}
                  </Button>
                </p>
              </div>
            </Form>
          )
        )}
      </Modal.Body>
      <Modal.Footer className="registration-modal-footer">
        {currentStep === 'registration' ? (
          <>
            <Button variant="secondary" onClick={handleClose} className="btn-custom-secondary">
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleRegistrationSubmit} 
              disabled={isSubmitting || submitSuccess}
              className="btn-custom-primary"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={handleClose} className="btn-custom-secondary">
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleVerificationSubmit} 
              disabled={isSubmitting || verificationSuccess}
              className="btn-custom-primary"
            >
              {isSubmitting ? 'Verifying...' : 'Verify'}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default RegistrationModal;