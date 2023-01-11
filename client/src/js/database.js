import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  console.log('PUT to the database:');
  putDb('This is some content');
  const jateDb = await initdb();
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const result = await store.put({ content: 'This is some content' });
  console.log('result', result);
};




// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database:');
  const jateDb = await initdb();
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const result = await store.getAll();
  console.log('result', result);
};

initdb();
