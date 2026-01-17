import React from 'react';
import Person3 from "../../../assets/images/person/person-f-6.webp";  
import Person12 from "../../../assets/images/person/person-f-12.webp"; 
import Person5 from "../../../assets/images/person/person-f-5.webp" ;
import Person8 from "../../../assets/images/person/person-f-8.webp" ;
import Person11 from "../../../assets/images/person/person-m-11.webp" ;
import Person7 from "../../../assets/images/person/person-m-7.webp" ;
function Faculty() {
  return (
    <div>
         <main class="main">
    <div class="page-title light-background">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Faculty Staff</h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="index.html">Home</a></li>
            <li class="current">Faculty Staff</li>
          </ol>
        </nav>
      </div>
    </div>


    <section id="faculty--staff" class="faculty--staff section">

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row mb-5">
          <div class="col-lg-8 mx-auto">
            <div class="faculty-search">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search faculty by name, department or research area..."/>
                <button class="search-btn" type="button">
                  <i class="bi bi-search"></i>
                </button>
              </div>
              <div class="search-filters mt-3 d-flex flex-wrap">
                <div class="filter-item active">All</div>
                <div class="filter-item">Professors</div>
                <div class="filter-item">Associate Professors</div>
                <div class="filter-item">Assistant Professors</div>
                <div class="filter-item">Staff</div>
              </div>
            </div>
          </div>
        </div>

        <div class="faculty-grid">
          <div class="row g-4">
         
            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div class="faculty-card">
                <div class="faculty-image">
                  <img src={Person3} class="img-fluid" alt="Faculty Member"/>
                  <div class="social-links">
                    <a href="#"><i class="bi bi-twitter"></i></a>
                    <a href="#"><i class="bi bi-linkedin"></i></a>
                    <a href="#"><i class="bi bi-envelope"></i></a>
                  </div>
                </div>
                <div class="faculty-info">
                  <h3>Dr. Thomas Reynolds</h3>
                  <p class="position">Professor of Computer Science</p>
                  <div class="department">School of Computing</div>
                  <div class="research-tags">
                    <span>Artificial Intelligence</span>
                    <span>Machine Learning</span>
                    <span>Neural Networks</span>
                  </div>
                  <a href="#" class="profile-link">View Profile</a>
                </div>
              </div>
            </div>

           
            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div class="faculty-card">
                <div class="faculty-image">
                  <img src={Person5} class="img-fluid" alt="Faculty Member"/>
                  <div class="social-links">
                    <a href="#"><i class="bi bi-twitter"></i></a>
                    <a href="#"><i class="bi bi-linkedin"></i></a>
                    <a href="#"><i class="bi bi-envelope"></i></a>
                  </div>
                </div>
                <div class="faculty-info">
                  <h3>Dr. Sarah Johnson</h3>
                  <p class="position">Associate Professor of Biology</p>
                  <div class="department">Department of Life Sciences</div>
                  <div class="research-tags">
                    <span>Molecular Biology</span>
                    <span>Genetics</span>
                    <span>Biotechnology</span>
                  </div>
                  <a href="#" class="profile-link">View Profile</a>
                </div>
              </div>
            </div>

        
            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div class="faculty-card">
                <div class="faculty-image">
                  <img src={Person7} class="img-fluid" alt="Faculty Member"/>
                  <div class="social-links">
                    <a href="#"><i class="bi bi-twitter"></i></a>
                    <a href="#"><i class="bi bi-linkedin"></i></a>
                    <a href="#"><i class="bi bi-envelope"></i></a>
                  </div>
                </div>
                <div class="faculty-info">
                  <h3>Dr. Michael Chen</h3>
                  <p class="position">Assistant Professor of Physics</p>
                  <div class="department">Department of Physical Sciences</div>
                  <div class="research-tags">
                    <span>Quantum Mechanics</span>
                    <span>Particle Physics</span>
                    <span>Astrophysics</span>
                  </div>
                  <a href="#" class="profile-link">View Profile</a>
                </div>
              </div>
            </div>

       
            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div class="faculty-card">
                <div class="faculty-image">
                  <img src={Person8} class="img-fluid" alt="Faculty Member"/>
                  <div class="social-links">
                    <a href="#"><i class="bi bi-twitter"></i></a>
                    <a href="#"><i class="bi bi-linkedin"></i></a>
                    <a href="#"><i class="bi bi-envelope"></i></a>
                  </div>
                </div>
                <div class="faculty-info">
                  <h3>Dr. Elizabeth Parker</h3>
                  <p class="position">Professor of Literature</p>
                  <div class="department">College of Humanities</div>
                  <div class="research-tags">
                    <span>Modern Literature</span>
                    <span>Critical Theory</span>
                    <span>Creative Writing</span>
                  </div>
                  <a href="#" class="profile-link">View Profile</a>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div class="faculty-card">
                <div class="faculty-image">
                  <img src={Person11} class="img-fluid" alt="Faculty Member"/>
                  <div class="social-links">
                    <a href="#"><i class="bi bi-twitter"></i></a>
                    <a href="#"><i class="bi bi-linkedin"></i></a>
                    <a href="#"><i class="bi bi-envelope"></i></a>
                  </div>
                </div>
                <div class="faculty-info">
                  <h3>Dr. Robert Williams</h3>
                  <p class="position">Associate Professor of Economics</p>
                  <div class="department">Business School</div>
                  <div class="research-tags">
                    <span>Macroeconomics</span>
                    <span>International Trade</span>
                    <span>Economic Policy</span>
                  </div>
                  <a href="#" class="profile-link">View Profile</a>
                </div>
              </div>
            </div>

          
            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div class="faculty-card">
                <div class="faculty-image">
                  <img src={Person12} class="img-fluid" alt="Faculty Member"/>
                  <div class="social-links">
                    <a href="#"><i class="bi bi-twitter"></i></a>
                    <a href="#"><i class="bi bi-linkedin"></i></a>
                    <a href="#"><i class="bi bi-envelope"></i></a>
                  </div>
                </div>
                <div class="faculty-info">
                  <h3>Dr. Jennifer Lopez</h3>
                  <p class="position">Assistant Professor of Psychology</p>
                  <div class="department">Department of Behavioral Sciences</div>
                  <div class="research-tags">
                    <span>Cognitive Psychology</span>
                    <span>Child Development</span>
                    <span>Behavioral Studies</span>
                  </div>
                  <a href="#" class="profile-link">View Profile</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pagination-container mt-5 d-flex justify-content-center" data-aos="fade-up">
          <nav aria-label="Faculty pagination">
            <ul class="pagination">
              <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Previous">
                  <i class="bi bi-chevron-left"></i>
                </a>
              </li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <i class="bi bi-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>

      </div>

    </section>

  </main>
    </div>
  )
}

export default Faculty