"use client";

import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Check, Sun, Moon, Briefcase, Leaf, Crown } from 'lucide-react';

const ThemeSelector = () => {
  const { currentTheme, themes, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeIcons = {
    light: Sun,
    dark: Moon,
    blue: Briefcase,
    green: Leaf,
    purple: Crown
  };

  const themeDescriptions = {
    light: 'Clean and minimal design',
    dark: 'Easy on the eyes for long sessions',
    blue: 'Professional corporate look',
    green: 'Calming legal environment',
    purple: 'Elegant and sophisticated'
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[var(--color-cardBg)] border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-all duration-200 shadow-[var(--shadow-sm)]"
        style={{
          backgroundColor: 'var(--color-cardBg)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text)'
        }}
      >
        <Palette className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
        <span className="font-medium">Theme</span>
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute right-0 top-12 z-50 w-80 bg-[var(--color-cardBg)] border-[var(--color-cardBorder)] shadow-[var(--shadow-lg)]">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="h-5 w-5 text-[var(--color-accent)]" />
                  <h3 className="font-semibold text-[var(--color-text)]">Choose Theme</h3>
                </div>
                
                {Object.entries(themes).map(([key, theme]) => {
                  const IconComponent = themeIcons[key];
                  const isSelected = currentTheme === key;
                  
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        changeTheme(key);
                        setIsOpen(false);
                      }}
                      className={`
                        p-3 rounded-lg border cursor-pointer transition-all duration-200
                        ${isSelected 
                          ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10' 
                          : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface)]'
                        }
                      `}
                      style={{
                        backgroundColor: isSelected 
                          ? 'rgba(var(--color-accent-rgb, 59, 130, 246), 0.1)' 
                          : 'transparent',
                        borderColor: isSelected 
                          ? 'var(--color-accent)' 
                          : 'var(--color-border)'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme.colors.accent }}
                          >
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[var(--color-text)]">
                                {theme.name}
                              </span>
                              {isSelected && (
                                <Badge variant="secondary" className="text-xs">
                                  Active
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-[var(--color-textSecondary)]">
                              {themeDescriptions[key]}
                            </p>
                          </div>
                        </div>
                        
                        {isSelected && (
                          <Check className="h-5 w-5 text-[var(--color-accent)]" />
                        )}
                      </div>
                      
                      {/* Theme Preview */}
                      <div className="mt-3 flex gap-2">
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: theme.colors.success }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: theme.colors.background }}
                        />
                      </div>
                    </div>
                  );
                })}
                
                <div className="pt-2 border-t border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-textSecondary)]">
                    Theme preference is saved automatically
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
