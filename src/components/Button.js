import React from "react";

export default function Button(props) {
  return (
    <button className="button" type="submit">
      {props.text}
    </button>
  );
}
