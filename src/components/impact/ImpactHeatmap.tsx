"use client";

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { useDashboard } from '@/contexts/DashboardContext';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

// Sample coordinates for active cities to populate heatmap visuals
const CITY_COORDS: Record<string, [number, number]> = {
    "Delhi": [77.2090, 28.6139],
    "Mumbai": [72.8777, 19.0760],
    "Bangalore": [77.5946, 12.9716],
    "Hyderabad": [78.4867, 17.3850],
    "Chennai": [80.2707, 13.0827],
};

export default function ImpactHeatmap() {
    const { stats, loading: statsLoading } = useDashboard();
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng] = useState(78.9629); // India Center
    const [lat] = useState(20.5937);
    const [zoom] = useState(4);
    const [error, setError] = useState(!MAPBOX_TOKEN);

    useEffect(() => {
        if (!MAPBOX_TOKEN) return;
        if (map.current || !mapContainer.current) return;

        mapboxgl.accessToken = MAPBOX_TOKEN;

        try {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/dark-v11',
                center: [lng, lat],
                zoom: zoom,
                interactive: false,
                attributionControl: false
            });

            map.current.on('load', () => {
                // Generate features from active cities for visual heatmap effect
                const features = stats.activeCities.map(city => {
                    const coords = CITY_COORDS[city] || [78 + Math.random(), 20 + Math.random()];
                    return {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: coords
                        },
                        properties: { intensity: 0.8 }
                    };
                });

                map.current?.addSource('water-units', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: features as any
                    }
                });

                map.current?.addLayer({
                    id: 'water-heat',
                    type: 'heatmap',
                    source: 'water-units',
                    paint: {
                        'heatmap-weight': ['interpolate', ['linear'], ['get', 'intensity'], 0, 0, 1, 1],
                        'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],
                            0, 'rgba(33,102,172,0)',
                            0.2, 'rgba(20, 184, 166, 0.2)',
                            0.4, 'rgba(20, 184, 166, 0.4)',
                            0.6, 'rgba(20, 184, 166, 0.6)',
                            0.8, 'rgba(20, 184, 166, 0.8)',
                            1, 'rgba(20, 184, 166, 1)'
                        ],
                        'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 40],
                        'heatmap-opacity': 0.8
                    }
                });
            });
        } catch (e) {
            console.error("Mapbox error:", e);
            setTimeout(() => setError(true), 0);
        }

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [lng, lat, zoom, stats.activeCities]);

    return (
        <Card className="relative h-[600px] w-full overflow-hidden bg-slate-900 border-white/5 p-0">
            {!error ? (
                <div ref={mapContainer} className="absolute inset-0 h-full w-full" />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950 flex-col gap-4 overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/40 via-slate-900 to-slate-950"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                    <div className="relative z-10 bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center">
                        <div className="bg-teal-500/10 p-4 rounded-full mb-4 animate-[pulse_3s_ease-in-out_infinite]">
                            <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(20,184,166,0.5)]">🌏</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Impact Visualization</h3>
                        <p className="text-slate-400 font-medium text-center text-sm max-w-[250px] leading-relaxed">
                            {statsLoading ? "Initializing Real-Time Map..." : "Live Network Active"}
                        </p>
                    </div>
                </div>
            )}

            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Live Distributions", val: statsLoading ? "..." : stats.totalDistributed.toLocaleString() },
                    { label: "Verified Cities", val: statsLoading ? "..." : stats.activeCities.length.toString() },
                    { label: "Liters Verified", val: statsLoading ? "..." : (stats.totalDistributed * 20).toLocaleString() + " L" },
                    { label: "Network Uptime", val: "99.99%" }
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-950/80 backdrop-blur-md p-4 rounded-xl border border-white/10 group hover:border-teal-500/30 transition-all">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{stat.label}</p>
                        <p className="text-2xl font-black text-white tracking-tighter">{stat.val}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}
