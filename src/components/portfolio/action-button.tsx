import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const actionButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-brand text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:brightness-110",
        outline:
          "border border-glass-border glass text-foreground hover:-translate-y-0.5 hover:border-primary/50",
        ghost: "text-muted-foreground hover:text-foreground",
      },
      size: {
        md: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ActionButtonProps = React.ComponentProps<"button"> & VariantProps<typeof actionButtonVariants>;

export function ActionButton({ className, variant, size, ...props }: ActionButtonProps) {
  return <button className={cn(actionButtonVariants({ variant, size }), className)} {...props} />;
}

type ActionLinkProps = React.ComponentProps<"a"> & VariantProps<typeof actionButtonVariants>;

export function ActionLink({ className, variant, size, ...props }: ActionLinkProps) {
  return <a className={cn(actionButtonVariants({ variant, size }), className)} {...props} />;
}
