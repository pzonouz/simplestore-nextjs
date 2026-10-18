import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BoldIcon, DotIcon, ItalicIcon } from "lucide-react";
import { EditorButton } from "./EditorButton";
import { useEffect } from "react";
import clsx from "clsx";

export const TipTap = ({
  content,
  className = "",
  onChange,
}: {
  content: string;
  className?: string;
  onChange?: (html: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: [
          "focus:outline-none",
          "[&_ul]:list-disc", // Show disc bullets
          "[&_ul]:pr-6", // Push text right so bullets are visible
          "[&_ul]:my-2", // Vertical spacing around the list
          "[&_li]:my-1", // Spacing between items
          "[&_ol]:list-decimal", // (Optional) numbered lists
          "[&_ol]:pr-6",
        ].join(" "),
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== content) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold") ?? false,
      isItalic: ctx.editor?.isActive("italic") ?? false,
      isBulletList: ctx.editor?.isActive("bulletList") ?? false,
    }),
  });

  if (!editor) {
    return null; // Render nothing until the editor is ready
  }

  return (
    <div className={clsx("border rounded-md p-2", { [className]: true })}>
      {/* --- Toolbar --- */}
      <div className="flex border rounded-md flex-row gap-2 p-2 text-lg">
        <EditorButton
          action={() => editor.chain().focus().toggleBold().run()}
          activation={editorState.isBold}
          icon={<BoldIcon />}
        />
        <EditorButton
          action={() => editor.chain().focus().toggleItalic().run()}
          activation={editorState.isItalic}
          icon={<ItalicIcon />}
        />
        <EditorButton
          action={() => editor.chain().focus().toggleBulletList().run()}
          activation={editorState.isBulletList}
          icon={<DotIcon />}
        />
      </div>

      {/* --- Editable Area --- */}
      <EditorContent
        className="py-4 max-h-36 overflow-auto outline-0 border rounded-md mt-2 focus-visible:border-0 focus-visible:outline-0"
        editor={editor}
      />
    </div>
  );
};
