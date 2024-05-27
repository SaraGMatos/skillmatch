import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import supabase from "../../config/config_file"

function ReviewForm({setIsAddActive, id, setUserReviews}) {
    const [reviewInput, setReviewInput] = useState('')
    const { user } = useContext(UserContext)
   
   

    const[message, setMessage] = useState('')
    const[rating, setRating] = useState(0)

  
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
                    setUserReviews((reviews) => [...reviews, data])
                    alert("Review as posted succesfully")
                }
            }

            await postReview()
        }
    }

    return (
        
        <div className="reviewForm-container">
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="message"
                placeholder="Type your review here..."
                defaultValue={reviewInput}
                onChange={handleChange}
                required={true}>
            </input>
            <label htmlFor="rating">Rating:</label>
                <select name="rating" onChange={handleRateChange} required={true}> 
                <option value="" >Choose here</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button type="submit">Post</button>
            <button type="cancel" onClick={handleCancel}>Cancel</button>

            </form>
            
            </div>
    )


}

export default ReviewForm;
