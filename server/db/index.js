/* eslint-disable prettier/prettier */
require('dotenv').config();
const { models } = require('./models');
const db = require('./db');
const axios = require('axios');

const { User, Job } = models;

const sync = async () => {
  try {
    const user = await User.create({
      username: 'admin@fullstack.com',
      password: 'password',
      firstName: 'Default',
      lastName: 'Admin',
      image:
        'https://thumbs.dreamstime.com/b/red-admin-sign-pc-laptop-vector-illustration-administrator-icon-screen-controller-man-system-box-88756468.jpg',
      clearance: 5,
    });
    await User.create({
      username: 'test@fullstack.com',
      password: 'password',
      firstName: 'Default',
      lastName: 'Test',
      image:
        'https://thumbs.dreamstime.com/b/red-admin-sign-pc-laptop-vector-illustration-administrator-icon-screen-controller-man-system-box-88756468.jpg',
      clearance: 1,
    });
    console.log(user.validPassword('password'));

    const job1 = await Job.create({
      name: 'McCarren Park',
      status: 'paid',
      price: 20.0,
      city: 'Brooklyn',
      state: 'New York',
      address: 'Bedford Ave and Lorimer St',
      userId: user.id,
      description: 'Clean Up McCarren Park',
    });
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
          `${job1.address} ${job1.city}, ${job1.state}`
        )}&key=${process.env.GEOCODE_KEY}`
      )
      .then(async response => {
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        await job1.update({ lat: lat });
        await job1.update({ lng: lng });
      });

    const job2 = await Job.create({
      name: 'Tompkins Square Park',
      status: 'paid',
      price: 20.0,
      city: 'New York',
      state: 'New York',
      address: 'Tompkins Square Park',
      userId: user.id,
      description: 'Clean up Tomkins Square Park',
    });

    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
          `${job2.address} ${job2.city}, ${job2.state}`
        )}&key=${process.env.GEOCODE_KEY}`
      )
      .then(async response => {
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        await job2.update({ lat: lat });
        await job2.update({ lng: lng });
      });

    const job3 = await Job.create({
      name: 'Cooper Park',
      status: 'paid',
      price: 20.0,
      city: 'Brooklyn',
      state: 'New York',
      address: 'Cooper Park',
      userId: user.id,
      description: 'clean up Cooper Park',
    });

    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
          `${job3.address} ${job3.city}, ${job3.state}`
        )}&key=${process.env.GEOCODE_KEY}`
      )
      .then(async response => {
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        await job3.update({ lat: lat });
        await job3.update({ lng: lng });
      });

    const job4 = await Job.create({
      name: 'Domino Park',
      status: 'unpaid',
      city: 'Brooklyn',
      state: 'New York',
      address: 'Domino Park',
      userId: user.id,
      description: 'clean up Domino Park',
    });

    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
          `${job4.address} ${job4.city}, ${job4.state}`
        )}&key=${process.env.GEOCODE_KEY}`
      )
      .then(async response => {
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        await job4.update({ lat: lat });
        await job4.update({ lng: lng });
      });

    const job5 = await Job.create({
      name: 'Maria Hernandez Park',
      status: 'unpaid',
      city: 'Brooklyn',
      state: 'New York',
      address: 'Maria Hernandez Park',
      userId: user.id,
      description: 'clean up Maria Hernandez Park',
    });

    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
          `${job5.address} ${job5.city}, ${job5.state}`
        )}&key=${process.env.GEOCODE_KEY}`
      )
      .then(async response => {
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        await job5.update({ lat: lat });
        await job5.update({ lng: lng });
      });
  } catch (e) {
    console.error(e);
  }
};
const seed = async (force = true) => {
  try {
    await db.sync({ force });
    if (force) {
      await sync();
    }
    console.log('seed was successful');
  } catch (e) {
    throw new Error('seed unsuccessful', e);
  }
};

module.exports = {
  seed,
  models,
};
