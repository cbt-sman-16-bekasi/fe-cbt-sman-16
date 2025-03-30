import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDMyOTI3OTksImp0aSI6ImUxZWFjMDQwLWQ4NGEtNDlkZi05N2RkLWYwYTVlZDE2YjY2ZCIsImxpY2Vuc2VkSG9zdHMiOlsiKi53ZWJjb250YWluZXIuaW8iLCIqLmpzaGVsbC5uZXQiLCIqLmNzcC5hcHAiLCJjZHBuLmlvIiwiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIiwic2giXSwibGljZW5zZVR5cGUiOiJldmFsdWF0aW9uIiwidmMiOiI3YjYzODU0NSJ9.WNy8x9JhZ0inVqiROOnXVpUye9woy3Ed1ccmNfu163E9xuBagFxKBLLLxEVwITAszMTToVQaeeJMJ50GkqiV1Q';

export default function CstmCkEditor({ type = 'classic' }) {
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
      return {
        Editor: InlineEditor,
        editorConfig: {
          toolbar: { items: ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '|', 'link'] },
          initialData: '<p>Type or paste your content here!</p>',
          licenseKey: LICENSE_KEY,
          link: { addTargetToExternalLinks: true, defaultProtocol: 'https://' },
          placeholder: 'Type or paste your content here!'
        }
      };
    } else {
      return {
        Editor: ClassicEditor,
        editorConfig: {
          toolbar: {
            items: ['findAndReplace', '|', 'heading', '|', 'bold', 'italic', 'underline', 'subscript', 'superscript', '|', 'specialCharacters', 'link', 'insertImage', 'mediaEmbed', 'insertTable', 'blockQuote', '|', 'alignment', '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent']
          },
          initialData: '<p>Masukkan Soal...</p>',
          licenseKey: LICENSE_KEY,
          placeholder: 'Type or paste your content here!'
        }
      };
    }
  }, [isLayoutReady, type]);

  return (
    <div className="editor-container" ref={editorContainerRef}>
      <div className="editor-wrapper" ref={editorRef}>
        {Editor && editorConfig && (
          <CKEditor
            onReady={editor => {
              if (type === 'classic') {
                const wordCount = editor.plugins.get('WordCount');
                editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
              }
            }}
            onAfterDestroy={() => {
              if (type === 'classic') {
                Array.from(editorWordCountRef.current.children).forEach(child => child.remove());
              }
            }}
            editor={Editor}
            config={editorConfig}
          />
        )}
      </div>
      {type === 'classic' && <div ref={editorWordCountRef} className="word-count-container"></div>}
    </div>
  );
}

CstmCkEditor.propTypes = {
  type: PropTypes.string.isRequired
}