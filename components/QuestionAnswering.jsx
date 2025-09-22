"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircleQuestion, HelpCircle, Search } from "lucide-react";

const QuestionAnswering = ({
  documentText,
  question,
  setQuestion,
  answer,
  confidence,
  askQuestion,
  suggestedQuestions,
  isLoading,
  highlightText
}) => {
  return (
    <Card className="bg-white shadow-lg rounded-xl border">
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="text-center mb-6">
          <MessageCircleQuestion className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <h3 className="text-xl font-semibold">Question & Answer System</h3>
          <p className="text-muted-foreground">Ask questions about the uploaded document</p>
        </div>

        {!documentText ? (
          <div className="text-center p-8 bg-yellow-50 rounded-lg border border-yellow-200">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
            <h4 className="font-semibold text-yellow-800 mb-2">No Document Loaded</h4>
            <p className="text-yellow-700">Please upload and process a document in the "Single Document" tab first.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-semibold">Ask a Question</label>
              <div className="flex gap-2">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What is this case about?"
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
                />
                <Button
                  onClick={askQuestion}
                  disabled={!question.trim() || isLoading}
                  className="px-6"
                >
                  <Search className="mr-2 h-4 w-4" />
                  {isLoading ? "Asking..." : "Ask"}
                </Button>
              </div>
            </div>

            {/* Suggested Questions */}
            {suggestedQuestions.length > 0 && (
              <div className="space-y-2">
                <label className="font-semibold text-sm text-gray-600">Suggested Questions</label>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 4).map((q, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuestion(q)}
                      className="text-xs"
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Answer Display */}
            {answer && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Answer</h4>
                  {confidence && (
                    <Badge variant="outline" className="text-xs">
                      Confidence: {confidence}%
                    </Badge>
                  )}
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div
                    className="text-sm text-blue-800 whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: highlightText ? highlightText(answer, question) : answer
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionAnswering;
