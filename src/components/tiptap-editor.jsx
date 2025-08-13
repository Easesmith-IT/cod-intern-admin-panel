"use client";

import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor as MantineRichTextEditor } from "@mantine/tiptap";
import { useEffect } from "react";

export function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

useEffect(() => {
  if (!editor) return;

  // Avoid overwriting when change is coming from editor itself
  const current = editor.getHTML();
  if (value && current !== value) {
    editor.commands.setContent(value, false); // false = don't emit update again
  }
}, [editor, value]);


  return (
    <MantineRichTextEditor editor={editor} className="my-editor">
      <MantineRichTextEditor.Toolbar>
        <MantineRichTextEditor.ControlsGroup>
          <MantineRichTextEditor.Bold />
          <MantineRichTextEditor.Italic />
        </MantineRichTextEditor.ControlsGroup>
        <MantineRichTextEditor.ControlsGroup>
          {/* <MantineRichTextEditor.Hr /> */}
          <MantineRichTextEditor.BulletList />
          <MantineRichTextEditor.OrderedList />
        </MantineRichTextEditor.ControlsGroup>
      </MantineRichTextEditor.Toolbar>

      <MantineRichTextEditor.Content />
    </MantineRichTextEditor>
  );
}
