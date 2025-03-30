import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  InlineEditor,
  AutoLink,
  Autosave,
  Bold,
  Essentials,
  Italic,
  Link,
  Paragraph,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,

  ClassicEditor,
  Alignment,
  AutoImage,
  Base64UploadAdapter,
  BlockQuote,
  FindAndReplace,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  PasteFromOffice,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  WordCount
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import PropTypes from 'prop-types';

const LICENSE_KEY = import.meta.env.VITE_CK_EDITOR_KEY;


export default function CustomCkEditor({ type }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const editorWordCountRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { Editor, editorConfig } = useMemo(() => {

    if (type === 'inline') {
      if (!isLayoutReady) {
        return { Editor: null, editorConfig: null };
      }

      return {
        Editor: InlineEditor,
        editorConfig: {
          toolbar: {
            items: ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '|', 'link'],
            shouldNotGroupWhenFull: false
          },
          plugins: [AutoLink, Autosave, Bold, Essentials, Italic, Link, Paragraph, Strikethrough, Subscript, Superscript, Underline],
          // initialData: '<p>Masukkan Soal...</p>',
          licenseKey: LICENSE_KEY,
          link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
              toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                  download: 'file'
                }
              }
            }
          },
          placeholder: 'Type or paste your content here!'
        }
      };
    } else {
      return {
        Editor: ClassicEditor,
        editorConfig: {
          toolbar: {
            items: [
              'findAndReplace',
              '|',
              'heading',
              '|',
              'bold',
              'italic',
              'underline',
              'subscript',
              'superscript',
              '|',
              'specialCharacters',
              'link',
              'insertImage',
              'mediaEmbed',
              'insertTable',
              'blockQuote',
              '|',
              'alignment',
              '|',
              'bulletedList',
              'numberedList',
              'todoList',
              'outdent',
              'indent'
            ],
            shouldNotGroupWhenFull: false
          },
          plugins: [
            Alignment,
            AutoImage,
            Autosave,
            Base64UploadAdapter,
            BlockQuote,
            Bold,
            Essentials,
            FindAndReplace,
            Heading,
            ImageBlock,
            ImageCaption,
            ImageEditing,
            ImageInline,
            ImageInsert,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageTextAlternative,
            ImageToolbar,
            ImageUpload,
            ImageUtils,
            Indent,
            IndentBlock,
            Italic,
            Link,
            LinkImage,
            List,
            ListProperties,
            MediaEmbed,
            Paragraph,
            PasteFromOffice,
            SpecialCharacters,
            SpecialCharactersArrows,
            SpecialCharactersCurrency,
            SpecialCharactersEssentials,
            SpecialCharactersLatin,
            SpecialCharactersMathematical,
            SpecialCharactersText,
            Subscript,
            Superscript,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TodoList,
            Underline,
            WordCount
          ],
          initialData: '<p>Masukkan Soal...</p>',
          licenseKey: LICENSE_KEY,
          placeholder: 'Type or paste your content here!',
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
          }
        }
      };
    }

  }, [isLayoutReady, type]);

  return (
    <>
      {type === 'inline' ? (
        <div className="main-container">
          <div className="editor-container editor-container_inline-editor" ref={editorContainerRef}>
            <div className="editor-container__editor">
              <div ref={editorRef}>
                {Editor && editorConfig && <CKEditor editor={Editor} config={editorConfig} />}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="main-container">
          <div className="editor-container editor-container_classic-editor editor-container_include-word-count" ref={editorContainerRef}>
            <div className="editor-container__editor text-black">
              <div ref={editorRef}>
                {editorConfig && (
                  <CKEditor
                    onReady={editor => {
                      const wordCount = editor.plugins.get('WordCount');
                      editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
                    }}
                    onAfterDestroy={() => {
                      Array.from(editorWordCountRef.current.children).forEach(child => child.remove());
                    }}
                    editor={ClassicEditor}
                    config={editorConfig}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


CustomCkEditor.propTypes = {
  type: PropTypes.string.isRequired
}