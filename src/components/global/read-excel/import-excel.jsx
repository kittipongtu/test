import React, { Fragment, useState, useRef } from "react";
import { Button, Typography, Chip, Stack, Box } from "@mui/material";
import * as XLSX from "xlsx";
import _ from "underscore";

// ### Context
import { useConfirm } from "../../global/confirm-dialog";
import { useLoading } from "../../global/full-loading";
import { useAlert } from "../../global/context-alert-dialog";

// ### Ison
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

const ExcelReader = (props) => {
  // ### Set Global Context
  const confirm = useConfirm();
  const { loading, setLoading } = useLoading();
  const { openAlert, setOpenAlert } = useAlert();

  // ### Set Ref
  const hiddenFileInput = useRef(null);

  // ### Set Porps
  const { payload, setPayload } = props;

  // ### Set State
  const [fileName, setFielName] = useState("");

  // ### Set Function
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    // console.log("file", file);

    setFielName(file?.name || "");
    // hiddenFileInput.value = "";

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      let header = [];
      let rowData = [];
      let mapField = {
        เลขที่อ้างอิง: "DocumentNo_Header",
        วันที่สร้าง: "DocumentDate_Header",
        ชื่อลูกค้า: "SellToCustomerName_Header",
        ทะเบียนรถ: "ReserveText3",
        รายละเอียดประกันภัย: "Description_Line",
        ยอดชำระ: "UnitPrice_Line",
        เบอร์โทรศัพ: "SellToCustomerTelNo_Header",
        ผู้รับมอบหมายงาน: "Assignee",
        "สถานะของ SMS": "Active",
      };

      let verifyHeader = ["SellToCustomerName_Header", "SellToCustomerTelNo_Header", "ReserveText3"];
      let verifyStatus = true;
      jsonData.forEach((items, index) => {
        if (index == 0) {
          items.forEach((item, subindex) => {
            let newItem = mapField[item] || false;
            header.push(newItem);
          });
          let verifyField = verifyHeader.every((item) => header.includes(item));
          if (!verifyField) {
            // result.status = false;
            // result.message = "ข้อมูลใน Excel ไม่ถูกต้อง";
            // result.error_type = "warning";
            // console.log("TEST");
            verifyStatus = false;
            return;
          }
        } else {
          let object = {
            company_id: 1,
          };
          items.forEach((item, subindex) => {
            // console.log(item.toString())
            item = item.toString()
            if (header[subindex]) {
              if (item == undefined || item == null) {
                item = "";
              }
              object[header[subindex]] = item;
            }
          });
          rowData.push(object);
        }
      });
      if (verifyStatus) {
        setPayload(rowData);
      } else {
        setOpenAlert({
          status: true,
          type: "warning",
          message: "ข้อมูลใน Excel ไม่ถูกต้อง",
        });
        setPayload([]);
      }
    };
    await reader.readAsArrayBuffer(file);
    event.target.value = null;
  };

  return (
    <Fragment>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Button
          component="label"
          sx={{ marginTop: "8px" }}
          size="medium"
          variant="outlined"
          color="primary"
          startIcon={<DriveFolderUploadIcon color="success" />}
          onChange={handleFileUpload}
          // noClick={handleClearFielInput}
        >
          <b>{`Import Excel`}</b>
          <input hidden={true} ref={hiddenFileInput} type="file" />
        </Button>
        {fileName ? (
          <Box>
            <Chip label={fileName} sx={{ marginTop: "8px" }} />
          </Box>
        ) : (
          ""
        )}
      </Stack>
    </Fragment>
  );
};

export default ExcelReader;
