'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Menu, Pill } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MedInfo() {
  const [medName, setMedName] = useState("");
  const [illness, setIllness] = useState("");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!medName || !illness) {
      setError("Please enter both medicine name and illness.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:${medName}+AND+patient.reaction.reactionmeddrapt:${illness}&limit=1`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const result = await response.json();

      const enrichedDrugs = result.results[0]?.patient.drug.map((drug: any) => ({
        ...drug,
        additionalInfo: `
          Medicinal Product: ${drug.medicinalproduct || "N/A"}
          Indication: ${drug.drugindication || "No specific indication provided"}
          Active Substance: ${drug.activesubstance?.activesubstancename || "Unknown"}
          Characterization: ${drug.drugcharacterization || "Unknown"}
        `,
      }));

      const enrichedData = {
        ...result.results[0],
        patient: {
          ...result.results[0]?.patient,
          drug: enrichedDrugs,
        },
      };

      setData(enrichedData);
    } catch (err) {
      setError("An error occurred while fetching data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-blue-300 bg-opacity-80 backdrop-blur-lg shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-200 rounded-full p-2">
              <Pill className="text-blue w-8 h-8" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue">Med-Info</h1>
              <p className="text-sm text-gray-500">
                Search for medicine information
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Card className="mb-8 bg-lightblue-50 shadow-lg">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="med-name">Enter the medicine name</Label>
                <Input
                  id="med-name"
                  type="text"
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  placeholder="e.g., Aspirin"
                />
              </div>
              <div>
                <Label htmlFor="illness">Enter the illness</Label>
                <Input
                  id="illness"
                  type="text"
                  value={illness}
                  onChange={(e) => setIllness(e.target.value)}
                  placeholder="e.g., Headache"
                />
              </div>
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="mt-6 w-full bg-lightblue-600 text-white"
            >
              {isLoading ? "Searching..." : (
                <>
                  <Search className="mr-2" />
                  Search
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {error && <div className="bg-red-100 p-4 rounded">{error}</div>}

        {isLoading && (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((_, i) => (
              <Skeleton key={i} className="h-40 rounded" />
            ))}
          </div>
        )}

        {data && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-lightblue-100">
              <CardHeader>
                <CardTitle>Reaction</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {data.patient.reaction.map((reaction: any, i: number) => (
                    <li key={i}>{reaction.reactionmeddrapt}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-lightblue-100">
              <CardHeader>
                <CardTitle>Drug Details</CardTitle>
              </CardHeader>
              <CardContent>
                {data.patient.drug.map((drug: any, i: number) => (
                  <div key={i} className="p-4 bg-white rounded shadow">
                    <h4 className="font-bold">{drug.medicinalproduct}</h4>
                    <p>{drug.additionalInfo}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}


