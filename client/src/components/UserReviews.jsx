import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import supabase from "../../config/config_file";
import { useParams } from "react-router-dom";
import { useState } from "react";

import "../styles/Reviews.css";

function UserReviews() {
  const { id } = useParams();
  const [userReviews, setUserReviews] = useState([]);
  const [isAddActive, setIsAddActive] = useState(false);

  const getProfileReviews = async () => {
    let { data, error } = await supabase.rpc("get_reviews_by_reviewee", {
      userid: id,
    });
    if (error) console.error(error);
    else setUserReviews(data);
  };

  function handleToggleClick() {
    setIsAddActive(!isAddActive);
  }

  getProfileReviews();

  return (
    <>
      {!isAddActive && (
        <button onClick={handleToggleClick} className="addReviewBtn">
          Add review
        </button>
      )}
      {isAddActive && (
        <>
          <button onClick={handleToggleClick} className="addReviewBtn">
            Close tab
          </button>
          <ReviewForm
            setIsAddActive={setIsAddActive}
            id={id}
            setUserReviews={setUserReviews}
            userReviews={userReviews}
          />
        </>
      )}

      <ul className="reviewsUl">
        {userReviews.map((review) => {
          const date = new Date(review.time_created);
          return (
            <li key={review.review_id}>
              <ReviewsList
                date={date.toLocaleDateString("en-GB")}
                message={review.message}
                reviewer={review.reviewer_id}
                rate={review.rate}
                review_id={review.review_id}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default UserReviews;
