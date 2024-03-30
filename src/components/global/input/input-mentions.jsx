import React, { Fragment, useState, useEffect } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { Typography } from "@mui/material";

const mentionsInputStyles = {
  control: {
    backgroundColor: "#fff",
    fontSize: 16,
    // fontWeight: 'normal',
  },

  "&multiLine": {
    control: {
      //   fontFamily: "monospace",
      fontFamily: "Kanit, sans-serif",
      minHeight: 300,
      maxHeight: 300,
    },
    // highlighter: {
    //   padding: 8,
    //   border: "1px solid transparent",
    //   marginLeft: "7px",
    // },
    // input: {
    //   padding: "8px 14px",
    //   //   paddingLeft: 16,
    //   border: "1px solid silver",
    //   borderRadius: "7px",
    //   // marginLeft: "7px",
    // },
    highlighter: {
      paddingTop:3
    },
    input: {
      
    },
  },

  "&singleLine": {
    display: "inline-block",
    width: 180,
    highlighter: {
      padding: 1,
      border: "2px inset transparent",
    },
    input: {
      padding: 1,
      border: "2px inset",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 16,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};

function InputMentions(props) {
  const { payload, setPayload, option } = props;
  const { name, fieldData, data } = option;

  // --- Set Function
  const handleChange = (event) => {
    let value = event.target.value;

    let newObject = { ...payload };
    newObject[name] = value;
    setPayload(newObject);
  };

  const generateMessage = (data, raw_message) => {
    try {
      let rawMessage = raw_message;
      while (true) {
        let indexFirst = rawMessage.indexOf("@");
        let indexSecon = rawMessage.indexOf("(", indexFirst);
        let indexLast = rawMessage.indexOf(")", indexFirst);
        if (indexFirst == -1) {
          break;
        }
        let nameElement = rawMessage.slice(indexSecon + 1, indexLast);
        let stringReplace = rawMessage.slice(indexFirst, indexLast + 1);
        rawMessage = rawMessage.replace(stringReplace, data[nameElement]);
      }
      return rawMessage;
    } catch (err) {
      console.log("generateMessage", err);
      return "";
    }
  };

  return (
    <Fragment>
      <Typography
        variant="subtitle2"
        sx={{
          ml: 1,
          mt: 0.5,
          position: "absolute",
          zIndex: 1,
          paddingTop: "-21px",
          marginTop: "-10px",
          paddingLeft: "6px",
          paddingRight: "6px",
          //   marginLeft: "1px",
          //   marginRight: "1px",
          background: "#fff",
        }}
        fontSize={"small"}
      >
        {`${option?.label || ""} ${option?.required ? "*" : ""}`}
      </Typography>
      <MentionsInput
        placeholder="พิมพ์ @ เพื่อเลือกตัวเลือก"
        style={mentionsInputStyles}
        value={payload[name] || ""}
        onChange={handleChange}
      >
        <Mention
          data={fieldData}
          style={{
            // backgroundColor: "whitesmoke",
            backgroundColor: "#cee4e5",
            zIndex: 10,
            borderRadius: "7px",
            // marginLeft: "7px",
            // fontWeight: "bold",
            // padding: "2px",
            // margin: "1px",
          }}
          displayTransform={(id, display) => {
            return data[id] ? data[id] : display;
          }}
        />
      </MentionsInput>
    </Fragment>
  );
}

export default InputMentions;
