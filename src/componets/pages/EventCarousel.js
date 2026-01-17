// src/components/HeroCarousel.js

import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Showcase from "../../assets/images/education/showcase-6.webp";
import Slide2Image from "../../assets/images/education/activities-1.webp"; 
import Slide3Image from "../../assets/images/education/events-1.webp";
import RegistrationModal from './RegistrationModal'; // Import the modal component
import "../../assets/css/mainstyle.css";

// --- Define the content for each of your 3 slides ---
const carouselSlides = [
  {
    title: "Inspiring Excellence Through Education",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget lacus id tortor facilisis tincidunt.",
    image: Showcase,
    stats: [
      { value: "Michael Rodriguez", label: "Director of Innovation Strategy" },
      { value: "Date & Time", label: "Day 1 - March 15 9:00 AM" },
      { value: "Venue", label: "125 Innovation Boulevard, Chicago" }
    ],
    features: [
      { icon: "bi-book-fill", title: "Innovative Curriculum", content: "Lorem ipsum dolor sit amet." },
      { icon: "bi-laptop-fill", title: "Modern Facilities", content: "Donec gravida risus at sollicitudin.", active: true },
      { icon: "bi-people-fill", title: "Expert Faculty", content: "Vestibulum ante ipsum primis." }
    ],
    event: { day: "15", month: "NOV", title: "Spring Semester Open House", description: "Join us to explore campus." }
  },
  {
    title: "A New Era of Learning",
    subtitle: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    image: Slide2Image,
    stats: [
      { value: "Dr. Emily Carter", label: "Head of Research" },
      { value: "Date & Time", label: "Day 2 - March 16 2:00 PM" },
      { value: "Venue", label: "300 Tech Avenue, Austin, TX" }
    ],
    features: [
      { icon: "bi-cpu-fill", title: "AI-Driven Programs", content: "Exploring the future of tech." },
      { icon: "bi-globe-americas", title: "Global Partnerships", content: "Connecting with institutions worldwide.", active: true },
      { icon: "bi-award-fill", title: "Scholarship Opportunities", content: "Making education accessible." }
    ],
    event: { day: "22", month: "NOV", title: "Tech Innovation Fair", description: "See student projects and startups." }
  },
  {
    title: "Global Community, Local Impact",
    subtitle: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    image: Slide3Image,
    stats: [
      { value: "Prof. David Lee", label: "Dean of Students" },
      { value: "Date & Time", label: "Day 3 - March 17 10:00 AM" },
      { value: "Venue", label: "500 Campus Drive, Boston, MA" }
    ],
    features: [
      { icon: "bi-heart-fill", title: "Student Wellness", content: "Supporting mental and physical health." },
      { icon: "bi-palette-fill", title: "Arts & Culture", content: "A vibrant campus arts scene.", active: true },
      { icon: "bi-trophy-fill", title: "Championship Athletics", content: "Go team name! " }
    ],
    event: { day: "05", month: "DEC", title: "Annual Alumni Gala", description: "Celebrate our alumni achievements." }
  }
];

function EventCarousel() {
  const [index, setIndex] = useState(0);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const openRegistrationModal = (e) => {
    e.preventDefault();
    setShowRegistrationModal(true);
  };

  return (
    <>
      {/* The main carousel component from react-bootstrap */}
      <Carousel activeIndex={index} onSelect={handleSelect} interval={5000} pause="hover">
        
        {/* We map over our data array to create a slide for each item */}
        {carouselSlides.map((slide, slideIndex) => (
          <Carousel.Item key={slideIndex}>
            {/* Inside each Carousel.Item, we place your hero section structure */}
            <section id="hero" className="hero section hero-area-bg">
              <div className="overlay"></div>
              <div className="hero-wrapper">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-6 hero-content" data-aos="fade-right">
                      <h1>{slide.title}</h1>
                      <p>{slide.subtitle}</p>
                      <div className="stats-row">
                        {slide.stats.map((stat, index) => (
                          <div key={index} className="stat-item">
                            <span className="stat-number">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="action-buttons">
                        <a href="/RegistrationModal" className="btn-primary" onClick={openRegistrationModal}>Start Your Journey</a>
                        <a href="#" className="btn-secondary">Virtual Tour</a>
                      </div>
                    </div>
                    <div className="col-lg-6 hero-media" data-aos="zoom-in">
                      <img src={slide.image} alt="Showcase" className="img-fluid" />
                      <div className="image-overlay">
                        <div className="badge-accredited">
                          <i className="bi bi-patch-check-fill"></i>
                          <span>Accredited Excellence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="feature-cards-wrapper" data-aos="fade-up">
                <div className="container">
                  <div className="row gy-4">
                    {slide.features.map((feature, index) => (
                      <div key={index} className="col-lg-4" data-aos="fade-up">
                        <div className={`feature-card ${feature.active ? 'active' : ''}`}>
                          <div className="feature-icon">
                            <i className={`bi ${feature.icon}`}></i>
                          </div>
                          <div className="feature-content">
                            <h3>{feature.title}</h3>
                            <p>{feature.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="upcoming-event" data-aos="fade-up">
                <div className="container">
                  <div className="event-content">
                    <div className="event-date">
                      <span className="day">{slide.event.day}</span>
                      <span className="month">{slide.event.month}</span>
                    </div>
                    <div className="event-info">
                      <h3>{slide.event.title}</h3>
                      <p>{slide.event.description}</p>
                    </div>
                    <div className="event-action">
                      <a href="#" className="btn-event">RSVP Now</a>
                      <span className="countdown">Starts in 3 weeks</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Registration Modal */}
      <RegistrationModal 
        show={showRegistrationModal} 
        handleClose={() => setShowRegistrationModal(false)} 
      />
    </>
  );
}

export default EventCarousel;