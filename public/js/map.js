mapboxgl.accessToken = mapToken;
        const map = new mapboxgl.Map({
        container: 'map', 
        center: listing.geometry.coordinates,
        zoom: 9,
        cooperativeGestures: window.matchMedia('(pointer: coarse)').matches
    });

    const maker = new mapboxgl.Maker({ color: "red" })
    .setLnglat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`<h6>${listing.location}<i>Location of your destiny</i></h6>`)
    )
    .addTo(map);