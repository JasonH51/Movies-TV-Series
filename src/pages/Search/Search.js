import {Button, createTheme, Tab, Tabs, TextField, ThemeProvider} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/singleContent';
import './Search.css';

function Search() {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState();
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff'
      }
    }
  });

  const fetchSearch = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/search/${
        type ? 'tv' : 'movie'
      }?api_key=ea43363f811a71fcbfe8b52f2c68e898&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{display: 'flex', margin: '15px 0'}}>
          <TextField
            style={{flex: 1}}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={e => setSearchText(e.target.value)}
          />
          <Button variant="contained" style={{marginLeft: 10}} onClick={fetchSearch}>
            <SearchIcon />
          </Button>
        </div>

        <Tabs
          className="tabContainer"
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{paddingBottom: 5}}
        >
          <Tab style={{width: '100%'}} label="Search Movies" />
          <Tab style={{width: '100%'}} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map(item => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={type ? 'tv' : 'movie'}
              vote_average={item.vote_average}
            />
          ))}
        {searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      <CustomPagination numOfPages={numOfPages} setPage={setPage} />
    </div>
  );
}

export default Search;
