import React from 'react';
import Campus3 from '../../assets/images/education/campus-3.webp'; 
import Students5 from '../../assets/images/education/students-5.webp';
import Faculty7 from '../../assets/images/education/teacher-7.webp';

function QualityEducation() {
  return (
    <div>  <section id="stats" class="stats section">

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <div class="intro-content" data-aos="fade-up" data-aos-delay="200">
              <h2 class="section-heading">Transforming Lives Through Quality Education</h2>
              <p class="section-description">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </div>

        <div class="row g-4 mt-4">
          <div class="col-xl-3 col-lg-6 col-md-6">
            <div class="metric-card" data-aos="flip-left" data-aos-delay="300">
              <div class="metric-header">
                <div class="metric-icon-wrapper">
                  <i class="bi bi-mortarboard-fill"></i>
                </div>
                <div class="metric-value">
                  <span data-purecounter-start="0" data-purecounter-end="87" data-purecounter-duration="1"
                    class="purecounter"></span>%
                </div>
              </div>
              <div class="metric-info">
                <h4>Success Rate</h4>
                <p>Alumni employment within 6 months</p>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-6 col-md-6">
            <div class="metric-card" data-aos="flip-left" data-aos-delay="400">
              <div class="metric-header">
                <div class="metric-icon-wrapper">
                  <i class="bi bi-building"></i>
                </div>
                <div class="metric-value">
                  <span data-purecounter-start="0" data-purecounter-end="8" data-purecounter-duration="1"
                    class="purecounter"></span>
                </div>
              </div>
              <div class="metric-info">
                <h4>Campus Locations</h4>
                <p>Across the country serving students</p>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-6 col-md-6">
            <div class="metric-card" data-aos="flip-left" data-aos-delay="500">
              <div class="metric-header">
                <div class="metric-icon-wrapper">
                  <i class="bi bi-trophy-fill"></i>
                </div>
                <div class="metric-value">
                  <span data-purecounter-start="0" data-purecounter-end="250" data-purecounter-duration="1"
                    class="purecounter"></span>+
                </div>
              </div>
              <div class="metric-info">
                <h4>Awards Received</h4>
                <p>Recognition for educational excellence</p>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-6 col-md-6">
            <div class="metric-card" data-aos="flip-left" data-aos-delay="600">
              <div class="metric-header">
                <div class="metric-icon-wrapper">
                  <i class="bi bi-globe"></i>
                </div>
                <div class="metric-value">
                  <span data-purecounter-start="0" data-purecounter-end="65" data-purecounter-duration="1"
                    class="purecounter"></span>+
                </div>
              </div>
              <div class="metric-info">
                <h4>Countries Represented</h4>
                <p>Diverse international student body</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-lg-12">
            <div class="highlights-section" data-aos="fade-up" data-aos-delay="700">
              <div class="row align-items-center">
                <div class="col-lg-6">
                  <div class="highlights-content">
                    <h3 class="highlights-title">Building Tomorrow's Leaders Today</h3>
                    <p class="highlights-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim.</p>
                    <div class="highlights-features">
                      <div class="feature-item" data-aos="fade-right" data-aos-delay="800">
                        <i class="bi bi-check-circle-fill"></i>
                        <span>Innovative curriculum design</span>
                      </div>
                      <div class="feature-item" data-aos="fade-right" data-aos-delay="900">
                        <i class="bi bi-check-circle-fill"></i>
                        <span>World-class faculty expertise</span>
                      </div>
                      <div class="feature-item" data-aos="fade-right" data-aos-delay="1000">
                        <i class="bi bi-check-circle-fill"></i>
                        <span>Comprehensive student support</span>
                      </div>
                    </div>
                    <div class="highlights-cta">
                      <a href="#" class="cta-btn primary">Explore Programs</a>
                      <a href="#" class="cta-btn secondary">Download Brochure</a>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="highlights-gallery">
                    <div class="gallery-grid">
                      <div class="gallery-item large" data-aos="zoom-in" data-aos-delay="800">
                        <img src={Campus3} alt="Campus Life" class="img-fluid"
                          loading="lazy"/>
                        <div class="gallery-overlay">
                          <h5>Modern Campus</h5>
                        </div>
                      </div>
                      <div class="gallery-item small" data-aos="zoom-in" data-aos-delay="900">
                        <img src={Students5} alt="Students" class="img-fluid" loading="lazy"/>
                        <div class="gallery-overlay">
                          <h6>Student Life</h6>
                        </div>
                      </div>
                      <div class="gallery-item small" data-aos="zoom-in" data-aos-delay="1000">
                        <img src={Faculty7} alt="Faculty" class="img-fluid" loading="lazy"/>
                        <div class="gallery-overlay">
                          <h6>Expert Faculty</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section></div>
  )
}

export default QualityEducation