
mapboxgl.accessToken =  'pk.eyJ1IjoicmFtaW45NjMiLCJhIjoiY2xtdnozcDJ5MHYwazJydnp5bGM5MDl0dyJ9.BugsfIKKdpJWUmvLZQaa6Q';

// Create the Mapbox map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [30.55132, 37.76397],
  zoom: 4.7,
});
// Wrap your code in a DOMContentLoaded event handler to ensure the HTML is fully loaded before executing the JavaScript.
document.addEventListener('DOMContentLoaded', function () {
  getStores();
  
});

async function getStores() {
  try {
    // Fetch your JSON data from the API route
    const res = await fetch('/api/v1/stores');
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();
    const stores = data.data;

    if (!stores || stores.length === 0) {
      throw new Error('No store data received');
    }

    const features = stores.map(store => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: 'shop',
        storeName: store.storeName,
        address: store.address,
        storeTel: store.storeTel
      }
    }));

    buildLocationList(features);
    addMarkers(features);
    
  } catch (error) {
    console.error('Error fetching or processing store data:', error);
  }
}

function addMarkers(features) {
  features.forEach(feature => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat(feature.geometry.coordinates)
      .addTo(map);

    el.addEventListener('click', (e) => {
      flyToStore(feature);
      createPopUp(feature);

      // Handle the active class for the location list
      const activeItem = document.querySelector('.item.active');
      if (activeItem) {
        activeItem.classList.remove('active');
      }
      const listing = document.getElementById(`listing-${feature.properties.storeId}`);
      if (listing) {
        listing.classList.add('active');
      }
      e.stopPropagation();
    });
  });
}

function buildLocationList(features) {
  const listings = document.getElementById('info-container');

  features.forEach(feature => {
    const listing = document.createElement('div');
    listing.id = `listing-${feature.properties.storeId}`;
    listing.className = 'item';

    const link = document.createElement('a');
    link.href = '#';
    link.className = 'title';
    link.innerHTML = `${feature.properties.storeName}`;

    const details = document.createElement('div');
    details.className="detail";
    details.innerHTML = `<img width="15" height="15" src="https://img.icons8.com/ios/50/address--v1.png" alt="address--v1"/> ${feature.properties.address}`;
    if (feature.properties.storeTel) {
      details.innerHTML += `<br><img width="15" height="15" src="https://img.icons8.com/ios-filled/50/calling.png" alt="calling"/> ${feature.properties.storeTel}`;
    }

    link.addEventListener('click', function () {
      flyToStore(feature);
      createPopUp(feature);

      // Handle the active class for the location list
      const activeItem = document.querySelector('.item.active');
      if (activeItem) {
        activeItem.classList.remove('active');
      }
      this.parentNode.classList.add('active');
    });

    listing.appendChild(link);
    listing.appendChild(details);
    listings.appendChild(listing);
  });
}

function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15,
  });
}

function createPopUp(currentFeature) {
  const popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();

  const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(`<h3>${currentFeature.properties.storeName}</h3><h4>${currentFeature.properties.address}</h4><h4>${currentFeature.properties.storeTel}</h4>`)
    .addTo(map);
}
