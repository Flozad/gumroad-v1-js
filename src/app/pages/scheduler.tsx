import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

interface CronEntry {
  cron_entry: string;
  next_run: string;
  key: string;
}

const SchedulerPage: React.FC = () => {
  const [cronEntries, setCronEntries] = useState<CronEntry[]>([]);
  const [cronEntryInput, setCronEntryInput] = useState('');

  useEffect(() => {
    fetch('/api/cron/get')
      .then(response => response.json())
      .then(data => setCronEntries(data.cron_entries))
      .catch(error => console.error('Error fetching cron entries:', error));
  }, []);

  const handleAddCronEntry = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/cron/manage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'Add', cron_entry: cronEntryInput }),
    });

    const data = await response.json();
    setCronEntries(data.cron_entries);
    setCronEntryInput('');
  };

  const handleDeleteCronEntry = async (key: string) => {
    const response = await fetch('/api/cron/manage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'Delete', key }),
    });

    const data = await response.json();
    setCronEntries(data.cron_entries);
  };

  return (
    <Layout title="Scheduler" hideFooter={true} hideHeader={true} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-scheduler">
      <div>
        <h3 className="text-xl font-bold">Cron</h3>
        <p>This utility allows you to schedule URLs to be fetched at certain times/intervals. These actions are initiated during normal requests to your website, as long as the request includes an import appengine_utilities.event.
          <br />
          <strong>NOTE: </strong>This will not work on the local SDK due to it being single-threaded and unable to make a request to itself.
        </p>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Cron Entry</th>
            <th className="py-2" colSpan={2}>Next Run Time</th>
          </tr>
        </thead>
        <tbody>
          {cronEntries.map(cron => (
            <tr key={cron.key}>
              <td className="py-2">{cron.cron_entry}</td>
              <td className="py-2">{cron.next_run}</td>
              <td>
                <button onClick={() => handleDeleteCronEntry(cron.key)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h4 className="text-lg font-bold">Add Cron Entry</h4>
        <form onSubmit={handleAddCronEntry} className="flex flex-col space-y-2">
          <input
            type="text"
            size={80}
            value={cronEntryInput}
            onChange={(e) => setCronEntryInput(e.target.value)}
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-green-500 text-white py-1 px-2 rounded">Add</button>
        </form>
      </div>
    </Layout>
  );
};

export default SchedulerPage;
