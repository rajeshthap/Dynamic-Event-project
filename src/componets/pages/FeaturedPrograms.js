import React from 'react'
import ProgramImage from "../../assets/images/education/education-10.webp";
import ProgramImage4 from "../../assets/images/education/education-8.webp";
import EducationImage from "../../assets/images/education/education-6.webp";  
import EducationImage3 from "../../assets/images/education/campus-3.webp"; 
import ProgramImage5 from "../../assets/images/education/education-4.webp";       
function FeaturedPrograms() {
  return (  
    <div>

        
    <section id="featured-programs" class="featured-programs section">


      <div class="container section-title" data-aos="fade-up">
        <h2>Featured Programs</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row gy-5">
          <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
            <div class="program-banner">
              <div class="banner-image">
                <img src={EducationImage3} alt="Program" class="img-fluid"/>
                <div class="banner-badge">
                  <span class="badge-text">Popular</span>
                </div>
              </div>
              <div class="banner-info">
                <div class="program-header">
                  <h3>Engineering &amp; Technology</h3>
                  <div class="program-stats">
                    <span><i class="bi bi-people-fill"></i> 450+ Students</span>
                    <span><i class="bi bi-award-fill"></i> 95% Success Rate</span>
                  </div>
                </div>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
                <div class="program-details">
                  <div class="detail-item">
                    <i class="bi bi-calendar-check"></i>
                    <span>Duration: 4 Years</span>
                  </div>
                  <div class="detail-item">
                    <i class="bi bi-mortarboard-fill"></i>
                    <span>Bachelor's Degree</span>
                  </div>
                </div>
                <a href="#" class="discover-btn">Discover Program</a>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="programs-grid">
              <div class="row g-3">
                <div class="col-12" data-aos="fade-left" data-aos-delay="200">
                  <div class="program-item">
                    <div class="item-icon">
                      <img src={ProgramImage4} alt="Program" class="img-fluid"/>
                    </div>
                    <div class="item-content">
                      <h4>Business Management</h4>
                      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                      <div class="meta-info">
                        <span>3 Years</span>
                        <span>Master's Degree</span>
                      </div>
                    </div>
                    <div class="item-arrow">
                      <i class="bi bi-arrow-right"></i>
                    </div>
                  </div>
                </div>

                <div class="col-12" data-aos="fade-left" data-aos-delay="300">
                  <div class="program-item">
                    <div class="item-icon">
                      <img src={EducationImage} alt="Program" class="img-fluid"/>
                    </div>
                    <div class="item-content">
                      <h4>Digital Marketing</h4>
                      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</p>
                      <div class="meta-info">
                        <span>2 Years</span>
                        <span>Certificate</span>
                      </div>
                    </div>
                    <div class="item-arrow">
                      <i class="bi bi-arrow-right"></i>
                    </div>
                  </div>
                </div>

                <div class="col-12" data-aos="fade-left" data-aos-delay="400">
                  <div class="program-item">
                    <div class="item-icon">
                        <img src={ProgramImage5} alt="Program" class="img-fluid"/>
                    </div>
                    <div class="item-content">
                      <h4>Health Sciences</h4>
                      <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe.</p>
                      <div class="meta-info">
                        <span>5 Years</span>
                        <span>Bachelor's Degree</span>
                      </div>
                    </div>
                    <div class="item-arrow">
                      <i class="bi bi-arrow-right"></i>
                    </div>
                  </div>
                </div>

                <div class="col-12" data-aos="fade-left" data-aos-delay="500">
                  <div class="program-item">
                    <div class="item-icon">
                      <img src={ProgramImage} alt="Program" class="img-fluid"/>
                    </div>
                    <div class="item-content">
                      <h4>Creative Arts</h4>
                      <p>Et harum quidem rerum facilis est et expedita distinctio nam libero tempore.</p>
                      <div class="meta-info">
                        <span>3 Years</span>
                        <span>Bachelor's Degree</span>
                      </div>
                    </div>
                    <div class="item-arrow">
                      <i class="bi bi-arrow-right"></i>
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

export default FeaturedPrograms