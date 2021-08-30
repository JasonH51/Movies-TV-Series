import {createTheme, ThemeProvider} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import './CustomPagination.css';

const darkTheme = createTheme({
  palette: {
    type: 'dark'
  }
});

function CustomPagination({setPage, numOfPages}) {
  const handlePageChange = page => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="pagination">
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={e => handlePageChange(e.target.textContent)}
          count={numOfPages}
          hideNextButton
          hidePrevButton
          color="primary"
        />
      </ThemeProvider>
    </div>
  );
}

export default CustomPagination;
