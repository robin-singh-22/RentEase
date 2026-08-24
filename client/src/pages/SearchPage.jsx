import { useParams, Link } from "react-router-dom";
import "../styles/List.scss";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useParams();
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  const getSearchListings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/properties/search/${search}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: Array.isArray(data) ? data : [] }));
    } catch (err) {
      console.log("Fetch Search List failed!", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchListings();
  }, [search]);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Results for "{search}"</h1>

      {loading ? (
        <Loader />
      ) : listings && listings.length > 0 ? (
        <div className="list">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2 style={{ color: "#24355A", marginBottom: "12px" }}>
            No properties found matching "{search}"
          </h2>
          <p style={{ color: "#777", marginBottom: "20px" }}>
            Try searching for a different city, country, or category like "Islands", "Malibu", or "Paris".
          </p>
          <Link
            to="/"
            style={{
              padding: "10px 28px",
              backgroundColor: "#F8395A",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            Show All Properties
          </Link>
        </div>
      )}

      <Footer />
    </>
  );
};

export default SearchPage;
