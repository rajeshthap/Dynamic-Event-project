// src/components/Testimonials.js

import React, { useEffect, useRef } from 'react';
import { Navigation } from 'swiper/modules';
import Swiper from 'swiper';

// --- Import all your testimonial images ---
import Person1 from '../../assets/images/person/person-f-12.webp';
import Person2 from '../../assets/images/person/person-m-8.webp';
import Person3 from '../../assets/images/person/person-f-6.webp';
import Person4 from '../../assets/images/person/person-m-12.webp';
import Person5 from '../../assets/images/person/person-f-10.webp';

// --- Define the data for each testimonial ---
const testimonialsData = [
  {
    id: 1,
    name: 'Jessica Martinez',
    role: 'UX Designer',
    image: Person1,
    content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 2,
    name: 'David Rodriguez',
    role: 'Software Engineer',
    image: Person2,
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 3,
    name: 'Amanda Wilson',
    role: 'Creative Director',
    image: Person3,
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
  },
  {
    id: 4,
    name: 'Ryan Thompson',
    role: 'Business Analyst',
    image: Person4,
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  {
    id: 5,
    name: 'Rachel Chen',
    role: 'Project Manager',
    image: Person5,
    content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',
  }
];

function Testimonials() {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        modules: [Navigation],
        loop: true,
        speed: 600,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        // Default for mobile
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // --- THIS IS THE IMPORTANT PART ---
        breakpoints: {
          // When screen is >= 768px (Tablets)
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // When screen is >= 1200px (Desktops)
          1200: {
            slidesPerView: 3, // Shows 3 cards in a row
            spaceBetween: 30,
          },
        },
      });
    }
  }, []);

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Testimonials</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="testimonial-slider swiper" ref={swiperRef}>
          <div className="swiper-wrapper">
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className="swiper-slide">
                <div className="testimonial-item h-100">
                  <div className="testimonial-header">
                    <img src={testimonial.image} alt={testimonial.name} className="img-fluid" loading="lazy" />
                    <div className="rating">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>
                  <div className="testimonial-body">
                    <p>{testimonial.content}</p>
                  </div>
                  <div className="testimonial-footer">
                    <h5>{testimonial.name}</h5>
                    <span>{testimonial.role}</span>
                    <div className="quote-icon">
                      <i className="bi bi-chat-quote-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="swiper-navigation">
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;