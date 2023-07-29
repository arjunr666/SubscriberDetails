const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// getting all

router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one

router.get("/:id", getSubscriber, (req, res) => {
  res.send(res.subscriber.name);
});

// creating one

router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedChannel: req.body.subscribedChannel,
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// updating one

router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedChannel) {
    res.subscriber.subscribedChannel = req.body.subscribedChannel;
  }

  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// deleting one

router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.deleteOne();
    res.json({ message: "deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;
