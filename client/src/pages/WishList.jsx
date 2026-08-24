import "../styles/List.scss";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const WishList = () => {
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>

      {!user ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2 style={{ color: "#24355A", marginBottom: "12px" }}>
            Please log in to view your wish list
          </h2>
          <p style={{ color: "#777", marginBottom: "20px" }}>
            Save properties you love by clicking the heart icon anytime.
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
      ) : wishList.length > 0 ? (
        <div className="list">
          {wishList.map(
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
            Your wish list is currently empty
          </h2>
          <p style={{ color: "#777", marginBottom: "20px" }}>
            Explore dream stays and tap the heart icon on any property to save it here!
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
            Explore Properties
          </Link>
        </div>
      )}

      <Footer />
    </>
  );
};

export default WishList;