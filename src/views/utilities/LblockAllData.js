import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const FilterSearchblock = ({ block, department }) => {
  const [categories, setCategories] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [jsonData, setJsonData] = useState(null);
  const [excelGenerated, setExcelGenerated] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8010/api/block/categories/${block}/${department}`);
        setCategories(response.data);
        const allData = await Promise.all(response.data.map(category => 
          axios.get(`http://localhost:8010/api/block/category/${block}/${department}/${category}`)
        ));
        setDepartmentData(allData.map(res => res.data));
      } catch (error) {
        console.error(`Error fetching categories for department ${department} in block ${block}:`, error);
      }
    };
    fetchData();
  }, [block, department]);

  useEffect(() => {
    if (departmentData.length > 0) {
      fetchJsonData();
    }
  }, [departmentData]);

  const fetchJsonData = () => {
    const jsonDataArray = departmentData.map(categoryData => {
      const keys = Object.keys(categoryData[0]);
      return categoryData.map(item => {
        const row = {};
        keys.forEach(key => {
          if (key !== '_id') {
            row[key] = item[key];
          }
        });
        return row;
      });
    });

    setJsonData(jsonDataArray);
  };

  const convertJsonToExcel = () => {
    if (!jsonData) return;

    const workBooks = jsonData.map((categoryData, index) => {
      const keys = Object.keys(categoryData[0]);
      const data = categoryData.map(item => {
        const row = {};
        keys.forEach(key => {
          if (key !== '_id') {
            row[key] = item[key];
          }
        });
        return row;
      });

      const workSheet = XLSX.utils.json_to_sheet(data);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, `category_${index + 1}`);
      return workBook;
    });

    const mergedWorkBook = workBooks.reduce((acc, wb) => {
      XLSX.utils.book_append_sheet(acc, wb.Sheets[wb.SheetNames[0]]);
      return acc;
    }, XLSX.utils.book_new());

    XLSX.writeFile(mergedWorkBook, 'mergedData.xlsx');
    setExcelGenerated(true);
  };

  const convertJsonToPDF = () => {
    if (!jsonData) return;

    const doc = new jsPDF();

    jsonData.forEach((categoryData, index) => {
      const keys = Object.keys(categoryData[0]).filter(key => key !== '_id');
      const data = categoryData.map(item =>
        keys.map(key => (typeof item[key] === 'boolean' ? (item[key] ? 'Yes' : 'No') : item[key]))
      );

      if (index !== 0) {
        doc.addPage();
      }

      doc.autoTable({ head: [keys], body: data });
    });

    doc.save('mergedData.pdf');
    setPdfGenerated(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper style={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <TableContainer style={{ maxHeight: '440px', overflowY: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            {jsonData && jsonData.map((categoryData, index) => (
              <React.Fragment key={`category_${index}`}>
                <TableHead>
                  <TableRow>
                    {Object.keys(categoryData[0]).map((key) => (
                      key !== '_id' && <TableCell key={key}>{key}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, rowIndex) => (
                    <TableRow key={`row_${rowIndex}`}>
                      {Object.keys(item).map((key) => (
                        key !== '_id' && <TableCell key={key}>{typeof item[key] === 'boolean' ? (item[key] ? 'Yes' : 'No') : item[key]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </React.Fragment>
            ))}
          </Table>
        </TableContainer>
        <TablePagination
          style={{ marginTop: '20px' }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={departmentData.flat().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div style={{ marginTop: '20px' }}>
        <button onClick={convertJsonToExcel} style={{ marginRight: '10px' }}>Generate Excel</button>
        <button onClick={convertJsonToPDF}>Generate PDF</button>
      </div>
      {excelGenerated && <p>Excel file generated successfully.</p>}
      {pdfGenerated && <p>PDF file generated successfully.</p>}
    </div>
  );
};

export default FilterSearchblock;
