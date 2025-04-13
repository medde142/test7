"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SBXProjektStart() {
  const [projektDaten, setProjektDaten] = useState({
    projektleiter: "",
    projektleiterAmrest: "",
    projektname: "",
    projektstandort: "",
    projektstart: "",
    projektende: "",
    leistungen: {
      gu: false,
      moebel: false,
      logistik: false,
      montage: false,
      elektro: false,
      projektsteuerung: false,
      sonstiges: ""
    },
    besonderheiten: "",
    meilensteine: {
      kickoff: "",
      werkplanung: "",
      fertigung: "",
      versand: "",
      montage: "",
      abnahme: "",
      uebergabe: ""
    },
    technischeKomponenten: {
      osmoseanlage: false,
      eismaschine: false,
      mastrena: false,
      beleuchtungITAB: false,
      werbeanlageZuleitung: false,
      mobelWUM: false
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjektDaten({ ...projektDaten, [name]: value });
  };

  const handleMeilensteinChange = (e) => {
    const { name, value } = e.target;
    setProjektDaten({
      ...projektDaten,
      meilensteine: { ...projektDaten.meilensteine, [name]: value }
    });
  };

  const handleTechComponentChange = (key) => {
    setProjektDaten({
      ...projektDaten,
      technischeKomponenten: {
        ...projektDaten.technischeKomponenten,
        [key]: !projektDaten.technischeKomponenten[key]
      }
    });
  };

  const handleCheckboxChange = (name) => {
    setProjektDaten({
      ...projektDaten,
      leistungen: {
        ...projektDaten.leistungen,
        [name]: !projektDaten.leistungen[name]
      }
    });
  };

  const handleSonstigesChange = (e) => {
    setProjektDaten({
      ...projektDaten,
      leistungen: {
        ...projektDaten.leistungen,
        sonstiges: e.target.value
      }
    });
  };

  const handleSubmit = () => {
    console.log("Projektstartdaten:", projektDaten);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Card className="shadow-xl">
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold">📋 Projektstart – SBX</h1>
          <Input name="projektname" placeholder="Projektname" value={projektDaten.projektname} onChange={handleChange} />
          <Input name="projektleiter" placeholder="Projektleiter (intern)" value={projektDaten.projektleiter} onChange={handleChange} />
          <Input name="projektleiterAmrest" placeholder="Projektleiter AMREST" value={projektDaten.projektleiterAmrest} onChange={handleChange} />
          <Input name="projektstandort" placeholder="Projektstandort" value={projektDaten.projektstandort} onChange={handleChange} />
          <div className="flex space-x-2">
            <Input type="date" name="projektstart" placeholder="Projektstart" value={projektDaten.projektstart} onChange={handleChange} />
            <Input type="date" name="projektende" placeholder="Projektende" value={projektDaten.projektende} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold mt-4">Leistungsumfang</h2>
            {[
              { label: "GU-Leistungen", key: "gu" },
              { label: "Möbelfertigung", key: "moebel" },
              { label: "Logistik", key: "logistik" },
              { label: "Montage", key: "montage" },
              { label: "Elektro / HLS-Koordination", key: "elektro" },
              { label: "Projektsteuerung", key: "projektsteuerung" }
            ].map((item) => (
              <div key={item.key} className="flex items-center space-x-2">
                <Checkbox id={item.key} checked={projektDaten.leistungen[item.key]} onCheckedChange={() => handleCheckboxChange(item.key)} />
                <Label htmlFor={item.key}>{item.label}</Label>
              </div>
            ))}
            <Textarea placeholder="Sonstiges (bitte beschreiben)" value={projektDaten.leistungen.sonstiges} onChange={handleSonstigesChange} />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold mt-4">Besonderheiten / Risiken</h2>
            <Textarea name="besonderheiten" placeholder="z. B. Zugangsbeschränkungen, Nachtarbeit, Logistik-Zeitfenster…" value={projektDaten.besonderheiten} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold mt-4">Projektmeilensteine</h2>
            {["kickoff", "werkplanung", "fertigung", "versand", "montage", "abnahme", "uebergabe"].map((key) => (
              <div key={key} className="flex items-center space-x-2">
                <Label htmlFor={key} className="w-32 capitalize">{key}</Label>
                <Input type="date" name={key} value={projektDaten.meilensteine[key]} onChange={handleMeilensteinChange} />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold mt-4">Technische Komponenten</h2>
            {[
              { label: "Osmoseanlage", key: "osmoseanlage" },
              { label: "Eismaschine", key: "eismaschine" },
              { label: "Mastrena", key: "mastrena" },
              { label: "Beleuchtung (ITAB)", key: "beleuchtungITAB" },
              { label: "Werbeanlage (Zuleitung)", key: "werbeanlageZuleitung" },
              { label: "WUM Möbelkontrolle", key: "mobelWUM" }
            ].map((item) => (
              <div key={item.key} className="flex items-center space-x-2">
                <Checkbox id={item.key} checked={projektDaten.technischeKomponenten[item.key]} onCheckedChange={() => handleTechComponentChange(item.key)} />
                <Label htmlFor={item.key}>{item.label}</Label>
              </div>
            ))}
          </div>

          <Button className="w-full mt-4" onClick={handleSubmit}>Weiter</Button>
        </CardContent>
      </Card>
    </div>
  );
}
