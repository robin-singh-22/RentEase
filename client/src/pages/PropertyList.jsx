import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList || [];
  const dispatch = useDispatch();

  const getPropertyList = async () => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/users/${user._id}/properties`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setPropertyList(Array.isArray(data) ? data : []));
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, [user?._id]);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>

      {loading ? (
        <Loader />
      ) : !user ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2 style={{ color: "#24355A", marginBottom: "12px" }}>
            Please log in to manage your hosted properties
          </h2>
          <p style={{ color: "#777", marginBottom: "20px" }}>
            You must be logged in to view your published listings.
          </p>
          <Link
            to="/login"
            style={{
              padding: "10px 28px",
              backgroundColor: "#F8395A",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            Log In Now
          </Link>
        </div>
      ) : propertyList.length > 0 ? (
        <div className="list">
          {propertyList.map(
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
            You haven't listed any properties yet
          </h2>
          <p style={{ color: "#777", marginBottom: "20px" }}>
            Earn extra income and share your space with travelers from around the world!
          </p>
          <Link
            to="/create-listing"
            style={{
              padding: "10px 28px",
              backgroundColor: "#F8395A",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            Become A Host & List Your Place
          </Link>
        </div>
      )}

      <Footer />
    </>
  );
};

export default PropertyList;