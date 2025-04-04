// File: TiptapEditor.js
import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton, Box, Tooltip, Button, Collapse } from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, ImageIcon,
  AlignLeft, AlignCenter, AlignRight, PaintBucket, Highlighter, Link as LinkIcon
} from "lucide-react";
import PropTypes from "prop-types";

const MenuBar = ({ editor, onImageUpload }) => {
  if (!editor) return null;

  const applyColor = (color) => {
    editor.chain().focus().setColor(color).run();
  };

  const applyHighlight = (color) => {
    editor.chain().focus().toggleHighlight({ color }).run();
  };

  const applyLink = () => {
    const url = prompt("Masukkan URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        mb: 2,
        p: 1,
        borderRadius: 2,
        backgroundColor: "#f5f5f5",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
      }}
    >
      <Tooltip title="Bold">
        <IconButton onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={18} /></IconButton>
      </Tooltip>
      <Tooltip title="Italic">
        <IconButton onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={18} /></IconButton>
      </Tooltip>
      <Tooltip title="Underline">
        <IconButton onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon size={18} /></IconButton>
      </Tooltip>
      <Tooltip title="Bullet List">
        <IconButton onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={18} /></IconButton>
      </Tooltip>
      <Tooltip title="Ordered List">
        <IconButton onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={18} /></IconButton>
      </Tooltip>
      <Tooltip title="Align Left">
        <IconButton onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft size={18} /></IconButton>
      </Tooltip>
      <Tooltip title="Align Center">
        <IconButton onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter size={18} /></IconButton>
      </Tooltip>
      <Tooltip title="Align Right">
        <IconButton onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight size={18} /></IconButton>
      </Tooltip>
      <Tooltip title="Text Color">
        <IconButton onClick={() => applyColor(prompt("Masukkan warna teks (misal: red atau #ff0000):"))}>
          <PaintBucket size={18} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Highlight">
        <IconButton onClick={() => applyHighlight(prompt("Masukkan warna highlight:"))}>
          <Highlighter size={18} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Tambah Link">
        <IconButton onClick={applyLink}><LinkIcon size={18} /></IconButton>
      </Tooltip>
      <Tooltip title="Upload Gambar">
        <IconButton onClick={onImageUpload}><ImageIcon size={18} /></IconButton>
      </Tooltip>
    </Box>
  );
};

const TiptapEditor = ({ value = "", onChange, sx = {}, editable = true }) => {
  const fileInputRef = useRef();
  const contentRef = useRef();
  const [expand, setExpand] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  const editor = useEditor({
    editable,
    extensions: [
      StarterKit,
      Image,
      TextStyle,
      Color,
      Highlight,
      Underline,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
  });

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      editor.chain().focus().setImage({ src: reader.result }).run();
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (contentRef.current) {
      setOverflowing(contentRef.current.scrollHeight > 150);
    }
  }, [editor?.getHTML()]);

  return (
    <Card variant="outlined" sx={{ flexGrow: 1, mb: 3, ...sx }}>
      <CardContent>
        {editable && <MenuBar editor={editor} onImageUpload={handleImageUpload} />}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Box>
          <Collapse in={expand} collapsedSize={150}>
            <div
              ref={contentRef}
              style={{
                border: "1px solid #ccc",
                borderRadius: 4,
                padding: 10,
                minHeight: 150,
                overflow: "hidden"
              }}
            >
              <EditorContent editor={editor} />
            </div>
          </Collapse>
          {overflowing && (
            <Box mt={1} textAlign="center">
              <Button size="small" onClick={() => setExpand(!expand)}>
                {expand ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
              </Button>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TiptapEditor;



TiptapEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  editable: PropTypes.bool,
  sx: PropTypes.object
}