import UserInterests from "./UserInterests";
import UserIntroSkills from "./UserIntroSkills";
import UserPicture from "./UserPicture";
import UserReviews from "./UserReviews";
import UserShowcase from "./UserShowcase";

function UserPage() {
  return (
    <>
      <UserPicture />
      {/* Components below can be wrapped in an expandable */}
      <UserInterests />
      <UserIntroSkills />
      <UserShowcase />
      <UserReviews />
    </>
  );
}

export default UserPage;
