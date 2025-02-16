"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";
import { useWallet } from "@/lib/wallet-context";
import { redirect } from "next/navigation";

const documents = [
  {
    id: 1,
    title: "Blood Test Results",
    date: "2024-03-15",
    doctor: "Dr. Sarah Johnson",
    type: "Lab Report",
  },
  {
    id: 2,
    title: "X-Ray Report",
    date: "2024-03-10",
    doctor: "Dr. Michael Chen",
    type: "Radiology",
  },
  {
    id: 3,
    title: "Prescription",
    date: "2024-03-05",
    doctor: "Dr. Emily Wilson",
    type: "Medication",
  },
];

export default function Documents() {
  const { account } = useWallet();
  if (!account) redirect("/");
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Medical Documents</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </div>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-4 hover:bg-secondary/10 transition">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{doc.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {doc.type} • {doc.date}
                </p>
                <p className="text-sm text-muted-foreground">{doc.doctor}</p>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
