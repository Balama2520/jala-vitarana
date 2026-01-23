"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  User,
  MapPin,
  Loader2,
  CheckCircle2,
  Droplets,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Activity,
  Camera,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import { useDashboard } from "@/contexts/DashboardContext";
import SponsorShowcase from "./SponsorShowcase";

const COLORS = ["#14b8a6", "#3b82f6", "#6366f1", "#8b5cf6"];

const mockHourlyData = [
  { time: "9 AM", bottles: 45 },
  { time: "10 AM", bottles: 80 },
  { time: "11 AM", bottles: 120 },
  { time: "12 PM", bottles: 90 },
  { time: "1 PM", bottles: 60 },
  { time: "2 PM", bottles: 85 },
  { time: "3 PM", bottles: 110 },
  { time: "4 PM", bottles: 140 },
  { time: "5 PM", bottles: 95 },
];

const mockCityData = [
  { name: "Hyderabad", value: 400 },
  { name: "Delhi", value: 300 },
  { name: "Bangalore", value: 200 },
  { name: "Mumbai", value: 100 },
];

const getCityCoords = (city: string) => {
  const coords: Record<string, { lat: number; lng: number }> = {
    Delhi: { lat: 28.6139, lng: 77.209 },
    Mumbai: { lat: 19.076, lng: 72.8777 },
    Bangalore: { lat: 12.9716, lng: 77.5946 },
    Chennai: { lat: 13.0827, lng: 80.2707 },
    Hyderabad: { lat: 17.385, lng: 78.4867 },
  };
  return coords[city] || { lat: 20, lng: 78 };
};

export default function DistributionManager() {
  const [step, setStep] = useState<
    "request" | "code_display" | "verifying" | "success" | "showcase"
  >("request");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", city: "", phone: "" });
  const [generatedCode, setGeneratedCode] = useState("");
  const [userEnteredCode, setUserEnteredCode] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [lastDistribution, setLastDistribution] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  const [securityLogs, setSecurityLogs] = useState<string[]>([]);
  const [redemptionCode, setRedemptionCode] = useState("");
  const [codeValidation, setCodeValidation] = useState<{
    valid: boolean;
    sponsor: any;
    message: string;
  } | null>(null);
  const [validatingCode, setValidatingCode] = useState(false);

  useEffect(() => setMounted(true), []);

  const { stats, sponsors } = useDashboard();

  const distributedCount = stats.totalDistributed;
  const totalBottles = stats.dailyGoal;
  const isQuotaFull = distributedCount >= totalBottles;

  const validateRedemptionCode = async (code: string) => {
    if (!code || code.length < 8) {
      setCodeValidation(null);
      return;
    }

    setValidatingCode(true);

    setTimeout(() => {
      const pattern = /^JV-WATER-[A-Z0-9]{6}$/;

      if (!pattern.test(code)) {
        setCodeValidation({
          valid: false,
          sponsor: null,
          message: "Invalid code format (JV-WATER-XXXXXX)",
        });
      } else {
        const used = JSON.parse(
          localStorage.getItem("jv_used_codes") || "[]"
        );
        if (used.includes(code)) {
          setCodeValidation({
            valid: false,
            sponsor: null,
            message: "Code already redeemed",
          });
        } else {
          const sponsor =
            sponsors[Math.floor(Math.random() * sponsors.length)] || {
              name: "Community Pool",
              message: "Water supported by the community",
              logo: "💧",
            };
          setCodeValidation({
            valid: true,
            sponsor,
            message: `Sponsored by ${sponsor.name}`,
          });
        }
      }
      setValidatingCode(false);
    }, 800);
  };

  const handleGenerateCode = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      toast.error("Invalid phone number");
      return;
    }

    if (isQuotaFull) {
      toast.error("Daily quota reached");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setGeneratedCode(
        Math.floor(100000 + Math.random() * 900000).toString()
      );
      setStep("code_display");
      setLoading(false);
    }, 1200);
  };

  const handleVerifyCode = async () => {
    if (userEnteredCode !== generatedCode) {
      toast.error("Incorrect code");
      return;
    }

    setStep("verifying");
    setSecurityLogs([]);

    const logs = [
      "Initializing uplink...",
      "Validating quota...",
      "Authenticating sponsor...",
      "Encrypting ledger...",
      "FINALIZING",
    ];

    for (const log of logs) {
      await new Promise((r) => setTimeout(r, 500));
      setSecurityLogs((p) => [...p, log]);
    }

    const coords = getCityCoords(formData.city);

    const sponsor =
      codeValidation?.valid && codeValidation.sponsor
        ? codeValidation.sponsor
        : sponsors[Math.floor(Math.random() * sponsors.length)] || {
            name: "Community Pool",
            message: "Water for all",
            logo: "💧",
          };

    const dist = {
      id: crypto.randomUUID(),
      userName: formData.name,
      city: formData.city,
      sponsor: sponsor.name,
      sponsorMessage: sponsor.message,
      sponsorLogo: sponsor.logo,
      time: new Date().toLocaleTimeString(),
      lat: coords.lat,
      lng: coords.lng,
      hash: Math.random().toString(16).slice(2, 10),
    };

    setHistory((p) => [dist, ...p].slice(0, 5));
    setLastDistribution(dist);
    setStep("showcase");
  };

  if (step === "showcase" && lastDistribution) {
    return (
      <SponsorShowcase
        distributionData={lastDistribution}
        onBack={() => {
          setStep("request");
          setFormData({ name: "", phone: "", city: "" });
        }}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="p-8">
          <form onSubmit={handleGenerateCode} className="space-y-6">
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
            <Input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                })
              }
            />

            <Input
              placeholder="JV-WATER-XXXXXX (optional)"
              value={redemptionCode}
              onChange={(e) => {
                const v = e.target.value.toUpperCase();
                setRedemptionCode(v);
                validateRedemptionCode(v);
              }}
            />

            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Generate Code"}
            </Button>
          </form>
        </GlassCard>

        <GlassCard className="p-8">
          <AnimatePresence mode="wait">
            {step === "code_display" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-4xl font-mono">{generatedCode}</p>
                <Input
                  placeholder="Enter Code"
                  value={userEnteredCode}
                  onChange={(e) => setUserEnteredCode(e.target.value)}
                />
                <Button onClick={handleVerifyCode}>Verify</Button>
              </motion.div>
            )}

            {step === "verifying" && (
              <div className="space-y-2">
                {securityLogs.map((l, i) => (
                  <p key={i} className="text-xs text-teal-400">
                    {l}
                  </p>
                ))}
              </div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>

      <GlassCard className="mt-12 p-8">
        {history.map((r) => (
          <div key={r.id} className="flex justify-between py-2">
            <span>{r.city}</span>
            <span className="text-teal-400">{r.sponsor}</span>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}
