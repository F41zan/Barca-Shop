import { useEffect, useRef, } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import barcaVideo from "../../../assets/barca video.mp4";
import "../UI/Landing.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import NewCard from "../../../component/UX/NewCard";
import { useNavigate } from "react-router-dom";
import useProducts from "../../../CustomHooks/useProducts";

gsap.registerPlugin(ScrollTrigger);
const Landing = () => {
  const location = useLocation();
  useGSAP(() => {
    const tl1 = gsap.to(".track h1", {
      transform: "translateX(-224.9%)",
      duration: 5.5,
      repeat: -1,
      ease: "none",
      paused: true,
    });

    const tl2 = gsap.to(".track2 h1", {
      transform: "translateX(0%)",
      duration: 2.5,
      ease: "none",
      repeat: -1,
      paused: true,
    });

    ScrollTrigger.create({
      trigger: ".slider1",
      start: "top 90%",
      end: "bottom top",
      // markers:true,
      onEnter: () => {
        tl1.play();
        tl2.play();
      },
      onLeave: () => {
        tl1.pause();
        tl2.pause();
      },
      onEnterBack: () => {
        tl1.play();
        tl2.play();
      },
      onLeaveBack: () => {
        tl1.pause();
        tl2.pause();
      },
    });
  });
  useEffect(() => {
    if (location.state?.fromLogin) {
      // show toast once
      toast.success("Login Successfully!", {
        autoClose: 1200,
        style: { marginTop: "40px" },
      });
      //  clear the login state so it doesn't repeat on refresh
      window.history.replaceState({}, document.title);
    }
  }, []);

  const { products } = useProducts();

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/Kits");
  };


  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const videoRef = useRef(null);

  const handleMouseMove = (e) => {
    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalized (-1 to 1)
    let moveX = (x - centerX) / centerX;
    let moveY = (y - centerY) / centerY;

    //  Clamp values (VERY IMPORTANT)
    moveX = gsap.utils.clamp(-1, 1, moveX);
    moveY = gsap.utils.clamp(-1, 1, moveY);

    //  VIDEO  very subtle (far layer)
    gsap.to(videoRef.current, {
      x: moveX * 10,
      y: moveY * 10,
      duration: 0.6,
      ease: "power3.out",
    });

    //  TEXT  slightly stronger (near layer)
    gsap.to(headerRef.current, {
      x: moveX * -18,
      y: moveY * -18,
      duration: 0.6,
      ease: "power3.out",
    });
  };
  const section3Ref = useRef(null);
  return (
    <div className="landing">
      <section
        ref={sectionRef}
        className="video1"
        onMouseMove={handleMouseMove}
      >
        <div className="header" ref={headerRef}>
          <h1>FC barcelona</h1>
          <button className="shopBtn" onClick={handleNavigate}>
            Shop Now<i className="ri-arrow-right-line"></i>
          </button>
        </div>
        <video ref={videoRef} src={barcaVideo} autoPlay loop muted></video>
      </section>
      <section className="section2" >
        <div className="newCollection-container">
          <h1>New Collection</h1>
          <div className="new-card">
            {products
              .filter((item) => item.category.toLowerCase() === "kits")
              .map((item) => (
                <NewCard
                  key={item?.id}
                  image={item?.images[0]}
                  desc={item?.title}
                  price={item?.price}
                  itemId={item?.id}
                />
              ))}
          </div>
        </div>
        <div className="slider1">
          <div className="track">
            <h1>
              MÉS<span className="tight"></span>QUE
              <span className="tight"></span>UN
              <span className="tight"></span>CLUB
            </h1>
            <h1>
              MÉS<span className="tight"></span>QUE
              <span className="tight"></span>UN
              <span className="tight"></span>CLUB
            </h1>
            <h1>
              MÉS<span className="tight"></span>QUE
              <span className="tight"></span>UN
              <span className="tight"></span>CLUB
            </h1>
            <h1>
              MÉS<span className="tight"></span>QUE
              <span className="tight"></span>UN
              <span className="tight"></span>CLUB
            </h1>
          </div>
        </div>
        <div className="slider2">
          <div className="track2">
            <h1>VISCA BARÇA</h1>
            <h1>VISCA BARÇA</h1>
            <h1>VISCA BARÇA</h1>
            <h1>VISCA BARÇA</h1>
          </div>
        </div>
      </section>
      <div className="section3" ref={section3Ref}>

        <div className="img-wrapper">
          <img
            src="https://media.fashionnetwork.com/cdn-cgi/image/fit=contain,width=1000,height=1000,format=auto/m/1837/c0f3/1ad3/0e75/6753/528d/e74d/3081/85b2/c9d3/c9d3.jpg"
            alt="new era"
          />
        </div>
        <div className="header">
          <h1>FC barcelona X new era</h1>
          <button className="shopBtn" onClick={() => navigate("/kits")}>
            Shop Now<i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
      <section className="section4">
        <div className="newCollection-container">
          <h1>New Collection</h1>
          <div className="new-card">
            {
              products
                .filter((item) => item.category.toLowerCase() === "apparel")
                .map((item) => {
                  return (
                    <NewCard
                      key={item.id}
                      image={item?.images[0]}
                      desc={item?.title}
                      price={item?.price}
                      itemId={item?.id}
                    />
                  );
                })
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
