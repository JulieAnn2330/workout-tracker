let db;
// create a new db request for a "budget" database.
const request = indexedDB.open("workout", 1);

request.onupgradeneeded = function(event) {
   // create object store called "pending" and set autoIncrement to true
  db = event.target.result;
  const workoutStore = db.createObjectStore("workout", {
    keyPath: "listID"
  });
  // Creates a statusIndex that we can query on.
  workoutStore.createIndex("workoutIndex", "workouts");
};

request.onsuccess = function(event) {
  db = event.target.result;

  // check if app is online before reading from db
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function(event) {
  console.log("Woops! " + event.target.errorCode);
};

function saveRecord(record) {
  // create a transaction on the pending db with readwrite access
  const workouts = db.transaction(["workout"], "readwrite");

  // access your pending object store
  const store = workouts.objectStore("workout");

  // add record to your store with add method.
  store.add(record);
}

function checkDatabase() {
  // open a transaction on your pending db
  const workouts = db.transaction(["workout"], "readwrite");
  // access your pending object store
  const store = workouts.objectStore("workout");
  // get all records from store and set to a variable
  const getAll = store.getAll();

  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/workout/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
        // if successful, open a transaction on your pending db
        const workouts = db.transaction(["workout"], "readwrite");

        // access your pending object store
        const store = workouts.objectStore("workout");

        // clear all items in your store
        store.clear();
      });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);
