"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  Download, 
  Eye, 
  FileText, 
  Scale, 
  Bot,
  Sparkles,
  CheckCircle,
  ExternalLink,
  Highlight
} from "lucide-react";

const UnifiedSummaryCard = ({ 
  title, 
  content, 
  type = 'summary', // 'summary', 'ipc', 'simplified'
  metadata = {},
  onCopy = () => {},
  onDownload = () => {},
  onViewProof = () => {},
  onHighlightSource = () => {},
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Configuration for different card types
  const typeConfig = {
    summary: {
      icon: FileText,
      color: 'blue',
      badge: 'Casecut AI Summary',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600'
    },
    ipc: {
      icon: Scale,
      color: 'purple',
      badge: 'IPC Analysis',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600'
    },
    simplified: {
      icon: Sparkles,
      color: 'green',
      badge: 'Casecut Simplified Summary',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600'
    }
  };

  const config = typeConfig[type] || typeConfig.summary;
  const IconComponent = config.icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      onCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onDownload();
  };

  const truncateContent = (text, maxLength = 300) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className={`
      group transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
      ${config.borderColor} ${className}
    `}>
      <CardHeader className={`${config.bgColor} rounded-t-lg`}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 bg-white rounded-lg shadow-sm`}>
              <IconComponent className={`h-5 w-5 ${config.iconColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              <Badge variant="secondary" className="mt-1">
                <Bot className="h-3 w-3 mr-1" />
                {config.badge} — Powered by Casecut AI
              </Badge>
            </div>
          </div>

          {/* Quick Actions - Visible on hover */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0"
              title="Copy to clipboard"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewProof}
              className="h-8 w-8 p-0"
              title="View proof"
            >
              <Eye className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="h-8 w-8 p-0"
              title="Download JSON"
            >
              <Download className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onHighlightSource}
              className="h-8 w-8 p-0"
              title="Highlight source pages"
            >
              <Highlight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {/* Content Display */}
        <div className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {isExpanded ? content : truncateContent(content)}
            </div>
          </div>

          {/* Expand/Collapse Button */}
          {content.length > 300 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          )}

          {/* Metadata Display */}
          {metadata && Object.keys(metadata).length > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {metadata.confidence && (
                  <div>
                    <span className="text-gray-500">Confidence:</span>
                    <div className="font-medium text-gray-900">
                      {Math.round(metadata.confidence * 100)}%
                    </div>
                  </div>
                )}
                
                {metadata.processing_time && (
                  <div>
                    <span className="text-gray-500">Processing:</span>
                    <div className="font-medium text-gray-900">
                      {metadata.processing_time}ms
                    </div>
                  </div>
                )}
                
                {metadata.model && (
                  <div>
                    <span className="text-gray-500">Model:</span>
                    <div className="font-medium text-gray-900 capitalize">
                      {metadata.model}
                    </div>
                  </div>
                )}
                
                {metadata.pages && (
                  <div>
                    <span className="text-gray-500">Pages:</span>
                    <div className="font-medium text-gray-900">
                      {metadata.pages}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex-1 min-w-[120px]"
            >
              {copied ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onViewProof}
              className="flex-1 min-w-[120px]"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Proof
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex-1 min-w-[120px]"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onHighlightSource}
              className="flex-1 min-w-[120px]"
            >
              <Highlight className="h-4 w-4 mr-2" />
              Highlight
            </Button>
          </div>
        </div>

        {/* Casecut AI Footer */}
        <div className="text-xs text-gray-400 text-center pt-4 border-t border-gray-100 mt-4">
          Generated by Casecut AI — Advanced Legal Document Analysis
        </div>
      </CardContent>
    </Card>
  );
};

export default UnifiedSummaryCard;
