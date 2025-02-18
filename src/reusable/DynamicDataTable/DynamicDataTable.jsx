import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Space, Table, Tooltip } from "antd";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Search from "antd/es/input/Search";

const DynamicDataTable = ({
  data,
  columnsData,
  customid,
  getSelectdRowData,
  loadingTableStatus = false,
}) => {
  const [columns, setColumns] = useState(columnsData);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Store selected row keys
  const [pageSize, setPageSize] = useState(10); // Store the page size for pagination
  const [currentPage, setCurrentPage] = useState(1); // Store the current page for pagination
  const searchInput = useRef(null);

  // Handle search functionality
  const handleSearch = (selectedKeys, dataIndex, confirm) => {
    confirm();
    console.log("handleSearch", data, selectedKeys);
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, selectedKeys, dataIndex, confirm) => {
    clearFilters();
    setSearchText("");
    handleSearch(selectedKeys, "", confirm);
  };

  // Handle sort and filter changes
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // Custom search input for each column
  console.log("searchText", searchText);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input.Search
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            const newValue = e.target.value;
            setSelectedKeys(newValue ? [newValue] : []);
            handleSearch(newValue ? [newValue] : [], dataIndex, () =>
              confirm(false)
            );
          }}
          onPressEnter={() =>
            handleSearch(selectedKeys, dataIndex, () => confirm())
          }
          onSearch={() =>
            handleSearch(selectedKeys, dataIndex, () => confirm())
          }
          style={{
            marginBottom: 8,
            display: "block",
          }}
          enterButton
          size="middle"
          prefix={<SearchOutlined />}
          suffix={
            <CloseCircleOutlined
              onClick={() => {
                handleReset(clearFilters, selectedKeys, dataIndex, confirm);
              }}
              style={{ color: "rgba(0,0,0,.25)" }}
            />
          }
        />
      </div>
    ),

    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
          fontSize: "15px",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // Handle row selection
  console.log("selectedRowKeys changed: ", selectedRowKeys);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    getSelectdRowData(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };

  // Handle pagination change
  const handlePaginationChange = (page, size) => {
    setCurrentPage(page); // Update the current page state
    setPageSize(size); // Update the pageSize state
    console.log("Current Page:", page, "Page Size:", size);
  };

  const swapSpans = () => {
    // Wait for DOM elements to render properly
    setTimeout(() => {
      // Get all column containers that contain the span elements
      const columnContainers = document.getElementsByClassName(
        "ant-table-filter-column"
      );

      // Loop through each column container and swap the spans
      for (let i = 0; i < columnContainers.length; i++) {
        const container = columnContainers[i];
        container.style = "gap:7px";
        // Get the span elements for column title and filter trigger
        const titleSpan = container.getElementsByClassName(
          "ant-table-column-title"
        )[0];
        const filterTriggerSpan = container.getElementsByClassName(
          "ant-table-filter-trigger"
        )[0];

        if (titleSpan && filterTriggerSpan) {
          // Clear the container and append the spans in swapped order
          container.innerHTML = "";
          container.appendChild(filterTriggerSpan);
          container.appendChild(titleSpan);
        } else {
          console.log("Elements not found for column", i);
        }
      }
    }, 100); // Ensure the elements are available after rendering
  };

  useEffect(() => {
    // Apply search and tooltip functionality separately
    const updatedColumns = columnsData.map((col) => {
      const column = {
        ...col,
        // Ensure sortOrder is updated correctly based on sortedInfo
        sortOrder:
          sortedInfo.columnKey === `${col.dataIndex}` ? sortedInfo.order : null,
        ...getColumnSearchProps(col.dataIndex), // Add search functionality
      };

      // Apply rendering logic
      return {
        ...column,
        render: col?.render
          ? col?.render
          : (text) => (
              <Tooltip placement="topLeft" title={text}>
                <span style={{ fontWeight: 500 }}>
                  {text && text.length > 20 ? `${text.slice(0, 20)}...` : text}
                </span>
              </Tooltip>
            ),
      };
    });

    // Update columns state with the new columns configuration
    setColumns(updatedColumns);
  }, [columnsData, sortedInfo]); // Add sortedInfo as a dependency so it updates when the sorting changes

  console.log("columns*", columns, data);
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        filteredInfo={filteredInfo}
        sortedInfo={sortedInfo}
        size="small"
        rowSelection={rowSelection} // Add row selection
        pagination={{
          current: currentPage, // Set the current page
          pageSize: pageSize, // Set the page size dynamically
          pageSizeOptions: ["5", "10", "20", "30"], // Available page size options
          showSizeChanger: true, // Show the dropdown for selecting page size
          onShowSizeChange: handlePaginationChange, // Log page size change
          onChange: handlePaginationChange, // Log page size change

          // onChange: (page) => {
          //   setCurrentPage(page); // Update the page number when user navigates to a different page
          //   console.log("Page Changed to:", page);
          // },
        }}
        scroll={{ x: true }}
        tableLayout="auto"
        rowKey={customid}
        loading={loadingTableStatus}
        
      />
    </>
  );
};

export default DynamicDataTable;
