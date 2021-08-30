import React from 'react';
import './Trending.css';
import axios from 'axios';
import {useState} from 'react';
import {useEffect} from 'react';
import SingleContent from '../../components/SingleContent/singleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

function Trending() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchTrending = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=ea43363f811a71fcbfe8b52f2c68e898&page=${page}`
    );
    return data;
    // console.log(data.results);
    // setContent(data.results);
    // setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    let mounted = true;
    fetchTrending().then(res => {
      if (mounted) {
        setContent(res.results);
        setNumOfPages(res.total_pages);
      }
    });
    return function Cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map(item => {
            return (
              <SingleContent
                key={item.id}
                id={item.id}
                poster={item.poster_path}
                title={item.title || item.name}
                date={item.first_air_date || item.release_date}
                media_type={item.media_type}
                vote_average={item.vote_average}
              />
            );
          })}
      </div>
      <CustomPagination numOfPages={numOfPages} setPage={setPage} />
    </div>
  );
}

export default Trending;
