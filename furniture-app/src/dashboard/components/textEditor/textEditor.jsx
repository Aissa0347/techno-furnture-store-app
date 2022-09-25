import { TypographyStylesProvider } from "@mantine/core";
import RichTextEditor from "@mantine/rte";
import { useState } from "react";

function TextEditor({ descriptionTextContent, setDescriptionTextContent }) {
  return (
    <>
      <RichTextEditor
        value={descriptionTextContent}
        onChange={setDescriptionTextContent}
        controls={[
          ["h1", "h2", "h3", "h4", "h5"],
          ["bold", "italic", "underline"],
          ["link", "image", "video"],
          ["alignLeft", "alignCenter", "alignRight"],
        ]}
        className="editor"
      />
      {/* <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: descriptionTextContent }}></div>
      </TypographyStylesProvider> */}
    </>
  );
}

export default TextEditor;
