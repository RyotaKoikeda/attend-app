import React from "react";

const ImagePreview = (props) => {
  return (
    <div className="edit-thumb" onClick={() => props.delete(props.id)}>
      <img alt="プレビュー画像" src={props.path} />
    </div>
  );
};

export default ImagePreview;
