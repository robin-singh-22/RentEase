import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const tripList = useSelector((state) => state.user?.tripList || []);
  const dispatch = useDispatch();

  const getTripList = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/trips`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setTripList(Array.isArray(data) ? data : []));
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTripList();
  }, [userId]);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>

      {loading ? (
        <Loader />
      ) : !user ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2 style={{ color: "#24355A", marginBottom: "12px" }}>
            Please log in to view your booked trips
          </h2>
          <p style={{ color: "#777", marginBottom: "20px" }}>
            Review past and upcoming reservations anytime after logging in.
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
      ) : tripList && tripList.length > 0 ? (
        <div className="list">
          {tripList.map(
            ({
              _id,
              listingId,
              hostId,
              startDate,
              endDate,
              totalPrice,
              booking = true,
            }) => {
              if (!listingId) return null;
              return (
                <ListingCard
                  key={_id || listingId._id}
                  listingId={listingId._id}
                  creator={hostId?._id || hostId}
                  listingPhotoPaths={listingId.listingPhotoPaths || []}
                  city={listingId.city}
                  province={listingId.province}
                  country={listingId.country}
                  category={listingId.category}
                  startDate={startDate}
                  endDate={endDate}
                  totalPrice={totalPrice}
                  booking={booking}
                />
              );
            }
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2 style={{ color: "#24355A", marginBottom: "12px" }}>
            No trips booked yet!
          </h2>
          <p style={{ color: "#777", marginBottom: "20px" }}>
            Time to dust off your bags and start planning your next great adventure.
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
            Find Places to Stay
          </Link>
        </div>
      )}

      <Footer />
    </>
  );
};

export default TripList;
