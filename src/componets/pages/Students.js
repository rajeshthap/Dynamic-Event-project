import React from 'react';
import Students7 from '../../assets/images/education/students-7.webp';
import Activities2 from '../../assets/images/education/activities-2.webp';
import Activities6 from '../../assets/images/education/activities-6.webp';
import Activities1 from '../../assets/images/education/activities-1.webp'; 
import Activities4 from '../../assets/images/education/activities-4.webp';
import { Link } from 'react-router-dom';

function Students() {
  return (
    <div>
        <section id="students-life-block" class="students-life-block section">

   
      <div class="container section-title" data-aos="fade-up">
        <h2>Students Life</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row align-items-center g-5 mb-5">
          <div class="col-lg-5" data-aos="fade-right" data-aos-delay="200">
            <div class="hero-image-wrapper">
              <img src={Students7} alt="Student Life" class="img-fluid main-image"/>
              <div class="floating-card" data-aos="zoom-in" data-aos-delay="400">
                <div class="card-icon">
                  <i class="bi bi-people-fill"></i>
                </div>
                <div class="card-content">
                  <span class="card-number">2500+</span>
                  <span class="card-label">Active Students</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-7" data-aos="fade-left" data-aos-delay="300">
            <div class="content-wrapper">
              <div class="section-badge" data-aos="fade-up" data-aos-delay="350">
                <span>Student Life</span>
              </div>
              <h2 data-aos="fade-up" data-aos-delay="400">Vivamus consequat lorem at nisl laoreet commodo a ac lectus
              </h2>
              <p class="lead-text" data-aos="fade-up" data-aos-delay="450">Pellentesque habitant morbi tristique
                senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae.</p>

              <div class="info-grid" data-aos="fade-up" data-aos-delay="500">
                <div class="info-item">
                  <div class="info-icon">
                    <i class="bi bi-calendar-event"></i>
                  </div>
                  <div class="info-text">
                    <strong>Year-Round Events</strong>
                    <span>Duis aute irure dolor in reprehenderit voluptate</span>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-icon">
                    <i class="bi bi-award"></i>
                  </div>
                  <div class="info-text">
                    <strong>Achievement Programs</strong>
                    <span>Excepteur sint occaecat cupidatat non proident</span>
                  </div>
                </div>
              </div>

              <div class="cta-section" data-aos="fade-up" data-aos-delay="600">
                <Link to="student-activities.html" class="btn-primary">Discover More</Link>
                <Link to="virtual-tour.html" class="btn-link">
                  <i class="bi bi-play-circle"></i>
                  <span>Take Virtual Tour</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div class="activities-showcase">
          <div class="row g-4">
            <div class="col-lg-8" data-aos="fade-right" data-aos-delay="200">
              <div class="featured-activity">
                <div class="activity-media">
                  <img src={Activities2} alt="Featured Activity" class="img-fluid"/>
                  <div class="activity-overlay">
                    <div class="overlay-content">
                      <h4>Student Organizations</h4>
                      <p>Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo.</p>
                      <Link  to="#" class="overlay-btn">
                        <i class="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4" data-aos="fade-left" data-aos-delay="300">
              <div class="activities-list">
                <div class="activity-item" data-aos="slide-up" data-aos-delay="350">
                  <div class="activity-thumb">
                    <img src={Activities6} alt="Research Projects" class="img-fluid"/>
                  </div>
                  <div class="activity-info">
                    <h6>Research Projects</h6>
                    <p>Sed ut perspiciatis unde omnis natus error</p>
                  </div>
                </div>

                <div class="activity-item" data-aos="slide-up" data-aos-delay="400">
                  <div class="activity-thumb">
                    <img src={Activities1} alt="Community Service" class="img-fluid"/>
                  </div>
                  <div class="activity-info">
                    <h6>Community Service</h6>
                    <p>At vero eos et accusamus et iusto odio</p>
                  </div>
                </div>

                <div class="activity-item" data-aos="slide-up" data-aos-delay="450">
                  <div class="activity-thumb">
                    <img src={Activities4} alt="Innovation Labs" class="img-fluid"/>
                  </div>
                  <div class="activity-info">
                    <h6>Innovation Labs</h6>
                    <p>Temporibus autem quibusdam officiis debitis</p>
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

export default Students