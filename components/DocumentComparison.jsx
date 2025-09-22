"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitCompare, CheckCircle, AlertTriangle } from "lucide-react";
import DocumentUpload from "./DocumentUpload";

const DocumentComparison = ({
  file,
  file2,
  setFile,
  setFile2,
  onDrop,
  onDragOver,
  compareDocuments,
  comparisonResult,
  isLoading
}) => {
  return (
    <Card className="bg-white shadow-lg rounded-xl border">
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="text-center mb-6">
          <GitCompare className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <h3 className="text-xl font-semibold">Document Comparison</h3>
          <p className="text-muted-foreground">Compare two legal documents side by side</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <DocumentUpload
            file={file}
            onFileChange={setFile}
            onDrop={onDrop}
            onDragOver={onDragOver}
            label="First Document"
            id="pdf1-upload"
          />
          
          <DocumentUpload
            file={file2}
            onFileChange={setFile2}
            onDrop={onDrop}
            onDragOver={onDragOver}
            label="Second Document"
            id="pdf2-upload"
          />
        </div>

        <div className="flex justify-center">
          <Button
            className="px-8 py-2 bg-green-600 hover:bg-green-700"
            onClick={compareDocuments}
            disabled={!file || !file2 || isLoading}
          >
            <GitCompare className="mr-2 h-4 w-4" />
            {isLoading ? "Comparing..." : "Compare Documents"}
          </Button>
        </div>

        {comparisonResult && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <GitCompare className="h-5 w-5" />
              Comparison Results
            </h4>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800">Similarity Score</h5>
                <div className="mt-2">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {comparisonResult.similarity_score || 'N/A'}%
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-800">Document 1</h5>
                <p className="text-sm text-purple-600 mt-1">
                  {comparisonResult.doc1_length || 0} words
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h5 className="font-medium text-orange-800">Document 2</h5>
                <p className="text-sm text-orange-600 mt-1">
                  {comparisonResult.doc2_length || 0} words
                </p>
              </div>
            </div>
            
            {comparisonResult.summary && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium mb-2">Summary</h5>
                <p className="text-sm text-gray-700">{comparisonResult.summary}</p>
              </div>
            )}
            
            {/* Similarities Section */}
            {comparisonResult.common_themes && comparisonResult.common_themes.length > 0 && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="font-medium mb-3 text-green-800 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Similarities Found
                </h5>
                <ul className="space-y-2">
                  {comparisonResult.common_themes.map((theme, idx) => (
                    <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      {theme}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Differences Section */}
            {comparisonResult.key_differences && comparisonResult.key_differences.length > 0 && (
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h5 className="font-medium mb-3 text-orange-800 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Key Differences
                </h5>
                <ul className="space-y-2">
                  {comparisonResult.key_differences.map((diff, idx) => (
                    <li key={idx} className="text-sm text-orange-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      {diff}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentComparison;
