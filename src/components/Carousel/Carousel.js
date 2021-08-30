import axios from 'axios';
import React, {useEffect} from 'react';
import {useState} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {img_300, noPicture} from '../../config/config';
import './Carousel.css';

const handleDragStart = e => e.preventDefault();

const Carousel = ({media_type, id}) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map(c => {
    return (
      <div className="carouselItem">
        <img
          src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
          alt={c?.name}
          onDragStart={handleDragStart}
          className="carouselItem_img"
        />
        <b className="carouselItem_txt">{c?.name}</b>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 3
    },
    512: {
      items: 5
    },
    1024: {
      items: 7
    }
  };

  const fetchCredits = async () => {
    const {data} = await axios.get(`
        https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=ea43363f811a71fcbfe8b52f2c68e898&language=en-US`);
    // setCredits(data.cast);
    return data;
  };

  useEffect(() => {
    let mounted = true;
    fetchCredits().then(res => {
      if (mounted) {
        setCredits(res.cast);
      }
    });

    return function Cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <AliceCarousel
      autoPlay
      infinite
      disableDotsControls
      disableButtonsControls
      mouseTracking
      responsive={responsive}
      items={items}
    />
  );
};

export default Carousel;
