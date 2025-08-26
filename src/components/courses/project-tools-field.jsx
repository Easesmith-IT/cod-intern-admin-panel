import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  X
} from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export const ProjectToolsField = ({ projectIndex, commonTools }) => {
  const { setValue, getValues, watch } =
    useFormContext();

  const [customTool, setCustomTool] = useState("");

  const tools = watch(`projects.${projectIndex}.tools`) || [];

  const addTool = (tool) => {
    const currentTools = getValues(`projects.${projectIndex}.tools`) || [];
    if (!currentTools.includes(tool)) {
      setValue(`projects.${projectIndex}.tools`, [...currentTools, tool]);
    }
  };

  const removeTool = (toolToRemove) => {
    const currentTools = getValues(`projects.${projectIndex}.tools`) || [];
    setValue(
      `projects.${projectIndex}.tools`,
      currentTools.filter((tool) => tool !== toolToRemove)
    );
  };

  const addCustomTool = () => {
    if (customTool.trim()) {
      addTool(customTool.trim());
      setCustomTool("");
    }
  };

  return (
    <div>
      <FormLabel>Technologies & Tools</FormLabel>

      {/* Selected Tools */}
      {tools.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 mb-3">
          {tools.map((tool, toolIndex) => (
            <Badge
              key={toolIndex}
              variant="secondary"
              className="flex items-center space-x-1"
            >
              <span>{tool}</span>
              <button
                type="button"
                onClick={() => removeTool(tool)}
                className="ml-1 hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Common Tools */}
      <div className="mb-3">
        <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
        <div className="flex flex-wrap gap-1">
          {commonTools.slice(0, 8).map((tool) => (
            <Button
              key={tool}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addTool(tool)}
              className="text-xs h-7"
              disabled={tools.includes(tool)}
            >
              {tool}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom Tool Input */}
      <div className="flex space-x-2">
        <Input
          placeholder="Add custom tool..."
          value={customTool}
          onChange={(e) => setCustomTool(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustomTool();
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={addCustomTool}
          disabled={!customTool.trim()}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
