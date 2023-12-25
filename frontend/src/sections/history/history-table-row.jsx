import PropTypes from 'prop-types';

import { Link } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function HistoryTableRow({ id, total, date }) {
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell>
        <Link href={`/history/${id}`}>{id}</Link>
      </TableCell>

      <TableCell>{total}</TableCell>

      <TableCell>{date}</TableCell>
    </TableRow>
  );
}

HistoryTableRow.propTypes = {
  id: PropTypes.any,
  total: PropTypes.any,
  date: PropTypes.any,
};
