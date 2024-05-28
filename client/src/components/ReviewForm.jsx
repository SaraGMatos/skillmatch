import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import supabase from "../../config/config_file"

function ReviewForm({setIsAddActive, id, setUserReviews, userReviews}) {
    const [reviewInput, setReviewInput] = useState('')
    const { user } = useContext(UserContext)
    const[message, setMessage] = useState('')
    const[rating, setRating] = useState(0)

    let reviewerIDs = []
    
    userReviews.map((review) => {
        reviewerIDs.push(review.reviewer_id)
    })
   
  
    function handleChange(e) {
        e.preventDefault()
        setMessage(e.target.value)
    }
    function handleRateChange(e) {
        e.preventDefault()
        setRating(e.target.value)
    }

    function handleCancel(e) {
        e.preventDefault();
        setIsAddActive(false)
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsAddActive(false)
        if (user.user_id === id) {
            setReviewInput('')
            alert(`Can't leave a review on your own page`)
        } else if (reviewerIDs.includes(user.user_id)) {
            setReviewInput('')
            alert('You have already left a review for this person')
        } else {
            const postReview = async () => {
                let { data, error } = await supabase
                    .rpc('post_review', {
                        message: message,
                        rate: rating,
                        revieweeid: id,
                        reviewerid: user.user_id
                    })
                if (error) console.error(error)
                else {
                    setUserReviews((reviews) => [ data, ...reviews])
                    alert("Review as posted succesfully")
                }
            }

            await postReview()
        }
    }

    return (
        
        <div className="reviewForm-container">
            <h1 className="reviewHeader">Post your review</h1>
        <form onSubmit={handleSubmit}>
            <textarea
                type="text"
                name="message"
                className="reviewMessageInput"
                placeholder="Type your review here..."
                defaultValue={reviewInput}
                onChange={handleChange}
                required={true}>
            </textarea>
            <div className="ratingSection">
            <label htmlFor="rating">Rating:</label>
                <select name="rating" onChange={handleRateChange} required={true} className="ratingDropDown"> 
                    <option value="" >Choose</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                    <div className="reviewBtns">
                        <button type="submit" className="reviewSubmitBtn">Post</button>
                        <button type="cancel" onClick={handleCancel} className="reviewCancelBtn">Cancel</button>
                    </div>
                </div>
               
            </form>
            
            </div>
    )


}

export default ReviewForm;
