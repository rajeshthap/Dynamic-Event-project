import React from 'react'
import EducationImage from "../../assets/images/education/campus-5.webp";

function AboutUs() {
  return (
    <div>  <section id="about" class="about section">

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <div class="about-content" data-aos="fade-up" data-aos-delay="200">
              <h3>Our Story</h3>
              <h2>Educating Minds, Inspiring Hearts</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae odio ac nisi tristique
                venenatis. Nullam feugiat ipsum vitae justo finibus, in sagittis dolor malesuada. Aenean vel fringilla
                est, a vulputate massa.</p>

              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h4>1965</h4>
                    <p>Etiam at tincidunt arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada
                      fames ac turpis egestas.</p>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h4>1982</h4>
                    <p>Donec dignissim, odio ac imperdiet luctus, ante nisl accumsan justo, nec tempus augue mi in
                      nulla.</p>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h4>1998</h4>
                    <p>Suspendisse potenti. Nullam lacinia dictum auctor. Phasellus euismod sem at dui imperdiet, ac
                      tincidunt mi placerat.</p>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h4>2010</h4>
                    <p>Vestibulum ultrices magna ut faucibus sollicitudin. Sed eget venenatis enim, nec imperdiet ex.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="about-image" data-aos="zoom-in" data-aos-delay="300">
              <img src={EducationImage} class="img-fluid" alt="About Us Image" />

              <div class="mission-vision" data-aos="fade-up" data-aos-delay="400">
                <div class="mission">
                  <h3>Our Mission</h3>
                  <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit
                    neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.</p>
                </div>

                <div class="vision">
                  <h3>Our Vision</h3>
                  <p>Nulla porttitor accumsan tincidunt. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                    Cras ultricies ligula sed magna dictum porta.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-lg-12">
            <div class="core-values" data-aos="fade-up" data-aos-delay="500">
              <h3 class="text-center mb-4">Core Values</h3>
              <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                <div class="col">
                  <div class="value-card">
                    <div class="value-icon">
                      <i class="bi bi-book"></i>
                    </div>
                    <h4>Academic Excellence</h4>
                    <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.</p>
                  </div>
                </div>

                <div class="col">
                  <div class="value-card">
                    <div class="value-icon">
                      <i class="bi bi-people"></i>
                    </div>
                    <h4>Community Engagement</h4>
                    <p>Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                  </div>
                </div>

                <div class="col">
                  <div class="value-card">
                    <div class="value-icon">
                      <i class="bi bi-lightbulb"></i>
                    </div>
                    <h4>Innovation</h4>
                    <p>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
                  </div>
                </div>

                <div class="col">
                  <div class="value-card">
                    <div class="value-icon">
                      <i class="bi bi-globe"></i>
                    </div>
                    <h4>Global Perspective</h4>
                    <p>Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus.</p>
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

export default AboutUs