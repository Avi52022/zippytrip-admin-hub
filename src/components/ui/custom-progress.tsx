
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CustomProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

const CustomProgress = ({ value, className, indicatorClassName }: CustomProgressProps) => {
  return (
    <Progress 
      value={value} 
      className={className}
      // Need to apply custom styling to the indicator directly
      style={{ 
        "--progress-indicator-color": indicatorClassName?.includes("bg-") 
          ? `var(--${indicatorClassName.replace("bg-", "")})` 
          : undefined 
      } as React.CSSProperties}
    />
  );
};

export { CustomProgress };
