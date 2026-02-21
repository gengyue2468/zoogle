"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";

const listClasses = [
  "relative flex items-center gap-6",
].join(" ");

const tabClasses = [
  "pb-3 pt-1 text-sm font-medium uppercase tracking-wide transition-colors",
  "text-zoogle-text-secondary hover:text-zoogle-text",
  "data-[active]:text-zoogle-link",
].join(" ");

const indicatorClasses = [
  "absolute bottom-0 h-0.5 bg-zoogle-link transition-[left,width] duration-150 ease-out",
  "[--left:var(--active-tab-left)] [--width:var(--active-tab-width)]",
  "left-[var(--left)] w-[var(--width)]",
].join(" ");

export const Tabs = {
  Root: BaseTabs.Root,
  List: function TabsList({
    className,
    ...props
  }: React.ComponentProps<typeof BaseTabs.List>) {
    return (
      <BaseTabs.List
        className={[listClasses, className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  },
  Tab: function Tab({
    className,
    ...props
  }: React.ComponentProps<typeof BaseTabs.Tab>) {
    return (
      <BaseTabs.Tab
        className={[tabClasses, className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  },
  Indicator: function TabsIndicator({
    className,
    ...props
  }: React.ComponentProps<typeof BaseTabs.Indicator>) {
    return (
      <BaseTabs.Indicator
        className={[indicatorClasses, className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  },
  Panel: BaseTabs.Panel,
};
