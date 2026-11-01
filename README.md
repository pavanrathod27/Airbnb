# Wanderlust (Airbnb Clone)

A full-stack Airbnb-style web app where users can browse, create, edit and review start listings, with maps and image uploads.

## Features

- User sign up, login and logout (Passport, local strategy)
- Create, view, edit and delete listings (only the owner can edit or delete)
- Image upload to Cloudinary
- Location maps with Mapbox (address is converted to coordinates when a listing is created)
- Reviews with star ratings (login required; only the author can delete a review)
- Flash messages and server-side validation (Joi)
- Sessions stored in MongoDB Atlas
- Filter bar on the home page; Trending, Bed, Castles and Farms open a "working on it" page
- Optional "Display tax" toggle that shows 18% GST on prices

## Tech Stack

- Node.js and Express 5
- MongoDB Atlas with Mongoose
- EJS with ejs-mate layouts
- Bootstrap 5 and Font Awesome
- Passport (passport-local, passport-local-mongoose)
- Multer with Cloudinary for image uploads
- Mapbox for maps and geocoding
- Joi for validation

## Project Structure

```
app.js                  App entry point, middleware and route mounting
routes/                 listing.js, review.js, user.js, category.js
controller/             Route handlers (listing, review, user)
models/                 Mongoose models (listing, review, user)
views/                  EJS templates (layouts, includes, listings, users)
public/                 CSS and client-side JS
init/                   Sample listing data
utils/                  ExpressError and wrapAsync helpers
middleware.js           Auth, ownership and validation middleware
cloudConfig.js          Cloudinary setup
schema.js               Joi validation schemas
```

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
   cd YOUR-REPO
   npm install
   ```

2. Create a `.env` file in the project root (never commit this file):
   ```
   ATLASDB_URL=your_mongodb_atlas_connection_string
   RANDOMSECRET=a_long_random_string
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_access_token
   ```

3. Start the server:
   ```bash
   node app.js
   ```

4. Open `/listings` on the port printed in the terminal, for example:
   ```
   http://localhost:8080/listings
   ```

## "Working on it" Filter Pages

Clicking **Trending**, **Bed**, **Castles** or **Farms** in the filter bar goes to `/category/<name>` and shows a "We're working on it" message.

| Part | File |
|---|---|
| Filter links | `views/listings/index.ejs` |
| Route and category list | `routes/category.js` |
| Page template | `views/listings/soon.ejs` |
| Route mounted in | `app.js` (`app.use("/category", categoryRouter);`) |

To add the same page for another filter, add an entry to the `categories` object in `routes/category.js`, then link that filter to `/category/<key>` in `index.ejs`.

## Roadmap

- Real filtering for Trending, Bed, Castles and Farms
- Make the search box work

## Notes

- Keep `.env` out of version control. It is already listed in `.gitignore`.
- If the app can't connect to the database, check your internet or DNS and make sure your IP is allowed in MongoDB Atlas Network Access.