"use client";

import { Select as BaseSelect } from "@base-ui/react/select";

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SelectProps {
  items: SelectOption[];
  value?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  "aria-label"?: string;
  trigger?: React.ReactNode;
}

const triggerClasses = [
  "flex w-full min-w-[120px] items-center gap-2",
  "rounded-2xl border border-zoogle-border bg-zoogle-surface-elevated",
  "px-4 py-2.5 text-sm text-zoogle-text",
  "hover:bg-zoogle-surface focus:outline-none focus:ring-2 focus:ring-zoogle-link focus:ring-offset-0",
  "data-[popup-open]:border-zoogle-link data-[disabled]:opacity-50",
].join(" ");

const triggerIconOnlyClasses = [
  "flex size-9 shrink-0 items-center justify-center rounded-full",
  "hover:bg-zoogle-surface-elevated/50 focus:outline-none focus:ring-2 focus:ring-zoogle-link focus:ring-offset-0",
  "transition-colors duration-300 data-[disabled]:opacity-50",
].join(" ");

const popupClasses = [
  "z-50 max-h-[min(var(--available-height,300px),300px)] overflow-auto",
  "rounded-2xl border border-zoogle-border bg-zoogle-surface-elevated py-1",
  "shadow-[0_4px_12px_rgba(0,0,0,.15)]",
].join(" ");

const listClasses = "p-1";

const itemClasses = [
  "flex cursor-pointer items-center gap-0 rounded-xl px-3 py-2 text-sm text-zoogle-text",
  "data-[highlighted]:bg-zoogle-surface data-[selected]:bg-zoogle-surface",
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
].join(" ");

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function Select({
  items,
  value = null,
  onValueChange,
  placeholder = "Select…",
  name,
  disabled,
  "aria-label": ariaLabel,
  trigger: customTrigger,
}: SelectProps) {
  return (
    <BaseSelect.Root
      items={items}
      value={value}
      onValueChange={onValueChange as (v: string | string[] | null) => void}
      name={name}
      disabled={disabled}
    >
      <BaseSelect.Trigger
        className={customTrigger ? triggerIconOnlyClasses : triggerClasses}
        aria-label={ariaLabel}
      >
        {customTrigger ? (
          <>
            <span className="sr-only">
              <BaseSelect.Value placeholder={placeholder} />
            </span>
            {customTrigger}
          </>
        ) : (
          <>
            <BaseSelect.Value className="truncate" placeholder={placeholder} />
            <BaseSelect.Icon className="shrink-0 text-zoogle-text-secondary">
              <ChevronIcon />
            </BaseSelect.Icon>
          </>
        )}
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner side="bottom" sideOffset={8} align="start" alignItemWithTrigger={false}>
          <BaseSelect.Popup className={popupClasses}>
            <BaseSelect.List className={listClasses}>
              {items.map(({ value: itemValue, label, icon }) => (
                <BaseSelect.Item
                  key={itemValue}
                  value={itemValue}
                  className={itemClasses}
                >
                  <span className="flex size-5 shrink-0 items-center justify-center text-zoogle-text-secondary" aria-hidden>
                    {icon}
                  </span>
                  <BaseSelect.ItemIndicator className="mr-1.5 w-[14px] shrink-0 text-zoogle-link opacity-0 data-selected:inline data-selected:opacity-100" keepMounted>
                    <CheckIcon />
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText className="truncate">{label}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
