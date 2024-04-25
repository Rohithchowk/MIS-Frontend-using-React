import React, { useRef, useEffect, useState } from 'react';
import { Grid, Typography, Button, Avatar, List, ListItem, ListItemText, Paper } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import html2pdf from 'html2pdf.js'; // Import html2pdf library
import axios from 'axios'; // Import axios for making HTTP requests

const Block = ({ title, imageUrl, parameters }) => (
  <MainCard title={title}>
    <Avatar variant="rounded" sx={{ width: '100%', height: 200, mb: 1 }} src={imageUrl} />
    <List sx={{ '& .MuiListItem-root': { py: 0 } }}>
      {parameters.map((param, index) => (
        <ListItem key={index} disablePadding>
          <ListItemText
            primary={
              <React.Fragment>
                <span style={{ fontWeight: 'bold' }}>{param.label}:</span> {param.value}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  </MainCard>
);

const StaffRooms = () => {
  const [staffRoomsData, setStaffRoomsData] = useState([]);
  const contentRef = useRef(null); // Create a reference for the content container

  useEffect(() => {
    fetchStaffRoomsData();
  }, []);

  const fetchStaffRoomsData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/staffrooms'); // Assuming your backend is running on the same domain
      setStaffRoomsData(response.data);
    } catch (error) {
      console.error('Error fetching staffroom data:', error);
    }
  };

  const downloadPdf = () => {
    const content = contentRef.current; // Target the content container

    if (!content) {
      console.error('Content reference is not available');
      return;
    }

    // Specify the base path for images
    const opt = {
      margin: [2, 2], // Add margins
      filename: 'Staffrooms Infrastructure CBIT.pdf', // Set filename
      html2canvas: {
        scale: 2, // Increase scale for better image quality
      },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
      },
    };

    // Convert content to PDF
    html2pdf().from(content).set(opt).toPdf().save();
  };

  return (
    <Grid container spacing={3} alignItems="center" ref={contentRef}>
      {/* White block containing Staffrooms heading and Download PDF button */}
      <Grid item xs={12}>
        <Paper style={{ padding: '20px', background: '#fff' }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
            <Typography variant="h2" sx={{ color: '#ba2c1b', fontFamily: 'Roboto, sans-serif' }}>
                STAFFROOMS
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={downloadPdf}>
                Download PDF
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {/* Main content */}
      {staffRoomsData.map((staffRoom, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Block {...staffRoom} />
        </Grid>
      ))}
    </Grid>
  );
};

const App = () => {
  return <StaffRooms />;
};

export default App;
