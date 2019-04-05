const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.join());

let reservations = [
    {
        tableNumber: "Table #1",
        id: "id1",
        name: "name1",
        email: "email1",
        phone: "phonestring1"
      },
      {
        tableNumber: "Table #2",
        id: "id2",
        name: "name2",
        email: "email2",
        phone: "phonestring2"
      }
];

let waitList = [
    {
      tableNumber: "Table #1",
      id: "idWait",
      name: "nameWait",
      email: "emailWait",
      phone: "phonestringWait"
    }
  ];

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "form.html"));
  });
  
  app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
  });
  
  app.get("/api/waitList", function(req, res) {
      return res.json(waitList);
    });
  
  // Displays a single character, or returns false
  app.get("/api/reservations/:table", function(req, res) {
    var table = req.params.table;
  
    console.log(table);
  
    for (var i = 0; i < reservations.length; i++) {
      if (table === reservations[i].tableNumber) {
        return res.json(reservations[i]);
      }
    }
  
    return res.json(false);
  });
  
  app.post("/api/reservations", function(req, res) {
    var newReservation = req.body;
    newReservation.tableNumber = newReservation.tableNumber.replace(/\s+/g, "").toLowerCase();
  
    console.log(newReservation);
  
    reservations.push(newReservation);
  
    res.json(newReservation);
  });
  
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
      // Question: What does this code do?
      $("#submit-btn").on("click", function(event) {
        event.preventDefault();
  
        var newReservation = {
          name: $("#name").val().trim(),
          phoneNumber: $("#phone-number").val().trim(),
          email: $("#email").val().trim(),
          id: $("#id").val().trim()
        };
  
        // Question: What does this code do??
        $.post("/api/reservations", newReservation)
          .then(function(data) {
            console.log(data);
            alert("Adding new reservation...");
          });
  
      });