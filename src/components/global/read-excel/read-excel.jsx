import * as XLSX from "xlsx";

function readExcel(path_excel) {
  var result = [];
  var workbook = XLSX.readFile(path_excel);
  var sheet_name_list = workbook.SheetNames;
  sheet_name_list.forEach(function (y) {
    var worksheet = workbook.Sheets[y];
    var headers = {};
    var data = [];
    for (z in worksheet) {
      if (z[0] === "!") continue;
      // --- parse out the column, row, and value
      var tt = 0;
      for (var i = 0; i < z.length; i++) {
        if (!isNaN(z[i])) {
          tt = i;
          break;
        }
      }
      var col = z.substring(0, tt);
      var row = parseInt(z.substring(tt));
      var value = worksheet[z].v;
      if (value == "null" || value == "Null" || value == undefined || value == null) {
        value = "";
      } else {
      }

      // --- store header names
      if (row == 1 && value) {
        if (value != "") {
          value = value.toString();
          value = value.toLowerCase();
          value = value.replace(/\/| |\-/gi, "_");
          value = value.replace(/\./gi, "");
          value = value.replace(/\&/gi, "and");
        }
        headers[col] = value;
        continue;
      }

      if (!data[row]) data[row] = {};
      var field = headers[col];
      data[row][headers[col]] = value;
    }
    // --- drop those first two rows which are empty
    data.shift();
    data.shift();
    console.log("Row Total :", data.length);
    result = data;
    console.log(data);
  });
  return result;
}

export default readExcel;
