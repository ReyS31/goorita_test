import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import historyService from 'src/services/history.service';

import Scrollbar from 'src/components/scrollbar';

import TableEmptyRows from '../table-empty-rows';
import HistoryTableRow from '../history-table-row';
import HistoryTableHead from '../history-table-head';

// ----------------------------------------------------------------------

export default function HistoryPage() {
  const [dataFiltered, setDataFiltered] = useState([]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    historyService.history({}).then((res) => {
      console.log(res);
      setDataFiltered(res.data);
      setTotal(res.total);
    });
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">History</Typography>
      </Stack>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <HistoryTableHead
                headLabel={[
                  { id: 'id', label: 'ID' },
                  { id: 'total', label: 'Total' },
                  { id: 'date', label: 'Purchased At' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((row) => (
                  <HistoryTableRow
                    key={row.id}
                    id={row.id}
                    total={row.total}
                    date={new Date(row.updated_at).toLocaleString()}
                  />
                ))}

                <TableEmptyRows height={77} emptyRows={total} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Container>
  );
}
