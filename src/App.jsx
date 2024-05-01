import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import { Form } from "react-bootstrap";
import axios from "axios";

const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY ="DqINEdA02NtmHQssjl2eYsrxn_26887uOnQMyxZoSgY";
const IMAGES_PER_PAGE = 24;

function App() {

  const [images , setImages] =useState([]);
  const [totalPages , setTotalPages] = useState(0);
  const[page , setPage] = useState(0);
 
    useEffect(()=>{
      fetchImage();
    },[page]);
 

  const fetchImage = async()=>{
    try {
      const {data} = await axios.get(`https://api.unsplash.com/search/photos?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${ import.meta.env.VITE_API_KEY}`);
    
    setImages(data.results);
      setTotalPages(data.total_pages)
    } catch (error) {
      console.log(error)
    }
  }
  
  const resetSearch = () =>{
    fetchImage();
    setPage(1);
  }


  const searchInput = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    resetSearch();
  };

  const handelSelection = (selection) => {
    searchInput.current.value = selection;
    console.log(selection);
    resetSearch();
  };

  return (
    <>
      <div className="container">
        <h1 className="title">Image Search</h1>
        <div className="search-section">
          <Form onSubmit={handleSearch}>
            <Form.Control
              className="search-input"
              type="search"
              placeholder="Image search"
              ref={searchInput}
            />
          </Form>
        </div>
        <div className="filter">
          <button onClick={() => handelSelection("Nature")}>Nature</button>
          <button onClick={() => handelSelection("Bird")}>Bird</button>
          <button onClick={() => handelSelection("Cats")}>Cats</button>
          <button onClick={() => handelSelection("Shoes")}>Shoes</button>
        </div>

        <div className="images">
        {
          images.map((image)=>{
            return (
              <img key={image.id} src={image.urls.small} alt={image.alt_description} className="image" />
            );
          })}
        </div>
        <div className="button">
          { page>1 && <button onClick={()=> setPage(page-1)}>Previous</button> }
          { page<totalPages && <button onClick={()=> setPage(page+1)}>Next</button> }
        </div>
      </div>
    </>
  );
}

export default App;
