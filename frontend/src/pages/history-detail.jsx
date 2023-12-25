import { Helmet } from 'react-helmet-async';

import { HistoryDetailView } from 'src/sections/history/view';
// ----------------------------------------------------------------------

export default function HisotryDetailPage() {
  return (
    <>
      <Helmet>
        <title> History | Minimal UI </title>
      </Helmet>

      <HistoryDetailView />
    </>
  );
}
