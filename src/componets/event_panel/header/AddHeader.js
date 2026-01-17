import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { FaPlus, FaTrash, FaSave, FaTimes } from "react-icons/fa";

import "../../../assets/css/dashboard.css";

import { useNavigate } from "react-router-dom";
import LeftNav from "../LeftNav";
import DashBoardHeader from "../DashBoardHeader";
import { useAuthFetch } from "../../context/AuthFetch";

const AddHeader = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    company_name: "",
    address: "",
    email: "",
    phone: "",
    logo: null,
    profile_link: [""]
  });
  
  // Form validation and submission state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);

  // Check device width
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setSidebarOpen(width >= 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Handle logo upload
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        logo: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile link changes
  const handleProfileLinkChange = (index, value) => {
    const updatedLinks = [...formData.profile_link];
    updatedLinks[index] = value;
    setFormData({
      ...formData,
      profile_link: updatedLinks
    });
  };

  // Add new profile link field
  const addProfileLink = () => {
    setFormData({
      ...formData,
      profile_link: [...formData.profile_link, ""]
    });
  };

  // Remove profile link field
  const removeProfileLink = (index) => {
    if (formData.profile_link.length > 1) {
      const updatedLinks = formData.profile_link.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        profile_link: updatedLinks
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company name is required";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone number should be 10 digits";
    }
    
    // Check if at least one profile link is provided
    const hasValidLink = formData.profile_link.some(link => link.trim() !== "");
    if (!hasValidLink) {
      newErrors.profile_link = "At least one profile link is required";
    }
    
    return newErrors;
  };

  // Initialize authFetch
  const authFetch = useAuthFetch();
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");
    
    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append('company_name', formData.company_name);
      data.append('address', formData.address);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      
      if (formData.logo) {
        data.append('logo', formData.logo);
      }
      
      // Filter out empty profile links and append them
      const validLinks = formData.profile_link.filter(link => link.trim() !== "");
      validLinks.forEach((link, index) => {
        data.append(`profile_link[${index}]`, link);
      });
      
      // API call using authFetch
      const response = await authFetch('https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/company-detail-item/', {
        method: 'POST',
        body: data
      });
      
      if (!response.ok) {
        throw new Error('Failed to add company details');
      }
      
      const result = await response.json();
      console.log('Success:', result);
      
      setSuccessMessage("Company details added successfully!");
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          company_name: "",
          address: "",
          email: "",
          phone: "",
          logo: null,
          profile_link: [""]
        });
        setLogoPreview(null);
        setSuccessMessage("");
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: "Failed to submit form. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="dashboard-container">
        {/* Left Sidebar */}
        <LeftNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isMobile={isMobile}
          isTablet={isTablet}
        />

        {/* Main Content */}
        <div className="main-content-dash">
          <DashBoardHeader toggleSidebar={toggleSidebar} />

          <Container fluid className="dashboard-body dashboard-main-container">
            <h1 className="page-title">Add Company Details</h1>
            
            {successMessage && (
              <Alert variant="success" className="mb-4">
                {successMessage}
              </Alert>
            )}
            
            {errors.submit && (
              <Alert variant="danger" className="mb-4">
                {errors.submit}
              </Alert>
            )}
            
            <Card className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="company_name">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleInputChange}
                        isInvalid={!!errors.company_name}
                        placeholder="Enter company name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.company_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        isInvalid={!!errors.email}
                        placeholder="Enter email address"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="phone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        isInvalid={!!errors.phone}
                        placeholder="Enter phone number"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="logo">
                      <Form.Label>Company Logo</Form.Label>
                      <Form.Control
                        type="file"
                        name="logo"
                        onChange={handleLogoChange}
                        accept="image/*"
                      />
                      {logoPreview && (
                        <div className="mt-2">
                          <img 
                            src={logoPreview} 
                            alt="Logo preview" 
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group controlId="address" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    isInvalid={!!errors.address}
                    placeholder="Enter company address"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label className="d-flex justify-content-between align-items-center">
                    Profile Links
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={addProfileLink}
                      className="d-flex align-items-center"
                    >
                      <FaPlus className="me-1" /> Add Link
                    </Button>
                  </Form.Label>
                  
                  {errors.profile_link && (
                    <div className="text-danger mb-2">{errors.profile_link}</div>
                  )}
                  
                  {formData.profile_link.map((link, index) => (
                    <div key={index} className="d-flex mb-2">
                      <Form.Control
                        type="url"
                        value={link}
                        onChange={(e) => handleProfileLinkChange(index, e.target.value)}
                        placeholder="https://example.com"
                        className="me-2"
                      />
                      {formData.profile_link.length > 1 && (
                        <Button
                          variant="outline-danger"
                          onClick={() => removeProfileLink(index)}
                          className="d-flex align-items-center"
                        >
                          <FaTrash />
                        </Button>
                      )}
                    </div>
                  ))}
                </Form.Group>
                
                <div className="d-flex justify-content-end">
                  <Button 
                    variant="secondary" 
                    className="me-2"
                    onClick={() => navigate('/dashboard')}
                  >
                    <FaTimes className="me-1" /> Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={isSubmitting}
                    className="d-flex align-items-center"
                  >
                    <FaSave className="me-1" /> 
                    {isSubmitting ? 'Saving...' : 'Save Company'}
                  </Button>
                </div>
              </Form>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
};

export default AddHeader;