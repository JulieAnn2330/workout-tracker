const request = window.indexedDB.open("workout", 1);
      
request.onupgradeneeded = event => {
  const db = event.target.result;
  const workoutStore = db.createObjectStore("workouts", {keyPath: "listID"});
  // Creates a statusIndex that we can query on.
  workoutStore.createIndex("exercises", "type"); 
}

request.onsuccess = () => {
  const db = request.result;
  const transaction = db.transaction(["workouts"], "readwrite"); //This refs the db
  const workoutStore = transaction.objectStore("workouts"); //This refs the table
  const exercises = workoutStore.index("exercises"); //This declares the index

  // Adds data to our objectStore
  workoutStore.add({ listID: "1", type: "resistance", name: "BicepCurl", duration: 20, weight: 100, reps: 10, sets: 4});
  workoutStore.add({ listID: "2", type: "resistance", name: "Quad Press", duration: 30, weight: 300, reps: 10, sets: 4});
  workoutStore.add({ listID: "3", type: "resistance", name: "Bench Press", duration: 20, weight: 300, reps: 10, sets: 4});
  workoutStore.add({ listID: "4", type: "resistance", name: "Military Press", duration: 20, weight: 300, reps: 10, sets: 4});

  // Return an item by keyPath
  const getRequest = workoutStore.get("1");
  getRequest.onsuccess = () => {
    console.log(getRequest.result);
  };

  // Return an item by index
  const getRequestIdx = exercises.getAll("resistance");
  getRequestIdx.onsuccess = () => {
    console.log(getRequestIdx.result); 
  }; 
};