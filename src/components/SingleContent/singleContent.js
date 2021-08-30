import React from 'react';
import {img_300, unavailable} from '../../config/config';
import './singleContent.css';
import Badge from '@material-ui/core/Badge';
import ContentModal from '../ContentModal/ContentModal';

const SingleContent = ({id, poster, title, date, media_type, vote_average}) => {
  return (
    <>
      <ContentModal media_type={media_type} id={id}>
        <Badge badgeContent={vote_average} color="primary" />
        <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
        <b className="title">{title}</b>
        <div className="subTitle">
          <span>{media_type === 'tv' ? 'TV Series' : 'Movie'}</span>
          <span>{date}</span>
        </div>
      </ContentModal>
    </>
  );
};

export default SingleContent;
