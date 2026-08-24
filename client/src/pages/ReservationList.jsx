import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const reservationList = useSelector((state) => state.user?.reservationList || []);
  const dispatch = useDispatch();

  const getReservationList = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setReservationList(Array.isArray(data) ? data : []));
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservationList();
  }, [userId]);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>

      {loading ? (
        <Loader />
      ) : !user ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2 style={{ color: "#24355A", marginBottom: "12px" }}>
            Please log in to view reservations on your properties
          </h2>
          <p style={{ color: "#777", marginBottom: "20px" }}>
            Check guest bookings and schedule details anytime after logging in.
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
      ) : reservationList && reservationList.length > 0 ? (
        <div className="list">
          {reservationList.map(
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
            No guest reservations received yet
          </h2>
          <p style={{ color: "#777", marginBottom: "20px" }}>
            When guests book one of your published properties, their reservation details will appear here.
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
            Manage / Create Properties
          </Link>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ReservationList;
