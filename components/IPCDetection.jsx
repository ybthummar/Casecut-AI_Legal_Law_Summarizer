"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, AlertTriangle } from "lucide-react";

const IPCDetection = ({ ipcSections, isLoading, generalError }) => {
  // Only render the card if there's a reason to (loading, error, or data)
  if (!isLoading && !generalError && ipcSections.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white shadow-md rounded-xl border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-bold text-black">
          <Scale className="mr-2.5 h-5 w-5 text-black" />
          Detected IPC Sections
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && ipcSections.length === 0 ? (
          <p className="text-gray-500 italic">Detecting IPC sections...</p>
        ) : generalError ? (
          <p className="text-red-700 italic flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" /> Could not perform IPC detection due to an error.
          </p>
        ) : ipcSections.length > 0 ? (
          <ul className="space-y-3">
            {ipcSections.map((ipc, idx) => (
              <li key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <strong className="text-gray-900 font-semibold">{ipc.section}</strong>: {ipc.title}
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Punishment:</strong> {ipc.punishment}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No relevant IPC sections were found in the document.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default IPCDetection;
