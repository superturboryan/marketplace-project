import React from "react";
import ReviewList from "./ReviewList.jsx";
import ItemGallery from "./ItemGallery.jsx";
let renderProfile = routerData => {
  let userId = routerData.match.params.userId;
  return (
    <div>
      <ReviewList userId={userId} />
    </div>
  );
};
export default renderProfile;
