'use client';
import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

declare global {
    interface Window {
        google: any;
    }
}

const restaurantLocation = [
    {
        name: "St Mary's",
        address: `32 Swanston Street, St Mary's 2760`,
        position: { lat: -33.7723, lng: 150.7742 }
    },
    {
        name: "Dullwich Hill",
        address: '1-35 Kintore St, Sydney NSW 2203',
        position: { lat: -33.9058, lng: 151.1408 }
    },
    {
        name: "Manly",
        address: '7 Ocean Rd, Manly NSW 2095',
        position: { lat: -33.7944, lng: 151.2826 }
    }
];

const Locations = () => {
    const [map, setMap] = useState<google.maps.Map | null>(null);

    useEffect(() => {
        const apiOptions = {
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string
        };

        const loader = new Loader(apiOptions);

        loader
            .load()
            .then(() => {
                console.log('Maps JS API loaded');
                initializeMap();
            })
            .catch(err => {
                console.error('Error loading Google Maps', err);
            });
    }, []);

    const initializeMap = () => {
        if (typeof google !== 'undefined') {
            const mapOptions = {
                center: { lat: -33.860664, lng: 151.208138 },
                zoom: 12
            };
            const mapDiv = document.getElementById('map');
            if (mapDiv) {
                const initializedMap = new google.maps.Map(mapDiv, mapOptions);
                setMap(initializedMap); // Store the map instance in state
            }
        } else {
            console.error('Google Maps API is not available');
        }
    };

    // This effect runs when the `map` instance is set
    useEffect(() => {
        if (map) {
            restaurantLocation.forEach((location) => {
                const marker = new google.maps.Marker({
                    position: location.position,
                    map: map,
                    title: location.name
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `<h3>${location.name}</h3><p>${location.address}</p>`
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            });
        }
    }, [map]); // Add markers only after `map` is available

    return (
        <div className="flex pt-40">
            <div
                id="map"
                style={{
                    height: '400px',
                    width: '50%',
                    padding: '10px',
                    borderRadius: '10px',
                    margin: 20
                }}
            >
                <p>Hello World</p>
            </div>
            <div className="p-10">
                <h1 className="font-semibold text-lg">Our Locations</h1>
                {restaurantLocation.map((location, index) => (
                    <div key={index} className="mt-4">
                        <p className="mb-2 font-medium">{location.name}</p>
                        <p>{location.address}</p>
                    </div>
                ))}
            </div>
            <div className="p-9">
                <h1 className="font-semibold text-lg">Opening Hours</h1>
                <div className="mt-4">
                    <p className="mb-1 font-medium">Monday - Friday:</p>
                    <p>10am - 9pm</p>
                </div>
                <div className="mt-4">
                    <p className="mb-1 font-medium">Saturday</p>
                    <p>10am - 11pm</p>
                </div>
                <div className="mt-4">
                    <p className="mb-1 font-medium">Sunday</p>
                    <p>10am - 7pm</p>
                </div>
            </div>
        </div>
    );
};

export default Locations;
