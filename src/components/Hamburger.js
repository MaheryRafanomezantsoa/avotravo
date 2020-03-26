import React, { useEffect, useRef } from "react";
import {Link} from 'react-router-dom';
import gsap from 'gsap';

import strasbourg from '../images/strasbourg.jpg'
import bordeaux from '../images/bordeaux.jpg'
import grenoble from '../images/grenoble.jpg'
import lyon from '../images/lyon.jpg'
import paris from '../images/paris.jpg'


const cities = [
  {name: 'Strasbourg', image: strasbourg},
  {name: 'Bordeaux', image: bordeaux},
  {name: 'Grenoble', image: grenoble},
  {name: 'Lyon', image: lyon},
  {name: 'Paris', image: paris},
]
const Hamburger = ({state}) => {

//vars pour dom node animated
  let menu = useRef(null);
  let revealMenu = useRef(null);
  let revealMenuBackground = useRef(null);
  let cityBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);


  useEffect(() => {
    if(state.clicked === false) {
      //close le menu
      gsap.to([revealMenu, revealMenuBackground], {
        duration: 0.8,
        height: 0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.07
        }
      });
      gsap.to(menu, {
        duration: 1,
        css:{ display: "none" }
      })

    } else if (state.clicked === true || state.clicked === true && state.initial === null) {
      //open le menu
      gsap.to(menu, {
        duration: 0,
        css:{ display: "block" }
      });
      gsap.to([revealMenuBackground, revealMenu], {
        duration: 0,
        opacity: 1,
        height: "100%"
      });
      staggerReveal(revealMenuBackground, revealMenu);
      fadeInUp(info);
      staggertext(line1, line2, line3)
    }
  }, [state]);

  const staggerReveal = (node1, node2) => {
    gsap.from([node1,node2], {
      duration: 0.8,
      height:0,
      transformOrigin:'right top',
      skewY: 2,
      ease: "power3.inOut",
      stagger: {
        amount: 0.1
      }
    });
  };
  const staggertext = (node1, node2, node3) => {
    gsap.from([node1, node2, node3], {
      duration: 0.8,
      y: 100,
      delay: 0.1,
      ease:"power3.inOut",
      stagger: {
        amount: 0.3
      }
    });
  };
  const fadeInUp = (node) => {
    gsap.from(node, {
      y: 60,
      duration: 1,
      delay: 0.2,
      opacity:0,
      ease:"power3.inOut"
    });
  };

  const handleCity = city => {
    gsap.to(cityBackground, {
      duration: 0,
      background: `url(${city}) center center`
    });
    gsap.to(cityBackground, {
      duration: 0.4,
      opacity: 1,
      ease: "power3.inOut"
    });
    gsap.from(cityBackground, {
      duration: 0.4,
      skewY: 2,
      transformOrigin:"right top"
    });
  }
  const handleCityReturn = () => {
    gsap.to(cityBackground, {
        duration: 0.4,
        opacity: 0
    })
  }


  const handlHover = e => {
    gsap.to(e.target, {
      duration: .3,
      y:3,
      skewX: 4,
      ease: "power3.inOut"
    })
  }

  const handlHoverExit = e => {
    gsap.to(e.target, {
      duration: .3,
      y: -3,
      skewX: 0,
      ease: "power3.inOut"
    })
  }

  return (<div ref={el =>(menu = el)} className='hamburger-menu'>
    <div ref={el =>(revealMenuBackground = el)} className="menu-secondary-background-color"></div>
    <div ref={el =>(revealMenu = el)} className="menu-layer">
      <div ref={el =>(cityBackground = el)} className="menu-city-background">

      </div>
      <div className="container">
        <div className="wrapper">
          <div className="menu-links">
            <nav>
              <ul>
                <li>
                  <Link 
                  onMouseEnter={e => handlHover(e)}
                  onMouseOut={e => handlHoverExit(e)}
                  ref={el =>(line1 = el)} 
                  to="/opportunities">
                    Opportunités
                  </Link>
                </li>
                <li>
                  <Link 
                  onMouseEnter={e => handlHover(e)}
                  onMouseOut={e => handlHoverExit(e)}
                  ref={el =>(line2 = el)} 
                  to="/solutions">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link 
                  onMouseEnter={e => handlHover(e)}
                  onMouseOut={e => handlHoverExit(e)}
                  ref={el =>(line3 = el)} 
                  to="/contact-us">
                    Contact
                  </Link>
                </li>
            
              </ul>
            </nav>
            <div ref={el =>(info = el)}className="info">
              <h3>Notre promesse</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum tempus est a molestie. 
                Maecenas quis nisl suscipit, ornare erat et, vestibulum mauris. Donec molestie, 
                elit nec eleifend dignissim, magna nulla ultrices mauris, id mattis massa justo eu erat. 
                Suspendisse potenti. Donec volutpat sit amet dui at pharetra. Nulla non fermentum ex. 
                Quisque non arcu sed nibh congue mattis sed nec mi.</p>
            </div>
            <div className="location">
              Localisation:
              {cities.map(el => (
                <span 
                key={el.name} 
                onMouseEnter={() => handleCity(el.image)} 
                onMouseOut={handleCityReturn}>
                {el.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
};

export default Hamburger;
