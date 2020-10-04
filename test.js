db.User.create({ name: "Ernest Hemingway" })
     .then(dbUser => {
       console.log(dbUser);
     })
     .catch(({ message }) => {
       console.log(message);
     });
   app.get("/notes", (req, res) => {
     db.Note.find({})
       .then(dbNote => {
         res.json(dbNote);
       })
       .catch(err => {
         res.json(err);
       });
   });
   
   app.get("/user", (req, res) => {
     db.User.find({})
       .then(dbUser => {
         res.json(dbUser);
       })
       .catch(err => {
         res.json(err);
       });
   });
   
   app.post("/submit", ({ body }, res) => {
     db.Note.create(body)
       .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
       .then(dbUser => {
         res.json(dbUser);
       })
       .catch(err => {
         res.json(err);
       });
   });
   
   app.get("/populateduser", (req, res) => {
     // TODO
     db.User.find({})
     .populate("notes")
     .then(dbUser => {
       res.json(dbUser);
     })
     .catch(err => {
       res.json(err);
     });
   });
     // =====
     // Write the query to grab the documents from the User collection,
     // and populate them with any associated Notes.
     // TIP: Check the models out to see how the Notes refers to the User
   