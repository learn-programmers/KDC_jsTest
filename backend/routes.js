const express = require("express");
const { delay } = require("lodash");
const fs = require("fs");
const router = express.Router();
const { getRandomNumber } = require("./utils");

const pagingUnit = 32;
const data = require("./data.json");

const allDataCount = JSON.parse(fs.readFileSync("data.json").toString()).length;

const ERROR_ENCOUNT_PERCENT = 10;
const MAX_DELAY_TIME = 3000;

const getError = () => getRandomNumber(0, 100) <= ERROR_ENCOUNT_PERCENT;

/* 필요 시 부활시킬 것
router.get("/cats/all", (req, res) => {
  const page = Number(req.query.page);

  if (Number.isNaN(page)) {
    return res.status(400).send({
      message: "Query parameter(page) should be given."
    });
  } else if (page < 1) {
    return res.status(400).send({
      message: "Query parameter(page) should be more than 1."
    });
  }

  // Last page: 853
  const startIndex = (page - 1) * pagingUnit;
  const endIndex = startIndex + pagingUnit;

  resolvingData
    .then(data => {
      return res.status(200).send({
        data: data.slice(startIndex, endIndex)
      });
    })
    .catch(error => {
      console.error(error);

      return res.status(500).send({
        message: "An error has occurred while fetching data."
      });
    });
});
*/

const convertToForList = ({ id, url, name }) => ({
  id,
  url,
  name
});

router.get("/cats/random50", (req, res) => {
  const minIndex = 0;
  const maxIndex = allDataCount - 1;
  const randomFiftyIndice = Array.from(Array(50).keys()).map(() =>
    getRandomNumber(minIndex, maxIndex)
  );

  delay(() => {
    if (getError()) {
      return res.status(500).send({
        message: "This is an intentional error."
      });
    }
    return res.status(200).send({
      data: data
        .filter((_, index) => randomFiftyIndice.includes(index))
        .map(convertToForList)
    });
  }, getRandomNumber(0, MAX_DELAY_TIME));
});

router.get("/cats/search", (req, res) => {
  const { q } = req.query;
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 50;

  if (!q) {
    return res.status(400).send({
      message:
        "Query parameter(q) should be given in order to search gif images."
    });
  }
  const startIndex = (page - 1) * pagingUnit;
  const endIndex = startIndex + pagingUnit;

  delay(() => {
    if (getError()) {
      return res.status(500).send({
        message: "This is an intentional error."
      });
    }
    return res.status(200).send({
      data: data
        .filter(
          ({ name, temperament, origin }) =>
            name.toLowerCase().includes(q.toLowerCase()) ||
            temperament.toLowerCase().includes(q.toLowerCase()) ||
            origin.toLowerCase().includes(q.toLowerCase())
        )
        .slice(startIndex, endIndex)
        .map(convertToForList)
        .slice(0, limit)
    });
  }, getRandomNumber(0, MAX_DELAY_TIME));
});

router.get("/cats/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Parameter(id) should be given."
    });
  }
  delay(() => {
    if (getError()) {
      return res.status(500).send({
        message: "This is an intentional error."
      });
    }
    const foundCat = data.find(cat => cat.id === id);

    if (!foundCat) {
      return res.status(400).send({
        message: "The gif image with the given id could not be found."
      });
    }

    return res.status(200).send({
      data: foundCat
    });
  }, getRandomNumber(0, MAX_DELAY_TIME));
});

module.exports = router;
