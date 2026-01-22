"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Use user-provided "export" URLs
// Production Google Sheet URLs
const SPREADSHEET_ID = "1alWxQUJek4wzfSqe22Dx3yX--0Fmu2n2M5rTskkh3m8";
const SPONSOR_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=0`;
const METRICS_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=1054657188`;
const UPDATES_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=1256774866`;

// Helper to parse CSV line respecting quotes
const parseCSVLine = (row: string) => {
    const parts = [];
    let current = '';
    let inQuote = false;
    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"') { inQuote = !inQuote; }
        else if (char === ',' && !inQuote) { parts.push(current.trim()); current = ''; }
        else { current += char; }
    }
    parts.push(current.trim());
    return parts.map(p => p.replace(/^"|"$/g, '').trim());
};

export type Sponsor = {
    name: string;
    bottles: string;
    cities: string;
    logo: string;
    message?: string;
};

export type UpdateItem = {
    date: string;
    category: string;
    message: string;
};

export type DashboardStats = {
    dailyGoal: number;
    totalDistributed: number;
    totalRevenue: number;
    activeCities: string[];
};

type DashboardContextType = {
    sponsors: Sponsor[];
    updates: UpdateItem[];
    stats: DashboardStats;
    loading: boolean;
    refreshData: () => Promise<void>;
};

// Default fallback when sheets are completely empty or unreachable
const defaultStats: DashboardStats = {
    dailyGoal: 9, // Base goal starts at 9
    totalDistributed: 0,
    totalRevenue: 0,
    activeCities: []
};

const defaultSponsors: Sponsor[] = [
    { name: "Apex Global", bottles: "1,200", cities: "Pan India", logo: "🏙️", message: "Committed to water security for all souls." },
    { name: "EcoStream", bottles: "850", cities: "Delhi-NCR", logo: "🌿", message: "Sustainability is not a choice, it's our duty." },
    { name: "Unity Foundation", bottles: "500", cities: "South Zone", logo: "🤝", message: "Together, we quench the thirst of a nation." }
];

const DashboardContext = createContext<DashboardContextType>({
    sponsors: [],
    updates: [],
    stats: defaultStats,
    loading: true,
    refreshData: async () => { },
});

export function DashboardProvider({ children }: { children: ReactNode }) {
    const [sponsors, setSponsors] = useState<Sponsor[]>(defaultSponsors);
    const [updates, setUpdates] = useState<UpdateItem[]>([]);
    const [stats, setStats] = useState<DashboardStats>(defaultStats);
    const [loading, setLoading] = useState(true);

    const refreshData = async () => {
        try {
            const timestamp = Date.now();

            // ROUTE THROUGH PROXY to avoid CORS errors
            const proxyFetch = (targetUrl: string) =>
                fetch(`/api/sheet-proxy?url=${encodeURIComponent(targetUrl)}&t=${timestamp}`, { cache: 'no-store' });

            // Fetch all sheets in parallel via proxy
            const [sponsorRes, distRes, updateRes] = await Promise.all([
                proxyFetch(SPONSOR_SHEET_URL),
                proxyFetch(METRICS_SHEET_URL),
                proxyFetch(UPDATES_SHEET_URL)
            ]);

            const newSponsorsList: Sponsor[] = [];
            const newUpdates: UpdateItem[] = [];
            const newStats: DashboardStats = { ...defaultStats, totalDistributed: 0, totalRevenue: 0, activeCities: [] };

            // 1. Parse Sponsors Log (Calculate Total Revenue)
            if (sponsorRes.ok) {
                const text = await sponsorRes.text();
                const rows = text.split("\n").slice(1);
                let calculatedRevenue = 0;
                rows.forEach(row => {
                    const cols = parseCSVLine(row);
                    if (!cols[0]) return;

                    // Sum amount (Index 1)
                    const amt = parseFloat(cols[1]?.replace(/[^0-9.]/g, '') || "0");
                    calculatedRevenue += amt;

                    // Only take top 5 for "Sponsors" list/carousel if needed, or all
                    // For our ticker/carousel we want names
                    if (newSponsorsList.length < 250) {
                        newSponsorsList.push({
                            name: cols[0],
                            bottles: cols[1] || "0",
                            cities: "Active Zone",
                            logo: cols[8] || "🌟",
                            message: cols[7] || "Official Supporter"
                        });
                    }
                });
                newStats.totalRevenue = calculatedRevenue;
                if (newSponsorsList.length > 0) setSponsors(newSponsorsList);
            }

            // 2. Parse Distributions Log (Calculate Impact)
            if (distRes.ok) {
                const text = await distRes.text();
                const rows = text.split("\n").slice(1);
                const citiesSet = new Set<string>();
                let distributionCount = 0;

                rows.forEach(row => {
                    const cols = parseCSVLine(row);
                    if (!cols[0]) return;

                    distributionCount++;
                    // City is index 2
                    if (cols[2]) citiesSet.add(cols[2]);
                });

                newStats.totalDistributed = distributionCount;
                newStats.activeCities = Array.from(citiesSet);
                if (newStats.activeCities.length === 0) newStats.activeCities = defaultStats.activeCities;
            }

            // 3. Parse Updates
            if (updateRes.ok) {
                const text = await updateRes.text();
                const rows = text.split("\n").slice(1);
                rows.forEach(row => {
                    const cols = parseCSVLine(row);
                    if (!cols[2]) return; // Message is required
                    newUpdates.push({
                        date: cols[0] || "Today",
                        category: cols[1] || "Update",
                        message: cols[2]
                    });
                });
                if (newUpdates.length > 0) setUpdates(newUpdates);
            }

            // Final state sync with careful validation
            setStats(prev => {
                const updated = { ...prev };

                // Always use fresh data from sheets
                if (sponsorRes.ok) {
                    updated.totalRevenue = newStats.totalRevenue;
                    // DYNAMIC GOAL: Base 9 + 1 bottle for every ₹10 sponsored
                    updated.dailyGoal = 9 + Math.floor(newStats.totalRevenue / 10);
                    console.log('📊 Revenue from sheet:', newStats.totalRevenue);
                    console.log('📊 Dynamic Goal:', updated.dailyGoal);
                }
                if (distRes.ok) {
                    updated.totalDistributed = newStats.totalDistributed;
                    if (newStats.activeCities.length > 0) {
                        updated.activeCities = newStats.activeCities;
                    }
                    console.log('📊 Distributions from sheet:', newStats.totalDistributed);
                }

                return updated;
            });

        } catch (error) {
            console.error("Dashboard Data Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
        const interval = setInterval(refreshData, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <DashboardContext.Provider value={{ sponsors, updates, stats, loading, refreshData }}>
            {children}
        </DashboardContext.Provider>
    );
}

export const useDashboard = () => useContext(DashboardContext);
