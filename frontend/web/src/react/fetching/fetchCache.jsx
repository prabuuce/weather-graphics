import { useEffect, useState } from 'react';

export function requestToBackend(path) {
    const [packet, setPacket] = useState()

    useEffect(() => { 
            // Check if we've fetched data recently
            fetch("cache.json")
                .then(response => response.json())
                .then(data => { 
                    if (data[path]) {
                        return data[path]
                    }
            });

            // Get weather data for a specific location (e.g., zip code 92692)
            fetch(`/api/weather/${path}`)
                .then(res => res.json())
                .then(data => {
                console.log("Packet information: ", data);
                setPacket(data || []);
                })
                .catch(err => {
                console.error('Error connecting to backend:', err)
            })
            
    }, [path])

    return packet
}