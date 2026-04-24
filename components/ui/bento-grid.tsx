import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        // Fixed 22rem row-height is good for the desktop bento grid, but on
        // mobile every card is col-span-3 so the fixed height just creates
        // oceans of empty space below the content.
        "grid w-full grid-cols-3 gap-4 sm:auto-rows-[22rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  href?: string;
  cta?: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-zinc-900/50 [border:1px_solid_rgba(255,255,255,.08)] [box-shadow:0_-20px_80px_-20px_#6366f11f_inset]",
      "transform-gpu",
      className
    )}
  >
    <div className="absolute inset-0">{background}</div>
    <div className="pointer-events-none relative z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 sm:group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-indigo-300 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-semibold text-white font-display">{name}</h3>
      <p className="max-w-lg text-zinc-400 text-sm">{description}</p>
      {/* Inline CTA on mobile — flows after description, no overlap. Hidden on
          sm+ because the desktop hover-slide CTA below takes over there. */}
      {href && cta && (
        <a
          href={href}
          className="pointer-events-auto mt-2 inline-flex items-center text-sm font-medium text-indigo-300 hover:text-indigo-200 sm:hidden"
        >
          {cta} <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      )}
    </div>

    {href && cta && (
      // Desktop-only CTA that slides up on hover.
      <div className="pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
        <a
          href={href}
          className="pointer-events-auto inline-flex items-center text-sm font-medium text-indigo-300 hover:text-indigo-200"
        >
          {cta} <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    )}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-indigo-500/[0.03]" />
  </div>
);
