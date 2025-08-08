"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Placeholder } from "@tiptap/extensions"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Italic, List, ListOrdered, Pilcrow } from 'lucide-react'

function ToolbarButton({ onClick, active, disabled, label, children }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={!!active}
      aria-label={label}
      className={["h-8 w-8 p-0", active ? "bg-muted" : ""].join(" ")}
    >
      {children}
      <span className="sr-only">{label}</span>
    </Button>
  )
}

export default function TiptapEditor({ initialContent = "<p>Start typing...</p>",onChange,className }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc pl-6 my-2" } },
        orderedList: { HTMLAttributes: { class: "list-decimal pl-6 my-2" } },
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "min-h-[220px] w-full rounded-b-md bg-background px-3 py-2 text-sm leading-6 focus:outline-none",
        role: "textbox",
        "aria-multiline": "true",
      },
    },
    immediatelyRender:false,
     onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  const isReady = !!editor

  return (
    <div className={cn("w-full mx-auto mt-2",className)}>
      <div className="border p-0 rounded gap-0">
        {/* Top Navigation / Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b rounded-t bg-muted/30">
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBold().run()}
            active={editor?.isActive("bold")}
            disabled={!isReady || !editor?.can().chain().focus().toggleBold().run()}
            label="Bold"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            active={editor?.isActive("italic")}
            disabled={!isReady || !editor?.can().chain().focus().toggleItalic().run()}
            label="Italic"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            active={editor?.isActive("bulletList")}
            disabled={!isReady || !editor?.can().chain().focus().toggleBulletList().run()}
            label="Bulleted list"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            active={editor?.isActive("orderedList")}
            disabled={!isReady || !editor?.can().chain().focus().toggleOrderedList().run()}
            label="Numbered list"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <ToolbarButton
            onClick={() => editor?.chain().focus().setParagraph().run()}
            active={editor?.isActive("paragraph")}
            disabled={!isReady || !editor?.can().chain().focus().setParagraph().run()}
            label="Paragraph"
          >
            <Pilcrow className="h-4 w-4" />
          </ToolbarButton>
        </div>

        {/* Editor */}
        <EditorContent editor={editor} className="tiptap" />
      </div>

      {/* Helper styles for content */}
      <style>{`
        .tiptap p { margin: 0.5rem 0; }
        .tiptap ul, .tiptap ol { margin: 0.5rem 0; }
      `}</style>
    </div>
  )
}
