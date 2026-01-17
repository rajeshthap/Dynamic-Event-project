import React from 'react'
import Event3 from "../../assets/images/education/events-3.webp";
import Event5 from "../../assets/images/education/events-5.webp";
import Event6 from "../../assets/images/education/events-7.webp";   
import Event2 from "../../assets/images/education/events-2.webp";  
import Event8 from "../../assets/images/education/events-8.webp"; 
import Event7 from "../../assets/images/education/events-6.webp";

function Events() {
  return (
    <div>

         <section id="events" class="events section">

 
      <div class="container section-title" data-aos="fade-up">
        <h2>Events</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row g-4">

          <div class="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="200">
            <div class="event-item">
              <div class="event-image">
                <img src={Event3} alt="Workshop" class="img-fluid"/>
                <div class="event-date-overlay">
                  <span class="date">MAR<br/>18</span>
                </div>
              </div>
              <div class="event-details">
                <div class="event-category">
                  <span class="badge academic">Academic</span>
                  <span class="event-time">2:00 PM</span>
                </div>
                <h3>Advanced Mathematics Workshop</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.</p>
                <div class="event-info">
                  <div class="info-row">
                    <i class="bi bi-geo-alt"></i>
                    <span>Room 205, Science Building</span>
                  </div>
                  <div class="info-row">
                    <i class="bi bi-people"></i>
                    <span>25 Participants</span>
                  </div>
                </div>
                <div class="event-footer">
                  <a href="#" class="register-btn">Register Now</a>
                  <div class="event-share">
                    <i class="bi bi-share"></i>
                    <i class="bi bi-heart"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="300">
            <div class="event-item">
              <div class="event-image">
                <img src={Event5} alt="Tournament" class="img-fluid"/>
                <div class="event-date-overlay">
                  <span class="date">APR<br/>05</span>
                </div>
              </div>
              <div class="event-details">
                <div class="event-category">
                  <span class="badge sports">Sports</span>
                  <span class="event-time">9:00 AM</span>
                </div>
                <h3>Inter-School Basketball Championship</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod tempor incididunt ut labore et
                  dolore magna.</p>
                <div class="event-info">
                  <div class="info-row">
                    <i class="bi bi-geo-alt"></i>
                    <span>Sports Complex Gym</span>
                  </div>
                  <div class="info-row">
                    <i class="bi bi-people"></i>
                    <span>8 Teams</span>
                  </div>
                </div>
                <div class="event-footer">
                  <a href="#" class="register-btn">Register Now</a>
                  <div class="event-share">
                    <i class="bi bi-share"></i>
                    <i class="bi bi-heart"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="400">
            <div class="event-item">
              <div class="event-image">
                <img src={Event6} alt="Art Exhibition" class="img-fluid"/>
                <div class="event-date-overlay">
                  <span class="date">APR<br/>12</span>
                </div>
              </div>
              <div class="event-details">
                <div class="event-category">
                  <span class="badge arts">Arts</span>
                  <span class="event-time">6:00 PM</span>
                </div>
                <h3>Student Art Exhibition Opening</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et
                  dolore.</p>
                <div class="event-info">
                  <div class="info-row">
                    <i class="bi bi-geo-alt"></i>
                    <span>Art Gallery, First Floor</span>
                  </div>
                  <div class="info-row">
                    <i class="bi bi-people"></i>
                    <span>Open to All</span>
                  </div>
                </div>
                <div class="event-footer">
                  <a href="#" class="register-btn">Register Now</a>
                  <div class="event-share">
                    <i class="bi bi-share"></i>
                    <i class="bi bi-heart"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="200">
            <div class="event-item">
              <div class="event-image">
                <img src={Event2} alt="Science Fair" class="img-fluid"/>
                <div class="event-date-overlay">
                  <span class="date">MAY<br/>03</span>
                </div>
              </div>
              <div class="event-details">
                <div class="event-category">
                  <span class="badge academic">Academic</span>
                  <span class="event-time">10:00 AM</span>
                </div>
                <h3>Annual Science Fair Competition</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.</p>
                <div class="event-info">
                  <div class="info-row">
                    <i class="bi bi-geo-alt"></i>
                    <span>Main Auditorium Hall</span>
                  </div>
                  <div class="info-row">
                    <i class="bi bi-people"></i>
                    <span>45 Projects</span>
                  </div>
                </div>
                <div class="event-footer">
                  <a href="#" class="register-btn">Register Now</a>
                  <div class="event-share">
                    <i class="bi bi-share"></i>
                    <i class="bi bi-heart"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="300">
            <div class="event-item">
              <div class="event-image">
                <img src={Event8} alt="Community Event" class="img-fluid"/>
                <div class="event-date-overlay">
                  <span class="date">MAY<br/>15</span>
                </div>
              </div>
              <div class="event-details">
                <div class="event-category">
                  <span class="badge community">Community</span>
                  <span class="event-time">3:00 PM</span>
                </div>
                <h3>Family Fun Day Celebration</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et
                  dolore.</p>
                <div class="event-info">
                  <div class="info-row">
                    <i class="bi bi-geo-alt"></i>
                    <span>School Playground Area</span>
                  </div>
                  <div class="info-row">
                    <i class="bi bi-people"></i>
                    <span>All Families</span>
                  </div>
                </div>
                <div class="event-footer">
                  <a href="#" class="register-btn">Register Now</a>
                  <div class="event-share">
                    <i class="bi bi-share"></i>
                    <i class="bi bi-heart"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="400">
            <div class="event-item">
              <div class="event-image">
                <img src={Event6} alt="Music Concert" class="img-fluid"/>
                <div class="event-date-overlay">
                  <span class="date">JUN<br/>02</span>
                </div>
              </div>
              <div class="event-details">
                <div class="event-category">
                  <span class="badge arts">Arts</span>
                  <span class="event-time">7:30 PM</span>
                </div>
                <h3>Summer Music Concert Finale</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et
                  dolore magna.</p>
                <div class="event-info">
                  <div class="info-row">
                    <i class="bi bi-geo-alt"></i>
                    <span>Music Hall Theater</span>
                  </div>
                  <div class="info-row">
                    <i class="bi bi-people"></i>
                    <span>300 Seats</span>
                  </div>
                </div>
                <div class="event-footer">
                  <a href="#" class="register-btn">Register Now</a>
                  <div class="event-share">
                    <i class="bi bi-share"></i>
                    <i class="bi bi-heart"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="events-navigation" data-aos="fade-up" data-aos-delay="500">
          <div class="row align-items-center">
            <div class="col-md-8">
              <div class="filter-tabs">
                <button class="filter-tab active" data-filter="all">All Events</button>
                <button class="filter-tab" data-filter="academic">Academic</button>
                <button class="filter-tab" data-filter="sports">Sports</button>
                <button class="filter-tab" data-filter="arts">Arts</button>
                <button class="filter-tab" data-filter="community">Community</button>
              </div>
            </div>
            <div class="col-md-4 text-end">
              <a href="#" class="view-calendar-btn">
                <i class="bi bi-calendar3"></i>
                View Calendar
              </a>
            </div>
          </div>
        </div>

      </div>

    </section>
    </div>
  )
}

export default Events