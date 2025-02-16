"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Bell, Check } from "lucide-react";
import { messaging } from "@/lib/firebase";
import { getToken } from "firebase/messaging";
import { useWallet } from "@/lib/wallet-context";
import { redirect } from "next/navigation";

const medications = [
  {
    id: 1,
    name: "Amoxicillin",
    dosage: "500mg",
    frequency: "Every 8 hours",
    startDate: "2024-03-15",
    endDate: "2024-03-22",
    nextDose: "2:30 PM",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: "2024-03-10",
    endDate: "2024-04-10",
    nextDose: "9:00 AM",
    doctor: "Dr. Michael Chen",
  },
  {
    id: 3,
    name: "Metformin",
    dosage: "1000mg",
    frequency: "Twice daily",
    startDate: "2024-03-01",
    endDate: "2024-06-01",
    nextDose: "8:00 PM",
    doctor: "Dr. Emily Wilson",
  },
];

export default function Medicine() {
  const { account } = useWallet();
  if (!account) redirect("/");
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });
          console.log("FCM Token:", token);
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    };

    requestNotificationPermission();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Medications</h1>
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Enable Reminders
        </Button>
      </div>

      <div className="grid gap-4">
        {medications.map((med) => (
          <Card key={med.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Pill className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{med.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {med.dosage} • {med.frequency}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Prescribed by {med.doctor}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {med.startDate} to {med.endDate}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  Next dose: {med.nextDose}
                </div>
                <Button variant="outline" size="sm">
                  <Check className="mr-2 h-4 w-4" />
                  Mark as Taken
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
