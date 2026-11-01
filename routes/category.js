const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");

const categories = {
  trending: { title: "Trending", icon: "fa-solid fa-fire" },
  bed:      { title: "Bed",      icon: "fa-solid fa-bed" },
  castles:  { title: "Castles",  icon: "fa-brands fa-fort-awesome" },
  farms:    { title: "Farms",    icon: "fa-solid fa-wheat-awn" },
};

router.get("/:name", (req, res, next) => {
  const category = categories[req.params.name];
  if (!category) {
    return next(new ExpressError(404, "page not found."));
  }
  res.render("listings/soon.ejs", { category });
});

module.exports = router;