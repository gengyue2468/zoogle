import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  type?: "odd" | "modern";
  triggerAs?: "button" | "span";
}

const popupBaseClasses = [
  "relative z-50 max-w-[200px] px-2 text-xs font-normal",
  "shadow-[0_1px_2px_rgba(0,0,0,.3)]",
  "transition-opacity duration-150 ease-out",
  "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
].join(" ");

const popupStyleByType = {
  odd: "rounded-[4px] bg-zoogle-bg border border-zoogle-border text-zoogle-text-secondary py-1.25",
  modern: "rounded-lg bg-zoogle-surface-elevated text-zoogle-text py-1.25",
} as const;

const arrowWrapperClasses = [
  "absolute left-1/2 -translate-x-1/2 -top-[6px]",
  "relative",
].join(" ");
const arrowBorderClasses = [
  "absolute left-1/2 -translate-x-1/2",
  "h-0 w-0 border-l-[6px] border-r-[6px] border-b-[6px]",
  "border-l-transparent border-r-transparent border-b-zoogle-border",
].join(" ");
const arrowFillClasses = [
  "absolute left-1/2 -translate-x-1/2 top-[1px]",
  "h-0 w-0 border-l-[5px] border-r-[5px] border-b-[5px]",
  "border-l-transparent border-r-transparent border-b-zoogle-bg",
].join(" ");

export default function Tooltip({
  content,
  children,
  type = "odd",
  triggerAs = "button",
}: TooltipProps) {
  const popupClasses = [popupBaseClasses, popupStyleByType[type]].join(" ");
  const showArrow = type === "odd";

  return (
    <BaseTooltip.Provider delay={300}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger
          delay={300}
          {...(triggerAs === "span"
            ? {
                render: (props: React.HTMLAttributes<HTMLElement>) => (
                  <span className="inline-block" {...props}>
                    {children}
                  </span>
                ),
              }
            : { children })}
        />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner side="bottom">
            <BaseTooltip.Popup className={popupClasses}>
              {showArrow && (
                <BaseTooltip.Arrow className={arrowWrapperClasses}>
                  <span className={arrowBorderClasses} aria-hidden />
                  <span className={arrowFillClasses} aria-hidden />
                </BaseTooltip.Arrow>
              )}
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
