import React from 'react';
import BlogPost from '../../assets/images/blog/blog-post-1.webp';
import Person from '../../assets/images/person/person-f-12.webp';
import Person4 from '../../assets/images/person/person-f-14.webp';  
import Person3 from '../../assets/images/person/person-m-10.webp';  
import person10 from '../../assets/images/person/person-m-10.webp'; 
import BlogPost4 from '../../assets/images/blog/blog-post-4.webp';
import BlogPost3 from '../../assets/images/blog/blog-post-3.webp';
import BlogPost2 from '../../assets/images/blog/blog-post-2.webp';


function RecentNews() {
  return (
    <div>
         <section id="recent-news" class="recent-news section">

    
      <div class="container section-title" data-aos="fade-up">
        <h2>Recent News</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row gy-4">

          <div class="col-xl-6" data-aos="fade-up" data-aos-delay="100">
            <article class="post-item d-flex">
              <div class="post-img">
                <img src={BlogPost} alt="" class="img-fluid" loading="lazy"/>
              </div>

              <div class="post-content flex-grow-1">
                <a href="#" class="category">Design</a>

                <h2 class="post-title">
                  <a href="#">Sed ut perspiciatis unde omnis</a>
                </h2>

                <p class="post-description">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                  magni dolores.
                </p>

                <div class="post-meta">
                  <div class="post-author">
                    <img src={Person} alt="" class="img-fluid"/>
                    <span class="author-name">Lina Chen</span>
                  </div>
                  <span class="post-date">Mar 15, 2025</span>
                </div>
              </div>
            </article>
          </div>

          <div class="col-xl-6" data-aos="fade-up" data-aos-delay="200">
            <article class="post-item d-flex">
              <div class="post-img">
                <img src={BlogPost2} alt="" class="img-fluid" loading="lazy"/>
              </div>

              <div class="post-content flex-grow-1">
                <a href="#" class="category">Product</a>

                <h2 class="post-title">
                  <a href="#">At vero eos et accusamus</a>
                </h2>

                <p class="post-description">
                  Et harum quidem rerum facilis est et expedita distinctio nam libero tempore, cum soluta nobis est
                  eligendi.
                </p>

                <div class="post-meta">
                  <div class="post-author">
                    <img src={Person3} alt="" class="img-fluid"/>
                    <span class="author-name">Sofia Rodriguez</span>
                  </div>
                  <span class="post-date">Apr 22, 2025</span>
                </div>
              </div>
            </article>
          </div>

          <div class="col-xl-6" data-aos="fade-up" data-aos-delay="300">
            <article class="post-item d-flex">
              <div class="post-img">
                <img src={BlogPost3} alt="" class="img-fluid" loading="lazy"/>
              </div>

              <div class="post-content flex-grow-1">
                <a href="#" class="category">Software Engineering</a>

                <h2 class="post-title">
                  <a href="#">Temporibus autem quibusdam</a>
                </h2>

                <p class="post-description">
                  Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
                  consequatur.
                </p>

                <div class="post-meta">
                  <div class="post-author">
                    <img src={person10} alt="" class="img-fluid"/>
                    <span class="author-name">Lucas Thompson</span>
                  </div>
                  <span class="post-date">May 8, 2025</span>
                </div>
              </div>
            </article>
          </div>

          <div class="col-xl-6" data-aos="fade-up" data-aos-delay="400">
            <article class="post-item d-flex">
              <div class="post-img">
                <img src={BlogPost4} alt="" class="img-fluid" loading="lazy"/>
              </div>

              <div class="post-content flex-grow-1">
                <a href="#" class="category">Creative</a>

                <h2 class="post-title">
                  <a href="#">Nam libero tempore soluta</a>
                </h2>

                <p class="post-description">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </p>

                <div class="post-meta">
                  <div class="post-author">
                    <img src={Person4} alt="" class="img-fluid"/>
                    <span class="author-name">Emma Patel</span>
                  </div>
                  <span class="post-date">Jun 30, 2025</span>
                </div>
              </div>
            </article>
          </div>

        </div>

      </div>

    </section>
    </div>
  )
}

export default RecentNews