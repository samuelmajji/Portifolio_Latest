
import { useState } from "react";
import DairyHero from "../components/JournalCompnents/JournalHero";
import JournalList from "../components/JournalCompnents/JournalList";
import JournalApp from "../components/JournalCompnents/JournalEntry";


const Dairy = () => {
  const [Journal, setJournal] = useState('Samuel\'s Journal');
  const [page, setPage] = useState('home');

  return (
    <>
    {page === 'home' ? <DairyHero setJournalName={setJournal} setPage={setPage}/> : null}
    {page === 'JournalList' ? <JournalList journalName={Journal} setPage={setPage}/> : null}
    {page === 'JournalEntry' ? <JournalApp JournalName={Journal} setPage={setPage}/> : null}
    </>
  );
};

export default Dairy;