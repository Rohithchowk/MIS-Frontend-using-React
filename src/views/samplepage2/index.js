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

const SeminarHalls1 = () => {
  const [blocksData, setBlocksData] = useState([]);
  const contentRef = useRef(null); // Create a reference for the content container

  useEffect(() => {
    fetchBlocksData();
  }, []);

  const fetchBlocksData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blocks'); // Assuming your backend is running on the same domain
      setBlocksData(response.data);
    } catch (error) {
      console.error('Error fetching block data:', error);
    }
  };

  const downloadPdf = () => {
    const content = contentRef.current; // Target the content container

    if (!content) {
      console.error('Content reference is not available');
      return;
    }

    // Convert content to PDF
    html2pdf()
      .set({
        margin: [2, 2], // Add margins
        filename: 'Seminar Halls Infrastructure CBIT.pdf', // Set filename
      })
      .from(content)
      .save();
  };

  return (
    <Grid container spacing={3} alignItems="center" ref={contentRef}>
      {/* White block containing Seminar Halls heading and Download PDF button */}
      <Grid item xs={12}>
        <Paper style={{ padding: '20px', background: '#fff' }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
            <Typography variant="h2" sx={{ color: '#ba2c1b', fontFamily: 'Roboto, sans-serif' }}>
      SEMINAR HALLS
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
      {blocksData.map((block, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Block {...block} />
        </Grid>
      ))}
    </Grid>
  );
};

const App = () => {
  return <SeminarHalls1 />;
};

export default App;
