'use client'
import React, { useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Loader } from '@googlemaps/js-api-loader';

declare global {
    interface Window {
        google: any;
    }
}

const Locations = () => {
    useEffect(() => {
        const apiOptions = {
            apiKey: process.env.GOOGLE_MAP_KEY as string
        };
        
        const loader = new Loader(apiOptions);
        
        loader.load().then(() => {
            console.log('Maps JS API loaded');
            displayMap();
        }).catch(err => {
            console.error('Error loading Google Maps', err);
        });
    }, []); 

    function displayMap() {
        if (typeof google !== 'undefined') {
            const mapOptions = {
                center: { lat: -33.860664, lng: 151.208138 },
                zoom: 14
            };
            const mapDiv = document.getElementById('map');
            if (mapDiv) {
                const map = new google.maps.Map(mapDiv, mapOptions);
                return map;
            }
        } else {
            console.error('Google Maps API is not available');
        }
    }

    return (
        <>
        <Header />
        <div className='flex'>
            <div id="map" style={{ height: '400px', width: '50%' , padding: '10px', borderRadius: '10px', margin: 20}}>
                <p>Hello World</p>
            </div>
            <div className='p-10'>
                <h1 className='font-semibold text-lg'>Our Locations</h1>
                <div className='mt-4'>
                    <p className='mb-2 font-medium'>Docklands</p>
                    <p>32 Swanston St, Melbourne VIC 3004</p>
                </div>
                <div className='mt-4'>
                    <p className='mb-2 font-medium'>Dullwich Hill</p>
                    <p>22 Sydney St, Dullwich Hill NSW 2205</p>
                    <p></p>
                </div>
                <div className='mt-4'>
                    <p className='mb-2 font-medium'>Manly</p>
                    <p>16 Pittwater Rd, Manly NSW 2095</p>
                    <p></p>
                </div>
            </div>
            <div className='p-9'>
                <h1 className='font-semibold text-lg'>Opening Hours</h1>
                <div className='mt-4'>
                    <p className='mb-1 font-medium'>Monday - Friday:</p>
                    <p>10am - 9pm</p>
                </div>
                <div className='mt-4'>
                    <p className='mb-1 font-medium'>Saturday</p>
                    <p>10am - 11pm</p>
                </div>
                <div className='mt-4'>
                    <p className='mb-1 font-medium'>Sunday</p>
                    <p>10am - 7pm</p>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Locations;
