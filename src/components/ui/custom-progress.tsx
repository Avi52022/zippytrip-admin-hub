
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CustomProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

const CustomProgress = ({ value, className, indicatorClassName }: CustomProgressProps) => {
  // Create a style object for the progress indicator color
  const customStyles: React.CSSProperties = {};
  
  // Only apply custom styling if indicatorClassName is provided
  if (indicatorClassName) {
    // Extract the color name from the bg-* class
    const colorMatch = indicatorClassName.match(/bg-(\w+(-\d+)?)/);
    if (colorMatch && colorMatch[1]) {
      // Apply as a custom property
      customStyles['--progress-foreground'] = `hsl(var(--${colorMatch[1]}))`;
    }
  }
  
  return (
    <Progress 
      value={value} 
      className={cn("", className)}
      // Apply styles directly to the component
      style={customStyles}
    />
  );
};

export { CustomProgress };
