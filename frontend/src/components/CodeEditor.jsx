import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange, language = 'javascript', theme = 'vs-dark' }) => {
  const handleEditorChange = (value) => {
    onChange(value);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        height="400px"
        language={language}
        theme={theme}
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;