'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  useEffect(() => {
    const preloader = document.querySelector('.preloader') as HTMLElement
    if (preloader) preloader.style.display = 'none'
  }, [])

  return (
    <div className="page-wrapper">
      {/* Preloader */}
      <div className="preloader">
        <div className="vertical-centered-box">
          <div className="content">
            <div className="loader-circle"></div>
            <div className="loader-line-mask">
              <div className="loader-line"></div>
            </div>
            <img src="/assets/images/preloader.png" alt="" />
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="wpo-breadcumb-area" style={{ background: 'url(/assets/images/page-title.jpg) no-repeat center top/cover' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Contact Us</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><span>Contact</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="wpo-contact-pg-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-lg-10 offset-lg-1">
              <div className="office-info">
                <div className="row">
                  <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                    <div className="office-info-item">
                      <div className="office-info-icon">
                        <div className="icon">
                          <i className="fa fa-map-marker"></i>
                        </div>
                      </div>
                      <div className="office-info-text">
                        <h2>Address</h2>
                        <p>kohinoor 1 plaza, 2nd floor, office # 87</p>
                      </div>
                    </div>
                  </div>
                  <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                    <div className="office-info-item">
                      <div className="office-info-icon">
                        <div className="icon">
                          <i className="fa fa-envelope"></i>
                        </div>
                      </div>
                      <div className="office-info-text">
                        <h2>Email Us</h2>
                        <p>qari.arslan1@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                    <div className="office-info-item">
                      <div className="office-info-icon">
                        <div className="icon">
                          <i className="fa fa-phone"></i>
                        </div>
                      </div>
                      <div className="office-info-text">
                        <h2>Call Now</h2>
                        <p>+92 3077841147</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wpo-contact-title">
                <h2>Have Any Question?</h2>
                <p>It is a long established fact that a reader will be distracted content of a page when looking.</p>
              </div>
              <div className="wpo-contact-form-area">
                <form>
                  <div>
                    <input type="text" className="form-control" name="name" id="name" placeholder="Your Name*" />
                  </div>
                  <div>
                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email*" />
                  </div>
                  <div>
                    <input type="text" className="form-control" name="adress" id="adress" placeholder="Adress" />
                  </div>
                  <div>
                    <select name="service" className="form-control" defaultValue="">
                      <option disabled value="">Become a volunteer</option>
                      <option>Quick fundraising</option>
                      <option>Start donating</option>
                      <option>Help Now</option>
                    </select>
                  </div>
                  <div className="fullwidth">
                    <textarea className="form-control" name="note" id="note" placeholder="Message..."></textarea>
                  </div>
                  <div className="submit-area">
                    <button type="submit" className="theme-btn">Get in Touch</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="wpo-contact-map-section">
        <h2 className="hidden">Contact map</h2>
        <div className="wpo-contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.055087457461!2d73.11058237387307!3d31.41260829559784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392268725b330195%3A0x41252daea86b04b7!2sKohinoor%20Plaza%20I!5e0!3m2!1sen!2s!4v1711613745914!5m2!1sen!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  )
}
