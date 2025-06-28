const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../serverForTest");
const Notification = require("../models/Notification");

const API_KEY =
  process.env.API_KEY ||
  "1e2f3c4b5a6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f";

describe("Notification API", () => {
  let notifId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Notification.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should create a notification", async () => {
    const res = await request(app)
      .post("/api/notifications")
      .set("x-api-key", API_KEY)
      .send({
        type: "unit-test",
        title: "Unit Test",
        message: "Testing create",
        recipient: { role: "admin" },
        source: { service: "test" },
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("_id");
    notifId = res.body.data._id;
  });

  it("should get notifications", async () => {
    const res = await request(app)
      .get("/api/notifications")
      .set("x-api-key", API_KEY);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should update a notification", async () => {
    const res = await request(app)
      .patch(`/api/notifications/${notifId}`)
      .set("x-api-key", API_KEY)
      .send({ read: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.read).toBe(true);
  });

  it("should delete a notification", async () => {
    const res = await request(app)
      .delete(`/api/notifications/${notifId}`)
      .set("x-api-key", API_KEY);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Notification deleted");
  });
});
