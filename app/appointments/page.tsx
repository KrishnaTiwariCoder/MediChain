"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { useWallet } from "@/lib/wallet-context";
import { redirect } from "next/navigation";

const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2024-03-20",
    time: "10:00 AM",
    status: "Upcoming",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "Neurologist",
    date: "2024-03-15",
    time: "2:30 PM",
    status: "Completed",
  },
  {
    id: 3,
    doctor: "Dr. Emily Wilson",
    specialty: "Dermatologist",
    date: "2024-03-10",
    time: "11:15 AM",
    status: "Completed",
  },
];

export default function Appointments() {
  const { account } = useWallet();
  if (!account) redirect("/");
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <Button>Schedule New Appointment</Button>
      </div>

      <div className="grid gap-4">
        {appointments.map((apt) => (
          <Card key={apt.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{apt.doctor}</h3>
                  <p className="text-sm text-muted-foreground">
                    {apt.specialty}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{apt.time}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{apt.date}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    apt.status === "Upcoming"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {apt.status}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
