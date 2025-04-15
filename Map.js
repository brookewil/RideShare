let map;

function initMap() {
    // Initialize and create Map Object
    map = new Map(document.getElementById("map"), {
        center: { lat: 37.7749, lng: -122.4194 }, // San Francisco
        zoom: 12,
    });
    // Test Marker
    addMarker({ lat: 37.7749, lng: -122.4194 }, "San Francisco", "This is San Francisco!");
}

export {initMap};