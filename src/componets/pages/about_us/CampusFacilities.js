import React from 'react';
import Campus6 from "../../../assets/img/education/campus-6.webp";
import Campus7 from "../../../assets/img/education/campus-7.webp";

function CampusFacilities() {
  return (
    <div>
          <section id="campus-facilities" class="campus-facilities section">

      <div class="container" data-aos="fade-up" data-aos-delay="100">

   
        <div class="hero-intro">
          <div class="row g-0 align-items-center">
            <div class="col-lg-8" data-aos="fade-right" data-aos-delay="200">
              <div class="content-wrapper">
                <div class="badge-highlight">Campus Excellence</div>
                <h1>Discover Our Modern Campus Facilities</h1>
                <p class="lead-text">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; sed viverra mattis dui vel bibendum. Mauris vitae nunc eget lorem consectetur vehicula.</p>
                <div class="feature-highlights">
                  <div class="highlight-item">
                    <i class="bi bi-award"></i>
                    <div>
                      <span class="number">95+</span>
                      <span class="label">Modern Buildings</span>
                    </div>
                  </div>
                  <div class="highlight-item">
                    <i class="bi bi-geo-alt"></i>
                    <div>
                      <span class="number">200</span>
                      <span class="label">Acre Campus</span>
                    </div>
                  </div>
                  <div class="highlight-item">
                    <i class="bi bi-people"></i>
                    <div>
                      <span class="number">25k+</span>
                      <span class="label">Students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4" data-aos="fade-left" data-aos-delay="300">
              <div class="hero-visual">
                <div class="image-stack">
                  <img src= {Campus6} alt="Campus View" class="img-fluid primary-img"/>
                  <div class="floating-card">
                    <i class="bi bi-mortarboard"></i>
                    <span>Academic Excellence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

 
        <div class="facilities-grid" data-aos="fade-up" data-aos-delay="200">
          <div class="category-card academic" data-aos="zoom-in" data-aos-delay="100">
            <div class="card-header">
              <div class="icon-wrapper">
                <i class="bi bi-book"></i>
              </div>
              <h3>Academic Facilities</h3>
            </div>
            <div class="card-content">
              <div class="facility-image">
                <img src= {Campus7} alt="Academic Building" class="img-fluid"/>
              </div>
              <div class="facility-list">
                <div class="facility-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>Advanced Research Labs</span>
                </div>
                <div class="facility-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>Smart Classrooms</span>
                </div>
                <div class="facility-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>Digital Library</span>
                </div>
                <div class="facility-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>Study Lounges</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <a href="#" class="explore-btn">Explore Academic <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="category-card sports" data-aos="zoom-in" data-aos-delay="200">
            <div class="card-header">
              <div class="icon-wrapper">
                <i class="bi bi-trophy"></i>
              </div>
              <h3>Sports Complex</h3>
            </div>
            <div class="card-content">
              <div class="facility-image">
                <img src="assets/img/education/campus-8.webp" alt="Sports Complex" class="img-fluid">
              </div>
              <div class="facility-list">
                <div class="facility-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>Olympic Pool</span>
                </div>
                <div class="facility-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>Gymnasium</span>
                </div>
                <div class="facility-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>Tennis Courts</span>
                </div>
                <div class="facility-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>Fitness Center</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <a href="#" class="explore-btn">Explore Sports <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="category-card residence" data-aos="zoom-in" data-aos-delay="300">
            <div class="card-header">
              <div class="icon-wrapper">
                <i class="bi bi-house-heart"></i>
              </div>
              <h3>Living Spaces</h3>
            </div>
            <div class="card-content">
              <div class="facility-image">
                <img src={Campus} alt="Student Housing" class="img-fluid"/>
              </div>
              <div class="facility-list">
                <div class="facility-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>Modern Dormitories</span>
                </div>
                <div class="facility-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>Common Areas</span>
                </div>
                <div class="facility-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>Dining Halls</span>
                </div>
                <div class="facility-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>Recreation Rooms</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <a href="#" class="explore-btn">Explore Housing <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>

        <!-- Interactive Campus Tour -->
        <div class="campus-tour-section" data-aos="fade-up" data-aos-delay="100">
          <div class="row align-items-center">
            <div class="col-lg-6" data-aos="fade-right" data-aos-delay="200">
              <div class="tour-content">
                <h2>Take a Virtual Campus Tour</h2>
                <p>Cras ultricies ligula sed magna dictum porta. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus suscipit tortor eget felis porttitor volutpat.</p>
                <div class="tour-features">
                  <div class="tour-feature">
                    <i class="bi bi-binoculars"></i>
                    <div>
                      <strong>360° Views</strong>
                      <p>Immersive campus experience</p>
                    </div>
                  </div>
                  <div class="tour-feature">
                    <i class="bi bi-map"></i>
                    <div>
                      <strong>Interactive Map</strong>
                      <p>Navigate with ease</p>
                    </div>
                  </div>
                  <div class="tour-feature">
                    <i class="bi bi-info-circle"></i>
                    <div>
                      <strong>Detailed Info</strong>
                      <p>Learn about each facility</p>
                    </div>
                  </div>
                </div>
                <div class="tour-actions">
                  <a href="#" class="btn-primary">Start Virtual Tour</a>
                  <a href="#" class="btn-outline">Schedule Visit</a>
                </div>
              </div>
            </div>
            <div class="col-lg-6" data-aos="fade-left" data-aos-delay="300">
              <div class="tour-visual">
                <div class="video-container">
                  <video autoplay="" muted="" loop="">
                    <source src="assets/img/education/video-5.mp4" type="video/mp4">
                  </video>
                  <div class="play-overlay">
                    <button class="play-btn">
                      <i class="bi bi-play-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Campus Highlights Carousel -->
        <div class="highlights-carousel" data-aos="fade-up" data-aos-delay="200">
          <div class="section-header">
            <h2>Campus Highlights</h2>
            <p>Donec rutrum congue leo eget malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames.</p>
          </div>

          <div class="campus-slider swiper init-swiper">
            <script type="application/json" class="swiper-config">
              {
                "loop": true,
                "speed": 800,
                "autoplay": {
                  "delay": 4000
                },
                "slidesPerView": 1,
                "spaceBetween": 30,
                "navigation": {
                  "nextEl": ".swiper-button-next",
                  "prevEl": ".swiper-button-prev"
                },
                "breakpoints": {
                  "768": {
                    "slidesPerView": 2
                  },
                  "1024": {
                    "slidesPerView": 3
                  }
                }
              }
            </script>
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="highlight-card">
                  <div class="card-image">
                    <img src="assets/img/education/campus-10.webp" alt="Central Library" class="img-fluid" loading="lazy">
                    <div class="image-overlay">
                      <span class="category-tag">Academic</span>
                    </div>
                  </div>
                  <div class="card-body">
                    <h4>Central Library</h4>
                    <p>Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>
                    <div class="card-stats">
                      <div class="stat">
                        <i class="bi bi-book"></i>
                        <span>500K+ Books</span>
                      </div>
                      <div class="stat">
                        <i class="bi bi-wifi"></i>
                        <span>High-Speed WiFi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="highlight-card">
                  <div class="card-image">
                    <img src="assets/img/education/campus-11.webp" alt="Innovation Hub" class="img-fluid" loading="lazy">
                    <div class="image-overlay">
                      <span class="category-tag">Research</span>
                    </div>
                  </div>
                  <div class="card-body">
                    <h4>Innovation Hub</h4>
                    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                    <div class="card-stats">
                      <div class="stat">
                        <i class="bi bi-cpu"></i>
                        <span>AI Labs</span>
                      </div>
                      <div class="stat">
                        <i class="bi bi-gear"></i>
                        <span>Maker Space</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="highlight-card">
                  <div class="card-image">
                    <img src="assets/img/education/campus-1.webp" alt="Student Center" class="img-fluid" loading="lazy">
                    <div class="image-overlay">
                      <span class="category-tag">Community</span>
                    </div>
                  </div>
                  <div class="card-body">
                    <h4>Student Center</h4>
                    <p>Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo lacinia eget.</p>
                    <div class="card-stats">
                      <div class="stat">
                        <i class="bi bi-cup-hot"></i>
                        <span>Food Court</span>
                      </div>
                      <div class="stat">
                        <i class="bi bi-controller"></i>
                        <span>Game Lounge</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="highlight-card">
                  <div class="card-image">
                    <img src="assets/img/education/campus-2.webp" alt="Wellness Center" class="img-fluid" loading="lazy">
                    <div class="image-overlay">
                      <span class="category-tag">Wellness</span>
                    </div>
                  </div>
                  <div class="card-body">
                    <h4>Wellness Center</h4>
                    <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.</p>
                    <div class="card-stats">
                      <div class="stat">
                        <i class="bi bi-heart-pulse"></i>
                        <span>Health Services</span>
                      </div>
                      <div class="stat">
                        <i class="bi bi-activity"></i>
                        <span>Fitness Classes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>

        <!-- Campus Map Integration -->
        <div class="map-integration" data-aos="fade-up" data-aos-delay="100">
          <div class="row">
            <div class="col-lg-4" data-aos="fade-right" data-aos-delay="200">
              <div class="map-sidebar">
                <h3>Navigate Our Campus</h3>
                <p>Explore our comprehensive campus map to find buildings, parking areas, and important facilities.</p>

                <div class="location-categories">
                  <div class="category-filter active" data-category="all">
                    <i class="bi bi-grid"></i>
                    <span>All Locations</span>
                  </div>
                  <div class="category-filter" data-category="academic">
                    <i class="bi bi-book"></i>
                    <span>Academic</span>
                  </div>
                  <div class="category-filter" data-category="dining">
                    <i class="bi bi-cup-hot"></i>
                    <span>Dining</span>
                  </div>
                  <div class="category-filter" data-category="parking">
                    <i class="bi bi-car-front"></i>
                    <span>Parking</span>
                  </div>
                  <div class="category-filter" data-category="recreation">
                    <i class="bi bi-activity"></i>
                    <span>Recreation</span>
                  </div>
                </div>

                <div class="map-actions">
                  <a href="#" class="action-link">
                    <i class="bi bi-download"></i>
                    Download Campus Map
                  </a>
                  <a href="#" class="action-link">
                    <i class="bi bi-phone"></i>
                    Campus Shuttle Info
                  </a>
                  <a href="#" class="action-link">
                    <i class="bi bi-car-front"></i>
                    Parking Information
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-8" data-aos="fade-left" data-aos-delay="300">
              <div class="map-embed">
                <div class="ratio ratio-4x3">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215482929933!2d-73.95999542349116!3d40.80709487138641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f7a01fb08965%3A0x1234567890abcdef!2sColumbia%20University!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus" allowfullscreen="" loading="lazy"></iframe>
                </div>
                <div class="map-overlay-info">
                  <div class="info-card">
                    <h5>Main Campus</h5>
                    <p>116th St &amp; Broadway, New York</p>
                    <div class="quick-stats">
                      <span><i class="bi bi-geo-alt"></i> 32 Acres</span>
                      <span><i class="bi bi-building"></i> 17 Buildings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
    </div>
  )
}

export default CampusFacilities