import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Info } from "lucide-react";
import { Badge } from "../ui/badge";
import parse, { domToReact } from "html-react-parser";
import { cn } from "@/lib/utils";

export const Field = ({
  label,
  value,
  icon,
  badge = false,
  className = "",
}) => {
  return (
    <div className={cn("flex gap-1 items-center", className)}>
      <LabelText>{label}:</LabelText>
      <div
        className="flex items-center gap-2 px-2 text-sm"
        role="group"
        aria-label={label}
      >
        {icon ? <span className="text-muted-foreground">{icon}</span> : null}
        {badge ? (
          <Badge className="rounded-md" variant="secondary">
            {value}
          </Badge>
        ) : (
          <div className="truncate break-all whitespace-pre-wrap">{value}</div>
        )}
      </div>
    </div>
  );
};

export const LabelText = ({ children }) => {
  return <div className="text-sm font-medium whitespace-nowrap">{children}</div>;
};

export const ReadOnlyBlock = ({ title, text }) => {
  const options = {
    replace: (domNode) => {
      if (domNode.name === "code") {
        return (
          <pre className="whitespace-pre-wrap">
            {domToReact(domNode.children)}
          </pre>
        );
      }
    },
  };

  return (
    <Card className="gap-1 border-none shadow-none py-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
          {text && parse(text, options)}
        </div>
      </CardContent>
    </Card>
  );
};
