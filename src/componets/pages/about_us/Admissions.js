import React from 'react';
import Campus5 from "../../../assets/images/education/campus-5.webp"

function Admissions() {
  return (
    <div>  <main class="main">

    <div class="page-title light-background">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Admissions</h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="index.html">Home</a></li>
            <li class="current">Admissions</li>
          </ol>
        </nav>
      </div>
    </div>

   
    <section id="admissions" class="admissions section">

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row gy-4">
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div class="application-steps">
              <h3 class="section-subtitle">How to Apply</h3>
              <div class="steps-wrapper">
                <div class="step-item">
                  <div class="step-number">01</div>
                  <div class="step-content">
                    <h4>Submit Application</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                  </div>
                </div>
                <div class="step-item">
                  <div class="step-number">02</div>
                  <div class="step-content">
                    <h4>Send Documents</h4>
                    <p>Aenean quis feugiat ligula. Duis hendrerit felis id aliquet cursus. Vestibulum vel ipsum eu magna blandit volutpat.</p>
                  </div>
                </div>
                <div class="step-item">
                  <div class="step-number">03</div>
                  <div class="step-content">
                    <h4>Interview Process</h4>
                    <p>Pellentesque diam tellus, scelerisque quis sodales vel, dignissim eu justo. Mauris dictum felis non arcu ullamcorper.</p>
                  </div>
                </div>
                <div class="step-item">
                  <div class="step-number">04</div>
                  <div class="step-content">
                    <h4>Decision Letter</h4>
                    <p>Curabitur vulputate tellus sapien, id ultrices libero egestas ac. Sed in vestibulum dui, ac consequat enim.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">
            <div class="requirements-card">
              <h3 class="section-subtitle">Admission Requirements</h3>
              <ul class="requirements-list">
                <li>
                  <i class="bi bi-check-circle"></i>
                  <span>Completed Application Form</span>
                </li>
                <li>
                  <i class="bi bi-check-circle"></i>
                  <span>Official High School Transcripts</span>
                </li>
                <li>
                  <i class="bi bi-check-circle"></i>
                  <span>SAT or ACT Scores (Optional for 2024-2025)</span>
                </li>
                <li>
                  <i class="bi bi-check-circle"></i>
                  <span>Two Letters of Recommendation</span>
                </li>
                <li>
                  <i class="bi bi-check-circle"></i>
                  <span>Personal Essay (500-650 words)</span>
                </li>
                <li>
                  <i class="bi bi-check-circle"></i>
                  <span>Application Fee ($65 non-refundable)</span>
                </li>
                <li>
                  <i class="bi bi-check-circle"></i>
                  <span>Interview (for selected programs only)</span>
                </li>
              </ul>
              <div class="special-note">
                <i class="bi bi-info-circle"></i>
                <p>International students require additional documentation including TOEFL/IELTS scores and visa information.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5 gy-4">
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div class="tuition-card">
              <h3 class="section-subtitle">Tuition &amp; Fees</h3>
              <div class="tuition-table">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Program</th>
                      <th>Tuition (per year)</th>
                      <th>Fees</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Undergraduate</td>
                      <td>$32,500</td>
                      <td>$2,800</td>
                    </tr>
                    <tr>
                      <td>Graduate</td>
                      <td>$38,700</td>
                      <td>$3,200</td>
                    </tr>
                    <tr>
                      <td>International</td>
                      <td>$42,300</td>
                      <td>$4,500</td>
                    </tr>
                    <tr>
                      <td>Online Programs</td>
                      <td>$26,400</td>
                      <td>$1,800</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="financial-aid">
                <h4>Financial Aid Available</h4>
                <p>Over 75% of our students receive some form of financial assistance. Merit scholarships range from $5,000 to full tuition.</p>
                <a href="#" class="btn btn-aid">Explore Financial Aid Options</a>
              </div>
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">
            <div class="contact-form-card">
              <h3 class="section-subtitle">Request Information</h3>
              <form action="forms/contact.php" class="php-email-form">
                <div class="row g-3">
                  <div class="col-12">
                    <input type="text" name="name" class="form-control" placeholder="Name*" required=""/>
                  </div>
                  <div class="col-md-6">
                    <input type="email" name="email" class="form-control" placeholder="Email Address*" required=""/>
                  </div>
                  <div class="col-md-6">
                    <input type="tel" name="phone" class="form-control" placeholder="Phone Number"/>
                  </div>
                  <div class="col-12">
                    <select name="subject" class="form-select" required="">
                      <option selected="" disabled="">Program of Interest*</option>
                      <option>Undergraduate</option>
                      <option>Graduate</option>
                      <option>Doctoral</option>
                      <option>Certificate</option>
                      <option>Non-Degree</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <textarea name="message" class="form-control" rows="7" placeholder="Questions or Comments"></textarea>
                  </div>
                  <div class="col-12">
                    <div class="loading">Loading</div>
                    <div class="error-message"></div>
                    <div class="sent-message">Your message has been sent. Thank you!</div>
                    <button type="submit" class="btn btn-request">Request Information</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-12" data-aos="fade-up" data-aos-delay="100">
            <div class="deadlines-card">
              <h3 class="section-subtitle">Important Deadlines</h3>
              <div class="deadlines-grid">
                <div class="deadline-item" data-aos="zoom-in" data-aos-delay="200">
                  <div class="deadline-date">November 1</div>
                  <h4>Early Decision</h4>
                  <p>For students committed to attending if accepted</p>
                </div>
                <div class="deadline-item" data-aos="zoom-in" data-aos-delay="300">
                  <div class="deadline-date">January 15</div>
                  <h4>Regular Decision</h4>
                  <p>Main application deadline for Fall admission</p>
                </div>
                <div class="deadline-item" data-aos="zoom-in" data-aos-delay="400">
                  <div class="deadline-date">March 1</div>
                  <h4>Financial Aid</h4>
                  <p>Priority deadline for scholarship consideration</p>
                </div>
                <div class="deadline-item" data-aos="zoom-in" data-aos-delay="500">
                  <div class="deadline-date">May 1</div>
                  <h4>Enrollment Deposit</h4>
                  <p>Deadline to confirm attendance and secure your spot</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5 campus-visit">
          <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
            <div class="visit-image">
              <img src={Campus5} class="img-fluid" alt="Campus Visit" loading="lazy"/>
              <div class="image-caption">Experience our beautiful campus in person</div>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-left" data-aos-delay="200">
            <div class="visit-content">
              <h3>Schedule a Campus Visit</h3>
              <p>Join us for a personalized campus tour and experience our vibrant community firsthand. Our guided tours offer an inside look at academic facilities, residence halls, and student life. You'll also have the opportunity to meet with admissions counselors, faculty members, and current students.</p>
              <ul class="visit-options">
                <li><i class="bi bi-calendar-check"></i> Daily campus tours (Mon-Fri, 10am &amp; 2pm)</li>
                <li><i class="bi bi-people"></i> Information sessions with admissions staff</li>
                <li><i class="bi bi-building"></i> Residence hall viewings</li>
                <li><i class="bi bi-mortarboard"></i> Faculty meetings (by appointment)</li>
              </ul>
              <a href="#" class="btn btn-schedule">Schedule Your Visit</a>
              <div class="virtual-option">
                <span>Can't visit in person?</span>
                <a href="#" class="virtual-link">Take a Virtual Tour <i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>

  </main></div>
  )
}

export default Admissions