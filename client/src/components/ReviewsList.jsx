import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "../styles/Reviews.css";
import supabase from "../../config/config_file";

function ReviewsList({ date, message, reviewer, review_id, rate }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [reviewerUsername, setReviewerUsername] = useState("");
  const [reviewerImg, setReviewerImg] = useState("");
  const [reviewerId, setReviewerId] = useState("");
  const { user } = useContext(UserContext);

  const deleteReviewById = async () => {
    let { data, error } = await supabase.rpc("delete_review", {
      reviewid: review_id,
    });
    if (error) console.error(error);
    else setIsDeleted(true);
  };
  const getReviewerUsername = async () => {
    let { data, error } = await supabase.rpc("get_user_by_id", {
      userid: reviewer,
    });
    if (error) console.error(error);
    else {
      setReviewerUsername(data.username);
      setReviewerImg(data.avatar_url);
      setReviewerId(data.user_id);
    }
  };

  useEffect(() => {
    getReviewerUsername();
  }, [reviewerUsername]);

  function handleDelete() {
    setIsDeleted(true);
    deleteReviewById();
    alert("Review succesfully deleted");
  }

  return (
    <>
      {!isDeleted && (
        <div className="review-container">
          <p className="reviewMessage">{message}</p>
          <p className="reviewRate">{rate} ⭐️</p>
          <Link className="reviewerDetails" to={`/user/${reviewerId}`}>
            <img src={reviewerImg} className="reviewerImg" />
            <p className="reviewUsername">By {reviewerUsername}</p>
            {user.user_id === reviewer && (
              <button
                onClick={() => handleDelete()}
                className="reviewDeleteBtn"
              >
                ❌
              </button>
            )}
          </Link>

          <p className="reviewDate">{date}</p>
        </div>
      )}
    </>
  );
}

export default ReviewsList;
