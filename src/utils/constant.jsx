import { Link, useLocation, useSearchParams } from "react-router-dom";

// For ES Modules
import ExcelJS from "exceljs";

import { generateToken } from "../api/generateToken";
import { useApiCalls } from "../api/apiCalls";

export const icon_size = 23;
export const env = import.meta.env;

console.log("env", env);
// current location
export function CurrentRoute() {
  let loaction = useLocation();
  return loaction.pathname.split("/")[loaction.pathname.split("/").length - 1];
}
// bread crumes function

export function BreadCrumesArray() {
  let location = useLocation();
  const [searchParams] = useSearchParams();

  console.log("breadcrumbs useSearchParams", searchParams);

  let filterPathNames = location.pathname.split("/").filter((x, i) => x);

  let updateFilePthArray = filterPathNames;

  const generateBreadcrumbs = () => {
    return updateFilePthArray.map((path, index) => {
      const to = `/${updateFilePthArray.slice(0, index + 1).join("/")}`;
      let data = breadcrumbsData.find((item) => item.value == path);
      let checkRouteIndex = updateFilePthArray.indexOf(
        updateFilePthArray[updateFilePthArray.length - 2]
      );

      return (updateFilePthArray[checkRouteIndex] == "AddNewEmployee" ||
        updateFilePthArray[checkRouteIndex] == "EmpList") &&
        index == checkRouteIndex + 1 &&
        searchParams.has("EmpNumber") ? (
        <span
          className={
            CurrentRoute().includes(path)
              ? "text-linkColor font-bold cursor-pointer"
              : "text-inherit font-bold"
          }
        >
          {atob(searchParams.get("EmpNumber"))}
        </span>
      ) : (
        <Link
          key={to}
          to={to}
          className={
            CurrentRoute().includes(path)
              ? "text-linkColor font-bold"
              : "text-inherit font-bold"
          }
        >
          {/* {(updateFilePthArray[checkRouteIndex] == "AddNewEmployee" ||
            updateFilePthArray[checkRouteIndex] == "EmpList") &&
          index == checkRouteIndex + 1 &&
          searchParams.has("EmpNumber")
            ? atob(searchParams.get("EmpNumber"))
            : data?.label || path} */}
          {data?.label || path}
        </Link>
      );
    });
  };

  console.log("BreadCrumesArray", generateBreadcrumbs());
  const breadcrumbs = [...generateBreadcrumbs()];
  return breadcrumbs;
}

//  download document

export const DownLoadFiles = async (filePath, fullFileName) => {
  const parsedUrl = new URL(filePath);
  const protocol = parsedUrl.protocol;
  const downloadLink = document.createElement("a");
  if (protocol == "https:") {
    downloadLink.href = filePath;
    downloadLink.target = "_blank";
    downloadLink.download = fullFileName;
    downloadLink.click();
  } else {
    let apiUrl = encodeURIComponent(filePath);
    let newApiUrl = apiUrl.replaceAll("%2F", "%5C");
    let formate = fullFileName.split(".")[1];
    let fileName = fullFileName.split(".")[0];
    let url = `${env.VITE_API_URL}/StatutoryDashboard/GetDocuments?fileName=${newApiUrl}`;
    let token = await generateToken();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) =>
      res.json().then((base64) => downloadPDF(base64, formate, fileName))
    );
  }

  function downloadPDF(base64, formate, fullFileName) {
    console.log("file", base64, formate);
    const linkSource = `data:application/image/${formate};base64,${base64}`;
    const downloadLink = document.createElement("a");
    const fileName = `${fullFileName}.${formate}`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
};

export const openPdfInNewTab = (fileType, base64) => {
  const linkSource = `data:application/${fileType};base64,${base64}`;
  // Open a new tab
  const newTab = window.open();

  // Render an iframe with the PDF content in the new tab
  newTab.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>PDF Preview</title>
      </head>
      <body style="height:100vh">

        <iframe width="100%" height="100%" src="${linkSource}"></iframe>
      </body>
    </html>
  `);
};

// export const dataToExcelExport = async (data, fileName) => {
//   console.log("dataToExcelExport", data, fileName);

//   // Create a new workbook and a worksheet
//   const workbook = new ExcelJS.Workbook();
//   // const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet("Sheet1");

//   // Define header and data cell style (same style for both)
//   const cellStyle = {
//     fill: {
//       type: "pattern", // Use pattern fill
//       pattern: "solid",
//       fgColor: { argb: "FFFF00" }, // Yellow background
//     },
//     font: {
//       bold: true,
//       color: { argb: "000000" }, // Black text
//       size: 14,
//     },
//     alignment: {
//       horizontal: "center",
//       vertical: "middle",
//     },
//     border: {
//       top: { style: "thin", color: { argb: "000000" } },
//       left: { style: "thin", color: { argb: "000000" } },
//       bottom: { style: "thin", color: { argb: "000000" } },
//       right: { style: "thin", color: { argb: "000000" } },
//     },
//   };

//   // Add columns and apply header styles
//   const columns = Object.keys(data[0]).map((key) => ({
//     header: key,
//     key: key,
//   }));
//   worksheet.columns = columns;

//   // Apply styles to the header row
//   data.forEach((item) => {
//     const headerRow = worksheet.getRow(2);
//     // Apply the same cell styles to each data cell
//     headerRow.eachCell({ includeEmpty: true }, (cell) => {
//       cell.font = cellStyle.font;
//       cell.fill = cellStyle.fill;
//       cell.alignment = cellStyle.alignment;
//       cell.border = cellStyle.border;
//     });
//   });

//   // Add data to the worksheet and apply styles to each cell
//   data.forEach((item) => {
//     let row = worksheet.addRow(item);
//     row.eachCell({ includeEmpty: true }, (cell) => {
//       cell.border = cellStyle.border; // Apply border to data cells
//     });
//   });

//   // Save the workbook to a file
//   const buffer = await workbook.xlsx.writeBuffer();
//   const blob = new Blob([buffer], { type: "application/octet-stream" });
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `${fileName}.xlsx`;
//   a.click();
//   window.URL.revokeObjectURL(url);
// };

export const dataToExcelExport = async (
  data,
  fileName,
  xlHeadersData = { isHeadersRequred: false, headersArray: [] }
) => {
  console.log("dataToExcelExport", data, fileName);

  // Create a new workbook and a worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Define header and data cell style (same style for both)
  const cellStyle = {
    fill: {
      type: "pattern", // Use pattern fill
      pattern: "solid",
      fgColor: { argb: "b3b3b3" }, // Yellow background
    },
    font: {
      bold: true,
      color: { argb: "000000" }, // Black text
      size: 12,
    },
    alignment: {
      horizontal: "center",
      vertical: "middle",
    },
    border: {
      top: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    },
  };

  // Dynamically set column headers based on the data keys
  const columns = Object.keys(data[0]).map((key) => ({
    header: key,
    key: key,
    width: Math.max(...data.map((row) => row[key]?.toString().length)) + 20, // Dynamic width based on content length
  }));

  worksheet.columns = columns;

  // Set Main Header (Row 1) and Apply Styles
  function numberToColumnLabel(num) {
    let result = "";
    while (num >= 0) {
      result = String.fromCharCode((num % 26) + 65) + result; // Get the letter
      num = Math.floor(num / 26) - 1; // Adjust the number to get the next letter
    }
    return result;
  }

  function headers(rowNumber, label, value) {
    console.log("headers", rowNumber, label, value);
    worksheet.mergeCells(`A${rowNumber}:` + columnLabel + rowNumber);
    const mainHeaderCell = worksheet.getCell(`A${rowNumber}`);
    mainHeaderCell.value = `${label} : ${value}`;
    mainHeaderCell.font = { bold: true, size: 13 };
    mainHeaderCell.alignment = { horizontal: "left", vertical: "middle" };
    mainHeaderCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "e0e0e0" },
    };
    mainHeaderCell.border = {
      top: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
    };
    return mainHeaderCell;
  }

  let columnLabel = numberToColumnLabel(columns.length - 1);

  // headers
  xlHeadersData?.isHeadersRequred &&
    xlHeadersData?.headersArray.map((header) =>
      headers(header?.row, header?.label, header?.value)
    );

  // Set Header Row (Row 2) and Apply Styles
  const headerRow = worksheet.getRow(xlHeadersData?.headersArray.length + 1);
  columns.forEach((col, index) => {
    console.log("headerRow", col);
    const cell = headerRow.getCell(index + 1);
    cell.value = col.header; // Set the header value (e.g., 'Name', 'Age', etc.)
    cell.font = cellStyle.font;
    cell.fill = cellStyle.fill;
    cell.alignment = cellStyle.alignment;
    cell.border = cellStyle.border;
  });

  // Add Data Rows
  data.forEach((item) => {
    let row = worksheet.addRow(item);
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = cellStyle.border; // Apply border to data cells
    });
  });

  // Save the workbook to a file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.xlsx`; // Set the downloaded file name
  a.click();
  window.URL.revokeObjectURL(url);
};
