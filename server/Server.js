const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const dbResponse = require("./response");
const port = 5000;
const userRoute = require("./module/routes/userRoute");
const routerGet = require("./module/routes/routerGet");
const productRoute = require("./module/routes/productRoute");
const roleRoute = require("./module/routes/roleRoute");
const orderRoute = require("./module/routes/orderRoute");
const cartRoute = require("./module/routes/cartRoute");
const { getCart } = require("./module/queries/cartQuery");
const db = require("./connections");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  },
});
app.use(cookieParser());

io.on("connection", (socket) => {
  console.log("a user connected");
  const token = socket.handshake.auth.token;

  if (!token) {
    console.log("Token tidak ditemukan, memutuskan koneksi");
    return socket.disconnect();
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Token tidak valid: ", err);
      return socket.disconnect();
    }

    const userId = decoded.insertId;
    console.log("Token valid, userId: ", userId);

    getCart(userId, (err, result) => {
      if (err) {
        console.log("Gagal mengambil data keranjang: ", err);
        return socket.emit("error", {
          message: "Gagal mengambil data keranjang",
        });
      }
      console.log(result);

      socket.emit("cart_data_on_connect", result);
    });

    socket.on("cart_updated", (cartData) => {
      console.log("Cart updated for userId: ", userId);

      io.emit("cart_updated", cartData);
    });


    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoute);
app.use("/api", routerGet);
app.use("/api", productRoute);
app.use("/api", roleRoute);
app.use("/api", orderRoute);
app.use("/api", cartRoute(io));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = io;

server.listen(port, () => {
  console.log("server running");
});
