require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);   

const mongoose = require("mongoose");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding.js");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

async function getOrCreateOwner() {
    const existing = await User.findOne();
    if (existing) return existing;

    console.log("No user found, creating demo user (username: demo / password: ChangeThisPassword123)");
    return User.register(
        new User({ username: "demo", email: "demo@wanderlust.com" }),
        "ChangeThisPassword123"
    );
}

async function run() {
    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("Connected to database:", mongoose.connection.name);

    const reset = process.argv.includes("--reset");
    const count = await Listing.countDocuments();

    if (count > 0 && !reset) {
        console.log(`Database already has ${count} listings. Nothing changed.`);
        console.log("Run  node init/index.js --reset  to delete them and re-seed.");
        return;
    }

    const owner = await getOrCreateOwner();

    const docs = [];
    for (const item of initData.data) {
        const res = await geocodingClient
            .forwardGeocode({ query: `${item.location}, ${item.country}`, limit: 1 })
            .send();
        const feature = res.body.features[0];
        if (!feature) {
            console.log("Skipped (no map result):", item.title);
            continue;
        }
        docs.push({ ...item, owner: owner._id, geometry: feature.geometry });
    }

    if (reset) await Listing.deleteMany({});
    await Listing.insertMany(docs);
    console.log(`Done: ${docs.length} listings added.`);
}

run()
    .catch(console.error)
    .finally(() => mongoose.connection.close());