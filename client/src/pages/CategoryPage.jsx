import { useState, useEffect } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { categories } from "../data";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/properties?category=${category}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return (
    <>
      <Navbar />

      {/* Category Navigation Pills */}
      <div className="category-list" style={{ padding: "20px 40px", overflowX: "auto" }}>
        {categories?.map((item, index) => (
          <Link
            to={item.label === "All" ? "/" : `/properties/category/${item.label}`}
            key={index}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className={`category ${item.label === category ? "selected" : ""}`}
            >
              <div className="category_icon">{item.icon}</div>
              <p>{item.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <h1 className="title-list">{category} Listings</h1>

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
            No listings currently found in "{category}"
          </h2>
          <p style={{ color: "#777", marginBottom: "24px" }}>
            Check back soon or explore other exciting categories like Islands, Beachfront, or Iconic cities!
          </p>
          <Link
            to="/"
            style={{
              padding: "12px 28px",
              backgroundColor: "#F8395A",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "24px",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Browse All Properties
          </Link>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CategoryPage;
