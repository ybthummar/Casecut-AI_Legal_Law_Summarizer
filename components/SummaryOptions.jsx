"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Zap, FileText, Bot } from "lucide-react";

const SummaryOptions = ({
  summaryMode,
  setSummaryMode,
  summaryLength,
  setSummaryLength,
  abstractiveModel,
  setAbstractiveModel
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Settings className="h-5 w-5 text-black" />
        </div>
        <h3 className="text-xl font-bold text-black">Summary Configuration</h3>
      </div>
      
      <div className="grid gap-6">
        {/* Summary Mode */}
        <div className="space-y-2">
          <Label htmlFor="mode-select" className="text-base font-semibold text-gray-800">
            Summary Mode
          </Label>
          <Select value={summaryMode} onValueChange={setSummaryMode}>
            <SelectTrigger id="mode-select" className="w-full h-12 text-sm rounded-lg border-gray-300 focus:border-black focus:ring-black">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="extractive" className="cursor-pointer">
                <div className="flex items-center gap-3 py-2 px-2">
                  <FileText className="h-4 w-4 text-black" />
                  <div>
                    <div className="font-medium">Extractive Only</div>
                    <div className="text-xs text-gray-500">Fast & reliable sentence extraction</div>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="abstractive" className="cursor-pointer">
                <div className="flex items-center gap-3 py-2 px-2">
                  <Bot className="h-4 w-4 text-gray-700" />
                  <div>
                    <div className="font-medium">Abstractive Only</div>
                    <div className="text-xs text-gray-500">AI-generated new content</div>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="hybrid" className="cursor-pointer">
                <div className="flex items-center gap-3 py-2 px-2">
                  <Zap className="h-4 w-4 text-gray-600" />
                  <div>
                    <div className="font-medium">Hybrid (Extract + Abstract)</div>
                    <div className="text-xs text-gray-500">Best of both approaches</div>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Length */}
        <div className="space-y-2">
          <Label htmlFor="length-select" className="text-base font-semibold text-gray-800">Summary Length</Label>
          <Select value={summaryLength} onValueChange={setSummaryLength}>
            <SelectTrigger id="length-select" className="w-full h-12 text-sm rounded-lg border-gray-300 focus:border-black focus:ring-black">
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="short" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">Short (3-5 sentences)</div>
                  <div className="text-xs text-gray-500">Quick overview</div>
                </div>
              </SelectItem>
              <SelectItem value="medium" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">Medium (6-10 sentences)</div>
                  <div className="text-xs text-gray-500">Balanced detail</div>
                </div>
              </SelectItem>
              <SelectItem value="long" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">Long (11-15 sentences)</div>
                  <div className="text-xs text-gray-500">Comprehensive summary</div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* AI Model */}
        <div className="space-y-2">
          <Label htmlFor="model-select" className="text-base font-semibold text-gray-800">AI Model</Label>
          <Select value={abstractiveModel} onValueChange={setAbstractiveModel}>
            <SelectTrigger id="model-select" className="w-full h-12 text-sm rounded-lg border-gray-300 focus:border-black focus:ring-black">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="t5" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">T5 (Fast & Balanced)</div>
                  <div className="text-xs text-gray-500">Recommended for most cases</div>
                </div>
              </SelectItem>
              <SelectItem value="pegasus" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">Pegasus (Accurate)</div>
                  <div className="text-xs text-gray-500">High quality summaries</div>
                </div>
              </SelectItem>
              <SelectItem value="led" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">LED (Long Documents)</div>
                  <div className="text-xs text-gray-500">Best for lengthy texts</div>
                </div>
              </SelectItem>
              <SelectItem value="bart" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">BART (General Purpose)</div>
                  <div className="text-xs text-gray-500">Versatile performance</div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SummaryOptions;
