import * as React from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";

interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const popupClasses = [
  "z-50 min-w-[200px] max-w-[760px] p-4",
  "rounded-2xl bg-zoogle-surface-elevated text-zoogle-text",
  "shadow-[0_4px_12px_rgba(0,0,0,.15)]",
  "transition-opacity duration-150 ease-out",
  "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
].join(" ");

export default function Popover({ children, content }: PopoverProps) {
  const triggerChild = React.Children.only(children) as React.ReactElement;
  return (
    <BasePopover.Root>
      <BasePopover.Trigger
        render={(props) => React.cloneElement(triggerChild, props)}
      />
      <BasePopover.Portal>
        <BasePopover.Positioner side="bottom" sideOffset={8} align="start">
          <BasePopover.Popup className={popupClasses}>
            {content}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
