import React from 'react';
import '../UI/Footer.scss'
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
const Footer = () => {
    useGSAP(()=>{
        var webName = document.querySelector(".web-name");
            webName.addEventListener("mouseenter", (dets) => {
              const t1 = gsap.timeline();
              t1.to(".web-name h1", {
                attr: {
                  style:
                    "background: linear-gradient(160deg, #c00030, #0044cc); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;",
                },
                duration: 0.3,
              });
              t1.to(
                ".web-name h1",
                {
                  attr: {
                    style:
                      "background: linear-gradient(160deg, #0044cc, #c00030); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;",
                  },
                  duration: 2,
                },
                "+=0.7"
              );
              t1.to(".web-name h1", {
                attr: {
                  style:
                    "background: linear-gradient(160deg, #c00030, #0044cc); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;",
                },
              });
            });
            webName.addEventListener("mouseleave", (dets) => {
              gsap.killTweensOf(".web-name h1");
              gsap.to(".web-name h1", {
                attr: {
                  style:
                    "background: linear-gradient(160deg, #f5f5f5ff, #ffffffff); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;",
                },
                duration: 0.3,
              });
            });
    })
  return (
     <section className="footer">
        <div className="web-name">
          <h1>FC BARCELONA</h1>
        </div>
        <div className="footer-content">
          <div className="footer-left">
            <h3>USE AND PRIVACY</h3>
            <ul>
              <li>Terms & conditions</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="footer-center1">
            <h3>HELP CENTER</h3>
            <ul>
              <li>Help portal</li>
              <li>Returns portal</li>
              <li>Track order information</li>
              <li>Delivery and shipping</li>
              <li>Returns & refunds</li>
              <li>Order issues</li>
              <li>Account and website</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className="footer-center2">
            <h3>SOCIAL MEDIA</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Spotify</li>
              <li>Youtube</li>
              <li>Instagram FC BARCELONA</li>
              <li>Instagram Barca store</li>
              <li>OneFootball</li>
              <li>TikTok</li>
            </ul>
          </div>
          <div className="footer-right">
            <h3>LINKS OF INTEREST</h3>
            <ul>
              <li>APP FC Barcelona IOS</li>
              <li>APP FC Barcelona ANDROID</li>
            </ul>
          </div>
        </div>
        <div className="footer-end">
          <h3>© FC BARCELONA - OFFICIAL STORE</h3>
          {/* <div className="company-logos">
            <img src={maestro} alt="mastercard" />
            <img src={maestro} alt="maestro" />
            <img src={visa} alt="visa" />
            <img src={apay} alt="apay" />
            <img src={paypal} alt="paypal" />
            <img src={gpay} alt="gpay" />
          </div>  */}
        </div>
      </section>
  )
}

export default Footer
